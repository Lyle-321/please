// 导入请求
import request from '@/utils/request'

// 获取全部广告信息
export const getAllAdvertisements = () => {
  return request({
    url: '/advertisement/selectAll',
    method: 'get'
  })
}

// 更新广告信息 - 支持部分字段更新
export const updateAdvertisement = (advertisement) => {
  // 过滤出存在的字段，实现部分更新
  const updateData = {}
  
  // 根据参数规范，只包含提供的字段
  if (advertisement.id !== undefined) updateData.id = advertisement.id
  if (advertisement.title !== undefined) updateData.title = advertisement.title
  if (advertisement.content !== undefined) updateData.content = advertisement.content
  if (advertisement.position !== undefined) updateData.position = advertisement.position
  if (advertisement.linkUrl !== undefined) updateData.linkUrl = advertisement.linkUrl
  
  return request({
    url: '/advertisement/update',
    method: 'put',
    data: updateData
  })
}