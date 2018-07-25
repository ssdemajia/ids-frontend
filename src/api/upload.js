import request from '@/utils/request'

export function getUpLoadFileList() {
  return request({
    url: '/upload/list',
    method: 'get'
  })
}
export function getDissectPacket(filename) {
  return request({
    url: `/upload/${filename}`,
    method: 'get'
  })
}

export function removeFile(filename) {
  return request({
    url: `/delete/${filename}`,
    method: 'delete'
  })
}
