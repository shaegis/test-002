<script lang='ts'>
    import type { PageServerData } from './$types';

    let { data }: { data: PageServerData } = $props();
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
                    <div class="flex items-center gap-4">
                        <span>plapitation</span>
                            <label>
                                <input type="radio" id="negative" name="palpitation" value="negative" />
                                <span>-</span>
                            </label>
                            <label>
                                <input type="radio" id="positive" name="palpitation" value="positive" />
                                <span>+</span>
                            </label>
                            <label>
                                <input type="radio" id="neutral" name="palpitation" value="neutral" />
                                <span>+/-</span>
                            </label>
                            <label>
                                <input type="radio" id="improved" name="palpitation" value="improved" />
                                <span>improved</span>
                            </label>
                            <label>
                                <input type="radio" id="aggrevated" name="palpitation" value="aggrevated" />
                                <span>aggrevated</span>
                            </label><br>
                    </fieldset>
                    <fieldset>
                        <legend class="inline-block">heaviness</legend>
                            <label>
                                <input type="radio" id="negative" name="heaviness" value="negative" />
                                <span>-</span>
                            </label>
                            <label>
                                <input type="radio" id="positive" name="heaviness" value="positive" />
                                <span>+</span>
                            </label>
                            <label>
                                <input type="radio" id="neutral" name="heaviness" value="neutral" />
                                <span>+/-</span>
                            </label>
                            <label>
                                <input type="radio" id="improved" name="heaviness" value="improved" />
                                <span>improved</span>
                            </label>
                            <label>
                                <input type="radio" id="aggrevated" name="heaviness" value="aggrevated" />
                                <span>aggrevated</span>
                            </label>
                    </fieldset>
                    <fieldset>
                        <legend class="inline-block">dyspnea</legend>
                            <label>
                                <input type="radio" id="negative" name="dyspnea" value="negative" />
                                <span>-</span>
                            </label>
                            <label>
                                <input type="radio" id="positive" name="dyspnea" value="positive" />
                                <span>+</span>
                            </label>
                            <label>
                                <input type="radio" id="neutral" name="dyspnea" value="neutral" />
                                <span>+/-</span>
                            </label>
                            <label>
                                <input type="radio" id="improved" name="dyspnea" value="improved" />
                                <span>improved</span>
                            </label>
                            <label>
                                <input type="radio" id="aggrevated" name="dyspnea" value="aggrevated" />
                                <span>aggrevated</span>
                            </label>
                    </fieldset>
                    <fieldset>
                        <legend class="inline-block">heating sense</legend>
                            <label>
                                <input type="radio" id="negative" name="heating-sense" value="negative" />
                                <span>-</span>
                            </label>
                            <label>
                                <input type="radio" id="positive" name="heating-sense" value="positive" />
                                <span>+</span>
                            </label>
                            <label>
                                <input type="radio" id="neutral" name="heating-sense" value="neutral" />
                                <span>+/-</span>
                            </label>
                            <label>
                                <input type="radio" id="improved" name="heating-sense" value="improved" />
                                <span>improved</span>
                            </label>
                            <label>
                                <input type="radio" id="aggrevated" name="heating-sense" value="aggrevated" />
                                <span>aggrevated</span>
                            </label>
                    </fieldset>
                    <fieldset>
                        <legend class="inline-block">sweating</legend>
                            <label>
                                <input type="radio" id="negative" name="sweating" value="negative" />
                                <span>-</span>
                            </label>
                            <label>
                                <input type="radio" id="positive" name="sweating" value="positive" />
                                <span>+</span>
                            </label>
                            <label>
                                <input type="radio" id="neutral" name="sweating" value="neutral" />
                                <span>+/-</span>
                            </label>
                            <label>
                                <input type="radio" id="improved" name="sweating" value="improved" />
                                <span>improved</span>
                            </label>
                            <label>
                                <input type="radio" id="aggrevated" name="sweating" value="aggrevated" />
                                <span>aggrevated</span>
                            </label>
                </fieldset>
            </section>
    </form>
</article>
