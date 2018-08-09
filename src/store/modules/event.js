import { getEventsV2, getCount } from '@/api/event'

const event = {
  state: {
    events: [],
    current_events: [],
    cid: -1,
    eventPerPage: 30,
    currentPage: 1,
    check: {
      checkTCP: true,
      checkUDP: true,
      checkIP: true,
      checkICMP: true
    },
    event_count: {
      tcp: 0,
      icmp: 0,
      udp: 0,
      ip: 0,
      event: 0
    },
    current_event: {}
  },
  mutations: {
    PROTOCOL_CHANGE(state, check) {
      for (const item in check) {
        state.check[item] = check[item]
      }
    },
    CHANGE_PAGE(state, index) {
      state.currentPage = index
    },
    CHANGE_EVENTS(state, events) {
      // 加载事件
      state.current_events = []
      state.current_events = events
    },
    UPDATE_EVENT_COUNT(state, count) {
      state.event_count[count.type] = count.count
    },
    CHANGE_EVENT(state, event) {
      // 改变当前store中的event
      state.current_event = event
    }
  },
  actions: {
    getEventFromServerV2(context) {
      const check = context.state.check
      return new Promise((resolve, reject) => {
        const { start, end } = context.getters.getCurrentPageStartEnd
        getEventsV2(start, end, check).then(response => {
          var events = response.result
          var mEvents = []
          for (let i = 0; i < events.length; i++) {
            const event = events[i]
            var mEvent = {
              sid: event[0],
              cid: event[1],
              signature: event[2],
              sig_name: event[3],
              sig_class_id: event[4],
              sig_priority: event[5],
              timestamps: event[6],
              ip_src: event[7],
              ip_dst: event[8],
              protocol: event[9]
            }
            mEvents.push(mEvent)
          }
          context.commit('CHANGE_EVENTS', mEvents)
          resolve(response)
        }).catch(err => {
          console.log('getEvent error')
          reject(err)
        })
      })
    },
    getEventsCount(context, type) {
      return new Promise((resolve, reject) => {
        getCount(type).then(response => {
          context.commit('UPDATE_EVENT_COUNT', {
            type: type,
            count: response.count
          })
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters: {
    getActivityEvent(state) {
      return state.current_events
    },
    getCurrentPageStartEnd(state) {
      var start = (state.currentPage - 1) * state.eventPerPage
      var end = state.currentPage * state.eventPerPage - 1
      return { start, end }
    },
    getCount: (state) => {
      var count = 0
      if (state.check.checkTCP) {
        count += state.event_count.tcp
      }
      if (state.check.checkUDP) {
        count += state.event_count.udp
      }
      if (state.check.checkICMP) {
        count += state.event_count.icmp
      }
      if (state.checkIP) {
        count += state.event_count.event - count
      }
      console.log('Count:' + count)
      return count
    }
    // getCurrentEventsCount(state) {
    //   return state.current_events.length
    // },
    // getPageCount(state, getters) {
    //   console.log('Page: ' + getters.getEventsCount / state.eventPerPage)
    //   return Math.ceil(getters.getEventsCount / state.eventPerPage)
    // }
  }
}
export default event
