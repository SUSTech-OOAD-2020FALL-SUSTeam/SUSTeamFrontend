export interface User {
  username: string;
  mail: string;
  avatar: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseUser (object: any): User {
  return {
    username: object.username,
    mail: object.mail,
    avatar: object.avatar || '/default_avatar.jpg',
    description: object.description || '暂无介绍'
  }
}

export interface UserRole {
  username: string;
  mail: string;
  avatar: string;
  description: string;
  balance: number;
  roles: Array<string>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseUserRole (object: any): UserRole {
  return {
    username: object.username,
    mail: object.mail,
    avatar: object.avatar || '/default_avatar.jpg',
    description: object.description || '暂无介绍',
    balance: object.balance,
    roles: object.roles
  }
}

export const EMPTY_USER_ROLE: UserRole = parseUserRole({
  username: 'NULL',
  mail: 'NULL',
  avatar: null,
  description: 'NULL',
  balance: 0,
  roles: ''
})

export function userRoleToUser (role: UserRole): User {
  return {
    username: role.username,
    mail: role.mail,
    avatar: role.avatar || '/default_avatar.jpg',
    description: role.description || '暂无介绍'
  }
}

export const EMPTY_USER: User = userRoleToUser(EMPTY_USER_ROLE)
