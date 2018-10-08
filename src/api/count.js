import request from '@/utils/request'
export function getEventCountBySig(sig_priority) {
  return request({
    url: `/dashboard/sig/${sig_priority}`,
    method: 'GET'
  })
}
export function getEventCountByTime(time, sig_priority) {
  return request({
    url: `/dashboard/sig/${time}/${sig_priority}`,
    method: 'GET'
  })
}
export function getEventTopCountByNum(num) {
  return request({
    url: `/dashboard/sig/top/${num}`,
    method: 'GET'
  })
}

export function getVulTop() {
  return request({
    url: '/vul/top',
    method: 'GET'
  })
}
