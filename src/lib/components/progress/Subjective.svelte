<script lang="ts">
    import { drNoteState, resetSubjective } from "$lib/stores/drNoteState";
    import { psychologicalSymptoms, somaticSymptoms, options, percentRange, timeDivision, timeUnit, timeUnits, sxProgress, actionType, actionProgress, amPm, pattern, posiNnega, frequency, quality, feeling, suicidalMethod, relationType, interPersonalMethod, alcoholBeverage, bingeEatingType, bingeEatingWhen, exerciseType, exerciseFrequency, noExerciseWhy, sleepQuality } from "$lib/data/progress/subjective";
    import type { SymptomData, SymptomItemsData, InterPersonalData, LeisureNhobbiesData, AlcoholData, DietData, ExerciseData, SleepData } from "$lib/types/progress/subjective";
    import { updateArray } from "$lib/utils/array";
    import { saveToLocalStorage, openFromLocalStorage, loadExistingKeys, loadKeys, deleteSelectedFromLocalStorage, deleteAllFromLocalStorage } from "$lib/utils/localStorage";
//    import SaveToLocalStorageDialog from "$lib/components/dialog/SaveToLocalStorageDialog.svelte";
//    import OpenFromLocalStorageDialog from "$lib/components/dialog/OpenFromLocalStorageDialog.svelte";
//    import DeleteFromLocalStorageDialog from "$lib/components/dialog/DeleteFromLocalStorageDialog.svelte";
    import ManageLocalStorageDialog from "$lib/components/dialog/ManageLocalStorageDialog.svelte";

    // localStorage initialization
    let showManageLocalStorageDialog = false;
//    let showSaveToLocalStorageDialog = false;
//    let showOpenFromLocalStorageDialog = false;
//    let showDeleteFromLocalStorageDialog = false;
//    let nameToSave = new Date().toISOString().replace(/T/, "-").replace(/:/g, "-").replace(/.\d{3}Z$/, "");
    let existingKeys: string[] = loadExistingKeys();
    let keys: string[] = [];
//    let selectedKey = "";

    // Manage 버튼 클릭 시
    function handleManageClick() {
        existingKeys = loadExistingKeys();
        keys = loadKeys();
        showManageLocalStorageDialog = true;
    }
//    // localStorage Open 버튼 클릭 시 keys 로드
//    function handleOpenClick() {
//        keys = loadKeys();
//        selectedKey = keys[0] || "";
//        showOpenFromLocalStorageDialog = true;
//    }
//
//    // localStorage Save 버튼 클릭 시 existingKeys 갱신
//    function handleSaveClick() {
//        nameToSave = new Date().toISOString().replace(/T/, "-").replace(/:/g, "-").replace(/.\d{3}Z$/, "");
//        existingKeys = loadExistingKeys();
//        showSaveToLocalStorageDialog = true;
//    }
//
//    // Delete 버튼 클릭 시 다이얼로그 열기
//    function handleDeleteClick() {
//        existingKeys = loadExistingKeys(); // 최신 키 목록 갱신
//        showDeleteFromLocalStorageDialog = true;
//    }
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
                        <input type="radio" value={option.value} bind:group={$drNoteState.progress.subjective.symptom[symptomGroup][symptomItem.name]} />
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

    <button onclick={() => {
        if (confirm("Subjective 데이터를 초기화하시겠습니까?")) {
            /*
            console.log("Pre-reset state:", $drNoteState.progress.subjective);
            console.log("Resetting subjective...");
            */
            resetSubjective($drNoteState);
            //console.log("Subjective reset:", $drNoteState.progress.subjective);
        }
    }}>Clear Subjective Contents</button>

<!--
    <button onclick={handleSaveClick}>Save to Browser</button>
    <button onclick={handleOpenClick}>Open to Browser</button>
    <button onclick={handleDeleteClick}>Delete from Browser</button>
