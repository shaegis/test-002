<script lang="ts">
	import '../app.css';
    import { page } from '$app/stores';

    let { children } = $props();
</script>

<header>
    <nav>
        <div class="logo-group">
            <figure class="logo">
                <a href="/">
                    <img src="/logo.png" alt="Logo" />
                </a>
            </figure>
            <span>Charting Up</span>
        </div>
        <ul class="menu">
            {#if $page.data.user}
                <li>
                    <a href="/dashBoard" class:active-btn={$page.url.pathname === "/dashBoard"}>Dash-board</a>
                </li>
                <li>
                    <a href="/progress" class:active-btn={$page.url.pathname === "/progress"}>Progress</a>
                </li>
                <li>
                    <a href="/protections" class:active-btn={$page.url.pathname === "/protections"}>Protections</a>
                </li>
                <li>
                    <a href="/scales" class:active-btn={$page.url.pathname === "/scales"}>Scales</a>
                </li>
             {/if}
        </ul>
        <ul class="auth">
            {#if $page.data.user}
                <li>
                    <form method="POST" action="/logout">
                        <button type="submit">Log-out</button>
                    </form>
                </li>
            {:else if $page.url?.pathname === '/' }
                <li><a href="/login">Log-in</a></li>
                <li><a href="/signup">Sign-up</a></li>
            {/if}
        </ul>
    </nav>
</header>

{@render children()}

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: left;
        padding: 1rem;
        background-color: #f8f8f8;
        border-bottom: 1px, solid #ddd;
    }

    .logo-group {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .logo {
        height: 40px;
        width: 52px;
    }

    .menu {
        flex: 1;  /* nav 내에서 확장 */
        display: flex;
        justify-content: space-around; /* 가운데 정렬 */
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 1rem;
    }

	.active-btn {
		background-color: #007bff;
		color: white;
		border: 2px solid #0056b3;
		border-radius: 5px;
		padding: 0.5rem 1rem;
	}
    
	.active-btn:hover {
		background-color: #0056b3;
	}

    .auth {
        display: flex;
        list-style: none;
        margine: 0;
        padding: 0;
        gap: 1rem;
    }

    .auth a {
        margin-left: 1rem;
        text-decoration: none;
        color: #333;
    }

    .auth a:hover {
        text-decoration: underline;
    }
</style>
