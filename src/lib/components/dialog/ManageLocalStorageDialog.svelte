<script lang="ts">
    export let existingKeys: string[];
    export let onSave: (name: string) => void;
    export let onOpen: (key: string) => void;
    export let onDeleteSelected: (names: string[]) => void;
    export let onDeleteAll: () => void;
    export let onClose: () => void;

//    let nameToSave = initialName; // Save 입력값
    let nameToSave = new Date().toISOString().replace(/T/, "-").replace(/:/g, "-").replace(/.\d{3}Z$/, "");
    let selectedKey = existingKeys[0] || ""; // Open 선택값
    let selectedToDelete: string[] = []; // Delete 선택값
</script>

<h2>Manage Browser Storage</h2>

{#if existingKeys.length === 0 && !nameToSave}
    <p>No saved items found.</p>
{:else}
    <section>
        <h3>Save</h3>
        <input
            type="text"
            bind:value={nameToSave}
            placeholder="Enter name (e.g., YYYY-MM-DD-HH-MM-SS)"
            class="w-full p-2 border rounded"
        />
        <button onclick={() => {
            if (existingKeys.includes(nameToSave) && !confirm("이미 존재하는 이름입니다. 덮어쓰시겠습니까?")) return;
            onSave(nameToSave);
        }} disabled={!nameToSave}>Save</button>
            <!--
            onSave(nameToSave)} disabled={!nameToSave}>Save</button>
            -->
    </section>

    <section>
        <h3>Open</h3>
        {#if existingKeys.length === 0}
            <p>No items to open.</p>
        {:else}
            <select bind:value={selectedKey} class="w-full p-2 border rounded">
                {#each existingKeys as key}
                    <option value={key}>{key}</option>
                {/each}
            </select>
            <button onclick={() => onOpen(`drNote-${selectedKey}`)} disabled={!selectedKey}>Open</button>
        {/if}
    </section>

    <section>
        <h3>Delete</h3>
        {#if existingKeys.length === 0}
            <p>No items to delete.</p>
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
    </section>
{/if}

<button onclick={onClose}>Close</button>
