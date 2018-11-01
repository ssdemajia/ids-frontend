import { insertRecord, getAllScanTasks } from '@/api/scan'

var task = {
  state: {
    tasks: [],
    current_task: [],
    vuls: [],
    current_device: {}, // 保存当前点击map中某一个设备时的数据
    all_devices: [], // 保存所有tasks中的设备信息
    socre: 100 // 保存当前device的安全系数
  },
  mutations: {
    INSERT_TASKS(state, tasks) {
      state.tasks = tasks
    },
    // INSERT_VUL(state, vul) {
    //   state.vuls.push(vul)
    // },
    SET_CURRENT_TASK(state, task) {
      state.current_task = task
    },
    DELETE_RECORD(state, task) {
      if (state.current_task.name === task.name) {
        state.current_task = {}
      }
      for (var i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].name === task.name) {
          state.tasks.splice(i, 1)
          break
        }
      }
    },
    UPDATE_DEVICES(state, devices) {
      state.all_devices = devices
    },
    CHANGE_CURRENT_DEVICE(state, address) { // 遍历设置当前的设备信息
      state.all_devices.forEach(device => {
        if (address === device.address) {
          state.current_device = device
        }
      })
    },
    UPDATE_SCORE(state) {
      const vul_cat = state.current_device.vul_cat
      console.log(vul_cat)
      state.score = 100 - (vul_cat[0] * 3 + vul_cat[1] * 2 + vul_cat[2])
    }
  },
  actions: {
    getTasks(context) {
      getAllScanTasks().then((response) => {
        const tasks = response.result
        context.commit('INSERT_TASKS', tasks)
      })
    },
    insertScanRecord(context) {
      const record = context.state.current_record
      insertRecord(record).then((response) => {
        if (response.result === 'duplicate') {
          return
        }
        context.commit('INSERT_RECORD', record)
      })
    }
  },
  getters: {
    getResult(state) {
      var filterRecords = {}
      // 将ip、profile、port字段过滤掉
      for (var key in state.current_record) {
        if (key !== 'ip' &&
            key !== 'profile' &&
            key !== 'port' &&
            key !== 'key' &&
            key !== '_id') {
          console.log(key)
          filterRecords[key] = state.current_record[key]
        }
      }
      return filterRecords
    }
  }
}
export default task
