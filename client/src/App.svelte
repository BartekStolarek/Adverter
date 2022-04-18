<script>
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import AdvertsList from './components/AdvertsList.svelte';

	let adverts = [];

	fetch('http://localhost:5000/api/v1/advertisements')
		.then(response => response.json())
		.then(advertisements => adverts = advertisements.data)

	let filter = '';
	let filteredAdverts = [];
	let isFiltered = false;

	$: filteredAdverts = adverts.filter(ad => {
		let lowercasedTitle = ad.title.toLowerCase();
		let lowercasedFilter = filter.toLowerCase();

		return lowercasedTitle.includes(lowercasedFilter);
	});
	$: isFiltered = filter.length !== 0;

	const clearFilters = () => {
		filter = '';
	};

	const updateAdverts = (event) => {
		adverts = event.detail.adverts;
	};
</script>

<main>
	<Header bind:filter={filter} on:updateAdverts={updateAdverts} />
	<AdvertsList adverts={filteredAdverts} {isFiltered} on:clearFilters={clearFilters} />
	<Footer />
</main>