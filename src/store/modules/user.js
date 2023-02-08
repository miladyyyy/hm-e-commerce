import { setToken, getToken } from '@/utils/storage'

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
  },
  actions: {},
}

export default user
