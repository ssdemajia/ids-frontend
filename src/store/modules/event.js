import { getEvents } from '@/api/event'

const event = {
  state: {
    events: [],
    cid: -1
  },
  mutations: {
    ADD_EVENT : (state, event)=>{
      console.log("Add Event!")
      
      if (event.cid > state.cid) {
        state.events.push(event)
        state.cid = event.cid;
      }
      // console.log(state.events);
      
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
    
  }
}
export default event
