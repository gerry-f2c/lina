import VueCookie from 'vue-cookie'

const CURRENT_ORG_KEY = 'currentOrg'
const CURRENT_ROLE_KEY = 'currentRole'
let cookieNamePrefix = VueCookie.get('SESSION_COOKIE_NAME_PREFIX')
if (!cookieNamePrefix || ['""', "''"].indexOf(cookieNamePrefix) > -1) {
  cookieNamePrefix = ''
}
const TOKEN_KEY = `${cookieNamePrefix}csrftoken`

export function getTokenFromCookie() {
  return VueCookie.get(TOKEN_KEY)
}

export function setTokenToCookie(value, expires) {
  return VueCookie.set(TOKEN_KEY, value, { expires: expires })
}

export function getCurrentRoleLocal(username) {
  const key = CURRENT_ROLE_KEY + ':' + username
  const role = localStorage.getItem(key)
  if (role) {
    return parseInt(role) || null
  }
  return role
}

export function saveCurrentRoleLocal(username, role) {
  const key = CURRENT_ROLE_KEY + ':' + username
  return localStorage.setItem(key, role)
}

export function getCurrentOrgLocal(username) {
  const key = CURRENT_ORG_KEY + ':' + username
  const value = localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}

export function saveCurrentOrgLocal(username, org) {
  const key = CURRENT_ORG_KEY + ':' + username
  localStorage.setItem(key, JSON.stringify(org))
  VueCookie.set('X-JMS-ORG', org.id)
}

export function setPreOrgLocal(username, org) {
  const key = 'preOrg' + ':' + username
  localStorage.setItem(key, JSON.stringify(org))
}

export function getPreOrgLocal(username) {
  const key = 'preOrg' + ':' + username
  const value = localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}
