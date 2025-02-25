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

export const timeDivision = ["awake", "morning", "noon", "afternoon", "dusk", "evening", "night", "before bed", "sleep"];
export const timeUnit = ["day", "week", "month", "year"];
export const timeUnits = ["days", "weeks", "months", "years"];
export const sxProgress = ["persist", "aggravated", "improved", "resolved"];
export const actionType = ["idea", "plan", "attempt"];
export const actionProgress = ["persist", "increase", "neutral", "decrease"];
export const amPm = ["AM", "PM", "irregular"];
export const pattern = ["regular", "irregular"];
export const posiNnega = ["+", "-", "+/-"];
export const frequency = ["+", "-", "+/-", "frequent", "seldom"];
export const quality = ["good", "poor", "+/-"];
export const feeling = ["good", "bad", "not bad", "so so", "+/-"];

export const suicidalMethod = ["hanging", "poisoning", "knife"];
export const relationType = ["social", "friends", "family", "neighbor"];
export const interPersonalMethod = ["talking", "eating", "drinking", "traveling"];
export const alcoholBeverage = ["소주", "beer", "wine", "양주", "막걸리", "폭탄주", "mix"];
export const bingeEatingType = ["과자", "단것", "탄수화물", "아무거나"];
export const bingeEatingWhen = ["day time", "before sleep", "during sleep", "stressful evnet", "아무때나"];
export const exerciseType = ["streching", "walking", "running", "health", "PT", "swimming", "yoga", "golf"];
export const exerciseFrequency = ["매일", "하루걸러", "2~3/wk", "가끔"];
export const noExerciseWhy = ["허리", "무릎", "다리", "통증", "디스크", "힘듦", "시간 x", "귀찮음"];
export const sleepQuality = ["깊은 잠x", "설침", "RLS"];
