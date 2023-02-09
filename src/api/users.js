import request from '@/utils/request'

export const getUsersListAPI = (params) => {
  return request({
    method: 'GET',
    url: '/private/v1/users',
    params,
  })
}

export const searchUsersAPI = (params) => {
  return request({
    method: 'GET',
    url: '/private/v1/users',
    params,
  })
}

export const changeState = (state) => {
  return request({
    method: 'PUT',
    url: `/private/v1/users/500/state/${state}`,
  })
}

export const addUsersAPI = (data) => {
  return request({
    method: 'POST',
    url: '/private/v1/users',
    data,
  })
}

export const getUsersAPI = (id) => {
  return request({
    method: 'GET',
    url: `/private/v1/users/${id}`,
  })
}

export const updateUsersAPI = (id, data) => {
  return request({
    method: 'PUT',
    url: `/private/v1/users/${id}`,
    data,
  })
}

export const deleteUsersAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/private/v1/users/${id}`,
  })
}

export const getRoleListAPI = () => {
  return request({
    method: 'GET',
    url: '/private/v1/roles',
  })
}

export const updateRoleAPI = (id, rid) => {
  return request({
    method: 'PUT',
    url: `/private/v1/users/${id}/role`,
    data: { rid },
  })
}
