export interface GameVersion {
  gameId: number;
  branch: string;
  uploadTime: Date;
  name: string;
  url: string;
  updateUrl: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseGameVersion (object: any): GameVersion {
  return {
    gameId: object.gameId,
    branch: object.branch,
    uploadTime: new Date(object.uploadTime),
    name: object.name,
    url: object.url,
    updateUrl: object.updateUrl || null
  }
}
