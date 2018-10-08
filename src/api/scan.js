import request from '@/utils/request'

// 获取所以记录
export function getAllScanRecord() {
  return request({
    url: `/vul/scan/all`,
    method: 'GET'
  })
}

// 插入一个扫描记录到服务端
export function insertRecord(record) {
  return request({
    url: `/vul/save`,
    method: 'POST',
    data: {
      record
    }
  })
}

// 删除一个记录
export function deleteRecord(ip) {
  return request({
    url: '/vul/delete',
    method: 'post',
    data: {
      ip
    }
  })
}

export function scanVul(record) {
  return request({
    url: '/vul/scan',
    method: 'post',
    data: {
      info: record
    }
  })
}
