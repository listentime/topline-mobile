import request from '@/utils/request'

export const login = ({ mobile, code }) => {
  // 其它逻辑。。。
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 拉黑用户（添加黑名单）
 */
export const addBlacklist = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target: userId
    }
  })
}
