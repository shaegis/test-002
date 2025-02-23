export interface SymptomData {
    psychological: Record<string, string>;
    somatic: Record<string, string>;
    occursIn: string;
    attack: {
        type: string;
        frequency: string;
        unit: string;
        intensity: string;
    };
    suicidal: {
        type: string[];
        method: string[];
        otherMethod: string;
        when: {
            amount: string;
            unit: string;
        };
    };
    homocidal: {
        type: string[];
    };
}

export interface InterPersonalData {
    relationType: string[];
    otherRelationType: string;
    frequency: string;
    unit: string;
    method: string[];
    otherMethod: string;
    withdrawal: string;
}

export interface LeisureNhobbiesData {
    noLeisure: boolean;
    leisure: string;
    noPleasure: boolean;
    pleasure: string;
    noHobby: boolean;
    hobby: string;
}

export interface AlcoholData {
    alcoholicBeverage: string[];
    progress: string;
    amount: string;
    frequency: string;
    unit: string;
    otherType: string[];
    alcoholSnack: string[];
}

export interface DietData {
    interval: string;
    times: string;
    appetite: string;
    bingeEating: {
        type: string;
        when: string;
    };
}

export interface SymptomItemsData {
    name: string;
    label: string;
}
