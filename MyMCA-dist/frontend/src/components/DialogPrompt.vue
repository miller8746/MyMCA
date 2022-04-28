/*
* File name: DialogPrompt.vue
* Purpose: Displays a dialog prompt over the application with the specified content.
* Authors: Heather Miller
* Date Created: 4/24/22
* Last Modified: 4/24/22
*/

<script>
	export default {
		props: ['headerMessage', 'bodyMessage', 'isShown'],
		emits: ['exitPrompt']
	}
</script>

<template>
	<Transition name="modal">
		<div v-if="isShown" class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<h3 class="header-text mb-3 mt-3">{{ headerMessage }}</h3>
					<div class="modal-body">
						<slot name="body">{{ bodyMessage }}</slot>
					</div>
					<div class="modal-footer">
						<slot name="footer">
              <button class="modal-default-button btn btn-success" @click="$emit('exitPrompt', false)">No</button>
							<button class="modal-default-button btn btn-danger" @click="$emit('exitPrompt', true)">Yes</button>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>