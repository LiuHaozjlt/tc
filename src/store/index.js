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
const wls = {
  get (key, defaultValue) {
    let value = window.localStorage.getItem(key)

    if (value === null) return defaultValue
    else return JSON.parse(value)
  },
  set (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

if (wls.get('isPersonal')) {
  wls.set('isPersonal', true)
}
let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
// let token = wls.get('userInfo').access_token || 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
let $http = updateRequst(token)
export default new Vuex.Store({
  state: {
    showLoading: false,
    indexData: [],
    userInfo: wls.get('userInfo', {}),
    menudata: [],
    iptqingcheng: '',
    isPersonal: !!wls.get('isPersonal'),
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
    activeAddress: null,
    isLaos: wls.get('isLaos') || false,
    logisticOrder: {},
    logisticGoodsType: []
  },
  getters: {
    testa (state) {
      return state.iptqingcheng
    },
    showLoading (state) {
      return state.showLoading
    },
    indexData (state) {
      let data = wls.get('indexData') || []
      return state.indexData.length === 0 ? data : state.indexData
    },
    menuData (state) {
      let data = wls.get('menudata') || []
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
      wls.set('indexData', data)
      state.indexData = data
    },
    saveUserInfo (state, data) {
      state.userInfo = data
      wls.set('userInfo', data)
      updateRequst(data.access_token)
    },
    saveIndexsou (state, data) {
      wls.set('menudata', data)
      state.menudata = data || []
    },
    setPersonal (state, data) {
      state.isPersonal = !!data
      wls.set('isPersonal', state.isPersonal)
    },
    cacheImage (state, data) {
      state.imgCache = data
    },
    updateSellerInfo (state, data = {}) {
      state.sellerInfo = {...state.sellerInfo, ...data}
    },
    updatePublish (state, data = {}) {
      // 通过 _cover 参数表示是否覆盖操作
      if (data._cover) {
        delete data._cover
        state.publish = data
      } else {
        state.publish = {...state.publish, ...data}
      }
    },

    savePublishReleaseValue (state, data = {}) {
      state.publishReleaseValue = data
    },
    saveUserAddressList (state, data) {
      state.userAddressList = data
    },
    setActiveAddress (state, data) {
      state.activeAddress = data
    },
    setIsLaos (state, isLaos) {
      state.isLaos = !!isLaos
      wls.set('isLaos', state.isLaos)
    },

    updateUserInfo (state, data = {}) {
      state.userInfo = {...state.userInfo, ...data}
      wls.set('userInfo', state.userInfo)
    },

    updateLogisticOrder (state, data) {
      if (data._cover) {
        delete data._cover
        state.loginsticOrder = data
      } else {
        state.logisticOrder = { ...state.logisticOrder, ...data }
      }
    },

    saveLogisticGoodsType (state, data = []) {
      state.logisticGoodsType = data
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
    publishSeller ({commit}, data) {
      let path = data.id ? '/apis/v1/seller/my-release-update/' + data.id : '/apis/v1/seller/my-release-create'
      return $http.post(path, data)
    },
    getDefaultUserAddress ({commit}) {
      return $http.get('/apis/v1/user-address')
    },
    getUserAddressList ({commit}) {
      return $http.get('/apis/v1/user-address').then(({data}) => {
        commit('saveUserAddressList', data.data)
      })
    },
    updateUserAddress ({commit}, data) {
      let id = data.user_address_id
      if (id) {
        return $http.put('/apis/v1/user-address/' + id, data)
      } else {
        return $http.post('/apis/v1/user-address', data)
      }
    },
    deleteUserAddress ({commit}, user_address_id) {
      return $http.post('/apis/v1/user-address/' + user_address_id)
    },
    setDefaultUserAddress (ctx, user_address_id) {
      return $http.post('/apis/v1/user-address/set-default', {user_address_id})
    },

    getUserRelease ({commit}, params = {}) {
      return $http.get('/apis/v1/user/releases/me', { params })
    },
    getSellerRelease ({commit}, params = {}) {
      return $http.get('/apis/v1/seller/my-publish', { params })
    },
    refreshUserRelease ({commit}, user_release_id) {
      return $http.post('/apis/v1/user/refresh-releases', {user_release_id})
    },
    refreshSellerRelease ({commit}, seller_release_id) {
      return $http.post('/apis/v1/seller/my-publish-refresh', {seller_release_id})
    },
    topUserRelease ({commit}, user_release_id) {
      return $http.post('/apis/v1/user/top-releases', {user_release_id})
    },
    shelfSellerRelease ({commit}, seller_release_id) {
      return $http.post('/apis/v1/seller/my-publish-shelf', {seller_release_id})
    },
    deleteUserRelease ({commeit}, id) {
      return $http.post('/apis/v1/user/del-releases/' + id)
    },
    deleteSellerRelease ({commeit}, ids) {
      return $http.post('/apis/v1/seller/my-publish-delete', {ids})
    },

    updateUserInfo ({commit}, data) {
      return $http.post('/apis/v1/user/current', data).then(({data}) => {
        if (data.error_code === 0) {
          commit('updateUserInfo', data)
        }
        return data
      })
    },

    publishUser (ctx, data) {
      let path = data.id ? '/apis/v1/user/releases/' + data.id : '/apis/v1/user/releases'
      return $http.post(path, data)
    },
    getscorelist ({commit}, params) {
      // debugger
      return $http.post('/apis/v1/config/scored-top', {

      })
    },
    setZhiD ({commit}, params) {
      // debugger
      return $http.post('/apis/v1/user/top-releases', {
        user_release_id: params.id,
        scored_top_id: 'scored_top_day' + params.days
      })
    },
    getNotice ({commit}, params) {
      return $http.get('/apis/v1/user/notice')
    },

    createLogisticOrder ({commit}, data) {
      return $http.post('/apis/v1/logistic', data)
    },
    getLogisticOrder (ctx, params) {
      return $http.get('/apis/v1/logistic', {params})
    },
    deleteLogisticOrder (ctx, id) {
      return $http.delete('/apis/v1/logistic/' + id)
    },

    getLogisticGoodsType ({commit}) {
      return $http.get('/apis/v1/logistic/goods-type').then(({data}) => {
        if (data.error_code === 0) {
          commit('saveLogisticGoodsType', data.data)
        }
      })
    }
  }

})
