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
    <h4>{symptomGroup == "psychological" ? "Psychological Symptoms" : "Somatic Symptoms"}</h4>
    <fieldset role="radiogroup" aria-labelledby="{symptomGroup}-heading">
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

{#snippet inputGroup(type, name, options, bindValue, labelPrefix = "", labelSuffix = "", className = "flex items-center gap-4")}
    <div class={className}>
        {#each options as option}
            <label>
                <input 
                    type={type} 
                    value={option} 
                    name={name} 
                    bind:checked={type === "radio" ? bindValue === option : bindValue.includes(option)}
                    onchange={() => {
                        if (type === "radio") bindValue = option;
                        else bindValue = bindValue.includes(option) ? bindValue.filter(v => v !== option) : [...bindValue, option];
                    }}
                />
                {labelPrefix}{option}{labelSuffix}
            </label>
        {/each}
    </div>
{/snippet}

<!-- previous snippet code. React style.
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
-->
<!--
{@render inputGroup('checkbox', 'relationType', ['social', 'friends', 'family', 'neighbor'], (value, checked) => {interPersonal.relationType = updateArray(interPersonal.relationType, value, checked);}, interPersonal.relationType /* prefix, suffix, className omitted intentionally */)}
{@render inputGroup('radio', 'interPersonalWithdrawalType', ['social withdrawal', 'no relationship'], (value, checked) => {interPersonal.withdrawalType = checked;}, interPersonal.withdrawalType, "", "", "space-x-2")}
-->


<section>
<h2>Subjective</h2>

<section>
    <h3>Symptoms</h3>
        {@render symptomList(psychologicalSymptoms, "psychological")}
        {@render symptomList(somaticSymptoms, "somatic")}

    <fieldset>
        <legend>mainly occures in/at</legend>
            {@render inputGroup("radio", "occursIn", timePeriods, (value, checked) => {symptom.occursIn = checked;}, symptom.occursIn)}
    </fieldset>

        <h4>Attack</h4>
        <fieldset class="flex items-center gap-4">
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
        </fieldset>

        <h4>Suicidal idea</h4>
        <fieldset>
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

        <h4>Homocidal idea</h4>
        <fieldset>
            {@render inputGroup("checkbox", "homocidalType", ["idea", "plan", "attempt"], (value, checked) => {symptom.homocidal.type = updateArray(symptom.homocidal.type, value, checked);}, symptom.homocidal.type)}
        </fieldset>
</section>

<section>
    <h3>Interpersonal Relations</h3>
        <h4>Relationship with</h4>
        <fieldset class="flex items-center gap-4">
            {@render inputGroup("checkbox", "relationType", ["social", "friends", "family", "neighbor"], (value, checked) => {interPersonal.relationType = updateArray(interPersonal.relationType, value, checked);}, interPersonal.relationType)}
            <input type="text" bind:value={interPersonal.otherRelationType} placeholder="others" />
            <input type="number" bind:value={interPersonal.frequency} placeholder="times" />
            {@render inputGroup("radio", "interPersonalUnit", ["week", "month"], (value, checked) => {interPersonal.unit = checked;}, interPersonal.unit, "/", "", "space-x-2")}
        </fieldset>
        <h4>How to play</h4>
        <fieldset class="flex items-center gap-4">
            {@render inputGroup("checkbox", "interPersonalMethod", ["talking", "eating", "drinking", "traveling"], (value, checked) => {interPersonal.method = updateArray(interPersonal.method, value, checked);}, interPersonal.method)}
            <input type="text" bind:value={interPersonal.otherMethod} placeholder="others" />
        </fieldset>
        <h4>Withdrawal</h4>
        <fieldset>
            {@render inputGroup("radio", "interPersonalWithdrawal", ["social withdrawal", "no relationship"], (value, checked) => {interPersonal.withdrawal = checked;}, interPersonal.withdrawal, "", "", "space-x-2")}
    </fieldset>
</section>

<section>
    <h3>Leisure & Hobbies</h3>
    <fieldset>
        <div class="flex items-center gap-4">
            <input type="checkbox" id="noLeisure" bind:checked={leisureNhobbies.noLeisure} />
            <label for="noLeisure">No Leisure</label>
            <input type="text" bind:value={leisureNhobbies.leisure} placeholder="여가 내용" disabled={leisureNhobbies.noLeisure} />
        </div>
        <div class="flex items-center gap-4">
            <input type="checkbox" id="noPleasure" bind:checked={leisureNhobbies.noPleasure} />
            <label for="noPleasure">No Pleasure</label>
            <input type="text" bind:value={leisureNhobbies.pleasure} placeholder="pleasures" disabled={leisureNhobbies.noPleasure} />
        </div>
        <div class="flex items-center gap-4">
            <input type="checkbox" id="noHobby" bind:checked={leisureNhobbies.noHobby} />
            <label for="noHobby">No Hobby</label>
            <input type="text" bind:value={leisureNhobbies.hobby} placeholder="취미 내용" disabled={leisureNhobbies.noHobby} />
        </div>
    </fieldset>
</section>

<section>
    <h3>Alcohol</h3>
        <h4>Alcoholic beverage</h4>
        <fieldset>
            {@render inputGroup("checkbox", "alcoholBeverage", ["소주", "beer", "wine", "양주", "막걸리", "폭탄주", "mix"], (value, checked) => {alcohol.alcoholBeverage = updateArray(alcohol.alcoholBeverage, value, checked);}, alcohol.alcoholBeverage)}
        </fieldset>
        <h4>Amount & Frequency</h4>
        <fieldset>
        <div class="flex items-center gap-4">
            <input type="text" id="alcoholAmount" bind:value={alcohol.amount} placeholder="amount" />
            <label for="alcoholAmount">/one time</label><br>
            <input type="text" bind:value={alcohol.frequency} placeholder="times" />
            {@render inputGroup("radio", "alcoholUnit", ["day", "week", "month"], (value, checked) => {alcohol.unit = checked;}, alcohol.unit, "/", "", "space-x-2")}
        </div>
        <span>changed over time:</span>
            {@render inputGroup("radio", "alcoholProgress", ["persist", "increase", "neutral", "decrease"], (value, checked) => {alcohol.progress = checked;}, alcohol.progress)}
        </fieldset>
        <h4>Alcohol snack</h4>
        <fieldset>
            {@render inputGroup("checkbox", "alcoholSnack", ["안주 없음", "meat", "fruits", "반찬", "..."], (value, checked) => {alcohol.alcoholSnack = updateArray(alcohol.alcoholSnack, value, checked);}, alcohol.alcoholSnack)}
        </fieldset>
</section>

<section>
    <h3>Diet</h3>
        <h4>Intake interval</h4>
        <fieldset>
            <div class="flex items-center gap-4">
                {@render inputGroup("radio", "intakeInterval", ["regular", "irregular"], (value, checked) => {diet.interval = checked;}, diet.interval)}
                <input type="text" id="intakeTimes" bind:value={diet.frequency} placeholder="times" />
                <label for="intakeTimes">times/day</label>
            </div>
            <div class="flex items-center gap-4">
                <label for="intakeAppetite">appetite</label>
                {@render inputGroup("radio", "intakeAppetite", ["+", "-", "+/-"], (value, checked) => {diet.appetite = checked;}, diet.appetite)}
            </div>
        </fieldset>
        <h4>Binge eating</h4>
        <fieldset>
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
            <input type="text" id="exerciseDuration" bind:value={exercise.duration} disabled={exercise.under30min} />
            <label for="exerciseDuration">hr</label>
            <input type="checkbox" id="exerciseUnder30min" bind:checked={exercise.under30min} />
            <label for="exerciseUnder30min">&lt; 30min</label>
            {@render inputGroup("radio", "exerciseFrequency", ["매일", "하루걸러", "2~3/wk", "가끔"], (value, checked) => {exercise.frequency = checked;}, exercise.frequency)}
    </fieldset>
    <fieldset class="flex items-center gap-4">
        <legend>do not exercise d/t</legend>
            {@render inputGroup("checkbox", "noExerciseWhy", ["허리", "무릎", "다리", "통증", "디스크", "힘듦", "시간 x", "귀찮음"], (value, checked) => {exercise.noExercise.why = updateArray(exercise.noExercise.why, value, checked);}, exercise.noExercise.why)}
            <input type="text" bind:value={exercise.noExercise.otherWhy} placeholder="기타 이유" />
    </fieldset>
</section>

<section>
    <h3>Sleep</h3>
        <h4>Night sleep</h4>
        <fieldset>
            <input type="checkbox" id="sleepSleepDisturbance" bind:checked={sleep.nightSleep.sleepDisturbance} />
            <label for="sleepSleepDisturbance">sleep disturbance</label>
            <div class="flex items-center gap-4">
                <label for="sleepTakingMedicine">복약</label><input type="text" id="sleepTakingMedicine" bind:value={sleep.nightSleep.takingMedicine} />
                {@render inputGroup("radio", "sleepTakingMedicineUnit", ["AM", "PM", "irregular"], (value, checked) => {sleep.nightSleep.takingMedicineUnit = checked;}, sleep.nightSleep.takingMedicineUnit)}
                <label for="sleepFallAsleep">복약</label><input type="text" id="sleepFallAsleep" bind:value={sleep.nightSleep.fallAsleep} />
                {@render inputGroup("radio", "sleepFallAsleepUnit", ["AM", "PM", "irregular"], (value, checked) => {sleep.nightSleep.fallAsleepUnit = checked;}, sleep.nightSleep.fallAsleepUnit)}
                <label for="sleepWakeUp">복약</label><input type="text" id="sleepWakeUp" bind:value={sleep.nightSleep.wakeUp} />
                {@render inputGroup("radio", "sleepWakeUpUnit", ["AM", "PM", "irregular"], (value, checked) => {sleep.nightSleep.wakeUpUnit = checked;}, sleep.nightSleep.wakeUpUnit)}
            </div>
        </fieldset>
        <fieldset class="flex items-center gap-4">
            <label for="sleepSleepInductionTime">입면</label>
            <input type="text" id="sleepSleepInductionTime" bind:value={sleep.nightSleep.sleepInductionTime} placeholder="1시간 정도에 잠이 듬" />
            <input type="checkbox" id="sleepSleepWithin1hr" bind:checked={sleep.nightSleep.sleepInductionWithin1hr} />
            <label for="sleepSleepWithin1hr">&lt; 1hr</label>
        </fieldset>
        <fieldset>
            <legend>broken sleep</legend>
                <div class="flex items-center gap-4">
                    {@render inputGroup("radio", "sleepBrokenSleep", ["+", "-", "+/-", "자주"], (value, checked) => {sleep.nightSleep.brokenSleep = checked;}, sleep.nightSleep.brokenSleep)}
                    <input type="text" id="sleepBrokenSleepFrequency" bind:value={sleep.nightSleep.brokenSleepFrequency} />
                    <label for="sleepBrokenSleepFrequency">/night</label>
                    <input type="checkbox" id="sleepBrokenSleepDtUrination" bind:checked={sleep.nightSleep.brokenSleepDtUrination} placeholder="하루밤에 몇번 깨나?" /><label for="sleepBrokenSleepDtUrination">d/t 소변</label>
                </div>
            <legend>re-sleep</legend>
                <div class="flex items-center gap-4">
                    <input type="checkbox" id="sleepResleep" bind:checked={sleep.nightSleep.resleep} />
                    <label for="sleepResleep">fall in re-sleep</label>
                    <label for="sleepResleepInductionTime">: within </label>
                    <input type="text" id="sleepResleepInductionTime" bind:value={sleep.nightSleep.resleepInductionTime} placeholder="다시 잠들때까지의 시간" />
                    <label for="sleepResleepInductionTime">min</label>
                </div>
            <legend>sleep quality</legend>
                <div class="flex items-center gap-4">
                    {@render inputGroup("radio", "sleepQuality", ["good", "poor", "+/-"], (value, checked) => {sleep.nightSleep.quality = checked;}, sleep.nightSleep.quality)}
                    {@render inputGroup("checkbox", "sleepQualityOther", ["깊은 잠x", "설침", "RLS"], (value, checked) => {sleep.nightSleep.qualityOther = updateArray(sleep.nightSleep.qualityOther, value, checked);}, sleep.nightSleep.qualityOther)}
                </div>
            <legend>awakening feeling</legend>
                {@render inputGroup("radio", "sleepAwakenFeeling", ["good", "bad", "not bad", "so so", "+/-"], (value, checked) => {sleep.nightSleep.awakenFeeling = checked;}, sleep.nightSleep.awakening)}
            <legend>insomnia</legend>
                {@render inputGroup("checkbox", "sleepInsomnia", ["initial", "middle", "terminal"], (value, checked) => {sleep.nightSleep.insomnia = updateArray(sleep.nightSleep.insomnia, value, checked);}, sleep.nightSleep.insomnia)}
            <legend>sedation</legend>
                <label for="sleepMorningSedation">morning sedation</label>
                {@render inputGroup("radio", "sleepMorningSedation", ["+", "-", "+/-", "under 1hr", "AM", "PM", "all day"], (value, checked) => {sleep.nightSleep.morningSedation = checked;}, sleep.nightSleep.morningSedation)}
        </fieldset>
        <h4>Nap</h4>
        <fieldset class="flex items-center gap-4">
            <input type="text" id="sleepNapDuration" bind:value={sleep.nap.napDuration} placeholder="낮잠 시간" />
            {@render inputGroup("radio", "sleepNapDuration", ["min", "hr"], (value, checked) => {sleep.nap.napDurationUnit = checked;}, sleep.nap.napDurationUnit)}
            <label for="sleepNapFeeling">nap feeling:</label>
            {@render inputGroup("radio", "sleepNapFeeling", ["개운", "늘어짐"], (value, checked) => {sleep.nap. napFeeling = checked;}, sleep.nap.napFeeling)}
        </fieldset>
        <h4>Dream</h4>
        <fieldset>
            <div class="flex items-center gap-4">
                <label for="dreamContent">contents</label>
                <input type="text" id="dreamContent" bind:value={sleep.dream.content} placeholder="꿈 내용" />
            </div>
            <div class="flex items-center gap-4">
                <label for="dreamRemenber">remenber</label>
                {@render inputGroup("checkbox", "dreamRemenber", ["+", "-", "잘 나지 않음", "많음"], (value, checked) => {sleep.dream.remember = updateArray(sleep.dream.remember, value, checked);}, sleep.dream.remember)}
            </div>
            <div class="flex items-center gap-4">
                <label for="dreamFeeling">feeling/emotion</label>
                {@render inputGroup("checkbox", "dreamFeeling", ["good", "sad", "anger", "fear", "+/-"], (value, checked) => {sleep.dream.feeling = updateArray(sleep.dream.feeling, value, checked);}, sleep.dream.feeling)}
            </div>
            <div class="flex items-center gap-4">
                <label for="dreamResonance">여운</label>
                {@render inputGroup("radio", "dreamResonance", ["+", "-"], (value, checked) => {sleep.dream.resonance = checked;}, sleep.dream.resonance)}
            </div>
            <div class="flex items-center gap-4">
                <input type="checkbox" id="dreamNightmare" bind:checked={sleep.dream.nightmare} />
                <label for="dreamNightmare">nightmare</label>
            </div>
        </fieldset>
</section>

</section>
