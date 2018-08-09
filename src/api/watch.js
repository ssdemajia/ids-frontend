import request from '@/utils/request'

export function monitorInterface() {
  return request({
    url: '/monitor/interface',
    method: 'get'
  })
}
export function startMonitor(count, inter) {
  return request({
    url: '/monitor/start',
    method: 'post',
    data: {
      inter,
      count
    }
  })
}
// }
// export function stopMonitor(inter) {
//   return request({
//     url: `/monitor/stop/${inter}`,
//     method: 'get'
//   })
// }
export function getPacket(start, end) {
  return request({
    url: '/monitor/packet',
    method: 'post',
    data: {
      start,
      end
    }
  })
}
