import Vue from 'vue'
import Vuex from 'vuex'
import mock from 'mockjs'
import axios from 'axios'
import { api } from '@/api/api'
// eslint-disable-next-line no-unused-vars
import router from '@/router'
Vue.use(Vuex)

function updateRequst (token) {
  return !token ? axios : axios.create({
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

if (window.localStorage.getItem('isPersonal') === null) {
  window.localStorage.setItem('isPersonal', JSON.stringify(true))
}

let token = (JSON.parse(window.localStorage.getItem('userInfo') || null) || {}).access_token ||
  'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
let $http = updateRequst(token)

export default new Vuex.Store({
  state: {
    showLoading: false,
    indexData: [],
    userInfo: JSON.parse(window.localStorage.getItem('userInfo') || null) || {},
    menudata: [],
    iptqingcheng: '',
    isPersonal: !!JSON.parse(window.localStorage.getItem('isPersonal') || null),
    imgCache: '',
    sellerInfo: {
      release_type_id: '',
      name: '',
      logo: '',
      img: '',
      info: '',
      info_la: ''
    },
    publish: {},
    publishReleaseValue: {},
    userAddressList: [],
    activeAddress: null
  },
  getters: {
    testa (state) {
      return state.iptqingcheng
    },
    showLoading (state) {
      return state.showLoading
    },
    indexData (state) {
      let data = JSON.parse(localStorage.getItem('indexData')) || []
      return state.indexData.length === 0 ? data : state.indexData
    },
    menuData (state) {
      let data = JSON.parse(localStorage.getItem('menudata')) || []
      return state.menudata.length === 0 ? data : state.menudata
    }

  },
  mutations: {
    getlianjie (state) {
      // router.beforeEach(){
      //   this.routers =

      // }
    },
    qingchulocalstore (state) {
      state.userInfo = {}
      window.localStorage.removeItem('userInfo')
    },
    showLoading (state) {
      state.showLoading = true
      setTimeout(() => { state.showLoading = false }, 3000)
    },
    hideLoading (state) {
      state.showLoading = false
    },
    saveIndexData (state, data) {
      localStorage.setItem('indexData', JSON.stringify(data))
      state.indexData = data
    },
    saveUserInfo (state, data) {
      state.userInfo = data
      window.localStorage.setItem('userInfo', JSON.stringify(data))
      updateRequst(data.access_token)
    },
    saveIndexsou (state, data) {
      state.menudata = data || []
    },
    setPersonal (state, data) {
      state.isPersonal = !!data
      window.localStorage.setItem('isPersonal', JSON.stringify(state.isPersonal))
    },
    cacheImage (state, data) {
      state.imgCache = data
    },
    updateSellerInfo (state, data = {}) {
      state.sellerInfo = {...state.sellerInfo, ...data}
    },
    updatePublish (state, data = {}) {
      state.publish = {...state.publish, ...data}
    },
    savePublishReleaseValue (state, data = {}) {
      state.publishReleaseValue = data
    },
    saveUserAddressList (state, data) {
      state.userAddressList = data
    },
    setActiveAddress (state, data) {
      state.activeAddress = data
    }
  },
  actions: {
    indexmenu ({ commit }) {
      $http({
        methods: 'get',
        url: 'apis/v1/tool/module',
        data: {
        }
      }).then(p => {
        let menudata = p.data.data
        localStorage.setItem('menudata', JSON.stringify(menudata))
        commit('saveIndexsou', menudata)
      })
    },
    getRecommendList ({ commit }) {
      $http.get(`${api.shouyeshangp}`).then(p => {
        commit('saveIndexData', p.data.data)
      })
    },
    getSellerInfo ({commit}) {
      $http.get('/apis/v1/seller/my-info').then(p => {
        commit('updateSellerInfo', p.data.data)
      })
    },
    getPublishReleaseValue ({commit}) {
      $http.get('/apis/v1/seller/get-publish-release-value').then(p => {
        commit('savePublishReleaseValue', p.data.data)
      })
    },
    publish ({commit}, data) {
      let path = data.id ? '/apis/v1/seller/my-release-update/' + data.id : '/apis/v1/seller/my-release-create'
      return $http.post(path, data)
    },
    getUserAddressList ({commit}) {
      return $http.get('/apis/v1/user-address').then(({data}) => {
        commit('saveUserAddressList', data.data)
      })
    }
  }
})
