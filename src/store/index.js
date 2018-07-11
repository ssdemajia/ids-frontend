import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import event from './modules/event'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    event
  },
  getters
})

export default store
