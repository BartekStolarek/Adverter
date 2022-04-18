<script>
  import { createEventDispatcher } from 'svelte';
  import { 
    Button,
    Toast,
    ToastBody,
    ToastHeader,
    Icon,
    Input
  } from 'sveltestrap';
  import AddItemDialog from './AddItemDialog.svelte';

  export let filter;
  const dispatch = createEventDispatcher();

  let isModalOpen = false;
  let isToastOpen = false;

  const toggle = () => {
    isToastOpen = !isToastOpen;
  };

  const toggleModal = () => {
    isModalOpen = !isModalOpen;
  };

  const modalDismissed = () => {
    isModalOpen = false;
  };

  const advertAdded = (event) => {
    toggleModal();
    toggle();

    dispatch('updateAdverts', {
      adverts: event.detail.adverts.data
    });
  };
</script>

<div class="heading">
  <h1>Adverter</h1>
  <p>An easy way to advertize your items!</p>
</div>

<div class="actions">
  <Input type="text" bind:value={filter} placeholder="Search..." />
  <Button color="primary" on:click={toggleModal}>
    <Icon name="plus-circle" />
    Add an Advert
  </Button>
</div>

{#if isToastOpen}
<div class="advert-added-toast">
  <Toast>
    <ToastHeader {toggle}>New advert added!</ToastHeader>
    <ToastBody>
      Your advertisement was added successfully! It should be visible in the list of adverts below.
    </ToastBody>
  </Toast>
</div>
{/if}

<AddItemDialog isOpen={isModalOpen} on:advertAdded={advertAdded} on:modalDismissed={modalDismissed} />

<style>
  .heading,
  .actions {
    text-align: center;
  }

  .heading {
    margin: 50px;
  }

  .actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, 250px);
    grid-column-gap: 25px;
    justify-content: center;
    margin-top: 50px;
  }

  .advert-added-toast {
    margin: 50px;
    display: grid;
    justify-content: center;
  }
</style>