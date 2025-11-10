// 导入请求
import request from '@/utils/request'

// 获取全部广告信息
export const getAllAdvertisements = () => {
  return request({
    url: '/advertisement/selectAll',
    method: 'get'
  })
}

// 更新广告信息 - 支持multipart/form-data格式，file参数可选
// 示例值: file:///Users/xujieming/Desktop/微信图片_20251104112238_36_3.jpg
export const updateAdvertisement = (params) => {
  // 检查是否包含file参数或已经是FormData对象
  const hasFile = params.file instanceof File || params.file instanceof Blob
  
  let requestData = params
  let requestHeaders = {}
  
  // 如果包含文件，创建FormData对象
  if (hasFile) {
    const formData = new FormData()
    
    // 添加所有参数到FormData
    Object.keys(params).forEach(key => {
      // 跳过null或undefined值
      if (params[key] !== null && params[key] !== undefined) {
        formData.append(key, params[key])
      }
    })
    
    requestData = formData
    // 不设置Content-Type，让浏览器自动设置为multipart/form-data并添加boundary
  } else if (!(params instanceof FormData)) {
    // 如果不是FormData且没有文件，设置为application/json
    requestHeaders['Content-Type'] = 'application/json'
  }
  
  return request({
    url: '/advertisement/update',
    method: 'post',
    data: requestData,
    headers: requestHeaders
  })
}

// 删除广告信息
export const deleteAdvertisement = id => request.delete(`/advertisement/delete/${id}`)

// 文件上传 - 支持multipart/form-data格式
export const uploadFile = (fileData) => {
  let formData
  
  console.log('uploadFile函数接收到的参数:', fileData)
  console.log('参数类型:', typeof fileData)
  console.log('是否为FormData:', fileData instanceof FormData)
  console.log('是否为File:', fileData instanceof File)
  console.log('是否为Blob:', fileData instanceof Blob)
  
  // 检查是否已经是FormData对象
  if (fileData instanceof FormData) {
    formData = fileData
    console.log('使用已有的FormData对象')
  } else if (fileData instanceof File || fileData instanceof Blob) {
    // 如果是file或blob对象，创建新的FormData
    formData = new FormData()
    console.log('创建新的FormData并添加file参数')
    formData.append('file', fileData)
    // 验证FormData中是否正确添加了文件
    const appendedFile = formData.get('file')
    console.log('FormData中的文件是否存在:', appendedFile !== null)
    if (appendedFile) {
      console.log('FormData中文件信息:', appendedFile.name, appendedFile.size)
    }
  } else {
    console.error('无效的文件参数类型:', fileData)
    // 仍然尝试创建FormData，作为容错处理
    formData = new FormData()
    formData.append('file', fileData)
  }
  
  console.log('即将发送上传请求，URL:', '/files/upload')
  console.log('请求数据类型:', formData instanceof FormData ? 'FormData' : typeof formData)
  
  // 移除headers配置，让浏览器完全自动处理Content-Type和boundary
  return request({
    url: '/files/upload',
    method: 'post',
    data: formData
  })
}