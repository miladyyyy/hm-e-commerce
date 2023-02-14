import request from '@/utils/request'

export const getOrdersListAPI = (params) => {
  return request({
    method: 'GET',
    url: '/private/v1/orders',
    params,
  })
}

export const getOrderAPI = (id) => {
  return request({
    method: 'GET',
    url: `/private/v1/orders/${id} `,
  })
}
export const updateOrderAPI = (id, data) => {
  return request({
    method: 'PUT',
    url: `/private/v1/orders/${id} `,
    data,
  })
}
