export const psychologicalSymptoms = [
    // pychological
    { name: "depressive", label: "depressive" },
    { name: "lack_of_drive", label: "lack of drive" },
    { name: "low_energy", label: "low energy" },
    { name: "alxithymic", label: "alexithymic" },
    { name: "foggy_groggy", label: "foggy/groggy" },
    { name: "irritable", label: "irritable" },
    { name: "anger", label: "anger" },
    { name: "impulsive", label: "impulsive" },
];

export const somaticSymptoms = [
    // autonomic
    { name: "heating_sense", label: "heating sense" },
    { name: "sweating", label: "sweating" },
    { name: "impending_death", label: "impending death" },
    // head & neck
    { name: "concentration", label: "concentration" },
    { name: "headacheMigraine", label: "headache/migraine" },
    { name: "blepharospasm", label: "blepharospasm" },
    { name: "tinnitus", label: "tinnitus" },
    { name: "vertigo", label: "vertigo" },
    { name: "globus", label: "globus" },
    // chest
    { name: "palpitation", label: "palpitation" },
    { name: "heaviness", label: "heaviness" },
    { name: "dyspnea", label: "dyspnea" },
    // abdomen
    { name: "nausea", label: "nausea" },
    { name: "indigestion", label: "indigestion" },
];

export const options = [
    { value: "negative", label: "-" },
    { value: "positive", label: "+" },
    { value: "neutral", label: "+/-" },
    { value: "improved", label: "improved" },
    { value: "aggravated", label: "aggravated" }
];

export const percentRange = Array.from({ length: 10 }, (_, i) => ({
    value: `${90 - i * 10}`,
    label: `${90 - i * 10}`
}));

export const timePeriods = ["awake", "morning", "noon", "afternoon", "dusk", "evening", "night", "before bed", "sleep"];
export const sxProgress = ["persist", "aggravated", "improved", "resolved"];
