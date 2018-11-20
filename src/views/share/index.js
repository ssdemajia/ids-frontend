import Tabs from './Tabs'
import TabsPane from './TabsPane'

const components = [
  Tabs,
  TabsPane
]

const install = (Vue, opts = {}) => {
  components.forEach(component => {
    Vue.component(component.name, component) // 全局注册
  })
}

export default {
  install
}
