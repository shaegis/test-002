<script lang='ts'>
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    let { from }: { from: ActionData } = $props();
</script>

<article class="prose">
    <h1>Login</h1>
    <form method='POST' action='?/login' use:enhance>
        <label>
            Username
            <input name='username' />
        </label>
        <label>
            password
            <input type='password' name='password' />
        </label>
        <button>Login</button>
    </form>
    <p style='color: red'>{from?.message ?? ''}</p>
</article>
