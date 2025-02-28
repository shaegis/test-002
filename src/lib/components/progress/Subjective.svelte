<script lang="ts">
    import { drNoteState } from "$lib/stores/drNoteState";
    import { psychologicalSymptoms, somaticSymptoms, options, percentRange, timeDivision, timeUnit, timeUnits, sxProgress, actionType, actionProgress, amPm, pattern, posiNnega, frequency, quality, feeling, suicidalMethod, relationType, interPersonalMethod, alcoholBeverage, bingeEatingType, bingeEatingWhen, exerciseType, exerciseFrequency, noExerciseWhy, sleepQuality } from "$lib/data/progress/subjective";
    import type { SymptomData, SymptomItemsData, InterPersonalData, LeisureNhobbiesData, AlcoholData, DietData, ExerciseData, SleepData } from "$lib/types/progress/subjective";
    import { updateArray } from "$lib/utils/array";

    let subjectiveStore = $drNoteState.progress.subjective;
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
                        <input type="radio" value={option.value} bind:group={subjectiveStore.symptom[symptomGroup][symptomItem.name]} />
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
                    onchange={(e) => bindFunction(option, e.target.checked)} 
                />
                {labelPrefix}{option}{labelSuffix}
            </label>
        {/each}
    </div>
{/snippet}

<!--
{@render inputGroup('checkbox', 'relationType', ['social', 'friends', 'family', 'neighbor'], (value, checked) => {interPersonal.relationType = updateArray(interPersonal.relationType, value, checked);}, interPersonal.relationType /* prefix, suffix, className omitted intentionally */)}

{@render inputGroup('radio', 'interPersonalWithdrawalType', ['social withdrawal', 'no relationship'], (value, checked) => { if (checked) interPersonal.withdrawalType = value;}, interPersonal.withdrawalType, "", "", "space-x-2")}
OR
-->


<section>
<h2>Subjective</h2>

