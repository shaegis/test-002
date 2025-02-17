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

    const percent_range = Array.from({ length: 10 }, (_, index) => {
        const i = 90 - index * 10;
        return { value: `${i}`, label: `${i}` };
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
                                <input type="radio" name={symptom.name} value={option.value} />
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
                                <input type="radio" name={symptom.name} value={option.value} />
                                <span>{option.label}</span>
                            </label>
                        {/each}
                    </div>
                {/each}
            </fieldset>
            <fieldset>
                <legend>mainly occures in/at</legend>
                    <div class="flex items-center gap-4">
                        <input type="radio" name="symptoms_occures_in" value="awake" /><label>awake</label>
                        <input type="radio" name="symptoms_occures_in" value="morning" /><label>norning</label>
                        <input type="radio" name="symptoms_occures_in" value="noon" /><label>noon</label>
                        <input type="radio" name="symptoms_occures_in" value="afternoon" /><label>afternoon</label>
                        <input type="radio" name="symptoms_occures_in" value="dusk" /><label>dusk</label>
                        <input type="radio" name="symptoms_occures_in" value="evening" /><label>evening</label>
                        <input type="radio" name="symptoms_occures_in" value="night" /><label>night</label>
                        <input type="radio" name="symptoms_occures_in" value="before bed" /><label>before bed</label>
                        <input type="radio" name="symptoms_occures_in" value="sleep" /><label>sleep</label>
            </fieldset> 
            <fieldset>
                <legend>Attack</legend>
                    <div class="flex items-center gap-4">
                        <input type="radio" name="attack" value="persist" /><label>persist</label>
                        <input type="radio" name="attack" value="aggrevated" /><label>aggrevated</label>
                        <input type="radio" name="attack" value="improved" /><label>improved</label>
                        <input type="number" name="attack" value="" /><label>times</label>
                        <input type="radio" name="attack" value="day" /><label>/day</label>
                        <input type="radio" name="attack" value="week" /><label>/week</label>
                        <select name="intensity">
                            {#each percent_range as p_range}
                                <option value={p_range.value}>{p_range.label}</option>
                            {/each}
                        </select><label>% intensity</label>
                    </div>
            </fieldset>
            <fieldset>
                <legend>Suicidal idea</legend>
                    <div class="flex items-center gap-4">
                        <input type="checkbox" name="suicidal_idea" /><label>idea</label>
                        <input type="checkbox" name="suicidal_idea" /><label>plan</label>
                        <input type="checkbox" name="suicidal_idea" /><label>attempt</label>
                    </div>
                    <div class="flex items-center gap-4">
                        <input type="checkbox" name="suicidal_method" /><label>hanging</label>
                        <input type="checkbox" name="suicidal_method" /><label>poisoning</label>
                        <input type="checkbox" name="suicidal_method" /><label>knife</label>
                        <input type="checkbox" name="suicidal_method" /><label>knife</label>
                        <input type="text" name="suicidal_method" value="" />
                    </div>
                    <div class="flex items-center gap-4">
                        <input type="number" name="suicidal_method" value="" />
                        <input type="radio" name="suicidal_when" /><label>days</label>
                        <input type="radio" name="suicidal_when" /><label>months</label>
                        <input type="radio" name="suicidal_when" /><label>years ago</label>
                    </div>
            </fieldset>
            <fieldset>
                <legend>Homocidal idea</legend>
                    <div class="flex items-center gap-4">
                        <input type="checkbox" name="homocidal_idea" /><label>idea</label>
                        <input type="checkbox" name="homocidal_idea" /><label>plan</label>
                        <input type="checkbox" name="homocidal_idea" /><label>attempt</label>
                    </div>
        </section>
    </form>
</article>
