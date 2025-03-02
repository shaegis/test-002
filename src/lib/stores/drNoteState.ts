import { writable } from "svelte/store";
import lodash from "lodash";
import type { SymptomData, SymptomItemsData, InterPersonalData, LeisureNhobbiesData, AlcoholData, DietData, ExerciseData, SleepData } from "$lib/types/progress/subjective";

type DrNoteState = {
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
        // objective: {},
        // assessment: {},
        // plan: ''
    },
    // protections: { hira: {}, waiver: {} },
    // scale: { hamA: {}, hamD: {}, bprs: {} }
};

const initialState: DrNoteState = {
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
};

export const drNoteState = writable<DrNoteState>(lodash.cloneDeep(initialState)); // deepCopy를 통해 initialState가 변경되지 않도록 함(보호 효과). shallowCopy는 최상위 속성만 복사, 하위 속성은 참조(pointer).

export function resetSubjective() {
    drNoteState.update((state) => {
        state.progress.subjective = lodash.cloneDeep(initialState.progress.subjective); // deepCopy를 통해 state.progress.subjective가 initialState와 pointing하지 않도록 함. (보호 효과)
        return state;
    });
}

export function resetAll() {
    drNoteState.set(initialState);
}
