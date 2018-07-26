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
          height="1080"
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
            width="160"
            label="源地址"
            prop="src">
          </el-table-column>
          <el-table-column
            width="160"
            label="目的地址"
            prop="dst">
          </el-table-column>
          <el-table-column
            width="80"
            label="协议"
            prop="protocol">
          </el-table-column>
          <el-table-column
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PacketTable from '@/views/upload/components/PacketTable'
import { getUpLoadFileList, getDissectPacket, removeFile, getPacketDetail} from '@/api/upload'

export default {
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
      pcap: []
    }
  },
  methods: {
    handleSuccess(reponse, file, fileList) {
      this.currentFile = file.name
      this.pcap = reponse
      // console.log(reponse)
      // console.log(file)

    },
    handlePreview(file) { //点击已上传文件列表
    this.currentFile = file.name
      new Promise((resolve, reject) => {
        var filename = file.name
        getDissectPacket(filename).then(response => {
          this.pcap = response.result
          resolve(response)
        })
      })
      // console.log(file);
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
        var info = reponse.result
        const h = this.$createElement
        this.$msgbox({
          title: '协议详细信息',
          message: h(PacketTable, {
            props: {
              info: info
            }
          }),
          showCancelButton: false,
          confirmButtonText: "返回",
          cancelButtonText: '',

        })
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
  padding: 20px;
  .upload-tip {
    margin-top: 20px;
  }
  // .btn {
  //   margin-left: 20px;
  // }
}
</style>
