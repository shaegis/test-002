export interface MSEData {
    // General
    generalAppearance: string;
    attitude: string;
    speech: string;
    behavior: string;
    
    // Mood & Affect
    mood: string;
    affect: string;
    otherEmotion: string;

    // Thought
    form: string;
    process: string;
    contents: string;

    // Sensorium & cognition
    levelOfConsciousness: string;
    orientation: string;
    concentrationNattention: string;
    memory: string;
    abstractThinking: string;
    generalInformation: string;

    // Suicide & Impulsivity
    suicidalRisk: string;
    impulsivity: string;

    // Judgement & Insight
    judgement: string;
    insight: string;
    reliability: string;
}
