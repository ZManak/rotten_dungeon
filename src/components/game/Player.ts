
export interface Player {
    name: string;
    level: number;
    health: number;
    mana: number;
    attack: number;
    defense: number;
    magicAttack: number;
    magicDefense: number;
    speed: number;
    accuracy: number;
    evasion: number;
    stats: {
        str: number;
        dex: number;
        int: number;
        fai: number;
    };
    inventory: string[];
    equipment: {
        head: string;
        body: string;
        arms: string;
        legs: string;
        feet: string;
    }    
} 

export const DEFAULT_PLAYER: Player = {
    name: "Hero",
    level: 1,
    health: 100,
    mana: 50,
    attack: 10,
    defense: 5,
    magicAttack: 8,
    magicDefense: 4,
    speed: 7,
    accuracy: 90,
    evasion: 5,
    stats: {
        str: 10,
        dex: 10,
        int: 10,
        fai: 10,
    },
    inventory: [],
    equipment: {
        head: "",
        body: "",
        arms: "",
        legs: "",
        feet: "",
    }
}
