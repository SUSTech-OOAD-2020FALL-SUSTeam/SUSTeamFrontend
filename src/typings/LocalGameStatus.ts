export interface LocalGameStatus {
  gameId: number;
  branch: string;
  version: string | null;
}

export class LocalGameStatusMap {
  map: Map<number, Map<string, string>> = new Map<number, Map<string, string>>()

  merge (status: Array<LocalGameStatus>) {
    for (const it of status) {
      this.set(it.gameId, it.branch, it.version)
    }
  }

  get (gameId: number, branch: string): string | null {
    return this.map.get(gameId)?.get(branch) || null
  }

  set (gameId: number, branch: string, version: string | null) {
    if (!this.map.has(gameId)) {
      this.map.set(gameId, new Map<string, string>())
    }
    if (version) {
      // eslint-disable-next-line no-unused-expressions
      this.map.get(gameId)?.set(branch, version)
    } else {
      // eslint-disable-next-line no-unused-expressions
      this.map.get(gameId)?.delete(branch)
    }
  }

  toList (): Array<LocalGameStatus> {
    const list: Array<LocalGameStatus> = []
    for (const [gameId, inner] of this.map.entries()) {
      for (const [branch, version] of inner) {
        list.push({ gameId, branch, version })
      }
    }
    return list
  }
}
