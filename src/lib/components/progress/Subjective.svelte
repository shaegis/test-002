<script lang="ts">
    import { psychologicalSymptoms, somaticSymptoms, options, percentRange, timePeriods, sxProgress } from "$lib/data/progress/symptoms";
    import type { SymptomData, SymptomItemsData, InterPersonalData, LeisureNhobbiesData, AlcoholData, DietData, ExerciseData, SleepData } from "$lib/types/progress/subjective";
    import { updateArray } from "$lib/utils/array";

    export let symptom: SymptomData;
    export let interPersonal: InterPersonalData;
    export let leisureNhobbies: LeisureNhobbiesData;
    export let alcohol: AlcoholData;
    export let diet: DietData;
    export let exercise: ExerciseData;
    export let sleep: SleepData;
</script>

{#snippet symptomList(symptomItems: SymptomItemsData[], symptomGroup: "psychological" | "somatic")}
<section>
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
</section>
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

<section>
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

            {@render inputGroup("radio", "attackUnit", ["day", "week"], (value, checked) => {symptom.attack.unit = checked;}, symptom.attack.unit, "/", "", "space-x-2")}

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
</section>

<section>
    <h3>Interpersonal Relations</h3>
    <fieldset>
        <legend>Relationship with</legend>
        <div class="flex items-center gap-4">
            {@render inputGroup("checkbox", "relationType", ["social", "friends", "family", "neighbor"], (value, checked) => {interPersonal.relationType = updateArray(interPersonal.relationType, value, checked);}, interPersonal.relationType)}
            <input type="text" bind:value={interPersonal.otherRelationType} placeholder="others" />
            <input type="number" bind:value={interPersonal.frequency} placeholder="times" />
            {@render inputGroup("radio", "interPersonalUnit", ["week", "month"], (value, checked) => {interPersonal.unit = checked;}, interPersonal.unit, "/", "", "space-x-2")}
        </div>
    </fieldset>
    <fieldset>
        <legend>How to play</legend>
        <div class="flex items-center gap-4">
            {@render inputGroup("checkbox", "interPersonalMethod", ["talking", "eating", "drinking", "traveling"], (value, checked) => {interPersonal.method = updateArray(interPersonal.method, value, checked);}, interPersonal.method)}
            <input type="text" bind:value={interPersonal.otherMethod} placeholder="others" />
        </div>
    </fieldset>
    <fieldset>
        <legend>Withdrawal</legend>
            {@render inputGroup("radio", "interPersonalWithdrawal", ["social withdrawal", "no relationship"], (value, checked) => {interPersonal.withdrawal = checked;}, interPersonal.withdrawal, "", "", "space-x-2")}
    </fieldset>
</section>

<section>
    <h3>Leisure & Hobbies</h3>
        <fieldset>
            <legend>Leisure & Hobbies</legend>
            <div class="flex items-center gap-4">
                <label for="noLeisure">No Leisure</label>
                <input type="checkbox" id="noLeisure" bind:checked={leisureNhobbies.noLeisure} />
                <input type="text" bind:value={leisureNhobbies.leisure} placeholder="leisures" disabled={leisureNhobbies.noLeisure} />
            </div>
            <div class="flex items-center gap-4">
                <label for="noPleasure">No Pleasure</label>
                <input type="checkbox" id="noPleasure" bind:checked={leisureNhobbies.noPleasure} />
                <input type="text" bind:value={leisureNhobbies.pleasure} placeholder="pleasures" disabled={leisureNhobbies.noPleasure} />
            </div>
            <div class="flex items-center gap-4">
                <label for="noHobby">No Hobby</label>
                <input type="checkbox" id="noHobby" bind:checked={leisureNhobbies.noHobby} />
                <input type="text" bind:value={leisureNhobbies.hobby} placeholder="hobbies" disabled={leisureNhobbies.noHobby} />
            </div>
        </fieldset>
</section>

<section>
    <h3>Alcohol</h3>
    <fieldset>
        <legend>Alcoholic beverage</legend>
            {@render inputGroup("checkbox", "alcoholBeverage", ["소주", "beer", "wine", "양주", "막걸리", "폭탄주", "mix"], (value, checked) => {alcohol.alcoholBeverage = updateArray(alcohol.alcoholBeverage, value, checked);}, alcohol.alcoholBeverage)}
    </fieldset>
    <fieldset>
        <legend>Amount & Frequency</legend>
        <div class="flex items-center gap-4">
            <input type="text" id="alcoholAmount" bind:value={alcohol.amount} placeholder="amount" /><label for="alcoholAmount">/one time</label><br>
            <input type="text" bind:value={alcohol.frequency} placeholder="times" />
            {@render inputGroup("radio", "alcoholUnit", ["day", "week", "month"], (value, checked) => {alcohol.unit = checked;}, alcohol.unit, "/", "", "space-x-2")}
        </div>
        <span>changed over time:</span>
            {@render inputGroup("radio", "alcoholProgress", ["persist", "increase", "neutral", "decrease"], (value, checked) => {alcohol.progress = checked;}, alcohol.progress)}
    </fieldset>
    <fieldset>
        <legend>Alcohol snack</legend>
            {@render inputGroup("checkbox", "alcoholSnack", ["안주 없음", "meat", "fruits", "반찬", "..."], (value, checked) => {alcohol.alcoholSnack = updateArray(alcohol.alcoholSnack, value, checked);}, alcohol.alcoholSnack)}
    </fieldset>
</section>

<section>
    <h3>Diet</h3>
    <fieldset>
        <legend>Intake interval</legend>
            <div class="flex items-center gap-4">
                {@render inputGroup("radio", "intakeInterval", ["regular", "irregular"], (value, checked) => {diet.interval = checked;}, diet.interval)}
                <input type="text" id="intakeTimes" bind:value={diet.frequency} placeholder="times" /><label for="intakeTimes">times/day</label>
            </div>
            <div class="flex items-center gap-4">
                <label for="intakeAppetite">appetite</label>
                {@render inputGroup("radio", "intakeAppetite", ["+", "-", "+/-"], (value, checked) => {diet.appetite = checked;}, diet.appetite)}
            </div>
    </fieldset>
    <fieldset>
        <legend>Binge eating</legend>
            <div class="flex items-center gap-4">
                <label for="bingeEatingType">what food:</label>
                {@render inputGroup("checkbox", "bingeEatingType", ["과자", "단것", "탄수화물", "아무거나"], (value, checked) => {diet.bingeEating.type = updateArray(diet.bingeEating.type, value, checked);}, diet.bingeEating.type)}
                <input type="text" bind:value={diet.bingeEating.otherType} placeholder="other food" />
            </div>
            {@render inputGroup("checkbox", "bingeEatingWhen", ["day time", "before sleep", "during sleep", "stressful evnet", "아무때나"], (value, checked) => {diet.bingeEating.when = updateArray(diet.bingeEating.when, value, checked);}, diet.bingeEating.when)}
    </fieldset>
</section>

<section>
    <h3>Exercise</h3>
    <fieldset>
        <div class="flex items-center gap-4">
            {@render inputGroup("checkbox", "exerciseType", ["streching", "walking", "running", "health", "PT", "swimming", "yoga", "golf"], (value, checked) => {exercise.type = updateArray(exercise.type, value, checked);}, exercise.type)}
            <input type="text" bind:value={exercise.otherType} placeholder="other exercise" />
        </div>
    </fieldset>
    <fieldset>
        <legend>duration & frequency</legend>
            <input type="text" id="exerciseDuration" bind:value={exercise.duration} disabled={exercise.under30min} /><label for="exerciseDuration">hr</label>
            <input type="checkbox" id="exerciseUnder30min" bind:checked={exercise.under30min} /><label for="exerciseUnder30min">&lt;30min</label>
            {@render inputGroup("radio", "exerciseFrequency", ["매일", "하루걸러", "2~3/wk", "가끔"], (value, checked) => {exercise.frequency = checked;}, exercise.frequency)}
    </fieldset>
    <fieldset>
        <legend>do not exercise d/t</legend>
            <div class="flex items-center gap-4">
                {@render inputGroup("checkbox", "noExerciseWhy", ["허리", "무릎", "다리", "통증", "디스크", "힘듦", "시간 x", "귀찮음"], (value, checked) => {exercise.noExercise.why = updateArray(exercise.noExercise.why, value, checked);}, exercise.noExercise.why)}
                <input type="text" bind:value={exercise.noExercise.otherWhy} placeholder="기타 이유" />
            </div>
</section>

<section>
    <h3>Sleep</h3>
    <fieldset>
        <legend>Night sleep</legend>
            <input type="checkbox" id="sleepSleepDisturbance" bind:checked={sleep.nightSleep.sleepDisturbance} /><label for="sleepSleepDisturbance">sleep disturbance</label>
            <div class="flex items-center gap-4">
                <label for="sleepTakingMedicine">복약</label><input type="text" id="sleepTakingMedicine" bind:value={sleep.nightSleep.takingMedicine} />
                {@render inputGroup("radio", "sleepTakingMedicineUnit", ["AM", "PM", "irregular"], (value, checked) => {sleep.nightSleep.takingMedicineUnit = checked}, sleep.nightSleep.takingMedicineUnit)}
                <label for="sleepFallAsleep">복약</label><input type="text" id="sleepFallAsleep" bind:value={sleep.nightSleep.fallAsleep} />
                {@render inputGroup("radio", "sleepFallAsleepUnit", ["AM", "PM", "irregular"], (value, checked) => {sleep.nightSleep.fallAsleepUnit = checked}, sleep.nightSleep.fallAsleepUnit)}
                <label for="sleepWakeUp">복약</label><input type="text" id="sleepWakeUp" bind:value={sleep.nightSleep.wakeUp} />
                {@render inputGroup("radio", "sleepWakeUpUnit", ["AM", "PM", "irregular"], (value, checked) => {sleep.nightSleep.wakeUpUnit= checked}, sleep.nightSleep.wakeUpUnit)}
            </div>
    </fieldset>
</section>
