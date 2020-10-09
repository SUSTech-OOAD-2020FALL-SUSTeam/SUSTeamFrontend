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
