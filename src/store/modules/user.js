import { setToken, getToken, removeToken } from '@/utils/storage'

const user = {
  namespaced: true,
  state: {
    token: getToken(),
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
      setToken(newToken)
    },
    removeToken(state) {
      state.token = ''
      removeToken()
    },
  },
  actions: {},
}

export default user
