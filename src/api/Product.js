import request from '@/utils/request'

//获取产品列表
export const getProductList = (params = {}) => {
  return request({
    url: '/product/selectAll',
    method: 'get',
    params
  })
}

// 获取产品全部分类
export const getProductClassification = () => {
  return request({
    url: '/productCategory/selectAll',
    method: 'get'
  })
}

// 更新产品分类
export const updateProductClassification = (params) => {
  return request.put('/productCategory/update', params);
}

// 添加产品分类
export const addProductClassification = (params) => {
  return request.post('/productCategory/add', params);
}

// 删除产品分类
export const deleteProductClassification = (id) => {
  return request.delete(`/productCategory/delete/${id}`);
}

//产品分类分页
export const getProductClassificationPage = (pageNum, pageSize) => {
  return request({
    url: '/productCategory/selectPage',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}
