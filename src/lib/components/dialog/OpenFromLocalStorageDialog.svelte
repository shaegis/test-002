<script lang="ts">
    export let keys: string[];
    export let selectedKey: string;
    export let onOpen: (key: string) => void;
    export let onClose: () => void;
</script>

<h3>Open from Browser</h3>
<select bind:value={selectedKey}>
    {#each keys as key}
        <option value={key}> {key.replace("drNoteState-", "")} </option>
    {/each}
</select>

<button disabled={!selectedKey} onclick={() => onOpen(selectedKey)}>Open</button>
<button onclick={() => onClose()}>Cancel</button>
