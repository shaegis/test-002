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
    <h1>Welcome to Charting Up!!!</h1>
    <p>Visit Sveltekit Site<a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
</article>
