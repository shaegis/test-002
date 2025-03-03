<script lang="ts">
    export let existingKeys: string[];
    export let onDeleteSelected: (names: string[]) => void;
    export let onDeleteAll: () => void;
    export let onClose: () => void;

    let selectedToDelete: string[] = [];
</script>

<h2>Delete from Browser</h2>
{#if existingKeys.length === 0}
    <p>No saved items found.</p>
{:else}
    <ul>
        {#each existingKeys as key}
            <li>
                <label>
                    <input type="checkbox" bind:group={selectedToDelete} value={key} />
                    {key}
                </label>
            </li>
        {/each}
    </ul>
    <button onclick={() => onDeleteSelected(selectedToDelete)} disabled={selectedToDelete.length === 0}>Delete Selected</button>
    <button onclick={onDeleteAll}>Delete All</button>
{/if}
<button onclick={onClose}>Cancel</button>
