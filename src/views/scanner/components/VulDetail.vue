<template>
  <div class="container">
    <h3 class="vulTitle">{{ vul.title }}</h3>
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
        <td class="value">{{ vul.level }}</td>
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
</template>

<script>
export default {
  props: {
    vul: {
      type: Object,
      default: () => {
        return {
          title: "",
          cve: "",
          description: ""
        };
      }
    }
  }
};
</script>

<style scoped>
.container {
  background-color: white;
  color: #606266;
}
.container .vulTitle {
  text-align: center;
  padding: 10px;
}
.container .specifyTable {
  width: 100%;
  margin-top: 10px;
}
.container .specifyTable td {
  border-bottom: #000;
  padding: 23px 7px 2px 7px;
}
#label {
  width: 15%;
}
.key {
  text-align: right;
  font-weight: 600;
}
.value {
  line-height: 130%;
}
</style>
