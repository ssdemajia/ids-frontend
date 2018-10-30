import request from '@/utils/request'

// 获取所有扫描记录
export function getAllScanTasks() {
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
export function deleteRecord(name) {
  return request({
    url: '/vul/delete',
    method: 'post',
    data: {
      name
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

export function createTask(name, ips) {
  // 新建任务
  return request({
    url: '/vul/create_task',
    method: 'post',
    data: {
      name,
      ips
    }
  })
}

export function getVuls(ip) {
  // 获得该设备漏洞信息
  return request({
    url: '/vul/vuls',
    method: 'get',
    params: {
      ip
    }
  })
}
