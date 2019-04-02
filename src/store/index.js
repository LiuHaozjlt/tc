import Vue from 'vue'
import Vuex from 'vuex'
import mock from 'mockjs'
import axios from 'axios'
import { api } from '@/api/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLoading: false,
    indexData: [],
    userInfo: JSON.parse(window.localStorage.getItem('userInfo') || null) || {},
    menudata: '',
    iptqingcheng: '',
    isPersonal: true,
    imgCache: ''
  },
  getters: {
    testa (state) {
      return state.iptqingcheng
    },
    showLoading (state) {
      return state.showLoading
    },
    indexData (state) {
      //  debugger
      return state.indexData
    },
    menuData (state) {
      return state.menudata
    }

  },
  mutations: {
    showLoading (state) {
      state.showLoading = true
      setTimeout(() => { state.showLoading = false }, 3000)
    },
    hideLoading (state) {
      state.showLoading = false
    },
    saveIndexData (state, data) {
      state.indexData = data
    },
    saveUserInfo (state, data) {
      state.userInfo = data
      window.localStorage.setItem('userInfo', JSON.stringify(data))
    },
    saveIndexsou (state, data) {
      state.menudata = data || []
    },
    setPersonal (state, data) {
      state.isPersonal = data
    },
    cacheImage (state, data) {
      state.imgCache = data
    }

  },
  actions: {
    // getData () {
    //   var mrdm = mock.Random
    //   var data = mock.mock('/da', {
    //     'name|3': [{ cname: () => mrdm.cname() }]
    //   })
    //   return axios
    //     .get('/da')
    //     .then(data => {
    //       let dt = data.data.name
    //       return dt
    //     })
    //     .catch(e => {
    //       console.log('rp')
    //     })
    // },

    indexmenu ({ commit }) {
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      axios({
        methods: 'get',
        url: '/apis/v1/seller/releases/types',
        data: {
          // goods_type_id: 444444,
          // weight: 99,
          // send_address_id: 555,
          // receive_address_id: 3333,
          // receive_time: 4
        },
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(p => {
        let menudata = p.data.data
        commit('saveIndexsou', menudata)
        // console.log(p.data.data)
      })
    },

    getRecommendList ({ commit }) {
      axios.get(`${api.shouyeshangp}`).then(p => {
        // debugger
        // console.log('首页数据', p)
        commit('saveIndexData', p.data.data)
      })
    }
  }
})
