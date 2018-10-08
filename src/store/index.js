import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import event from './modules/event'
import record from './modules/scan'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    event,
    record
  },
  getters
})

export default store
