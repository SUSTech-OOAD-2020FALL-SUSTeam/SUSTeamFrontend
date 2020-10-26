export interface Announcement {
  gameId: number;
  announceTime: Date;
  title: string;
  content: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseAnnouncement (object: any): Announcement {
  return {
    gameId: object.gameId,
    announceTime: new Date(object.announceTime),
    title: object.title,
    content: object.content
  }
}
