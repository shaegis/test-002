<script lang="ts">
    import type { PageServerData } from "./$types";
    import Subjective from "$lib/components/progress/Subjective.svelte";
    import { psychologicalSymptoms, somaticSymptoms, options, percentRange, timePeriods, sxProgress } from "$lib/data/progress/symptoms";
    import type { SymptomData, InterPersonalData, LeisureNhobbiesData, AlcoholData, DietData, ExerciseData, SleepData } from "$lib/types/progress/subjective";

    let { data }: { data: PageServerData } = $props();

    let symptom = $state<SymptomData>({
        psychological: {}, somatic: {}, occursIn: "", attack: { type: "", frequency: "", unit: "", intensity: "" }, suicidal: { type: [], method: [], otherMethod: "", when: { amount: "", unit: ""} }, homocidal: { type: [] },
    })

    let interPersonal = $state<InterPersonalData>({
        relationType: [], otherRelationType: "", frequency: "", unit: "", method: [], otherMethod: "", withdrawal: ""
    })

    let leisureNhobbies = $state<LeisureNhobbiesData>({
        noLeisure: false, leisure: "", noPleasure: false, pleasure: "", noHobby: false, hobby: ""
    })

    let alcohol = $state<AlcoholData>({
        alcoholBeverage: [], progress: "", amount: "", frequency: "", unit: "", otherType: [], alcoholSnack: []
    })

    let diet = $state<DietData>({
        interval: "", frequency: "", appetite: "", bingeEating: {type: [], otherType: "", when: ""}
    })

    let exercise = $state<ExerciseData>({
        type: [], otherType: "", duration: "", under30min: false, frequency: "", otherFrequency: "", noExercise: { why: [], otherWhy: "" }
    })
    let sleep = $state<SleepData>({
        nightSleep: { sleepDisturbance: false, takingMedicine: "", takingMedicineUnit: "", fallAsleep: "", fallAsleepUnit: "", wakeUp: "", wakeUpUnit: "", sleepInductionTime: "", sleepInductionWithin1hr: false, brokenSleep: "", brokenSleepFrequency: "", brokenSleepDtUrination: false, resleep: false, resleepInductionTime: "", quality: "", qualityOther: [], awakenFeeling: "", insomnia: [], morningSedation: "", },
        nap: { napDuration: "", napDurationUnit: "", napFeeling: "", },
        dream: { content: "", remember: "", feeling: [], resonance: "", nightmare: false, },
    })
</script>

<article class="prose">
<h1>{data.user.username} Progress Notes</h1>
<p>Your user ID is {data.user.id}.</p>

<form>
    <Subjective {data} {symptom} {interPersonal} {leisureNhobbies} {alcohol} {diet} {exercise} {sleep} />

    <h2>Objective</h2>
        <h3>MSE</h3>
        <fieldset>
            <legend>General appearance</legend>
        </fieldset>
</form>

<pre class="p-4 bg-gray-100 text-gray-900 rounded">
{JSON.stringify(symptom, null, 2)}
{JSON.stringify(interPersonal, null, 2)}
{JSON.stringify(leisureNhobbies, null, 2)}
{JSON.stringify(alcohol, null, 2)}
{JSON.stringify(diet, null, 2)}
{JSON.stringify(exercise, null, 2)}
{JSON.stringify(sleep, null, 2)}
</pre>

</article>
