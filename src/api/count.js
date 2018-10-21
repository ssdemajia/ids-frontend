import request from '@/utils/request'
export function getEventCountBySig(sig_priority) {
  // 获得三个等级事件的数量
  return request({
    url: `/event/sig/${sig_priority}`,
    method: 'GET'
  })
}
export function getEventCountByTime(time, sig_priority) {
  // 获得某个事件的数量
  return request({
    url: `/event/sig/${time}/${sig_priority}`,
    method: 'GET'
  })
}
export function getAllCountByTime(time) {
  // 获得所有级别事件的数量
  return request({
    url: `/event/sig/${time}`,
    method: 'GET'
  })
}
export function getEventTopCountByNum(num) {
  return request({
    url: `/event/sig/top/${num}`,
    method: 'GET'
  })
}

export function getVulTop() {
  return request({
    url: '/vul/top',
    method: 'GET'
  })
}
