<script>
    import { createEventDispatcher } from 'svelte';
    import { 
    Button, 
    Modal, 
    Spinner, 
    Card, 
    ModalBody, 
    ModalHeader, 
    ModalFooter, 
    Input, 
    Label, 
    Form, 
    FormGroup 
  } from 'sveltestrap';

  const dispatch = createEventDispatcher();

  export let isOpen;
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

  const clearModal = () => {
    isFormError = false;
    isError = false;
    isWorking = false;
  };

  const clearForm = () => {
    newAdvert = {
      title: '',
      price: '',
      location: '',
      phoneNumber: '',
      emailAddress: '',
      description: '',
      category: ''
    };
  };

  const closeModal = () => {
    clearModal();
    clearForm();
    dispatch('modalDismissed');
  };

  const submit = () => {
    clearModal();

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
        clearModal();
        clearForm();
        dispatch('advertAdded', {
          adverts: advertisements
        });
      })
      .catch((error) => {
        isError = true;
      });
    }
  };
</script>

<Modal body {isOpen} {closeModal}>
  <ModalHeader {closeModal}>Add new Advertisement</ModalHeader>
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
    <Button color="secondary" on:click={closeModal}>Cancel</Button>
  </ModalFooter>
</Modal>