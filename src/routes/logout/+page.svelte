<script lang='ts'>
    import { encryptionKey } from '$lib/stores/encryptionKey'; // Svelte 스토어 가정
    import { onMount } from 'svelte';

    onMount(() => {
        encryptionKey.set(null); // 로그아웃 시 암호화 키 제거
    });
</script>

<p>Logging out...</p>
