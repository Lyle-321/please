import request from '@/utils/request'



// 获取用户分页列表
export const getUserList = (params) => {
  return request({
    url: '/user/selectPage',
    method: 'get',
    params: params
  })
}