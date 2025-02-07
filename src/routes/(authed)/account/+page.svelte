<script lang='ts'>
    import type { PageServerData } from './$types';

    let { data }: { data: PageServerData } = $props();
</script>

<article class="prose">
    <h1>{data.user.username} Account</h1>
    <p>You are in the authed.</p>
    <p>Your user ID is {data.user.id}.</p>
</article>
