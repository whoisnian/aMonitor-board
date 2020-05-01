import {
  fetchPostHead,
  fetchGetJSONWithStatus,
  fetchPostJSONWithStatus
} from '../utils/request'

const requestSignIn = async (email, password) => {
  const { ok, status, content } = await fetchPostJSONWithStatus('/api/signin', { email, password })
  if (status === 400 && content.error_type === 'INVALID_PARAMS') {
    return { ok: false, msg: '输入格式错误' }
  } else if (status === 401 && content.error_type === 'SIGNIN_FAILED') {
    return { ok: false, msg: '邮箱或密码错误' }
  }
  return { ok, msg: 'status: ' + status }
}

const requestSignUp = async (username, email, password) => {
  const { ok, status, content } = await fetchPostJSONWithStatus('/api/signup', { username, email, password })
  if (status === 400 && content.error_type === 'INVALID_PARAMS') {
    return { ok: false, msg: '输入格式错误' }
  } else if (status === 409 && content.error_type === 'DUPLICATED_EMAIL') {
    return { ok: false, msg: '邮箱已被注册' }
  }
  return { ok, msg: 'status: ' + status }
}

const requestLogout = async () => {
  await fetchPostHead('/api/logout')
}

const requestSelfInfo = async () => {
  const { ok, content } = await fetchGetJSONWithStatus('/api/self')
  return ok ? content : null
}

export {
  requestSignIn,
  requestSignUp,
  requestLogout,
  requestSelfInfo
}
