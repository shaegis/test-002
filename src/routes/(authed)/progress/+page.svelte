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
        { value: 'aggrevated', label: 'aggrevated' }
    ];

    const percentRange = Array.from({ length: 10 }, (_, i) => ({
        value: `${90 - i * 10}`,
        label: `${90 - i * 10}`
    }));

    const timePeriods = ['awake', 'morning', 'noon', 'afternoon', 'dusk', 'evening', 'night', 'before bed', 'sleep'];
    const sxProgress = ['persist', 'aggravated', 'improved', 'resolved'];

    let form = $state({
        psychological: {} as Record<string, string>,
        somatic: {} as Record<string, string>,
        occursIn: '',
        attack: {
            type: '',
            frequency: '',
            unit: '',
            intensity: ''
        },
        suicidal: {
            type: [] as string[],
            methods: [] as string[],
            otherMethod: '',
            when: {
                amount: '',
                unit: ''
            }
        },
        homocidal: {
            type: [] as string[]
        },
    });
</script>

{#snippet symptoms(symptom, symptomGroup)}
    <div class="flex items-center gap-4">
        <span>{symptom.label}</span>
        {#each options as option}
            <label>
                <input type="radio" value={option.value} bind:group={form[symptomGroup][symptom.name]} />
                {option.label}
            </label>
        {/each}
    </div>
{/snippet}

<!--
{#snippet radioGroup(options, bindTo, labelPrefix = '')}
    {#each options as option}
        <label>
            <input type="radio" value={option} bind:group={bindTo} />
            {labelPrefix}{option}
        </label>
    {/each}
{/snippet}
usage: {@render radioGroup(timePeriods, form.occursIn)}
첫 번째 방법은 부모의 상태를 직접 업데이트하는 함수를 통해 우회하고 있는 반면, 두 번째 방법은 스니펫 매개변수에 직접 양방향 바인딩을 시도하여 불변성 규칙에 위배되기 때문에 에러가 발생합니다.

{#snippet checkboxGroup(options, bindTo)}
    {#each options as option}
        <label>
            <input type="checkbox" value={option} bind:group={bindTo} />
            {option}
        </label>
    {/each}
{/snippet}
usage: {@render checkboxGroup(['idea', 'plan', 'attempt'], form.suicidal.type)}
-->

{#snippet radioGroup(options, bindFunction, labelPrefix = '', labelSuffix = '')}
  {#each options as option}
    <label>
      <input type="radio" value={option} onchange={bindFunction(option)} checked={form[bindPath] === option} />
      {labelPrefix}{option}{labelSuffix}
    </label>
  {/each}
{/snippet}

<!--
{#snippet checkboxGroup(options, bindFunction, labelPrefix = '', labelSuffix = '')}
    {#each options as option}
        <label>
            <input type="checkbox" value={option} onchange={bindFunction(option)} />
            {labelPrefix}{option}{labelSuffix}
        </label>
    {/each}
{/snippet}

usage: more complex.
{@render checkboxGroup(['idea', 'plan', 'attempt'], (value, event) => {
    if (event.target.checked) {
        form.suicidal.type = [...form.suicidal.type, value]; // Add if checked
    } else {
        form.suicidal.type = form.suicidal.type.filter(item => item !== value); // Remove if unchecked
    }
})}
-->

<article class="prose">
<h1>{data.user.username} Progress Notes</h1>
<p>You are in the authed & welcomed.</p>
<p>Your user ID is {data.user.id}.</p>

<form>
<h2>Subjective</h2>
    <h3>Symptoms</h3>
    <fieldset>
        <legend>Psychological Symptoms</legend>
        {#each psychologicalSymptoms as symptom}
            {@render symptoms(symptom, "psychological")}
       {/each}
    </fieldset>

    <fieldset>
        <legend>Somatic Symptoms</legend>
        {#each somaticSymptoms as symptom}
            {@render symptoms(symptom, "somatic")}
        {/each}
    </fieldset>

    <fieldset>
        <legend>mainly occures in/at</legend>
        <div class="flex items-center gap-4">
            {@render radioGroup(timePeriods, (value) => form.occursIn = value)}
        <!--
            <RadioGroup options={timePeriods} bind:group={from.occursIn} /> Fail to use Component d/t bind:...
            {#each timePeriods as period}
                <label>
                    <input type="radio" value={period} bind:group={form.occursIn} />
                    {period}
                </label>
            {/each}
        -->
        </div>
    </fieldset>

    <fieldset>
        <legend>Attack</legend>
        <div class="flex items-center gap-4">
            {@render radioGroup(sxProgress, (value) => form.attack.type = value)}
            <!--
            {#each sxProgress as progress}
                <label>
                    <input type="radio" value={progress} bind:group={form.attack.type} />
                    {progress}
                </label>
            {/each}
            -->

            <input
                type="number" bind:value={form.attack.frequency} placeholder="times" />

            {@render radioGroup(['day', 'week'], (value) => form.attack.unit = value, "/")}
            <!--
            {#each ['day', 'week'] as unit}
                <label>
                    <input type="radio" value={unit} bind:group={form.attack.unit} />
                    / {unit}
                </label>
            {/each}
            -->

            <label>
                <select bind:value={form.attack.intensity}>
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
        <div class="flex items-center gap-4">
            {#each ['idea', 'plan', 'attempt'] as type}
                <label>
                    <input type="checkbox" value={type} bind:group={form.suicidal.type} />
                    {type}
                </label>
            {/each}
        </div>

        <div class="flex items-center gap-4">
            {#each ['hanging', 'poisoning', 'knife'] as method}
                <label>
                    <input type="checkbox" value={method} bind:group={form.suicidal.methods} />
                    {method}
                </label>
            {/each}
            <input type="text" bind:value={form.suicidal.otherMethod} placeholder="Other method" />
        </div>

        <div class="flex items-center gap-4">
            <input type="number" bind:value={form.suicidal.when.amount} placeholder="1 day/month/year ago" />
            {@render radioGroup(['days', 'months', 'years'], (value) => form.suicidal.when.unit = value, "", " ago")}
            <!--
            {#each ['days', 'months', 'years'] as unit}
                <label>
                    <input type="radio" value={unit} bind:group={form.suicidal.when.unit} />
                    {unit} ago
                </label>
            {/each}
            -->
        </div>
    </fieldset>

    <fieldset>
        <legend>Homocidal idea</legend>
        <div class="flex items-center gap-4">
            {#each ['idea', 'plan', 'attempt'] as type}
                <label>
                    <input type="checkbox" value={type} bind:group={form.homocidal.type} />
                    {type}
                </label>
            {/each}
        </div>
    </fieldset>

    <h3>Interpersonal Relations</h3>
</form>

<pre class="p-4 bg-gray-100 text-gray-900 rounded">
{JSON.stringify(form, null, 2)}
</pre>

</article>
