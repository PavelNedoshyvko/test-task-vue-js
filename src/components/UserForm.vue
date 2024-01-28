<template>
  <form class="user-add-form">
    <label class="label-input" for="first_name">First Name</label>
    <input
      class="user-form-input"
      type="text"
      name="first_name"
      id="name"
      placeholder="Bob"
      v-model="formData.firstName"
    />
    <div v-if="!isFirstNameValid" class="error-message">
      Please enter first name
    </div>

    <label class="label-input" for="first_name">Last Name</label>
    <input
      class="user-form-input"
      type="text"
      name="last_name"
      id="name"
      placeholder="Marley"
      v-model="formData.lastName"
    />
    <div v-if="!isLastNameValid" class="error-message">
      Please enter last name
    </div>

    <label class="label-input" for="email">Email</label>
    <input
      class="user-form-input"
      type="email"
      name="email"
      id="name"
      placeholder="bob.marley@mail.com"
      v-model="formData.email"
    />
    <div v-if="!isEmailValid" class="error-message">
      Please enter valid email
    </div>

    <button
      class="user-form-btn"
      @click.prevent="submitForm"
      :disabled="!isFormValid"
    >
      Add user
    </button>
  </form>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "UserForm",
  props: {
    addUser: Function,
  },

  setup(props) {
    const formData = ref({
      firstName: "",
      lastName: "",
      email: "",
    });

    const isFirstNameValid = computed(
      () => formData.value.firstName.trim() !== ""
    );
    const isLastNameValid = computed(
      () => formData.value.lastName.trim() !== ""
    );
    const isEmailValid = computed(() =>
      /\S+@\S+\.\S+/.test(formData.value.email)
    );
    const isFormValid = computed(
      () =>
        isFirstNameValid.value && isLastNameValid.value && isEmailValid.value
    );

    const submitForm = () => {
      if (isFormValid.value) {
        const userData = {
          first_name: formData.value.firstName,
          last_name: formData.value.lastName,
          email: formData.value.email,
        };
        props.addUser(userData);
        formData.value.firstName = "";
        formData.value.lastName = "";
        formData.value.email = "";
      }
    };

    return {
      formData,
      submitForm,
      isFirstNameValid,
      isLastNameValid,
      isEmailValid,
      isFormValid,
    };
  },
};
</script>

<style scoped>
.user-add-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

.label-input {
  margin-bottom: 4px;
  font-size: 20px;
  line-height: 1.17;
  letter-spacing: 0.01em;
}

.user-form-input {
  min-height: 40px;
  padding-left: 20px;
  margin-bottom: 10px;
  border: 1px solid rgba(46, 47, 66, 0.4);
  background-color: #e6e6e6;
  border-radius: 4px;
  outline: transparent;
  transition: border-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.user-form-input:hover,
.user-form-input:focus {
  border-color: black;
}

.user-form-btn {
  margin-left: auto;
  margin-right: auto;
  padding: 12px 22px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.04em;
  color: #000000;
  background-color: #ecd9c6;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.user-form-btn:hover {
  background-color: #ffc61a;
  transform: scale(1.1);
}

.error-message {
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
}
</style>
