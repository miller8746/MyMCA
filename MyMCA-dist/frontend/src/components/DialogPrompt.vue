/*
* File name: DialogPrompt.vue
* Purpose: Displays a dialog prompt over the application with the specified content.
* Authors: Heather Miller, Hannah Hunt
* Date Created: 4/24/22
* Last Modified: 5/4/22
*/

<script>
	export default {
		props: ['confirmFunction', 'confirmFunctionInput', 'text', 'cancelButtonText', 'confirmButtonText', 'isDialogVisible'],
		emits: ['exitPrompt'],

    data(){
      return {
        firstName: '',
      }
    }
	}

</script>

<template>
	<Transition name="modal">
    <div v-if="isDialogVisible" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <slot name="body">{{text}}</slot>
            </div>
            <div v-if="confirmButtonText=='Enroll'" class="input-group mb-3">
							<span class="input-group-text" id="basic-addon1">First Name</span>
							<input v-model="this.firstName" type="text" class="form-control text">
						</div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="modal-default-button btn btn-secondary" @click="this.$emit('exitPrompt');">{{cancelButtonText}}</button>
                <button class="modal-default-button btn btn-primary" @click="confirmFunction(confirmFunctionInput, firstName)">{{confirmButtonText}}</button>
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

.form-check-label {
  font-size: small;
}

.text{
  height: inherit;
}

</style>