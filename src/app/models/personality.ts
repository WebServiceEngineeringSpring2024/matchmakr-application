export class Personality {
    id: number;
    aggression: number;
    kindness: number;
    competitiveness: number;
    created: Date;
    updated: Date;
    constructor(id: number, aggression: number, kindness: number, competitiveness: number, created: Date, updated: Date) {
        this.id = id;
        this.aggression = aggression;
        this.kindness = kindness;
        this.competitiveness = competitiveness;
        this.created = created;
        this.updated = updated;
    }
}