<section>
    <h3>Symptoms</h3>
        {@render symptomList(psychologicalSymptoms, "psychological")}
        {@render symptomList(somaticSymptoms, "somatic")}

    <fieldset>
        <legend>mainly occures in/at</legend>
            {@render inputGroup("radio", "occursIn", timeDivision, (value, checked) => {if (checked) subjectiveStore.symptom.occursIn = value;}, subjectiveStore.symptom.occursIn)}
    </fieldset>

        <h4>Attack</h4>
        <fieldset class="flex items-center gap-4">
            {@render inputGroup("radio", "attackType", sxProgress, (value, checked) => {if (checked) subjectiveStore.symptom.attack.type = value;}, subjectiveStore.symptom.attack.type)}
            <input type="number" bind:value={subjectiveStore.symptom.attack.frequency} placeholder="times" />

            {@render inputGroup("radio", "attackUnit", ["day", "week"], (value, checked) => {if (checked) subjectiveStore.symptom.attack.unit = value;}, subjectiveStore.symptom.attack.unit, "/", "", "space-x-2")}

            <label>
                <select bind:value={subjectiveStore.symptom.attack.intensity}>
                    {#each percentRange as pRange}
                        <option value={pRange.value}>{pRange.label}</option>
                    {/each}
                </select>
                % intensity
            </label>
        </fieldset>

        <h4>Suicidal idea</h4>
        <fieldset>
            {@render inputGroup("checkbox", "suicidalType", actionType, (value, checked) => {subjectiveStore.symptom.suicidal.type = updateArray(subjectiveStore.symptom.suicidal.type, value, checked);}, subjectiveStore.symptom.suicidal.type)}

            <div class="flex items-center gap-4">
                {@render inputGroup("checkbox", "suicidalMethod", suicidalMethod, (value, checked) => {subjectiveStore.symptom.suicidal.method = updateArray(subjectiveStore.symptom.suicidal.method, value, checked);}, subjectiveStore.symptom.suicidal.method)}
                <input type="text" bind:value={subjectiveStore.symptom.suicidal.otherMethod} placeholder="Other method" />
            </div>

            <div class="flex items-center gap-4">
                <input type="number" bind:value={subjectiveStore.symptom.suicidal.when.amount} placeholder="1 day/month/year ago" />
                {@render inputGroup("radio", "suicidalUnit", timeUnits, (value, checked) => {if (checked) subjectiveStore.symptom.suicidal.when.unit = value;}, subjectiveStore.symptom.suicidal.when.unit, "", " ago")}
            </div>
        </fieldset>

        <h4>Homocidal idea</h4>
        <fieldset>
            {@render inputGroup("checkbox", "homocidalType", actionType, (value, checked) => {subjectiveStore.symptom.homocidal.type = updateArray(subjectiveStore.symptom.homocidal.type, value, checked);}, subjectiveStore.symptom.homocidal.type)}
        </fieldset>
</section>

<section>
    <h3>Interpersonal Relations</h3>
        <h4>Relationship with</h4>
        <fieldset class="flex items-center gap-4">
            {@render inputGroup("checkbox", "relationType", relationType, (value, checked) => {subjectiveStore.interPersonal.relationType = updateArray(subjectiveStore.interPersonal.relationType, value, checked);}, subjectiveStore.interPersonal.relationType)}
            <input type="text" bind:value={subjectiveStore.interPersonal.otherRelationType} placeholder="others" />
            <input type="number" bind:value={subjectiveStore.interPersonal.frequency} placeholder="times" />
            {@render inputGroup("radio", "interPersonalUnit", ["week", "month"], (value, checked) => {if (checked) subjectiveStore.interPersonal.unit = value;}, subjectiveStore.interPersonal.unit, "/", "", "space-x-2")}
        </fieldset>
        <h4>How to play</h4>
        <fieldset class="flex items-center gap-4">
            {@render inputGroup("checkbox", "interPersonalMethod", interPersonalMethod, (value, checked) => {subjectiveStore.interPersonal.method = updateArray(subjectiveStore.interPersonal.method, value, checked);}, subjectiveStore.interPersonal.method)}
            <input type="text" bind:value={subjectiveStore.interPersonal.otherMethod} placeholder="others" />
        </fieldset>
        <h4>Withdrawal</h4>
        <fieldset>
            {@render inputGroup("radio", "interPersonalWithdrawal", ["social withdrawal", "no relationship"], (value, checked) => {if (checked) subjectiveStore.interPersonal.withdrawal = value;}, subjectiveStore.interPersonal.withdrawal, "", "", "space-x-2")}
    </fieldset>
</section>

<section>
    <h3>Leisure & Hobbies</h3>
    <fieldset>
        <div class="flex items-center gap-4">
            <input type="checkbox" id="noLeisure" bind:checked={subjectiveStore.leisureNhobbies.noLeisure} />
            <label for="noLeisure">No Leisure</label>
            <input type="text" bind:value={subjectiveStore.leisureNhobbies.leisure} placeholder="여가 내용" disabled={subjectiveStore.leisureNhobbies.noLeisure} />
        </div>
        <div class="flex items-center gap-4">
            <input type="checkbox" id="noPleasure" bind:checked={subjectiveStore.leisureNhobbies.noPleasure} />
            <label for="noPleasure">No Pleasure</label>
            <input type="text" bind:value={subjectiveStore.leisureNhobbies.pleasure} placeholder="pleasures" disabled={subjectiveStore.leisureNhobbies.noPleasure} />
        </div>
        <div class="flex items-center gap-4">
            <input type="checkbox" id="noHobby" bind:checked={subjectiveStore.leisureNhobbies.noHobby} />
            <label for="noHobby">No Hobby</label>
            <input type="text" bind:value={subjectiveStore.leisureNhobbies.hobby} placeholder="취미 내용" disabled={subjectiveStore.leisureNhobbies.noHobby} />
        </div>
    </fieldset>
</section>

<section>
    <h3>Alcohol</h3>
        <h4>Alcoholic beverage</h4>
        <fieldset>
            {@render inputGroup("checkbox", "alcoholBeverage", alcoholBeverage, (value, checked) => {subjectiveStore.alcohol.alcoholBeverage = updateArray(subjectiveStore.alcohol.alcoholBeverage, value, checked);}, subjectiveStore.alcohol.alcoholBeverage)}
        </fieldset>
        <h4>Amount & Frequency</h4>
        <fieldset>
        <div class="flex items-center gap-4">
            <input type="text" id="alcoholAmount" bind:value={subjectiveStore.alcohol.amount} placeholder="amount" />
            <label for="alcoholAmount">/one time</label><br>
            <input type="text" bind:value={subjectiveStore.alcohol.frequency} placeholder="times" />
            {@render inputGroup("radio", "alcoholUnit", ["day", "week", "month"], (value, checked) => {if (checked) subjectiveStore.alcohol.unit = value;}, subjectiveStore.alcohol.unit, "/", "", "space-x-2")}
        </div>
        <span>changed over time:</span>
            {@render inputGroup("radio", "alcoholProgress", actionProgress, (value, checked) => {subjectiveStore.alcohol.alcoholSnack = updateArray(subjectiveStore.alcoholSnack, value, checked);}, subjectiveStore.alcohol.alcoholSnack)}
        </fieldset>
</section>

<section>
    <h3>Diet</h3>
        <h4>Intake interval</h4>
        <fieldset>
            <div class="flex items-center gap-4">
                {@render inputGroup("radio", "intakeInterval", pattern, (value, checked) => {if (checked) subjectiveStore.diet.interval = value;}, subjectiveStore.diet.interval)}
                <input type="text" id="intakeTimes" bind:value={subjectiveStore.diet.frequency} placeholder="times" />
                <label for="intakeTimes">times/day</label>
            </div>
            <div class="flex items-center gap-4">
                <label for="intakeAppetite">appetite</label>
                {@render inputGroup("radio", "intakeAppetite", posiNnega, (value, checked) => {if (checked) subjectiveStore.diet.appetite = value;}, subjectiveStore.diet.appetite)}
            </div>
        </fieldset>
        <h4>Binge eating</h4>
        <fieldset>
            <div class="flex items-center gap-4">
                <label for="bingeEatingType">what food:</label>
                {@render inputGroup("checkbox", "bingeEatingType", bingeEatingType, (value, checked) => {subjectiveStore.diet.bingeEating.type = updateArray(subjectiveStore.diet.bingeEating.type, value, checked);}, subjectiveStore.diet.bingeEating.type)}
                <input type="text" bind:value={subjectiveStore.diet.bingeEating.otherType} placeholder="other food" />
            </div>
            {@render inputGroup("checkbox", "bingeEatingWhen", bingeEatingWhen, (value, checked) => {subjectiveStore.diet.bingeEating.when = updateArray(subjectiveStore.diet.bingeEating.when, value, checked);}, subjectiveStore.diet.bingeEating.when)}
        </fieldset>
</section>

<section>
    <h3>Exercise</h3>
    <fieldset>
        <div class="flex items-center gap-4">
            {@render inputGroup("checkbox", "exerciseType", exerciseType, (value, checked) => {subjectiveStore.exercise.type = updateArray(subjectiveStore.exercise.type, value, checked);}, subjectiveStore.exercise.type)}
            <input type="text" bind:value={subjectiveStore.exercise.otherType} placeholder="other exercise" />
        </div>
    </fieldset>
    <fieldset>
        <legend>duration & frequency</legend>
            <input type="text" id="exerciseDuration" bind:value={subjectiveStore.exercise.duration} disabled={subjectiveStore.exercise.under30min} />
            <label for="exerciseDuration">hr</label>
            <input type="checkbox" id="exerciseUnder30min" bind:checked={subjectiveStore.exercise.under30min} />
            <label for="exerciseUnder30min">&lt; 30min</label>
            {@render inputGroup("radio", "exerciseFrequency", exerciseFrequency, (value, checked) => {if (checked) subjectiveStore.exercise.frequency = value;}, subjectiveStore.exercise.frequency)}
    </fieldset>
    <fieldset class="flex items-center gap-4">
        <legend>do not exercise d/t</legend>
            {@render inputGroup("checkbox", "noExerciseWhy", noExerciseWhy, (value, checked) => {subjectiveStore.exercise.noExercise.why = updateArray(subjectiveStore.exercise.noExercise.why, value, checked);}, subjectiveStore.exercise.noExercise.why)}
            <input type="text" bind:value={subjectiveStore.exercise.noExercise.otherWhy} placeholder="기타 이유" />
    </fieldset>
</section>

<section>
    <h3>Sleep</h3>
        <h4>Night sleep</h4>
        <fieldset>
            <input type="checkbox" id="sleepSleepDisturbance" bind:checked={subjectiveStore.sleep.nightSleep.sleepDisturbance} />
            <label for="sleepSleepDisturbance">sleep disturbance</label>
            <div class="flex items-center gap-4">
                <label for="sleepTakingMedicine">복약</label><input type="text" id="sleepTakingMedicine" bind:value={subjectiveStore.sleep.nightSleep.takingMedicine} />
                {@render inputGroup("radio", "sleepTakingMedicineUnit", amPm, (value, checked) => {if (checked) subjectiveStore.sleep.nightSleep.takingMedicineUnit = value;}, subjectiveStore.sleep.nightSleep.takingMedicineUnit)}
                <label for="sleepFallAsleep">복약</label><input type="text" id="sleepFallAsleep" bind:value={subjectiveStore.sleep.nightSleep.fallAsleep} />
                {@render inputGroup("radio", "sleepFallAsleepUnit", amPm, (value, checked) => {if (checked) subjectiveStore.sleep.nightSleep.fallAsleepUnit = value;}, subjectiveStore.sleep.nightSleep.fallAsleepUnit)}
                <label for="sleepWakeUp">복약</label><input type="text" id="sleepWakeUp" bind:value={subjectiveStore.sleep.nightSleep.wakeUp} />
                {@render inputGroup("radio", "sleepWakeUpUnit", amPm, (value, checked) => {if (checked) subjectiveStore.sleep.nightSleep.wakeUpUnit = value;}, subjectiveStore.sleep.nightSleep.wakeUpUnit)}
            </div>
        </fieldset>
        <fieldset class="flex items-center gap-4">
            <label for="sleepSleepInductionTime">입면</label>
            <input type="text" id="sleepSleepInductionTime" bind:value={subjectiveStore.sleep.nightSleep.sleepInductionTime} placeholder="1시간 정도에 잠이 듬" />
            <input type="checkbox" id="sleepSleepWithin1hr" bind:checked={subjectiveStore.sleep.nightSleep.sleepInductionWithin1hr} />
            <label for="sleepSleepWithin1hr">&lt; 1hr</label>
        </fieldset>
        <fieldset>
            <legend>broken sleep</legend>
                <div class="flex items-center gap-4">
                    {@render inputGroup("radio", "sleepBrokenSleep", frequency, (value, checked) => {if (checked) subjectiveStore.sleep.nightSleep.brokenSleep = value;}, subjectiveStore.sleep.nightSleep.brokenSleep)}
                    <input type="text" id="sleepBrokenSleepFrequency" bind:value={subjectiveStore.sleep.nightSleep.brokenSleepFrequency} />
                    <label for="sleepBrokenSleepFrequency">/night</label>
                    <input type="checkbox" id="sleepBrokenSleepDtUrination" bind:checked={subjectiveStore.sleep.nightSleep.brokenSleepDtUrination} placeholder="하루밤에 몇번 깨나?" /><label for="sleepBrokenSleepDtUrination">d/t 소변</label>
                </div>
            <legend>re-sleep</legend>
                <div class="flex items-center gap-4">
                    <input type="checkbox" id="sleepResleep" bind:checked={subjectiveStore.sleep.nightSleep.resleep} />
                    <label for="sleepResleep">fall in re-sleep</label>
                    <label for="sleepResleepInductionTime">: within </label>
                    <input type="text" id="sleepResleepInductionTime" bind:value={subjectiveStore.sleep.nightSleep.resleepInductionTime} placeholder="다시 잠들때까지의 시간" />
                    <label for="sleepResleepInductionTime">min</label>
                </div>
            <legend>sleep quality</legend>
                <div class="flex items-center gap-4">
                    {@render inputGroup("radio", "sleepQuality", quality, (value, checked) => {if (checked) subjectiveStore.sleep.nightSleep.quality = value;}, subjectiveStore.sleep.nightSleep.quality)}
                    {@render inputGroup("checkbox", "sleepQualityOther", sleepQuality, (value, checked) => {subjectiveStore.sleep.nightSleep.qualityOther = updateArray(subjectiveStore.sleep.nightSleep.qualityOther, value, checked);}, subjectiveStore.sleep.nightSleep.qualityOther)}
                </div>
            <legend>awakening feeling</legend>
                {@render inputGroup("radio", "sleepAwakenFeeling", feeling, (value, checked) => {if (checked) subjectiveStore.sleep.nightSleep.awakenFeeling = value;}, subjectiveStore.sleep.nightSleep.awakening)}
            <legend>insomnia</legend>
                {@render inputGroup("checkbox", "sleepInsomnia", ["initial", "middle", "terminal"], (value, checked) => {subjectiveStore.sleep.nightSleep.insomnia = updateArray(subjectiveStore.sleep.nightSleep.insomnia, value, checked);}, subjectiveStore.sleep.nightSleep.insomnia)}
            <legend>sedation</legend>
                <label for="sleepMorningSedation">morning sedation</label>
                {@render inputGroup("radio", "sleepMorningSedation", ["+", "-", "+/-", "under 1hr", "AM", "PM", "all day"], (value, checked) => {if (checked) subjectiveStore.sleep.nightSleep.morningSedation = value;}, subjectiveStore.sleep.nightSleep.morningSedation)}
        </fieldset>
        <h4>Nap</h4>
        <fieldset class="flex items-center gap-4">
            <input type="text" id="sleepNapDuration" bind:value={subjectiveStore.sleep.nap.napDuration} placeholder="낮잠 시간" />
            {@render inputGroup("radio", "sleepNapDuration", ["min", "hr"], (value, checked) => {if (checked) subjectiveStore.sleep.nap.napDurationUnit = value;}, subjectiveStore.sleep.nap.napDurationUnit)}
            <label for="sleepNapFeeling">nap feeling:</label>
            {@render inputGroup("radio", "sleepNapFeeling", ["개운", "늘어짐"], (value, checked) => {if (checked) subjectiveStore.sleep.nap. napFeeling = value;}, subjectiveStore.sleep.nap.napFeeling)}
        </fieldset>
        <h4>Dream</h4>
        <fieldset>
            <div class="flex items-center gap-4">
                <label for="dreamContent">contents</label>
                <input type="text" id="dreamContent" bind:value={subjectiveStore.sleep.dream.content} placeholder="꿈 내용" />
            </div>
            <div class="flex items-center gap-4">
                <label for="dreamRemenber">remenber</label>
                {@render inputGroup("checkbox", "dreamRemenber", ["+", "-", "잘 나지 않음", "많음"], (value, checked) => {subjectiveStore.sleep.dream.remember = updateArray(subjectiveStore.sleep.dream.remember, value, checked);}, subjectiveStore.sleep.dream.remember)}
            </div>
            <div class="flex items-center gap-4">
                <label for="dreamFeeling">feeling/emotion</label>
                {@render inputGroup("checkbox", "dreamFeeling", ["good", "sad", "anger", "fear", "+/-"], (value, checked) => {subjectiveStore.sleep.dream.feeling = updateArray(subjectiveStore.sleep.dream.feeling, value, checked);}, subjectiveStore.sleep.dream.feeling)}
            </div>
            <div class="flex items-center gap-4">
                <label for="dreamResonance">여운</label>
                {@render inputGroup("radio", "dreamResonance", posiNnega, (value, checked) => {if (checked) subjectiveStore.sleep.dream.resonance = value;}, subjectiveStore.sleep.dream.resonance)}
            </div>
            <div class="flex items-center gap-4">
                <input type="checkbox" id="dreamNightmare" bind:checked={subjectiveStore.sleep.dream.nightmare} />
                <label for="dreamNightmare">nightmare</label>
            </div>
        </fieldset>
</section>

</section>

<!--
<pre class="p-4 bg-gray-100 text-gray-900 rounded">
{JSON.stringify(subjectiveStore.symptom, null, 2)}
{JSON.stringify(subjectiveStore.interPersonal, null, 2)}
{JSON.stringify(subjectiveStore.leisureNhobbies, null, 2)}
{JSON.stringify(subjectiveStore.alcohol, null, 2)}
{JSON.stringify(subjectiveStore.diet, null, 2)}
{JSON.stringify(subjectiveStore.exercise, null, 2)}
{JSON.stringify(subjectiveStore.sleep, null, 2)}
</pre>
-->
