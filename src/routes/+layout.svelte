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
                    <form method="POST" action="/account/dash_board">
                        <button type="submit">Dash-board</button>
                    </form>
                </li>
                <li>
                    <form method="POST" action="/account/progress">
                        <button type="submit">Progress</button>
                    </form>
                </li>
                <li>
                    <form method="POST" action="/account/protections">
                        <button type="submit">Protections</button>
                    </form>
                </li>
                <li>
                    <form method="POST" action="/account/scales">
                        <button type="submit">Scales</button>
                    </form>
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
