<script lang='ts'>
    import type { PageServerData } from './$types';

    let { data }: { data: PageServerData } = $props();

    const psychological_symptoms = [
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

    const somatic_symptoms = [
        // autonomic
        { name: 'heating_sense', label: 'heating sense' },
        { name: 'sweating', label: 'sweating' },
        { name: 'impending_death', label: 'impending death' },
        // head & neck
        { name: 'concentation', label: 'concentation' },
        { name: 'headache_migrain', label: 'headache/migrain' },
        { name: 'blepharospasm', label: 'blepharospasm' },
        { name: 'tinnitus', label: 'tinnitus' },
        { name: 'vertigo', label: 'vertigo' },
        { name: 'globus', label: 'globus' },
        // chest
        { name: 'palpitation', label: 'palpitation' },
        { name: 'heaviness', label: 'heaviness' },
        { name: 'dyspnea', label: 'dyspnea' },
        // abdomen
        { name: 'nasea', label: 'nasea' },
        { name: 'indigestion', label: 'indigestion' },
    ];

    const options = [
        { value: 'negative', label: '-' },
        { value: 'positive', label: '+' },
        { value: 'neutral', label: '+/-' },
        { value: 'improved', label: 'improved' },
        { value: 'aggrevated', label: 'aggrevated' }
    ];

    const percent_range = Array.from({ length: 10 }, (_, i) => ({
        value: `${90 - i * 10}`,
        label: `${90 - i * 10}`
    }));

    const time_periods = ['awake', 'morning', 'noon', 'afternoon', 'dusk', 'evening', 'night', 'before bed', 'sleep'];

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
            idea: false,
            plan: false,
            attampt: false,
            methods: [] as string[],
            otherMethod: '',
            when: {
                amount: '',
                unit: ''
            }
        },
        homocidal: {
            idea: false,
            plan: false,
            attempt: false
        }
    });
</script>

<article class="prose">
    <h1>{data.user.username} Progress Notes</h1>
    <p>You are in the authed & welcomed.</p>
    <p>Your user ID is {data.user.id}.</p>

    <form>
        <h2>Subjective</h2>
        <section>
            <h3>Symptoms</h3>
            <fieldset>
                <legend>Psychological Symptoms</legend>
                {#each psychological_symptoms as symptom}
                    <div class="flex items-center gap-4">
                        <span>{symptom.label}</span>
                        {#each options as option}
                            <label>
                                <input
                                    type="radio"
                                    value={option.value}
                                    bind:group={form.psychological[symptom.name]}
                                />
                                <span>{option.label}</span>
                            </label>
                        {/each}
                    </div>
                {/each}
            </fieldset>

            <fieldset>
                <legend>Somatic Symptoms</legend>
                {#each somatic_symptoms as symptom}
                    <div class="flex items-center gap-4">
                        <span>{symptom.label}</span>
                        {#each options as option}
                            <label>
                                <input
                                    type="radio"
                                    value={option.value}
                                    bind:group={form.somatic[symptom.name]}
                                />
                                <span>{option.label}</span>
                            </label>
                        {/each}
                    </div>
                {/each}
            </fieldset>

            <fieldset>
                <legend>mainly occures in/at</legend>
                <div class="flex items-center gap-4">
                    {#each time_periods as period}
                        <label>
                            <input
                                type="radio"
                                value={period}
                                bind:group={form.occursIn}
                            />
                            {period}
                        </label>
                    {/each}
                </div>
            </fieldset>

            <fieldset>
                <legend>Attack</legend>
                <div class="flex items-center gap-4">
                    {#each ['persist', 'aggrevated', 'improved', 'resolved'] as type}
                        <label>
                            <input
                                type="radio"
                                value={type}
                                bind:group={form.attack.type}
                            />
                            {type}
                        </label>
                    {/each}

                    <input
                        type="number"
                        bind:value={form.attack.frequency}
                        placeholder="times"
                    />

                    {#each ['day', 'week'] as unit}
                        <label>
                            <input
                                type="radio"
                                value={unit}
                                bind:group={form.attack.unit}
                            />
                            /{unit}
                        </label>
                    {/each}

                    <label>
                        <select bind:value={form.attack.intensity}>
                            {#each percent_range as p_range}
                                <option value={p_range.value}>{p_range.label}</option>
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
                            <input
                                type="checkbox"
                                bind:checked={form.suicidal.idea}
                            />
                            {type}
                        </label>
                    {/each}
                </div>

                <div class="flex items-center gap-4">
                    {#each ['hanging', 'poisoning', 'knife'] as method}
                        <label>
                            <input
                                type="checkbox"
                                value={method}
                                bind:group={form.suicidal.methods}
                            />
                            {method}
                        </label>
                    {/each}
                    <input
                        type="text"
                        bind:value={form.suicidal.otherMethod}
                        placeholder="Other method"
                    />
                </div>

                <div class="flex items-center gap-4">
                    <input
                        type="number"
                        bind:value={form.suicidal.when.amount}
                        placeholder="1 day/month/year ago"
                    />
                    {#each ['days', 'months', 'years'] as unit}
                        <label>
                            <input
                                type="radio"
                                value={unit}
                                bind:group={form.suicidal.when.unit}
                            />
                            {unit} ago
                        </label>
                    {/each}
                </div>
            </fieldset>

            <fieldset>
                <legend>Homocidal idea</legend>
                <div class="flex items-center gap-4">
                    {#each ['idea', 'plan', 'attempt'] as type}
                        <label>
                            <input
                                type="checkbox"
                                bind:checked={form.homocidal.idea}
                            />
                            {type}
                        </label>
                    {/each}
                </div>
            </fieldset>
        </section>
    </form>
</article>
