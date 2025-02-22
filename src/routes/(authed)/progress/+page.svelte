<script lang='ts'>
    import type { PageServerData } from './$types';
//    import RadioGroup from './RadioGroup.svelte';

    let { data }: { data: PageServerData } = $props();

    const psychologicalSymptoms = [
        // pychological
        { name: 'depressive', label: 'depressive' },
        { name: 'lack_of_drive', label: 'lack of drive' },
        { name: 'low_energy', label: 'low energy' },
        { name: 'alxithymic', label: 'alexithymic' },
        { name: 'foggy_groggy', label: 'foggy/groggy' },
        { name: 'irritable', label: 'irritable' },
        { name: 'anger', label: 'anger' },
        { name: 'impulsive', label: 'impulsive' },
    ];

    const somaticSymptoms = [
        // autonomic
        { name: 'heating_sense', label: 'heating sense' },
        { name: 'sweating', label: 'sweating' },
        { name: 'impending_death', label: 'impending death' },
        // head & neck
        { name: 'concentration', label: 'concentration' },
        { name: 'headacheMigraine', label: 'headache/migraine' },
        { name: 'blepharospasm', label: 'blepharospasm' },
        { name: 'tinnitus', label: 'tinnitus' },
        { name: 'vertigo', label: 'vertigo' },
        { name: 'globus', label: 'globus' },
        // chest
        { name: 'palpitation', label: 'palpitation' },
        { name: 'heaviness', label: 'heaviness' },
        { name: 'dyspnea', label: 'dyspnea' },
        // abdomen
        { name: 'nausea', label: 'nausea' },
        { name: 'indigestion', label: 'indigestion' },
    ];

    const options = [
        { value: 'negative', label: '-' },
        { value: 'positive', label: '+' },
        { value: 'neutral', label: '+/-' },
        { value: 'improved', label: 'improved' },
        { value: 'aggravated', label: 'aggravated' }
    ];

    const percentRange = Array.from({ length: 10 }, (_, i) => ({
        value: `${90 - i * 10}`,
        label: `${90 - i * 10}`
    }));

    const timePeriods = ['awake', 'morning', 'noon', 'afternoon', 'dusk', 'evening', 'night', 'before bed', 'sleep'];
    const sxProgress = ['persist', 'aggravated', 'improved', 'resolved'];

    interface SymptomData {
        psychological: Record<string, string>;
        somatic: Record<string, string>;
        occursIn: string;
        attack: {
            type: string;
            frequency: string;
            unit: string;
            intensity: string;
        };
        suicidal: {
            type: string[];
            method: string[];
            otherMethod: string;
            when: {
                amount: string;
                unit: string;
            };
        };
        homocidal: {
            type: string[];
        };
    }

    interface SymptomItemsData {
        name: string;
        label: string;
    }

    let symptom = $state<SymptomData>({
        psychological: {},
        somatic: {},
        occursIn: '',
        attack: { type: '', frequency: '', unit: '', intensity: '' },
        suicidal: { type: [], method: [], otherMethod: '', when: { amount: '', unit: ''} },
        homocidal: { type: [] },
    })

    interface InterPersonalData {
        relationType: string[];
        otherRelationType: string;
        frequency: string;
        unit: string;
        method: string[];
        otherMethod: string;
        withdrawal: string;
    }

    let interPersonal = $state<InterPersonalData>({
        relationType: [], otherRelationType: '', frequency: '', unit: '', method: [], otherMethod: '', withdrawal: ''
    })

    interface LeisureNhobbiesData {
        noLeisure: boolean;
        leisure: string;
        noPleasure: boolean;
        pleasure: string;
        noHobby: boolean;
        hobby: string;
    }

    let leisureNhobbies = $state<LeisureNhobbiesData>({
        noLeisure: false, leisure: '', noPleasure: false, pleasure: '', noHobby: false, hobby: ''
    })

    interface AlcoholData {
        alcoholicBeverage: string[];
        progress: string;
        amount: string;
        frequency: string;
        unit: string;
        otherType: string[];
        alcoholicSnack: string[];
    }

    let alcohol = $state<AlcoholData>({
        alcoholicBeverage: [], progress: '', amount: '', frequency: '', unit: '', otherType: [], alcohokicSnack: []
    })

    function updateArray(stateArray: string[], value: string, checked: boolean): string[] {
            if (checked) {
                return [...stateArray, value];
            } else {
                return stateArray.filter(item => item !== value);
            }
        }
