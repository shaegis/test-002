<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<article class="prose">
    <h1>Sign-up</h1>
    <form method='post' action='?/signup' use:enhance>
    	<label>
    		Username
    		<input name='username' />
    	</label>
    	<label>
    		Password
    		<input type='password' name='password' />
    	</label>
    	<button>Sign-up</button>
    </form>
    <p style='color: red'>{form?.message ?? ''}</p>
</article>
