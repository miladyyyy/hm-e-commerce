import { getCategoriesAPI } from '@/api/goods'

const goods = {
  namespaced: true,
  state: {
    categories: [],
  },
  mutations: {
    categories(state, categories) {
      state.categories = categories
    },
  },
  actions: {
    async getCategoriesAction(context) {
      const { data } = await getCategoriesAPI()
      console.log(data)
      context.commit('categories', data)
    },
  },
}

export default goods
