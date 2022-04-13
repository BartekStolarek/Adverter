<script>
  import Icon from '@iconify/svelte';

  export let category = '';
  let icon = '';

  const assignIcon = (category) => {
    switch (category) {
      case 'ELECTRONICS':
        icon = 'mdi:monitor-cellphone'
        break;
      case 'AUTOMOTIVE':
        icon = 'mdi-car';
        break;
      case 'BOOKS':
        icon = 'mdi:book-open-page-variant';
        break;
      case 'FASHION':
        icon = 'mdi:shoe-sneaker';
        break;
      default:
        icon = 'mdi:package-variant-closed';
        break;
    }
  };

  $: category && assignIcon(category);
</script>

<span class="category-icon">
  <Icon icon={icon} width="50" height="50" />
</span>

<style>
  .category-icon {
    background-color: #ff986c;
    color: white;
    padding: 10px;
    border-radius: 25px;
  }
</style>