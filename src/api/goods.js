import request from '@/utils/request'

export const getGoodsListAPI = (params) => {
  return request({
    method: 'GET',
    url: '/private/v1/goods',
    params,
  })
}
export const searchGoodsAPI = (params) => {
  return request({
    method: 'GET',
    url: '/private/v1/goods',
    params,
  })
}