-->
    <button onclick={handleManageClick}>Manage Browser Storage</button>
    
    {#if showManageLocalStorageDialog}
        <ManageLocalStorageDialog
            existingKeys={existingKeys}
            onSave={(name) => {
                saveToLocalStorage(name, $drNoteState);
                existingKeys = loadExistingKeys();
                keys = loadKeys();
                showManageLocalStorageDialog = false;
            }}
            onOpen={(key) => {
                openFromLocalStorage(key);
                showManageLocalStorageDialog = false;
            }}
            onDeleteSelected={(names) => {
                deleteSelectedFromLocalStorage(names);
                existingKeys = loadExistingKeys();
                keys = loadKeys();
                showManageLocalStorageDialog = false;
            }}
            onDeleteAll={() => {
                deleteAllFromLocalStorage();
                existingKeys = loadExistingKeys();
                keys = loadKeys();
                showManageLocalStorageDialog = false;
            }}
            onClose={() => showManageLocalStorageDialog = false}
        />
    {/if}

<!--
    {#if showSaveToLocalStorageDialog}
        <SaveToLocalStorageDialog
            name={nameToSave}
            existingKeys={existingKeys}
            onSave={(name) => {
                saveToLocalStorage(name, $drNoteState);
                existingKeys = loadExistingKeys(); // 저장후 갱신
                showSaveToLocalStorageDialog = false;
            }}
            onClose={() => showSaveToLocalStorageDialog = false}
        />
    {/if}
    
    {#if showOpenFromLocalStorageDialog}
        <OpenFromLocalStorageDialog
            keys={keys}
            selectedKey={selectedKey}
            onOpen={(key) => {
                openFromLocalStorage(key);
                showOpenFromLocalStorageDialog = false;
            }}
            onClose={() => showOpenFromLocalStorageDialog = false}
        />
    {/if}

    {#if showDeleteFromLocalStorageDialog}
        <DeleteFromLocalStorageDialog
            existingKeys={existingKeys}
            onDeleteSelected={(names) => {
                deleteSelectedFromLocalStorage(names);
                existingKeys = loadExistingKeys();
                keys = loadKeys();
                showDeleteFromLocalStorageDialog = false;
            }}
            onDeleteAll={() => {
                deleteAllFromLocalStorage();
                existingKeys = loadExistingKeys();
                keys = loadKeys();
                showDeleteFromLocalStorageDialog = false;
            }}
            onClose={() => showDeleteFromLocalStorageDialog = false}
        />
    {/if}
-->

<section>
    <h3>Symptoms</h3>
        {@render symptomList(psychologicalSymptoms, "psychological")}
        {@render symptomList(somaticSymptoms, "somatic")}

    <fieldset>
        <legend>mainly occures in/at</legend>
            {@render inputGroup("radio", "occursIn", timeDivision, (value, checked) => {if (checked) $drNoteState.progress.subjective.symptom.occursIn = value;}, $drNoteState.progress.subjective.symptom.occursIn)}
    </fieldset>

        <h4>Attack</h4>
        <fieldset class="flex items-center gap-4">
            {@render inputGroup("radio", "attackType", sxProgress, (value, checked) => {if (checked) $drNoteState.progress.subjective.symptom.attack.type = value;}, $drNoteState.progress.subjective.symptom.attack.type)}
            <input type="number" bind:value={$drNoteState.progress.subjective.symptom.attack.frequency} placeholder="times" />

            {@render inputGroup("radio", "attackUnit", ["day", "week"], (value, checked) => {if (checked) $drNoteState.progress.subjective.symptom.attack.unit = value;}, $drNoteState.progress.subjective.symptom.attack.unit, "/", "", "space-x-2")}

            <label>
                <select bind:value={$drNoteState.progress.subjective.symptom.attack.intensity}>
                    {#each percentRange as pRange}
                        <option value={pRange.value}>{pRange.label}</option>
                    {/each}
                </select>
                % intensity
            </label>
        </fieldset>

        <h4>Suicidal idea</h4>
        <fieldset>
            {@render inputGroup("checkbox", "suicidalType", actionType, (value, checked) => {$drNoteState.progress.subjective.symptom.suicidal.type = updateArray($drNoteState.progress.subjective.symptom.suicidal.type, value, checked);}, $drNoteState.progress.subjective.symptom.suicidal.type)}

            <div class="flex items-center gap-4">
                {@render inputGroup("checkbox", "suicidalMethod", suicidalMethod, (value, checked) => {$drNoteState.progress.subjective.symptom.suicidal.method = updateArray($drNoteState.progress.subjective.symptom.suicidal.method, value, checked);}, $drNoteState.progress.subjective.symptom.suicidal.method)}
                <input type="text" bind:value={$drNoteState.progress.subjective.symptom.suicidal.otherMethod} placeholder="Other method" />
            </div>

            <div class="flex items-center gap-4">
                <input type="number" bind:value={$drNoteState.progress.subjective.symptom.suicidal.when.amount} placeholder="1 day/month/year ago" />
                {@render inputGroup("radio", "suicidalUnit", timeUnits, (value, checked) => {if (checked) $drNoteState.progress.subjective.symptom.suicidal.when.unit = value;}, $drNoteState.progress.subjective.symptom.suicidal.when.unit, "", " ago")}
            </div>
        </fieldset>

        <h4>Homocidal idea</h4>
        <fieldset>
            {@render inputGroup("checkbox", "homocidalType", actionType, (value, checked) => {$drNoteState.progress.subjective.symptom.homocidal.type = updateArray($drNoteState.progress.subjective.symptom.homocidal.type, value, checked);}, $drNoteState.progress.subjective.symptom.homocidal.type)}
        </fieldset>
</section>

<section>
    <h3>Interpersonal Relations</h3>
        <h4>Relationship with</h4>
        <fieldset class="flex items-center gap-4">
            {@render inputGroup("checkbox", "relationType", relationType, (value, checked) => {$drNoteState.progress.subjective.interPersonal.relationType = updateArray($drNoteState.progress.subjective.interPersonal.relationType, value, checked);}, $drNoteState.progress.subjective.interPersonal.relationType)}
            <input type="text" bind:value={$drNoteState.progress.subjective.interPersonal.otherRelationType} placeholder="others" />
            <input type="number" bind:value={$drNoteState.progress.subjective.interPersonal.frequency} placeholder="times" />
            {@render inputGroup("radio", "interPersonalUnit", ["week", "month"], (value, checked) => {if (checked) $drNoteState.progress.subjective.interPersonal.unit = value;}, $drNoteState.progress.subjective.interPersonal.unit, "/", "", "space-x-2")}
        </fieldset>
        <h4>How to play</h4>
        <fieldset class="flex items-center gap-4">
            {@render inputGroup("checkbox", "interPersonalMethod", interPersonalMethod, (value, checked) => {$drNoteState.progress.subjective.interPersonal.method = updateArray($drNoteState.progress.subjective.interPersonal.method, value, checked);}, $drNoteState.progress.subjective.interPersonal.method)}
            <input type="text" bind:value={$drNoteState.progress.subjective.interPersonal.otherMethod} placeholder="others" />
        </fieldset>
        <h4>Withdrawal</h4>
        <fieldset>
            {@render inputGroup("radio", "interPersonalWithdrawal", ["social withdrawal", "no relationship"], (value, checked) => {if (checked) $drNoteState.progress.subjective.interPersonal.withdrawal = value;}, $drNoteState.progress.subjective.interPersonal.withdrawal, "", "", "space-x-2")}
    </fieldset>
</section>

<section>
    <h3>Leisure & Hobbies</h3>
    <fieldset>
        <div class="flex items-center gap-4">
            <input type="checkbox" id="noLeisure" bind:checked={$drNoteState.progress.subjective.leisureNhobbies.noLeisure} />
            <label for="noLeisure">No Leisure</label>
            <input type="text" bind:value={$drNoteState.progress.subjective.leisureNhobbies.leisure} placeholder="여가 내용" disabled={$drNoteState.progress.subjective.leisureNhobbies.noLeisure} />
        </div>
        <div class="flex items-center gap-4">
            <input type="checkbox" id="noPleasure" bind:checked={$drNoteState.progress.subjective.leisureNhobbies.noPleasure} />
            <label for="noPleasure">No Pleasure</label>
            <input type="text" bind:value={$drNoteState.progress.subjective.leisureNhobbies.pleasure} placeholder="pleasures" disabled={$drNoteState.progress.subjective.leisureNhobbies.noPleasure} />
        </div>
        <div class="flex items-center gap-4">
            <input type="checkbox" id="noHobby" bind:checked={$drNoteState.progress.subjective.leisureNhobbies.noHobby} />
            <label for="noHobby">No Hobby</label>
            <input type="text" bind:value={$drNoteState.progress.subjective.leisureNhobbies.hobby} placeholder="취미 내용" disabled={$drNoteState.progress.subjective.leisureNhobbies.noHobby} />
        </div>
    </fieldset>
</section>

<section>
    <h3>Alcohol</h3>
        <h4>Alcoholic beverage</h4>
        <fieldset>
            {@render inputGroup("checkbox", "alcoholBeverage", alcoholBeverage, (value, checked) => {$drNoteState.progress.subjective.alcohol.alcoholBeverage = updateArray($drNoteState.progress.subjective.alcohol.alcoholBeverage, value, checked);}, $drNoteState.progress.subjective.alcohol.alcoholBeverage)}
        </fieldset>
        <h4>Amount & Frequency</h4>
        <fieldset>
        <div class="flex items-center gap-4">
            <input type="text" id="alcoholAmount" bind:value={$drNoteState.progress.subjective.alcohol.amount} placeholder="amount" />
            <label for="alcoholAmount">/one time</label><br>
            <input type="text" bind:value={$drNoteState.progress.subjective.alcohol.frequency} placeholder="times" />
            {@render inputGroup("radio", "alcoholUnit", ["day", "week", "month"], (value, checked) => {if (checked) $drNoteState.progress.subjective.alcohol.unit = value;}, $drNoteState.progress.subjective.alcohol.unit, "/", "", "space-x-2")}
        </div>
        <span>changed over time:</span>
            {@render inputGroup("radio", "alcoholProgress", actionProgress, (value, checked) => {$drNoteState.progress.subjective.alcohol.alcoholSnack = updateArray($drNoteState.progress.subjective.alcoholSnack, value, checked);}, $drNoteState.progress.subjective.alcohol.alcoholSnack)}
        </fieldset>
</section>

<section>
    <h3>Diet</h3>
        <h4>Intake interval</h4>
        <fieldset>
            <div class="flex items-center gap-4">
                {@render inputGroup("radio", "intakeInterval", pattern, (value, checked) => {if (checked) $drNoteState.progress.subjective.diet.interval = value;}, $drNoteState.progress.subjective.diet.interval)}
                <input type="text" id="intakeTimes" bind:value={$drNoteState.progress.subjective.diet.frequency} placeholder="times" />
                <label for="intakeTimes">times/day</label>
            </div>
            <div class="flex items-center gap-4">
                <label for="intakeAppetite">appetite</label>
                {@render inputGroup("radio", "intakeAppetite", posiNnega, (value, checked) => {if (checked) $drNoteState.progress.subjective.diet.appetite = value;}, $drNoteState.progress.subjective.diet.appetite)}
            </div>
        </fieldset>
        <h4>Binge eating</h4>
        <fieldset>
            <div class="flex items-center gap-4">
                <label for="bingeEatingType">what food:</label>
                {@render inputGroup("checkbox", "bingeEatingType", bingeEatingType, (value, checked) => {$drNoteState.progress.subjective.diet.bingeEating.type = updateArray($drNoteState.progress.subjective.diet.bingeEating.type, value, checked);}, $drNoteState.progress.subjective.diet.bingeEating.type)}
                <input type="text" bind:value={$drNoteState.progress.subjective.diet.bingeEating.otherType} placeholder="other food" />
            </div>
            {@render inputGroup("checkbox", "bingeEatingWhen", bingeEatingWhen, (value, checked) => {$drNoteState.progress.subjective.diet.bingeEating.when = updateArray($drNoteState.progress.subjective.diet.bingeEating.when, value, checked);}, $drNoteState.progress.subjective.diet.bingeEating.when)}
        </fieldset>
</section>

<section>
    <h3>Exercise</h3>
    <fieldset>
        <div class="flex items-center gap-4">
            {@render inputGroup("checkbox", "exerciseType", exerciseType, (value, checked) => {$drNoteState.progress.subjective.exercise.type = updateArray($drNoteState.progress.subjective.exercise.type, value, checked);}, $drNoteState.progress.subjective.exercise.type)}
            <input type="text" bind:value={$drNoteState.progress.subjective.exercise.otherType} placeholder="other exercise" />
        </div>
    </fieldset>
    <fieldset>
        <legend>duration & frequency</legend>
            <input type="text" id="exerciseDuration" bind:value={$drNoteState.progress.subjective.exercise.duration} disabled={$drNoteState.progress.subjective.exercise.under30min} />
            <label for="exerciseDuration">hr</label>
            <input type="checkbox" id="exerciseUnder30min" bind:checked={$drNoteState.progress.subjective.exercise.under30min} />
            <label for="exerciseUnder30min">&lt; 30min</label>
            {@render inputGroup("radio", "exerciseFrequency", exerciseFrequency, (value, checked) => {if (checked) $drNoteState.progress.subjective.exercise.frequency = value;}, $drNoteState.progress.subjective.exercise.frequency)}
    </fieldset>
    <fieldset class="flex items-center gap-4">
        <legend>do not exercise d/t</legend>
            {@render inputGroup("checkbox", "noExerciseWhy", noExerciseWhy, (value, checked) => {$drNoteState.progress.subjective.exercise.noExercise.why = updateArray($drNoteState.progress.subjective.exercise.noExercise.why, value, checked);}, $drNoteState.progress.subjective.exercise.noExercise.why)}
            <input type="text" bind:value={$drNoteState.progress.subjective.exercise.noExercise.otherWhy} placeholder="기타 이유" />
    </fieldset>
</section>

<section>
    <h3>Sleep</h3>
        <h4>Night sleep</h4>
        <fieldset>
            <input type="checkbox" id="sleepSleepDisturbance" bind:checked={$drNoteState.progress.subjective.sleep.nightSleep.sleepDisturbance} />
            <label for="sleepSleepDisturbance">sleep disturbance</label>
            <div class="flex items-center gap-4">
                <label for="sleepTakingMedicine">복약</label><input type="text" id="sleepTakingMedicine" bind:value={$drNoteState.progress.subjective.sleep.nightSleep.takingMedicine} />
                {@render inputGroup("radio", "sleepTakingMedicineUnit", amPm, (value, checked) => {if (checked) $drNoteState.progress.subjective.sleep.nightSleep.takingMedicineUnit = value;}, $drNoteState.progress.subjective.sleep.nightSleep.takingMedicineUnit)}
                <label for="sleepFallAsleep">복약</label><input type="text" id="sleepFallAsleep" bind:value={$drNoteState.progress.subjective.sleep.nightSleep.fallAsleep} />
                {@render inputGroup("radio", "sleepFallAsleepUnit", amPm, (value, checked) => {if (checked) $drNoteState.progress.subjective.sleep.nightSleep.fallAsleepUnit = value;}, $drNoteState.progress.subjective.sleep.nightSleep.fallAsleepUnit)}
                <label for="sleepWakeUp">복약</label><input type="text" id="sleepWakeUp" bind:value={$drNoteState.progress.subjective.sleep.nightSleep.wakeUp} />
                {@render inputGroup("radio", "sleepWakeUpUnit", amPm, (value, checked) => {if (checked) $drNoteState.progress.subjective.sleep.nightSleep.wakeUpUnit = value;}, $drNoteState.progress.subjective.sleep.nightSleep.wakeUpUnit)}
            </div>
        </fieldset>
        <fieldset class="flex items-center gap-4">
            <label for="sleepSleepInductionTime">입면</label>
            <input type="text" id="sleepSleepInductionTime" bind:value={$drNoteState.progress.subjective.sleep.nightSleep.sleepInductionTime} placeholder="1시간 정도에 잠이 듬" />
            <input type="checkbox" id="sleepSleepWithin1hr" bind:checked={$drNoteState.progress.subjective.sleep.nightSleep.sleepInductionWithin1hr} />
            <label for="sleepSleepWithin1hr">&lt; 1hr</label>
        </fieldset>
        <fieldset>
            <legend>broken sleep</legend>
                <div class="flex items-center gap-4">
                    {@render inputGroup("radio", "sleepBrokenSleep", frequency, (value, checked) => {if (checked) $drNoteState.progress.subjective.sleep.nightSleep.brokenSleep = value;}, $drNoteState.progress.subjective.sleep.nightSleep.brokenSleep)}
                    <input type="text" id="sleepBrokenSleepFrequency" bind:value={$drNoteState.progress.subjective.sleep.nightSleep.brokenSleepFrequency} />
                    <label for="sleepBrokenSleepFrequency">/night</label>
                    <input type="checkbox" id="sleepBrokenSleepDtUrination" bind:checked={$drNoteState.progress.subjective.sleep.nightSleep.brokenSleepDtUrination} placeholder="하루밤에 몇번 깨나?" /><label for="sleepBrokenSleepDtUrination">d/t 소변</label>
                </div>
            <legend>re-sleep</legend>
                <div class="flex items-center gap-4">
                    <input type="checkbox" id="sleepResleep" bind:checked={$drNoteState.progress.subjective.sleep.nightSleep.resleep} />
                    <label for="sleepResleep">fall in re-sleep</label>
                    <label for="sleepResleepInductionTime">: within </label>
                    <input type="text" id="sleepResleepInductionTime" bind:value={$drNoteState.progress.subjective.sleep.nightSleep.resleepInductionTime} placeholder="다시 잠들때까지의 시간" />
                    <label for="sleepResleepInductionTime">min</label>
                </div>
            <legend>sleep quality</legend>
                <div class="flex items-center gap-4">
                    {@render inputGroup("radio", "sleepQuality", quality, (value, checked) => {if (checked) $drNoteState.progress.subjective.sleep.nightSleep.quality = value;}, $drNoteState.progress.subjective.sleep.nightSleep.quality)}
                    {@render inputGroup("checkbox", "sleepQualityOther", sleepQuality, (value, checked) => {$drNoteState.progress.subjective.sleep.nightSleep.qualityOther = updateArray($drNoteState.progress.subjective.sleep.nightSleep.qualityOther, value, checked);}, $drNoteState.progress.subjective.sleep.nightSleep.qualityOther)}
                </div>
            <legend>awakening feeling</legend>
                {@render inputGroup("radio", "sleepAwakenFeeling", feeling, (value, checked) => {if (checked) $drNoteState.progress.subjective.sleep.nightSleep.awakenFeeling = value;}, $drNoteState.progress.subjective.sleep.nightSleep.awakening)}
            <legend>insomnia</legend>
                {@render inputGroup("checkbox", "sleepInsomnia", ["initial", "middle", "terminal"], (value, checked) => {$drNoteState.progress.subjective.sleep.nightSleep.insomnia = updateArray($drNoteState.progress.subjective.sleep.nightSleep.insomnia, value, checked);}, $drNoteState.progress.subjective.sleep.nightSleep.insomnia)}
            <legend>sedation</legend>
                <label for="sleepMorningSedation">morning sedation</label>
                {@render inputGroup("radio", "sleepMorningSedation", ["+", "-", "+/-", "under 1hr", "AM", "PM", "all day"], (value, checked) => {if (checked) $drNoteState.progress.subjective.sleep.nightSleep.morningSedation = value;}, $drNoteState.progress.subjective.sleep.nightSleep.morningSedation)}
        </fieldset>
        <h4>Nap</h4>
        <fieldset class="flex items-center gap-4">
            <input type="text" id="sleepNapDuration" bind:value={$drNoteState.progress.subjective.sleep.nap.napDuration} placeholder="낮잠 시간" />
            {@render inputGroup("radio", "sleepNapDuration", ["min", "hr"], (value, checked) => {if (checked) $drNoteState.progress.subjective.sleep.nap.napDurationUnit = value;}, $drNoteState.progress.subjective.sleep.nap.napDurationUnit)}
            <label for="sleepNapFeeling">nap feeling:</label>
            {@render inputGroup("radio", "sleepNapFeeling", ["개운", "늘어짐"], (value, checked) => {if (checked) $drNoteState.progress.subjective.sleep.nap. napFeeling = value;}, $drNoteState.progress.subjective.sleep.nap.napFeeling)}
        </fieldset>
        <h4>Dream</h4>
        <fieldset>
            <div class="flex items-center gap-4">
                <label for="dreamContent">contents</label>
                <input type="text" id="dreamContent" bind:value={$drNoteState.progress.subjective.sleep.dream.content} placeholder="꿈 내용" />
            </div>
            <div class="flex items-center gap-4">
                <label for="dreamRemenber">remenber</label>
                {@render inputGroup("checkbox", "dreamRemenber", ["+", "-", "잘 나지 않음", "많음"], (value, checked) => {$drNoteState.progress.subjective.sleep.dream.remember = updateArray($drNoteState.progress.subjective.sleep.dream.remember, value, checked);}, $drNoteState.progress.subjective.sleep.dream.remember)}
            </div>
            <div class="flex items-center gap-4">
                <label for="dreamFeeling">feeling/emotion</label>
                {@render inputGroup("checkbox", "dreamFeeling", ["good", "sad", "anger", "fear", "+/-"], (value, checked) => {$drNoteState.progress.subjective.sleep.dream.feeling = updateArray($drNoteState.progress.subjective.sleep.dream.feeling, value, checked);}, $drNoteState.progress.subjective.sleep.dream.feeling)}
            </div>
            <div class="flex items-center gap-4">
                <label for="dreamResonance">여운</label>
                {@render inputGroup("radio", "dreamResonance", posiNnega, (value, checked) => {if (checked) $drNoteState.progress.subjective.sleep.dream.resonance = value;}, $drNoteState.progress.subjective.sleep.dream.resonance)}
            </div>
            <div class="flex items-center gap-4">
                <input type="checkbox" id="dreamNightmare" bind:checked={$drNoteState.progress.subjective.sleep.dream.nightmare} />
                <label for="dreamNightmare">nightmare</label>
            </div>
        </fieldset>
</section>

</section>
