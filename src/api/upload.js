import request from '@/utils/request'

export function getUpLoadFileList() {
  return request({
    url: '/upload/list',
    method: 'get'
  })
}
export function getDissectPacket(filename, start, end) {
  return request({
    url: `/upload/${filename}`,
    method: 'POST',
    data: {
      start,
      end
    }
  })
}
export function removeFile(filename) {
  return request({
    url: `/upload/${filename}`,
    method: 'delete'
  })
}
export function getPacketDetail(id, filename) {
  return request({
    url: '/upload/packet',
    method: 'post',
    data: {
      id,
      filename
    }
  })
}
export function getPacketsLength(filename) {
  return request({
    url: `/upload/${filename}`,
    method: 'GET'
  })
}
