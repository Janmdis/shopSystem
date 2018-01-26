import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import deplist from './modules/deplist'
import rolelist from './modules/rolelist'
import promiselist from './modules/promiselist'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    deplist,
    rolelist,
    promiselist
  }
})