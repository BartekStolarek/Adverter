<script>
  import { createEventDispatcher } from 'svelte';
  import { Button } from 'sveltestrap';
  import AdvertItem from './AdvertItem.svelte';

  export let adverts = [];
  export let isFiltered = false;
  const dispatch = createEventDispatcher();

  const clearFilters = () => {
    dispatch('clearFilters');
  };
</script>

<h3 class="adverts-list-heading">
  {adverts.length} adverts found
  {#if isFiltered}
    - <Button color="secondary" on:click={clearFilters}>Clear Filters</Button>
  {/if}
</h3>

<div class="adverts-list">
  {#each adverts as ad (ad.id)}
    <AdvertItem item={ad} />
  {/each}

  {#if adverts.length == 0}
    <p class="empty">No adverts found!</p> 
  {/if}
</div>

<style>
  .adverts-list-heading {
    margin-top: 50px;
    text-align: center;
  }

  .adverts-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, 450px);
    justify-content: center;
    margin-top: 50px;
  }

  .empty {
    text-align: center;
    margin: 20px;
    font-weight: bold;
  }
</style>