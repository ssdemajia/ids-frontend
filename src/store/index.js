import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import event from './modules/event'
import task from './modules/scan'
import situation from './modules/situation'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    event,
    task,
    situation
  },
  getters
})

export default store
