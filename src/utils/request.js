const FETCH_OPTIONS = {
  credentials: 'same-origin',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json'
  }
}

const fetchGetHead = async (url) => {
  const result = await window.fetch(url, { method: 'GET', ...FETCH_OPTIONS })
  if (!result.ok) throw new Error(`[fetchGetHead] failed with ${result.status}: ${url}`)
}

const fetchPostHead = async (url, data) => {
  const result = await window.fetch(url, { method: 'POST', body: JSON.stringify(data), ...FETCH_OPTIONS })
  if (!result.ok) throw new Error(`[fetchPostHead] failed with ${result.status}: ${url}`)
}

const fetchGetJSON = async (url) => {
  const result = await window.fetch(url, { method: 'GET', ...FETCH_OPTIONS })
  if (!result.ok) throw new Error(`[fetchPostJSON] failed with ${result.status}: ${url}`)
  return result.json()
}

const fetchPostJSON = async (url, data) => {
  const result = await window.fetch(url, { method: 'POST', body: JSON.stringify(data), ...FETCH_OPTIONS })
  if (!result.ok) throw new Error(`[fetchPostJSON] failed with ${result.status}: ${url}`)
  return result.json()
}

const fetchGetJSONWithStatus = async (url) => {
  const result = await window.fetch(url, { method: 'GET', ...FETCH_OPTIONS })
  return {
    ok: result.ok,
    status: result.status,
    content: await result.json()
  }
}

const fetchPostJSONWithStatus = async (url, data) => {
  const result = await window.fetch(url, { method: 'POST', body: JSON.stringify(data), ...FETCH_OPTIONS })
  return {
    ok: result.ok,
    status: result.status,
    content: await result.json()
  }
}

export {
  fetchGetHead,
  fetchPostHead,
  fetchGetJSON,
  fetchPostJSON,
  fetchGetJSONWithStatus,
  fetchPostJSONWithStatus
}
