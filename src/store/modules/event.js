import { getEvents } from '@/api/event'

const event = {
  state: {
    events: [],
    current_events: [],
    cid: -1,
    eventPerPage: 30,
    currentPage: 1
  },
  mutations: {
    CHANGE_PAGE: (state, index) => {
      state.currentPage = index
    },
    ADD_EVENT : (state, event)=>{
      console.log("Add Event!")
      
      if (event.cid > state.cid) {
        state.events.push(event)
        state.cid = event.cid;
      }      
    },
    Protocol_Change(state, status) {
      var checkTCP = status.tcp
      var checkUDP = status.udp
      var checkIP = status.ip
      var checkICMP = status.icmp
      state.current_events = state.events.filter(event => {
        if (event.protocol == "ICMP") {
          if (!checkICMP) {
            return false
          }
        }
        else if (event.protocol == "UDP") {
          if (!checkUDP) {
            return false
          }
        }
        else if (event.protocol == "IP") {
          if (!checkIP) {
            return false
          }
        }
        else if (event.protocol == "TCP") {
          if (!checkTCP) {
            return false
          }
        }
        return true
      })
    }
  },
  actions: {
    GetEventFromServer(context, cid) {
      // console.log("get evenet from "+cid);
      if (cid <= context.state.cid) {
        return
      }
      return new Promise((resolve, reject) => {
        getEvents(cid).then(response => {
          // console.log(response.result)          
          var events = response.result
          // console.log(events);
          for (let i = 0; i < events.length; i++) {
            const event = events[i]
            var mEvent = {
              sid: event[0],
              cid: event[1],
              signature: event[2],
              sig_name: event[3],
              sig_priority: event[4],
              timestamps: event[5],
              ip_src: event[6],
              ip_dst: event[7],
              protocol: event[8]
            }
            context.commit('ADD_EVENT', mEvent)                    
          }
          resolve(response)
        }).catch(err => {
          console.log('getEvent error')
          reject(err)
        })
      })
    }
  },
  getters: {
    getActivityEvent(state) {
      var start = (state.currentPage-1)*state.eventPerPage
      var end = state.currentPage * state.eventPerPage-1
      return state.current_events.slice(start, end)
    },
    getEventsCount: (state) => {
      return state.events.length
    },
    getCurrentEventsCount(state) {
      return state.current_events.length
    },
    getPageCount(state, getters) {
      return Math.ceil(getters.getCurrentEventsCount/state.eventPerPage)
    },
    filterTCPEvent: (state) => {
      console.log();
      
      return state.events.filter(event => event.protocol === "TCP")
    },
    filterICMPEvent: (state) => {
      return state.events.filter(event => event.protocol === "ICMP")
    },
    filterUDPEvent: (state) => {
      return state.events.filter(event => event.protocol === "UDP")
    },
    filterIPEvent: (state) => {
      return state.events.filter(event => event.protocol === "IP")
    }
  }
}
export default event
