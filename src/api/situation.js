import request from '@/utils/request'

// 工控态势感知界面相关api请求
export function getDeviceInfo(deviceType) {
  return request({
    url: `/situation/device`,
    method: 'POST',
    data: {
      type: deviceType
    }
  })
}

// 漏洞库的收录报告数
export function getVulsCount() {
  return request({
    url: '/situation/vuls_count',
    method: 'GET'
  })
}

// 漏洞库报告时间分布
export function getVulsDistribution() {
  return request({
    url: '/situation/vuls_distribution',
    method: 'GET'
  })
}

// 通过不同的key来获取去漏洞库报告
export function getVulsByKey(key) {
  return request({
    url: '/situation/vuls',
    method: 'POST',
    data: {
      key
    }
  })
}

// 通过指定ip来获取去设备信息
export function getSystemInfoByIp(ip) {
  return request({
    url: '/situation/system_info',
    method: 'POST',
    data: {
      ip
    }
  })
}

// 获得整个shodan.all的漏洞分布
export function getSystemScore() {
  return request({
    url: '/situation/system_score',
    method: 'GET'
  })
}

// 获得整个shodan.all的不同type的漏洞percentage
export function getSystemCount(type) {
  return request({
    url: '/situation/system_vuls_count',
    method: 'POST',
    data: {
      type
    }
  })
}

// 获得整个shodan.all的不同type的漏洞分布
export function getSystemDistribute(type) {
  return request({
    url: '/situation/system_vuls_distribute',
    method: 'POST',
    data: {
      type
    }
  })
}
