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
				this.searchQuery = '';
				this.$emit('search', 0);
			}
		}
	}
</script>

<template>
	<div>
		<div class="searchContainer">
				<input class="userSearchBar" v-model="searchQuery"/>
				<div>
					<span @click="trySearch" class="material-icons search-button fa-4x">search</span>
					<span @click="clearSearch" class="material-icons search-button">backspace</span>
				</div>
			</div>
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
	width: 73%;
	border: thin solid rgb(204, 204, 204);
	border-radius: 20px;
	margin: 10px 20px 20px -35px;
}

.search-button {
	background-color: #589ad4;
	color: white;
	padding: 10px;
	border-radius: 50%;
	margin-bottom: 10px;
	margin-right: 8px;
}

.search-button:hover {
	cursor: pointer;
	background-color: #0275d8
;
}

</style>
