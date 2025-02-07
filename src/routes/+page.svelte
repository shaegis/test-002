<script lang='ts'>
    import { goto } from '$app/navigation';

    function gotoLogin() {
        goto('/login');
    }

    function gotoSignup() {
        goto('/signup');
    }

</script>

<article class="prose">
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
    
    <button on:click={gotoLogin}>Log-in</button>
    <button on:click={gotoSignup}>Sign-up</button>
</article>
