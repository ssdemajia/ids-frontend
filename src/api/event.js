import request from '@/utils/request'

export function getEvents(cid) {
  return request({
    url: '/events',
    method: 'post',
    data: {
      cid
    }
  })
}

export function getEventDetail(cid) {
  return request({
    url: '/detail',
    method: 'post',
    data: {
      cid
    }
  })
}

export function getEventsV2(start, end, check) {
  return request({
    url: '/v2/events',
    method: 'post',
    data: {
      start,
      end,
      checkTCP: check.checkTCP,
      checkUDP: check.checkUDP,
      checkIP: check.checkIP,
      checkICMP: check.checkICMP
    }
  })
}

export function getCount(type) {
  return request({
    url: '/count/' + type,
    method: 'get'
  })
}
