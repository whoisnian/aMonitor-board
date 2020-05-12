import { format } from 'date-fns'
import { version } from '../../package.json'

const PackageVersion = version

const calcFromBytes = (raw) => {
  if (typeof raw === 'string') {
    raw = parseInt(raw)
  }
  if (raw >= 1099511627776) {
    return (raw / 1099511627776).toFixed(1) + ' TB'
  } else if (raw > 1073741824) {
    return (raw / 1073741824).toFixed(1) + ' GB'
  } else if (raw > 1048576) {
    return (raw / 1048576).toFixed(1) + ' MB'
  } else if (raw > 1024) {
    return (raw / 1024).toFixed(1) + ' KB'
  } else {
    return raw.toFixed(1) + ' B'
  }
}

const calcFromKB = (raw) => {
  if (typeof raw === 'string') {
    raw = parseInt(raw)
  }
  return calcFromBytes(raw * 1024)
}

const formatDate = (raw) => {
  return format(new Date(raw), 'yyyy-MM-dd HH:mm:ss')
}

const textBeforeSpace = (raw) => {
  if (raw.indexOf(' ') === -1) {
    return raw
  }
  return raw.substr(0, raw.indexOf(' '))
}

const agentListFromLS = () => {
  const str = window.localStorage.getItem('agentList')
  return (str ? JSON.parse(str) : [])
}

const pushAgentToLS = (agent) => {
  const str = window.localStorage.getItem('agentList')
  const list = (str ? JSON.parse(str) : [])

  const index = list.findIndex((v) => v.id === agent.id)
  if (index === -1)list.push(agent)
  while (list.length > 5) {
    list.shift()
  }

  window.localStorage.setItem('agentList', JSON.stringify(list))
}

const groupListFromLS = () => {
  const str = window.localStorage.getItem('groupList')
  return (str ? JSON.parse(str) : [])
}

const pushGroupToLS = (group) => {
  const str = window.localStorage.getItem('groupList')
  const list = (str ? JSON.parse(str) : [])

  const index = list.findIndex((v) => v.id === group.id)
  if (index === -1)list.push(group)
  while (list.length > 5) {
    list.shift()
  }

  window.localStorage.setItem('groupList', JSON.stringify(list))
}

export {
  PackageVersion,
  calcFromBytes,
  calcFromKB,
  formatDate,
  textBeforeSpace,
  agentListFromLS,
  pushAgentToLS,
  groupListFromLS,
  pushGroupToLS
}
