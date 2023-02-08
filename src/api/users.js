import request from '@/utils/request'

export const getUsersListAPI = (params) => {
  return request({
    method: 'GET',
    url: '/private/v1/users',
    // url: '/private/v1/users?query=&pagenum=1&pagesize=2',
    params,
  })
}
