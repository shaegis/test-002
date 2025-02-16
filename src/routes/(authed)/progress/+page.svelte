<script lang='ts'>
    import type { PageServerData } from './$types';

    let { data }: { data: PageServerData } = $props();

    const symptoms = [
        { name: 'palpitation', label: 'palpitation' },
        { name: 'heaviness', label: 'heaviness' },
        { name: 'dyspnea', label: 'dyspnea' },
        { name: 'heating-sense', label: 'heating-sense' },
        { name: 'sweating', label: 'sweating' },
        { name: 'globus', label: 'globus' },
        { name: 'vertigo', label: 'vertigo' },
        { name: 'headache-migrain', label: 'headache/migrain' },
        { name: 'nasea', label: 'nasea' },
        { name: 'indigestion', label: 'indigestion' },
        { name: 'tinnitus', label: 'tinnitus' },
        { name: 'blepharospasm', label: 'blepharospasm' },
        { name: 'concentation', label: 'concentation' }
    ];

    const options = [
        { value: 'negative', label: '-' },
        { value: 'positive', label: '+' },
        { value: 'neutral', label: '+/-' },
        { value: 'improved', label: 'improved' },
        { value: 'aggrevated', label: 'aggrevated' }
    ];
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
                    <legend>Somatic Symptoms</legend>
                    {#each symptoms as symptom}
                        <div class="flex items-center gap-4">
                            <span>{symptom.label}</span>
                            {#each options as option}
                                <label>
                                    <input type="radio" id={option.value} name={symptom.name} value={option.value} />
                                    <span>{option.label}</span>
                                </label>
                            {/each}
                        </div>
                    {/each}
            </fieldset>
        </section>
    </form>
</article>
