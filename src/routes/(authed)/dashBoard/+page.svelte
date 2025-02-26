<script lang='ts'>
    import type { PageServerData } from './$types';
    import { drNoteState } from "$lib/stores/drNoteState";

    let { data }: { data: PageServerData } = $props();
    let drNote = $state("");
    $effect(() => {
        drNote = JSON.stringify($drNoteState.progress.subjective, null, 2);
    });

    function copyToClipboard() {
        navigator.clipboard.writeText(drNote);
    }
</script>

<article class="prose">
    <h1>{data.user.username} Dash-board</h1>
    <p>You are in the authed & welcomed.</p>
    <p>Your user ID is {data.user.id}.</p>

    <section>
        <h3>Subjective Data</h3>
        <!-- show store data -->
        <pre>{JSON.stringify($drNoteState.progress.subjective, null, 2)}</pre>
        <!-- show whole sentence -->
        <pre>{drNote}</pre>
        <button onclick={copyToClipboard}>Copy All</button>
    </section>
</article>
