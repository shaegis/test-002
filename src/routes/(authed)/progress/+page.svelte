<script lang="ts">
    import type { PageServerData } from "./$types";
    import Subjective from "$lib/components/progress/Subjective.svelte";

    let { data }: { data: PageServerData } = $props();
</script>

<article class="prose">
<h1>{data.user.username} Progress Notes</h1>
<p>Your user ID is {data.user.id}.</p>

<form>
    <Subjective />
    <!-- Objective, Accessment, Plan -->
</form>

</article>
