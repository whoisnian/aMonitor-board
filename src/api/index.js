import {
  fetchPostHead,
  fetchDeleteHead,
  fetchPutHead,
  fetchGetJSON,
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

const requestAllAgents = async () => {
  const content = await fetchGetJSON('/api/agents')
  return content
}

const requestDeletedAgents = async () => {
  const content = await fetchGetJSON('/api/agents?deleted=true')
  return content
}

const requestDeleteAgent = async (id) => {
  await fetchDeleteHead(`/api/agent/${id}`)
}

const requestRecoverAgent = async (id) => {
  await fetchPutHead(`/api/agent/${id}`)
}

const requestUpdateAgentStatus = async (status, id) => {
  await fetchPostHead(`/api/agent/${id}`, { status })
}

const requestAgentInfo = async (id) => {
  const content = await fetchGetJSON(`/api/agent/${id}`)
  return content
}

const requestCpuInfo = async (id, from, to) => {
  const content = await fetchGetJSON(`/api/data/${id}/cpuinfo?from=${from}&to=${to}`)
  return content
}

const requestMemInfo = async (id, from, to) => {
  const content = await fetchGetJSON(`/api/data/${id}/meminfo?from=${from}&to=${to}`)
  return content
}

const requestLoadInfo = async (id, from, to) => {
  const content = await fetchGetJSON(`/api/data/${id}/loadinfo?from=${from}&to=${to}`)
  return content
}

const requestNetInfo = async (id, from, to) => {
  const content = await fetchGetJSON(`/api/data/${id}/netinfo?from=${from}&to=${to}`)
  return content
}

const requestDiskInfo = async (id, from, to) => {
  const content = await fetchGetJSON(`/api/data/${id}/diskinfo?from=${from}&to=${to}`)
  return content
}

const requestMountsInfo = async (id) => {
  const content = await fetchGetJSON(`/api/data/${id}/mountsinfo?from=0&to=0`)
  return content
}

const requestSshdInfo = async (id, from, to) => {
  const content = await fetchGetJSON(`/api/data/${id}/sshdinfo?from=${from}&to=${to}`)
  return content
}

const requestFileMDInfo = async (id, from, to) => {
  const content = await fetchGetJSON(`/api/data/${id}/filemdinfo?from=${from}&to=${to}`)
  return content
}

const requestAllRuleGroups = async () => {
  const content = await fetchGetJSON('/api/rulegroups')
  return content
}

const requestDeleteRuleGroup = async (id) => {
  await fetchDeleteHead(`/api/rulegroup/${id}`)
}

const requestRuleGroup = async (id) => {
  const content = await fetchGetJSON(`/api/grouprules/${id}`)
  return content
}

const requestDeleteRule = async (id) => {
  await fetchDeleteHead(`/api/rule/${id}`)
}

export {
  requestSignIn,
  requestSignUp,
  requestLogout,
  requestSelfInfo,
  requestAllAgents,
  requestDeletedAgents,
  requestDeleteAgent,
  requestRecoverAgent,
  requestUpdateAgentStatus,
  requestAgentInfo,
  requestCpuInfo,
  requestMemInfo,
  requestLoadInfo,
  requestNetInfo,
  requestDiskInfo,
  requestMountsInfo,
  requestSshdInfo,
  requestFileMDInfo,
  requestAllRuleGroups,
  requestDeleteRuleGroup,
  requestRuleGroup,
  requestDeleteRule
}
