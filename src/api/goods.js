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

export const getCategoriesAPI = (params) => {
  return request({
    method: 'GET',
    url: '/private/v1/categories',
    params,
  })
}

export const getAttributesAPI = (type) => {
  return request({
    method: 'GET',
    url: '/private/v1/categories/114/attributes',
    params: { sel: type },
  })
}

export const getParamsAPI = (id, type) => {
  return request({
    method: 'GET',
    url: `/private/v1/categories/${id}/attributes`,
    params: { sel: type },
  })
}

export const addAttributesAPI = (id, data) => {
  return request({
    method: 'POST',
    url: `private/v1/categories/${id} /attributes`,
    data,
  })
}

export const editAttributesAPI = (id, aid, data) => {
  return request({
    method: 'PUT',
    url: `/private/v1/categories/${id}/attributes/${aid}`,
    data,
  })
}

export const deleteAttributesAPI = (id, aid) => {
  return request({
    method: 'DELETE',
    url: `/private/v1/categories/${id}/attributes/${aid}`,
  })
}

export const getCategoriesListAPI = (params) => {
  return request({
    method: 'GET',
    url: '/private/v1/categories',
    params,
  })
}

export const deleteCategoryAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/private/v1/categories/${id}`,
  })
}

export const getOptionsAPI = (type) => {
  return request({
    method: 'GET',
    url: `/private/v1/categories?type=${type}`,
  })
}

export const addCategoryAPI = (data) => {
  return request({
    method: 'POST',
    url: '/private/v1/categories',
    data,
  })
}

export const getCategoryAPI = (id) => {
  return request({
    method: 'GET',
    url: `/private/v1/categories/${id}`,
  })
}

export const editCategoryAPI = (id, data) => {
  return request({
    method: 'PUT',
    url: `/private/v1/categories/${id}`,
    data,
  })
}
