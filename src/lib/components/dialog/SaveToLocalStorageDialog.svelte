<script lang="ts">
    export let name: string;
    export let existingKeys: string[];
    export let onSave: (name: string) => void;
    export let onClose: () => void;
</script>

<h3>Save to Browser</h3>
<input
    type="text"
    bind:value={name}
    placeholder="Enter name. Default name is YYYY-MM-DD-HH-MM-SS."
/>

<h4>Existing Saves:</h4>
<ul>
    {#each existingKeys as key}
        <li>{key}</li>
    {/each}
</ul>

<button onclick={() => onSave(name)}>Save</button>
<button onclick={() => onClose()}>Cancel</button>
