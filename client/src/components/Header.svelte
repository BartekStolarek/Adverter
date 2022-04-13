<script>
  import { createEventDispatcher } from 'svelte';
  import { 
    Button, 
    Modal, 
    Toast, 
    ToastBody, 
    ToastHeader, 
    Spinner, 
    Card, 
    ModalBody, 
    ModalHeader, 
    ModalFooter, 
    Icon, 
    Input, 
    Label, 
    Form, 
    FormGroup 
  } from 'sveltestrap';

  export let filter;
  const dispatch = createEventDispatcher();

  let isOpen = false;
  let isToastOpen = false;
  let isFormError = false;
  let isError = false;
  let isWorking = false;
  let newAdvert = {
    title: '',
    price: '',
    location: '',
    phoneNumber: '',
    emailAddress: '',
    description: '',
    category: ''
  };

  const toggle = () => {
    isToastOpen = !isToastOpen;
  };

  const toggleModal = () => {
    isFormError = false;
    isError = false;
    isWorking = false;
    isOpen = !isOpen;
  };

  const submit = () => {
    isError = false;
    isFormError = false;

    Object.entries(newAdvert).forEach(([key, value]) => {
      // Check if there are no empty fields
      if (value.length <= 0) {
        isFormError = true;
      }
    });

    if (!isFormError) {
      isWorking = true;

      fetch('http://localhost:5000/api/v1/advertisements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAdvert)
      })
      .then(response => response.json())
      .then(advertisements => {
        isWorking = false;
        toggleModal();
        toggle();
        dispatch('updateAdverts', {
          adverts: advertisements
        });
      })
      .catch((error) => {
        isError = true;
      });
    }
  };
</script>

<div class="heading">
  <h1>Clipzy</h1>
  <p>An easy way to clip your adverts!</p>
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

<Modal body {isOpen} {toggleModal}>
  <ModalHeader {toggleModal}>Add new Advertisement</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="My Product"
          bind:value={newAdvert.title}
        />
      </FormGroup>

      <FormGroup>
        <Label for="price">Price</Label>
        <Input
          type="number"
          name="price"
          id="price"
          placeholder="$15"
          bind:value={newAdvert.price}
        />
      </FormGroup>

      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="textarea"
          name="description"
          id="description"
          placeholder="I would like to sell this extraordinary product..."
          bind:value={newAdvert.description}
        />
      </FormGroup>

      <FormGroup>
        <Label for="category">Category</Label>
        <Input
          type="text"
          name="category"
          id="category"
          placeholder="Books"
          bind:value={newAdvert.category}
        />
      </FormGroup>

      <FormGroup>
        <Label for="location">Location</Label>
        <Input
          type="text"
          name="location"
          id="location"
          placeholder="Berlin, DE"
          bind:value={newAdvert.location}
        />
      </FormGroup>

      <FormGroup>
        <Label for="phone">Phone Number</Label>
        <Input
          type="text"
          name="phone"
          id="phone"
          placeholder="700123700"
          bind:value={newAdvert.phoneNumber}
        />
      </FormGroup>

      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="test.testovsky@testemail.com"
          bind:value={newAdvert.emailAddress}
        />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    {#if isFormError}
      <Card body color="danger" inverse class="mb-3">Error while adding an advertisement. One of the fields is empty. Please update it.</Card>
    {/if}
    {#if isError}
      <Card body color="danger" inverse class="mb-3">Error while adding an advertisement. Please try again in a bit.</Card>
     {/if}
    <Button color="primary" on:click={submit} disabled={isWorking}>
      {#if isWorking}
        <Spinner white size="sm" />
      {/if}
      Add
    </Button>
    <Button color="secondary" on:click={toggleModal}>Cancel</Button>
  </ModalFooter>
</Modal>

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