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

export function getEventDetail(cid, protocol) {
  return request({
    url: '/detail',
    method: 'post',
    data: {
      cid,
      protocol
    }
  })
}

