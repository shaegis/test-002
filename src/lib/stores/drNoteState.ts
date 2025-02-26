import { writable } from "svelte/store";
import type { SymptomData, SymptomItemsData, InterPersonalData, LeisureNhobbiesData, AlcoholData, DietData, ExerciseData, SleepData } from "$lib/types/progress/subjective";

export const drNoteState = writable<{
    progress: {
        subjective: {
            symptom: SymptomData;
            interPersonal: InterPersonalData;
            leisureNhobbies: LeisureNhobbiesData;
            alcohol: AlcoholData;
            diet: DietData;
            exercise: ExerciseData;
            sleep: SleepData;
        };
//        objective: {},
//        assessment: {},
//        plan: ''
    },
//    protections: {
//        hira: {},
//        waiver: {}
//    },
//    scale: {
//        hamA: {},
//        hamD: {},
//        bprs: {}
//    }
}>({
    progress: {
        subjective: {
            symptom: {
                psychological: {}, somatic: {}, occursIn: "", attack: { type: "", frequency: "", unit: "", intensity: "" }, suicidal: { type: [], method: [], otherMethod: "", when: { amount: "", unit: ""} }, homocidal: { type: [] },
            },
            interPersonal: {
                relationType: [], otherRelationType: "", frequency: "", unit: "", method: [], otherMethod: "", withdrawal: ""
            },
            leisureNhobbies: {
                noLeisure: false, leisure: "", noPleasure: false, pleasure: "", noHobby: false, hobby: ""
            },
            alcohol: {
                alcoholBeverage: [], progress: "", amount: "", frequency: "", unit: "", otherType: [], alcoholSnack: []
            },
            diet: {
                interval: "", frequency: "", appetite: "", bingeEating: {type: [], otherType: "", when: ""}
            },
            exercise: {
                type: [], otherType: "", duration: "", under30min: false, frequency: "", otherFrequency: "", noExercise: { why: [], otherWhy: "" }
            },
            sleep: {
                nightSleep: { sleepDisturbance: false, takingMedicine: "", takingMedicineUnit: "", fallAsleep: "", fallAsleepUnit: "", wakeUp: "", wakeUpUnit: "", sleepInductionTime: "", sleepInductionWithin1hr: false, brokenSleep: "", brokenSleepFrequency: "", brokenSleepDtUrination: false, resleep: false, resleepInductionTime: "", quality: "", qualityOther: [], awakenFeeling: "", insomnia: [], morningSedation: "", },
                nap: { napDuration: "", napDurationUnit: "", napFeeling: "", },
                dream: { content: "", remember: "", feeling: [], resonance: "", nightmare: false, },
            },
        },
    },
});
