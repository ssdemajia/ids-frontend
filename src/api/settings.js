import request from '@/utils/request'

export const getSettings = () => {
  return request({
    url: '/settings/',
    method: 'get'
  })
}

export const setSettings = (settings) => {
  return request({
    url: '/settings/',
    method: 'post',
    data: {
      settings
    }
  })
}
