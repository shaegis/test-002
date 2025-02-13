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
