// corresponds to Game in backend
export class Game {
    id: number;
    name: string;
    maxPlayers: number;
  description: string;
    constructor(id: number, name: string, max_players: number, description: string) {
        this.id = id;
        this.name = name;
        this.maxPlayers = max_players;
        this.description = description;
    }
}
