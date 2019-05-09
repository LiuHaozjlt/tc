import Vue from 'vue'
import Vuex from 'vuex'
import mock from 'mockjs'
import axios from 'axios'
import { api } from '@/api/api'
// eslint-disable-next-line no-unused-vars
import router from '@/router'
Vue.use(Vuex)

function updateRequst (token) {
  return axios.create({
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}
export const wls = {
  get (key, defaultValue) {
    let value = window.localStorage.getItem(key)
    if (value === null || value === undefined) return defaultValue
    else return JSON.parse(value)
  },
  set (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
    console.log(window.localStorage.getItem('locale'), 456)
  }
}

if (wls.get('isPersonal')) {
  wls.set('isPersonal', true)
}

let accessUserInfo = wls.get('userInfo')
// 设置token
let token = accessUserInfo ? accessUserInfo.access_token : ''

let $http = updateRequst(token)
// let token = 'jZvklXi8H9t('userInfo')
// let token = ''bs2bK9tBYYAoI19bjzAwU3_1556267215'
// let userInfos = wls.ge
// if (userInfos) {
//   token = userInfos.access_token
// }
// let $http = axios.create({headers: {}})

let queryParamDefault = {
  release_type_id: undefined,
  search: undefined,
  region_lv2: undefined,
  region_lv3: undefined,
  page: 1
}

export default new Vuex.Store({
  state: {
    showLoading: false,
    indexData: [],
    userInfo: wls.get('userInfo', {}),
    menuData: [],
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
    lang: wls.get('locale'),
    logisticOrder: {},
    logisticGoodsType: [],
    queryParam: {...queryParamDefault},
    queryHistory: wls.get('queryHistory', []), // {keyword, releaseTypeId}
    queryType: null,
    queryList: [],
    queryTotal: 0,
    sellerTypes: []
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
    }
  },
  mutations: {
    logout (state) {
      state.userInfo = {}
      window.localStorage.removeItem('userInfo')
      state.isPersonal = true
      wls.set('isPersonal', state.isPersonal)
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
      // console.log($http.defaults.headers)
      updateRequst(data.access_token)
      // $http.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token
    },
    saveIndexsou (state, data) {
      wls.set('menuData', data)
      state.menuData = data || []
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
    setIsLaos (state, lang) {
      let locale = lang
      if (lang === undefined)lang = null
      wls.set('locale', locale)
    },
    updateUserInfo (state, data = {}) {
      state.userInfo = {...state.userInfo, ...data}
      wls.set('userInfo', state.userInfo)
    },
    updateLogisticOrder (state, data) {
      if (data._cover) {
        delete data._cover
        state.logisticOrder = data
      } else {
        state.logisticOrder = { ...state.logisticOrder, ...data }
      }
    },
    saveLogisticGoodsType (state, data = []) {
      state.logisticGoodsType = data
    },
    updateQueryParam (state, data) {
      state.queryParam = {...state.queryParam, ...data}
    },
    resetQueryParam (state) {
      state.queryParam = {...queryParamDefault}
    },
    addQueryHistory (state, history) {
      const hasHistory = state.queryHistory.some(item => {
        return item.keyword === history.keyword && item.releaseTypeId === history.releaseTypeId
      })

      if (hasHistory) return // TODO 移到最上面
      else {
        let len = state.queryHistory.push(history)
        if (len > 10) { // 保存10条记录
          state.queryHistory.pop()
        }
      }
      wls.set('queryHistory', state.queryHistory)
    },
    setQueryType (state, data) {
      state.queryType = data
      // console.log(state.queryType)
      state.queryParam.release_type_id = data ? data.module_id : undefined
    },
    addQueryList (state, data) {
      if (data === -1) {
        state.queryList = []
      } else {
        state.queryList = state.queryList.concat(data)
      }
    },
    setQueryTotal (state, total) {
      state.queryTotal = total
    },
    saveSellerTypes (state, data) {
      state.sellerTypes = data
    }
  },
  actions: {
    indexmenu ({ commit }) {
      // $http({
      //   methods: 'get',
      //   url: 'apis/v1/tool/module',
      //   data: {
      //   }
      // }).then(p => {
      //   let data = p.data.data
      //   commit('saveIndexsou', data)
      // })

      $http.get(`apis/v1/tool/module`, {}).then(p => {
        let data = p.data.data
        commit('saveIndexsou', data)
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
      return $http.delete('/apis/v1/user-address/' + user_address_id)
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
    },

    getReleases ({commit}, params) {
      return $http.get('/apis/v1/user/releases', {params})
    },

    getSellerTypes ({commit}) {
      return $http.get('/apis/v1/seller/get-seller-type').then(({data}) => {
        if (data.error_code === 0) {
          commit('saveSellerTypes', data.data || [])
        }
      })
    },
    getSellers ({commit}, params) {
      return $http.get('/apis/v1/user/seller', {params})
    },
    getNews (ctx, params = {}) {
      return $http.get('/apis/v1/article', {params})
    },
    isbind ({commit}, params) {
      return $http.post('/apis/v1/user/third-isbind', {
        third_type: params.third_type,
        wx_openid: params.wx_openid,
        facebook_id: params.facebook_id
      })
    }
  }

})
