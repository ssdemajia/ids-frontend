import request from '@/utils/request'

export function createJob(job) {
  return request({
    url: '/console/jobs',
    method: 'POST',
    data: {
      job
    }
  })
}

export function getJobs() {
  return request({
    url: '/console/jobs',
    method: 'GET'
  })
}

export function deleteJob(id) {
  return request({
    url: '/console/jobs',
    method: 'DELETE',
    data: {
      id
    }
  })
}
