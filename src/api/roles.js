import request from '@/utils/request'

export const getRolesDataAPI = () => {
  return request({
    method: 'GET',
    url: '/private/v1/roles',
  })
}

export const addRolesAPI = (data) => {
  return request({
    method: 'POST',
    url: '/private/v1/roles',
    data,
  })
}

export const editRolesAPI = (id, data) => {
  return request({
    method: 'PUT',
    url: `/private/v1/roles/${id} `,
    data,
  })
}

export const deleteRolesAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/private/v1/roles/${id}`,
  })
}

export const getRolesTreeAPI = () => {
  return request({
    method: 'GET',
    url: '/private/v1/rights/tree',
  })
}

export const assignPermissionsAPI = (id, rids) => {
  return request({
    method: 'POST',
    url: `/private/v1/roles/${id}/rights`,
    data: rids,
  })
}

export const deleteRightsAPI = (id, rid) => {
  return request({
    method: 'DELETE',
    url: `/private/v1/roles/${id} /rights/${rid}`,
  })
}

export const getRightsAPI = () => {
  return request({
    method: 'GET',
    url: '/private/v1/rights/list',
  })
}