</script>

{#snippet symptomList(symptomItems: SymptomItemsData[], symptomGroup: 'psychological' | 'somatic')}
    <fieldset>
        <legend>{symptomGroup == 'psychological' ? 'Psychological Symptoms' : 'Somatic Symptoms'}</legend>
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

<!--
{#snippet inputGroup(type: 'radio' | 'checkbox', name: string = '', options: string[], bindFunction: (value: string, checked: boolean | string) => void, currentValues: string[] | string, className: string = 'flex items-center gap-4')}
    <div class={className}>
        {#each options as option}
            <label>
                <input 
                    type={type} 
                    value={option} 
                    name={name} 
                    checked={type === 'radio' ? currentValues === option : (currentValues as string[]).includes(option)} 
                    onchange={(e) => bindFunction(option, type === 'radio' ? option : e.target.checked)} 
                />
                {option}
            </label>
        {/each}
    </div>
{/snippet}

// 사용 예시
{@render inputGroup('checkbox', 'relationType', ['social', 'friends', 'family', 'neighbor'], (value, checked) => {interPersonal.relationType = updateArray(interPersonal.relationType, value as boolean);}, interPersonal.relationType)}
{@render inputGroup('radio', 'interPersonalWithdrawalType', ['social withdrawal', 'no relationship'], (value) => interPersonal.withdrawalType = value as string, interPersonal.withdrawalType)}
-->

{#snippet radioGroup(name: string = '', options: string[], bindFunction: (value: string) => void, currentValue: string, labelPrefix: string = '', labelSuffix: string = '', className: string = 'flex items-center gap-4')}
    <div class={className}>
        {#each options as option}
          <label>
            <input type="radio" value={option} name={name} checked={currentValue === option} onchange={() => bindFunction(option)} />
            {labelPrefix}{option}{labelSuffix}
          </label>
        {/each}
    </div>
{/snippet}

{#snippet checkboxGroup(options: string[], bindFunction: (value: string, checked: boolean) => void, currentValues: string[],  labelPrefix: string = '', labelSuffix: string = '')}
    <div class="flex items-center gap-4">
        {#each options as option}
            <label>
                <input type="checkbox" value={option} checked={currentValues.includes(option)} onchange={(e) => bindFunction(option, e.target.checked)} />
                {labelPrefix}{option}{labelSuffix}
            </label>
        {/each}
    </div>
{/snippet}


<article class="prose">
<h1>{data.user.username} Progress Notes</h1>
<p>You are in the authed & welcomed.</p>
<p>Your user ID is {data.user.id}.</p>

<form>
<h2>Subjective</h2>
    <h3>Symptoms</h3>
    {@render symptomList(psychologicalSymptoms, "psychological")}
    {@render symptomList(somaticSymptoms, "somatic")}

    <fieldset>
        <legend>mainly occures in/at</legend>
            {@render radioGroup("occursIn", timePeriods, (value) => symptom.occursIn = value, symptom.occursIn)}
    </fieldset>

    <fieldset>
        <legend>Attack</legend>
        <div class="flex items-center gap-4">
            {@render radioGroup("attackType", sxProgress, (value) => symptom.attack.type = value, symptom.attack.type, "", "", "space-x-2")}

            <input type="number" bind:value={symptom.attack.frequency} placeholder="times" />

            {@render radioGroup("attackUnit", ['day', 'week'], (value) => symptom.attack.unit = value, symptom.attack.unit,  "/", "", "space-x-2")}

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
            {@render checkboxGroup(['idea', 'plan', 'attempt'], (value, checked) => {symptom.suicidal.type = updateArray(symptom.suicidal.type, value, checked);}, symptom.suicidal.type)}

        <div class="flex items-center gap-4">
            {@render checkboxGroup(['hanging', 'poisoning', 'knife'], (value, checked) => {symptom.suicidal.method = updateArray(symptom.suicidal.method, value, checked);}, symptom.suicidal.method)}
            <input type="text" bind:value={symptom.suicidal.otherMethod} placeholder="Other method" />
        </div>

        <div class="flex items-center gap-4">
            <input type="number" bind:value={symptom.suicidal.when.amount} placeholder="1 day/month/year ago" />
            {@render radioGroup("suicidalUnit", ['days', 'months', 'years'], (value) => symptom.suicidal.when.unit = value, symptom.suicidal.when.unit, "", " ago", "space-x-2")}
        </div>
    </fieldset>

    <fieldset>
        <legend>Homocidal idea</legend>
            {@render checkboxGroup(['idea', 'plan', 'attempt'], (value, checked) => {symptom.homocidal.type = updateArray(symptom.homocidal.type, value, checked);}, symptom.homocidal.type)}
    </fieldset>

    <h3>Interpersonal Relations</h3>
    <fieldset>
        <legend>Relationship with</legend>
        <div class="flex items-center gap-4">
            {@render checkboxGroup(['social', 'friends', 'family', 'neighbor'], (value, checked) => {interPersonal.relationType = updateArray(interPersonal.relationType, value, checked);}, interPersonal.relationType, "", "", "space-x-2")}
            <input type="text" bind:value={interPersonal.otherRelationType} placeholder="others" />
            <input type="number" bind:value={interPersonal.frequency} placeholder="times" />
            {@render radioGroup("interPersonalUnit", ['week', 'month'], (value) => interPersonal.unit = value, interPersonal.unit, "/", "", "space-x-2")}
        </div>
        <legend>How to play</legend>
        <div class="flex items-center gap-4">
            {@render checkboxGroup(['talking', 'eating', 'drinking', 'traveling'], (value, checked) => {interPersonal.method = updateArray(interPersonal.method, value, checked);}, interPersonal.method, "", "", "")}
            <input type="text" bind:value={interPersonal.otherMethod} placeholder="others" />
        </div>
        <legend>Withdrawal</legend>
            {@render radioGroup("interPersonalWithdrawal", ['social withdrawal', 'no relationship'], (value) => interPersonal.withdrawal= value, interPersonal.withdrawal, "", "", "space-x-2")}
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
            {@render checkboxGroup(['소주', 'beer', 'wine', '양주', '막걸리', '폭탄주', 'mix'], (value, checked) => {alcohol.alcoholicBeverage = updateArray(alcohol.alcoholicBeverage, value, checked);}, alcohol.alcoholicBeverage, "", "", "", "")}
        <legend>amount & frequency</legend>
            <input type="text" name="alcoholAmount" bind:value={alcohol.amount} placeholder="amount" /><label for="alcoholAmount">/one time</label><br>
        <div class="flex items-center gap-4">
            <input type="text" bind:value={alcohol.frequency} placeholder="times" />
            {@render radioGroup("alcoholUnit", ['day', 'week', 'month'], (value) => alcohol.unit = value, alcohol.unit, "/", "", "space-x-2")}
        </div>
        <span>changed over time:</span>
            {@render radioGroup("alcoholProgress", ['persist', 'increase', 'neutral', 'decrease'], (value) => alcohol.progress = value, alcohol.progress, "", "", "")}

        <legend>Alcohol snack</legend>
            {@render checkboxGroup(['안주 없음', 'meat', 'fruits', '반찬', '...'], (value, checked) => {alcohol.alcohokicSnack = updateArray(alcohol.alcohokicSnack, value, checked);}, alcohol.alcohokicSnack, "", "", "")}
    </fieldset>
</form>

<pre class="p-4 bg-gray-100 text-gray-900 rounded">
{JSON.stringify(symptom, null, 2)}
{JSON.stringify(interPersonal, null, 2)}
{JSON.stringify(leisureNhobbies, null, 2)}
{JSON.stringify(alcohol, null, 2)}
</pre>

</article>
