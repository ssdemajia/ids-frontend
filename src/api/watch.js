import request from '@/utils/request'

export function monitorInterface() {
  return request({
    url: '/monitor/interface',
    method: 'get'
  })
}
export function startMonitor(inter) {
  return request({
    url: `/monitor/start/${inter}`,
    method: 'get'
  })
}
export function stopMonitor(inter) {
  return request({
    url: `/monitor/stop/${inter}`,
    method: 'get'
  })
}
export function getPacket(id) {
  return request({
    url: `/monitor/packet/${id}`,
    method: 'get'
  })
}
