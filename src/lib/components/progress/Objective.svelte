<script lang="ts">
    import { psychologicalSymptoms, somaticSymptoms, options, percentRange, timePeriods, sxProgress } from "$lib/data/progress/symptoms";
    import type { MSEData } from "$lib/types/progress/objective";
    import { updateArray } from "$lib/utils/array";

    export let symptom: SymptomData;
    export let interPersonal: InterPersonalData;
    export let leisureNhobbies: LeisureNhobbiesData;
    export let alcohol: AlcoholData;
    export let diet: DietData;
    export let exercise: ExerciseData;
    export let sleep: SleepData;
</script>

<section>
<h2>Objective</h2>

<section>
    <h3>MSE</h3>
        {@render symptomList(psychologicalSymptoms, "psychological")}
        {@render symptomList(somaticSymptoms, "somatic")}


<section>
    <h3>Interpersonal Relations</h3>
        <h4>Relationship with</h4>
        <fieldset class="flex items-center gap-4">
            {@render inputGroup("checkbox", "relationType", ["social", "friends", "family", "neighbor"], (value, checked) => {interPersonal.relationType = updateArray(interPersonal.relationType, value, checked);}, interPersonal.relationType)}
            <input type="text" bind:value={interPersonal.otherRelationType} placeholder="others" />
            <input type="number" bind:value={interPersonal.frequency} placeholder="times" />
            {@render inputGroup("radio", "interPersonalUnit", ["week", "month"], (value, checked) => {if (checked) interPersonal.unit = value;}, interPersonal.unit, "/", "", "space-x-2")}
        </fieldset>
        <h4>How to play</h4>
        <fieldset class="flex items-center gap-4">
            {@render inputGroup("checkbox", "interPersonalMethod", ["talking", "eating", "drinking", "traveling"], (value, checked) => {interPersonal.method = updateArray(interPersonal.method, value, checked);}, interPersonal.method)}
            <input type="text" bind:value={interPersonal.otherMethod} placeholder="others" />
        </fieldset>
        <h4>Withdrawal</h4>
        <fieldset>
            {@render inputGroup("radio", "interPersonalWithdrawal", ["social withdrawal", "no relationship"], (value, checked) => {if (checked) interPersonal.withdrawal = value;}, interPersonal.withdrawal, "", "", "space-x-2")}
    </fieldset>
</section>


