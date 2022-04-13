<script>
  import { Icon, Button } from 'sveltestrap';
  import CategoryIcon from './CategoryIcon.svelte';

  export let item = {};
  let numberIsShown = false;
  let emailIsShown = false;

  const showNumber = () => {
    numberIsShown = !numberIsShown;
  };

  const showEmail = () => {
    emailIsShown = !emailIsShown;
  };
</script>

<div class="card shadow">
  <div class="advert-heading">
    <CategoryIcon category={item.category} />
    <div class="advert-heading-info">
      <div class="title">{item.title}</div>
      <div class="location">
        <Icon name="geo-alt-fill" width="25" height="25" />
        {item.location}
      </div>
    </div>
    <div class="advert-heading-price">${item.price}</div>
  </div>

  <div class="advert-description">{item.description}</div>

  <div class="advert-actions">
    <Button color="primary" block on:click={showNumber}>
      <Icon name="telephone" width="25" height="25" />
      {#if numberIsShown}
        <span>{item.phoneNumber}</span>
      {:else}
        <span>Call</span>
      {/if}
    </Button>
    <Button color="secondary" block on:click={showEmail}>
      <Icon name="inbox" width="25" height="25" />
      {#if emailIsShown}
        <span>{item.emailAddress}</span>
      {:else}
        <span>Message</span>
      {/if}
    </Button>
  </div>
</div>

<style>
  .advert-actions {
    margin-top: 20px;
    display: grid;
    grid-row-gap: 15px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-left: 5px;
  }

  .location {
    margin-top: 5px;
  }

  .advert-heading {
    display: grid;
    grid-template-columns: 70px 1fr min-content;
    grid-column-gap: 10px;
  }

  .advert-heading-price {
    font-size: 20px;
    font-weight: bold;
    color: green;
  }

  .advert-description {
    margin-top: 20px;
    color: gray;
  }
</style>