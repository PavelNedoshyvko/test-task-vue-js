<template>
  <div>
    <modal
      class="modal"
      :name="user.id.toString()"
      @close="hide"
      v-for="user in userList"
      :key="user.id"
      :height="400"
      ><div class="modal-wrap">
        <div class="flex-wrap">
          <div class="avatar-wrap">
            <img
              :src="
                user.avatar
                  ? user.avatar
                  : require('../avatar/default-avatar.png')
              "
              :alt="`User ${user.first_name}`"
              :width="150"
            />
          </div>
          <div>
            <p class="user-name">{{ user.first_name }} {{ user.last_name }}</p>
            <p class="user-email">{{ user.email }}</p>

            <form class="user-update-form">
              <label class="label-input" for="Phone">Phone</label>
              <input
                class="user-form-input"
                type="text"
                name="Phone"
                id="name"
                placeholder="Phone"
                v-model="formData.phone"
              />
              <div v-if="!isPhoneValid" class="error-message">
                Please enter phone
              </div>

              <label class="label-input" for="Address">Address</label>
              <input
                class="user-form-input"
                type="text"
                name="Address"
                id="Address"
                placeholder="Address"
                v-model="formData.address"
              />

              <div v-if="!isAddressValid" class="error-message">
                Please enter address
              </div>
              <button
                class="user-update-form-btn"
                @click.prevent="submitForm(user.id)"
                :disabled="!isFormValid"
              >
                Update user
              </button>
            </form>
          </div>
        </div>
        <button class="modal-close-btn" @click="hide(user.id.toString())">
          X
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "UserDetails",
  props: {
    userList: Array,
    updateUser: Function,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    hide(id) {
      this.$modal.hide(id);
    },
  },
  setup(props) {
    const formData = ref({
      phone: "",
      address: "",
    });

    const isPhoneValid = computed(() => formData.value.phone.trim() !== "");
    const isAddressValid = computed(() => formData.value.address.trim() !== "");
    const isFormValid = computed(
      () => isPhoneValid.value && isAddressValid.value
    );

    const submitForm = (id) => {
      if (isFormValid.value) {
        const userData = {
          phone: formData.value.phone,
          address: formData.value.address,
        };
        props.updateUser(id, userData);
        formData.value.phone = "";
        formData.value.address = "";
      }
    };

    return {
      formData,
      submitForm,
      isPhoneValid,
      isAddressValid,
      isFormValid,
    };
  },
};
</script>

<style scoped>
p {
  margin: 0;
}

.user-update-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

.modal-wrap {
  position: relative;
  min-width: 100%;
  min-height: 100%;
  padding: 20px;
  background-color: rgb(204, 196, 161);
}

.flex-wrap {
  display: flex;
  gap: 50px;
}

.user-name {
  font-size: 46px;
  margin-bottom: 20px;
}

.user-email {
  text-align: center;
  font-size: 26px;
  margin-bottom: 30px;
}

.avatar-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}

.modal-close-btn {
  position: absolute;
  right: 50px;
  top: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: none;
  font-size: 16px;
  background-color: #7eb174;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    color 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-close-btn:hover {
  background-color: #ffc61a;
  color: #555353;
}

.label-input {
  margin-bottom: 4px;
  font-size: 18px;
  line-height: 1.17;
  letter-spacing: 0.01em;
}

.user-form-input {
  min-height: 25px;
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

.user-update-form-btn {
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

.user-update-form-btnn:hover {
  background-color: #ffc61a;
  transform: scale(1.1);
}

.error-message {
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}
</style>
