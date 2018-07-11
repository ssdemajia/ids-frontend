import request from '@/utils/request'

export function getEvent(params) {
  return request({
    url: '/events',
    method: 'get',
    params
  })
}
