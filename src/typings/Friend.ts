export interface Friend {
  username: string;
  online: boolean;
  lastSeen: Date | null;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseFriend (object: any): Friend {
  return {
    username: object.username,
    online: object.online,
    lastSeen: ('lastSeen' in object) ? new Date(object.lastSeen) : null
  }
}
