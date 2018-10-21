import request from '@/utils/request'
export function getSystemSummary(sig_priority) {
  // 获得系统信息
  return request({
    url: `/info/summary`,
    method: 'GET'
  })
}

export function getIntrusionLoc() {
  // 获得所有入侵事件ip对应的地址
  return request({
    url: '/event/loc',
    method: 'GET'
  })
}
