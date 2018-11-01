<template>
  <div class="container">
    <el-row >
      <el-col :span="4">
        <el-upload
          class="upload"
          action="http://localhost:5000/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
          :before-remove="beforeRemove"
          :before-upload="beforeUpload"
          :file-list="fileList">
          <el-row>
            <el-button class="btn" type="success">点击上传流量包</el-button>
          </el-row>
          <el-row>
            <div class="upload-tip" slot="tip">只能上传pcap文件</div>
          </el-row>         
        </el-upload>
      </el-col>
      <el-col :span="20">
        <el-table
          v-loading="isLoading"
          element-loading-text="解析中"
          element-loading-spinner="el-icon-loading"
          height="820"
          :border="true"
          :data="pcap">
          <el-table-column
            width="80"
            label="序号"
            prop="id">
          </el-table-column>
          <el-table-column
            width="80"
            label="时间(s)"
            prop="time">
          </el-table-column>
          <el-table-column
            width="80"
            label="长度"
            prop="length">
          </el-table-column>
          <el-table-column
            width="140"
            label="源地址"
            prop="src">
          </el-table-column>
          <el-table-column
            width="140"
            label="目的地址"
            prop="dst">
          </el-table-column>
          <el-table-column
            width="120"
            label="协议"
            prop="protocol">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip="True"
            label="信息"
            prop="info">
          </el-table-column>
         <el-table-column
            width="120"
            label="操作"
            fixed="right">
            <template slot-scope="scope">
            <el-button type="primary" @click="showDetail(scope.row)">查看详情</el-button>
          </template>
         </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="packetsLength"
          @current-change="nextPage"
        > 
        </el-pagination>
      </el-col>
      
    </el-row>
    
    <packet-detail :info="packetSpecify" :dialogVisible="packetDialogVisible"></packet-detail>
  </div>
</template>

<script>
import PacketDetail from '@/views/upload/components/PacketDetail'
import { getUpLoadFileList, getDissectPacket, removeFile, getPacketDetail, getPacketsLength} from '@/api/upload'

export default {
  components: {
    PacketDetail
  },
  data() {
    return {
      fileList: [],
      // pcap: [
      //   {
      //     time: "2018.9.12",
      //     ip_src: "192.168.1.1",
      //     ip_dst: "192.168.1.2",
      //     port_src: "80",
      //     port_dst: "20000",
      //     protocol: "DNP3",
      //     info: "LALALALAL"
      //   }
      // ]
      currentFile: "",
      pcap: [],
      packetSpecify: [],
      packetDialogVisible: false,

      packetsLength: 0,
      pageSize: 12,
      isLoading: false
    }
  },
  methods: {
    nextPage(page) {
      var start = (page-1) * this.pageSize < 1? 1: (page-1) * this.pageSize
      var end = page * this.pageSize > this.packetsLength ? this.packetsLength: page * this.pageSize
      var filename = this.currentFile
      this.isLoading = true
      getDissectPacket(filename, start, end).then(response => {
          this.pcap = response.result
          this.isLoading = false
      })
    },
    handleSuccess(reponse, file, fileList) {
      this.currentFile = file.name
      this.pcap = reponse
      // console.log(reponse)
      // console.log(file)

    },
    handlePreview(file) { //点击已上传文件列表
      var filename = file.name
      this.currentFile = filename
      this.isLoading = true
      getPacketsLength(filename).then(response => {
        this.packetsLength = response.length
      }).then(() => {
        var start = 1;
        var end = this.pageSize > this.packetsLength ? this.packetsLength: this.pageSize
        getDissectPacket(filename, start, end).then(response => {
          this.pcap = response.result
          this.isLoading = false
        })
      }).catch(err => {
        this.isLoading = false
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleExceed(file, fileList) {
      this.$message.warning(`当前限制选择文件夹，本次共选${fileList.length}, 共选择${file.length + fileList.length}`)
    },
    beforeRemove(file, fileList) { //从服务器upload目录删除
      return new Promise((resolve, reject)=>{
        this.$confirm(`移除${file.name}?`, "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          removeFile(file.name)
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          resolve()
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消删除'
          // })
          reject()
        })
      })
    },
    beforeUpload(file) {
      // console.log(file)
      const isPcap = file.type === 'application/vnd.tcpdump.pcap'
      if (isPcap) {
        return true
      }
      return this.$message.error("上传的文件必须是pcap文件")
    },
    showDetail(row) {
      var id = row.id
      getPacketDetail(id, this.currentFile).then((reponse) => {
        const info = reponse.result
        console.log(id)
        
        this.packetSpecify = info
        this.packetDialogVisible = true
      })
    }
  },
  mounted() {
    //更新已上传文件列表
    return new Promise((resolve, reject) => {
      getUpLoadFileList().then(response => {
        console.log(response)
        var lists = response['lists']
        for (let i = 0; i < lists.length; i++) {
          this.fileList.push({
            name: lists[i],
            url: "localhost"
          })
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
</script>

<style lang="scss" scoped>
div.container {
  background-color: #f0f2f5;
  padding: 20px;
  .upload-tip {
    margin-top: 20px;
  }
  // .btn {
  //   margin-left: 20px;
  // }
}
// .el-message-box {
//   width: 800px;
// }
</style>
