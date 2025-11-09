import request from '@/utils/request'

//获取产品列表
export const getProductList = (params = {}) => {
  return request({
    url: '/product/selectAll',
    method: 'get',
    params
  })
}