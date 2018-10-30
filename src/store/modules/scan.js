import { insertRecord, getAllScanTasks } from '@/api/scan'

var task = {
  state: {
    tasks: [],
    current_task: [],
    vuls: [],
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
    EMPTY_VULS(state) {
      state.vuls = []
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
