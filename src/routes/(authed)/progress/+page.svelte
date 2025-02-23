<script lang="ts">
    import type { PageServerData } from "./$types";
    import Subjective from "$lib/components/progress/Subjective.svelte";
    import { psychologicalSymptoms, somaticSymptoms, options, percentRange, timePeriods, sxProgress } from "$lib/data/progress/symptoms";
    import type { SymptomData, InterPersonalData, LeisureNhobbiesData, AlcoholData, DietData } from "$lib/types/progress/subjective";

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
        alcoholicBeverage: [], progress: "", amount: "", frequency: "", unit: "", otherType: [], alcoholSnack: []
    })

    let diet = $state<DietData>({
        interval: '', times: '', appetite: '', bingeEating: {type: '', when: ''}
    })
</script>

<article class="prose">
<h1>{data.user.username} Progress Notes</h1>
<p>Your user ID is {data.user.id}.</p>

<form>
    <Subjective {data} {symptom} {interPersonal} {leisureNhobbies} {alcohol} {diet} />

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
</pre>

</article>
