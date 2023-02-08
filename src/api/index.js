import request from '@/utils/request'

export const getMenusAPI = () => {
  return request({
    method: 'GET',
    url: '/private/v1/menus',
  })
}
