<script lang='ts'>
    export let options: string[];
    export let group: any;
    export let labelPrefix: string = '';
</script>

{#each options as option}
    <label>
        <input type="radio" value={option} bind:group />
        {labelPrefix}{option}
    </label>
{/each}
