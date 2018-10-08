import { insertRecord, getAllScanRecord } from '@/api/scan'

var record = {
  state: {
    records: [],
    current_record: {},
    vuls: []
  },
  mutations: {
    INSERT_RECORD(state, record) {
      state.records.push(record)
    },
    INSERT_VUL(state, vul) {
      console.log(vul)
      state.vuls.push(vul)
    },
    SET_CURRENT_RECORD(state, record) {
      state.current_record = record
    },
    DELETE_RECORD(state, record) {
      if (state.current_record.ip === record.ip) {
        state.current_record = {}
      }
      for (var i = 0; i < state.records.length; i++) {
        if (state.records[i].ip === record.ip) {
          state.records.splice(i, 1)
          break
        }
      }
    },
    EMPTY_VULS(state) {
      state.vuls = []
    }
  },
  actions: {
    getRecords(context) {
      getAllScanRecord().then((response) => {
        const init_record = response.result
        init_record.forEach(r => {
          context.commit('INSERT_RECORD', r)
        })
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
export default record
