<script lang="ts">
    import { psychologicalSymptoms, somaticSymptoms, options, percentRange, timePeriods, sxProgress } from "$lib/data/progress/symptoms";
    import type { SymptomData, InterPersonalData, LeisureNhobbiesData, AlcoholData, DietData, SymptomItemsData } from "$lib/types/progress/subjective";
    import { updateArray } from "$lib/utils/array";

    export let symptom: SymptomData;
    export let interPersonal: InterPersonalData;
    export let leisureNhobbies: LeisureNhobbiesData;
    export let alcohol: AlcoholData;
    export let diet: DietData;
</script>

{#snippet symptomList(symptomItems: SymptomItemsData[], symptomGroup: "psychological" | "somatic")}
    <fieldset>
        <legend>{symptomGroup == "psychological" ? "Psychological Symptoms" : "Somatic Symptoms"}</legend>
        {#each symptomItems as symptomItem}
            <div class="flex items-center gap-4">
                <span>{symptomItem.label}</span>
                {#each options as option}
                    <label>
                        <input type="radio" value={option.value} bind:group={symptom[symptomGroup][symptomItem.name]} />
                        {option.label}
                    </label>
                {/each}
            </div>
        {/each}
    </fieldset>
{/snippet}

{#snippet inputGroup(type: "radio" | "checkbox", name: string = "", options: string[], bindFunction: (value: string, checked: type extends "radio" ? string : boolean) => void, currentValues: string[] | string, labelPrefix: string = "", labelSuffix: string = "", className: string = "flex items-center gap-4")}
    <div class={className}>
        {#each options as option}
            <label>
                <input 
                    type={type} 
                    value={option} 
                    name={name} 
                    checked={type === "radio" ? currentValues === option : (currentValues as string[]).includes(option)} 
                    onchange={(e) => bindFunction(option, type === "radio" ? option : e.target.checked as boolean)} 
                />
                {labelPrefix}{option}{labelSuffix}
            </label>
        {/each}
    </div>
{/snippet}
<!--
{@render inputGroup('checkbox', 'relationType', ['social', 'friends', 'family', 'neighbor'], (value, checked) => {interPersonal.relationType = updateArray(interPersonal.relationType, value, checked);}, interPersonal.relationType /* prefix, suffix, className omitted intentionally */)}
{@render inputGroup('radio', 'interPersonalWithdrawalType', ['social withdrawal', 'no relationship'], (value, checked) => {interPersonal.withdrawalType = checked;}, interPersonal.withdrawalType, "", "", "space-x-2")}
-->


<h2>Subjective</h2>
    <h3>Symptoms</h3>
    {@render symptomList(psychologicalSymptoms, "psychological")}
    {@render symptomList(somaticSymptoms, "somatic")}

    <fieldset>
        <legend>mainly occures in/at</legend>
            {@render inputGroup("radio", "occursIn", timePeriods, (value, checked) => {symptom.occursIn = checked;}, symptom.occursIn)}
    </fieldset>

    <fieldset>
        <legend>Attack</legend>
        <div class="flex items-center gap-4">
            {@render inputGroup("radio", "attackType", sxProgress, (value, checked) => {symptom.attack.type = checked;}, symptom.attack.type)}

            <input type="number" bind:value={symptom.attack.frequency} placeholder="times" />

            {@render inputGroup("radio", "attackUnit", ["day", "week"], (value, checked) => {symptom.attack.unit = checked;}, symptom.attack.unit, "/", "", "sapce-x-2")}

            <label>
                <select bind:value={symptom.attack.intensity}>
                    {#each percentRange as pRange}
                        <option value={pRange.value}>{pRange.label}</option>
                    {/each}
                </select>
                % intensity
            </label>
        </div>
    </fieldset>

    <fieldset>
        <legend>Suicidal idea</legend>
            {@render inputGroup("checkbox", "suicidalType", ["idea", "plan", "attempt"], (value, checked) => {symptom.suicidal.type = updateArray(symptom.suicidal.type, value, checked);}, symptom.suicidal.type)}

        <div class="flex items-center gap-4">
            {@render inputGroup("checkbox", "suicidalMethod", ["hanging", "poisoning", "knife"], (value, checked) => {symptom.suicidal.method = updateArray(symptom.suicidal.method, value, checked);}, symptom.suicidal.method)}
            <input type="text" bind:value={symptom.suicidal.otherMethod} placeholder="Other method" />
        </div>

        <div class="flex items-center gap-4">
            <input type="number" bind:value={symptom.suicidal.when.amount} placeholder="1 day/month/year ago" />
            {@render inputGroup("radio", "suicidalUnit", ["days", "months", "years"], (value, checked) => { symptom.suicidal.when.unit = checked;}, symptom.suicidal.when.unit, "", " ago")}
        </div>
    </fieldset>

    <fieldset>
        <legend>Homocidal idea</legend>
            {@render inputGroup("checkbox", "homocidalType", ["idea", "plan", "attempt"], (value, checked) => {symptom.homocidal.type = updateArray(symptom.homocidal.type, value, checked);}, symptom.homocidal.type)}
    </fieldset>

    <h3>Interpersonal Relations</h3>
    <fieldset>
        <legend>Relationship with</legend>
        <div class="flex items-center gap-4">
            {@render inputGroup("checkbox", "relationType", ["social", "friends", "family", "neighbor"], (value, checked) => {interPersonal.relationType = updateArray(interPersonal.relationType, value, checked);}, interPersonal.relationType)}
            <input type="text" bind:value={interPersonal.otherRelationType} placeholder="others" />
            <input type="number" bind:value={interPersonal.frequency} placeholder="times" />
            {@render inputGroup("radio", "interPersonalUnit", ["week", "month"], (value, checked) => {interPersonal.unit = checked;}, interPersonal.unit, "/", "", "space-x-2")}
        </div>
        <legend>How to play</legend>
        <div class="flex items-center gap-4">
            {@render inputGroup("checkbox", "interPersonalMethod", ["talking", "eating", "drinking", "traveling"], (value, checked) => {interPersonal.method = updateArray(interPersonal.method, value, checked);}, interPersonal.method)}
            <input type="text" bind:value={interPersonal.otherMethod} placeholder="others" />
        </div>
        <legend>Withdrawal</legend>
            {@render inputGroup("radio", "interPersonalWithdrawal", ["social withdrawal", "no relationship"], (value, checked) => {interPersonal.withdrawal = checked;}, interPersonal.withdrawal, "", "", "space-x-2")}
    </fieldset>

    <h3>Leisure & Hobbies</h3>
    <fieldset>
        <legend>Leisure & Hobbies</legend>
        <div class="flex items-center gap-4">
            <label>No Leisure <input type="checkbox" name="noLeisure" bind:checked={leisureNhobbies.noLeisure} /></label>
            <input type="text" bind:value={leisureNhobbies.leisure} placeholder="leisures" disabled={leisureNhobbies.noLeisure} />
        </div>
        <div class="flex items-center gap-4">
            <label>No Pleasure <input type="checkbox" name="noPleasure" bind:checked={leisureNhobbies.noPleasure} /></label>
            <input type="text" bind:value={leisureNhobbies.pleasure} placeholder="pleasures" disabled={leisureNhobbies.noPleasure} />
        </div>
        <div class="flex items-center gap-4">
            <label>No Hobby <input type="checkbox" name="noHobby" bind:checked={leisureNhobbies.noHobby} /></label>
            <input type="text" bind:value={leisureNhobbies.hobby} placeholder="hobbies" disabled={leisureNhobbies.noHobby} />
        </div>
    </fieldset>

    <h3>Alcohol</h3>
    <fieldset>
        <legend>Alcoholic beverage</legend>
            {@render inputGroup("checkbox", "alcoholicBeverage", ["소주", "beer", "wine", "양주", "막걸리", "폭탄주", "mix"], (value, checked) => {alcohol.alcoholicBeverage = updateArray(alcohol.alcoholicBeverage, value, checked);}, alcohol.alcoholicBeverage)}
        <legend>Amount & Frequency</legend>
        <div class="flex items-center gap-4">
            <input type="text" name="alcoholAmount" bind:value={alcohol.amount} placeholder="amount" /><label for="alcoholAmount">/one time</label><br>
            <input type="text" bind:value={alcohol.frequency} placeholder="times" />
            {@render inputGroup("radio", "alcoholUnit", ["day", "week", "month"], (value, checked) => {alcohol.unit = checked;}, alcohol.unit, "/", "", "space-x-2")}
        </div>
        <span>changed over time:</span>
            {@render inputGroup("radio", "alcoholProgress", ["persist", "increase", "neutral", "decrease"], (value, checked) => {alcohol.progress = checked;}, alcohol.progress)}

        <legend>Alcohol snack</legend>
            {@render inputGroup("checkbox", "alcoholSnack", ["안주 없음", "meat", "fruits", "반찬", "..."], (value, checked) => {alcohol.alcoholSnack = updateArray(alcohol.alcoholSnack, value, checked);}, alcohol.alcoholSnack)}
    </fieldset>

    <h3>Diet</h3>
    <fieldset>
        <legend>Intake interval</legend>
            {@render inputGroup("radio", "intakeInterval", ["regular", "irregular"], (value, checked) => {diet.interval = checked;}, diet.interval)}
    </fieldset>
