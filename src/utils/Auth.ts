import Cookies from 'js-cookie'

const TokenKey = 'SUSTeam-Token'

export function getToken (): string | undefined {
  return Cookies.get(TokenKey)
}

export function setToken (token: string | undefined): string | undefined {
  if (token === undefined) {
    Cookies.remove(TokenKey)
    return undefined
  } else {
    return Cookies.set(TokenKey, token, { expires: 7 })
  }
}

export function clearToken (): void {
  return Cookies.remove(TokenKey)
}
