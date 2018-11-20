<template>
  <div class="list-container-wrapper">
    <div class="list-container" :style="{height:getHeight}">
    <div 
      class="list-item" 
      v-for="vul in data" 
      :key="vul.cve"
      @click="() => handleClick(vul)"
    >
      <span :class="getLevel(vul.level[0])">{{ vul.level[0] }}</span>
      <span class="product">{{ vul.product }}</span>
      <span class="date">{{ vul.submit_date }}</span>
      <transition name="fade">
            <div v-show="activeItem === vul.cve">
              <table class="specifyTable">
                <colgroup>
                  <col id="label">
                  <col id="descript">
                </colgroup>
                <tr>
                  <td class="key">CVE</td>
                  <td class="value">{{ vul.cve }}</td>
                </tr>
                <tr>
                  <td class="key">CNVD</td>
                  <td class="value">{{ vul.cnvd }}</td>
                </tr>
                <tr>
                  <td class="key">公开日期</td>
                  <td class="value">{{ vul.date }}</td>
                </tr>
                <tr>
                  <td class="key">危险级别</td>
                  <td :class="['value', getLevel(vul.level[0])]">{{ vul.level[0] }}</td>
                </tr>
                <tr>
                  <td class="key">漏洞信息</td>
                  <td class="value">{{ vul.description }}</td>
                </tr>
                <tr>
                  <td class="key">解决方案</td>
                  <td class="value">{{ vul.solve }}</td>
                </tr>
                <tr>
                  <td class="key">补丁信息</td>
                  <td class="value">{{ vul.patch }}</td>
                </tr>
                <tr>
                  <td class="key">验证信息</td>
                  <td class="value">{{ vul.verification }}</td>
                </tr>
                <tr>
                  <td class="key">参考链接</td>
                  <td class="value">{{ vul.link }}</td>
                </tr>
                </table>
              </div>
            </transition>
        
    </div>
  </div>
  </div>
  
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 300
    },
    name: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    getHeight() {
      return `${this.height}px`;
    }
  },
  methods: {
    getLevel(level) {
      const levels = {
        高: "level-high",
        中: "level-middle",
        低: "level-low"
      };
      return levels[level] + " level";
    },
    handleClick(item) {
      console.log(item)
      if (item.cve === this.activeItem) {
        this.activeItem = "";
      } else {
        this.activeItem = item.cve;
      }
    }
  },
  data() {
    return {
      activeItem: ""
    };
  }
};
</script>

<style lang="scss">
.list-container-wrapper {
  padding-top: 10px;
  .list-container {
    overflow: auto;
    &::-webkit-scrollbar {
      // display: none;
      width: 4px;
      height: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
    }
    .list-item {
      margin: 6px;
      border-radius: 8px;
      background-color: #000;
      line-height: 24px;
      color: white;
      padding: 8px;

      .level {
        vertical-align: middle;
        display: inline-block;
        height: 24px;
        width: 24px;
      }
      .product {
        vertical-align: middle;
        text-align: left;
        font-size: 16px;
        display: inline-block;
        height: 24px;
        width: 290px;
        overflow: hidden;
      }
      .date {
        display: inline-block;
        height: 24px;
        font-size: 14px;
      }
      .specifyTable {
        background-color: #000;
        word-wrap: break-word;
        word-break: break-all;
        #label {
          width: 10%;
        }
        .key {
          color: rgba(255, 255, 255, 0.7);
          text-align: right;
          font-weight: 600;
        }
        .value {
          padding-left: 10px;
          width: 50%;
          line-height: 130%;
          word-wrap: break-word;
        }
      }
    }
  }
}
.level-high {
  color: red;
}
.level-middle {
  color: orange;
}
.level-low {
  color: yellow;
}
</style>
