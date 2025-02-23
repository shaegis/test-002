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

export interface SymptomItemsData {
    name: string;
    label: string;
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
    alcoholBeverage: string[];
    progress: string;
    amount: string;
    frequency: string;
    unit: string;
    otherType: string[];
    alcoholSnack: string[];
}

export interface DietData {
    interval: string;
    frequency: string;
    appetite: string;
    bingeEating: {
        type: string[];
        otherType: string;
        when: string;
    };
}

export interface ExerciseData {
    type: string[];
    otherType: string;
    duration: string;
    under30min: boolean;
    frequency: string;
    otherFrequency: string;
    noExercise: {
        why: string[];
        otherWhy: string;
    };
}

export interface SleepData {
    nightSleep: {
        sleepDisturbance: boolean;
        takingMedicine: string;
        takingMedicineUnit: string;
        fallAsleep: string;
        fallAsleepUnit: string;
        wakeUp: string;
        wakeUpUnit: string;
        sleepInductionTime: string;
        sleepInductionWithin1hr: boolean;
        brokenSleep: boolean;
        brokenSleepFrequency: string;
        brokenSleepDtUrination: boolean;
        resleep: boolean;
        resleepInductionTime: string;
        quality: string;
        qualityOther: string[];
        awakenFeeling: string;
        insomnia: string[];
        morningSedation: string;
    };
    nap: {
        napDuration: string;
        napDurationUnit: string;
        napFeeling: string;
    };
    dream: {
        content: string;
        remember: string;
        feeling: string[];
        resonance: string;
        nightmare: boolean;
    };
}
