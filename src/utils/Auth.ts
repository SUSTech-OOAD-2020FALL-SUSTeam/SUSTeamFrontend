const TokenKey = 'SUSTeam-Token'

export function getToken (): string | undefined {
  const token = window.localStorage.getItem(TokenKey)
  if (token) {
    return token
  } else {
    return undefined
  }
}

export function setToken (token: string | undefined): string | undefined {
  if (token === undefined) {
    window.localStorage.removeItem(TokenKey)
    return undefined
  } else {
    window.localStorage.setItem(TokenKey, token)
    return token
  }
}

export function clearToken (): void {
  window.localStorage.removeItem(TokenKey)
}
