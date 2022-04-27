/*
* File name: SearchBar.vue
* Purpose: Component responsible for managing user searches
* Authors: Heather Miller
* Date Created: 4/14/22
* Last Modified: 4/22/22
*/

<script>
	export default {
		props: ['term'],
		emits: ['search'],
		data() {
			return {
				searchQuery: '',
				lastSearch: '',
				isSearching: false
			};
		},
		methods: {
			/*
			* Name: trySearch
			* Purpose: Attempts to emit a search event if there is content in the search bar
			* Parameters: none
			*/
			trySearch() {
				if (this.searchQuery.trim() != '') {
					this.isSearching = true;
					this.lastSearch = this.searchQuery;
					this.$emit('search', this.lastSearch);
				}
			},
			/*
			* Name: clearSearch
			* Purpose: Emits a clear search event to reset the search status
			* Parameters: none
			*/
			clearSearch() {
				this.isSearching = false;
				this.lastSearch = '';
				this.$emit('search', null);
			}
		}
	}
</script>

<template>
	<div class="searchContainer">
		<div class="material-icons fa-4x">search</div>
			<input class="userSearchBar userSearchBarSize" v-model="searchQuery"/>
			<div>
				<button @click="trySearch" class="btn btn-outline-primary mb-2">Search</button>
			</div>
		</div>
		<div v-if="isSearching" class="searchContainer userSearchBarSize">
			<div class="fs-4 userSearchLabel">Currently Viewing {{ term }} "{{ lastSearch }}"</div>
			<button @click="clearSearch" class="btn btn-outline-primary mb-2">Clear</button>
		</div>
		<div v-else class="searchContainer userSearchBarSize">
			<div class="fs-4">Currently Viewing All {{ term }}</div>
		</div>
</template>

<style>

.searchContainer {
	display: flex;
	justify-content: center;
	align-items: center;
}

.userSearchLabel {
	margin-right: 10px;
}

.userSearchBar {
	padding: 10px;
	height: 50px;
	font-size: 20pt;
	width: 1000px;
}

.userSearchBarSize {
	margin: 10px 20px 20px 20px;
}

</style>
