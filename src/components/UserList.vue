<template>
  <ul>
    <li class="user-list-item" v-for="user in userList" :key="user.id">
      <p class="user-name" @click="show(user.id.toString())">
        {{ user.first_name }} {{ user.last_name }}
      </p>
      <p class="user-email">{{ user.email }}</p>
      <div class="img-btn-wrap">
        <div class="avatar-wrap">
          <img
            :src="
              user.avatar
                ? user.avatar
                : require('../avatar/default-avatar.png')
            "
            :alt="`User ${user.first_name}`"
            :width="100"
          />
        </div>
        <button
          class="user-list-delete-btn"
          type="button"
          @click="deleteUser(user.id)"
        >
          Delete
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "UserList",
  props: {
    userList: Array,
    deleteUser: Function,
  },
  methods: {
    show(id) {
      this.$modal.show(id);
    },
  },
};
</script>

<style scoped>
.user-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1.5px solid black;
  border-radius: 10px;
}

.user-list-item:not(:last-child) {
  margin-bottom: 10px;
}

.user-name,
.user-email {
  font-size: 20px;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
    color 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.user-name:hover {
  cursor: pointer;
  transform: scale(1.1);
  color: #ffc61a;
}

.img-btn-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.avatar-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  border-radius: 50%;
  overflow: hidden;
}

.user-list-delete-btn {
  height: 40px;
  padding: 8px 10px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.04em;
  color: #000000;
  background-color: #ecd9c6;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.user-list-delete-btn:hover {
  background-color: #ffc61a;
  transform: scale(1.1);
}
</style>
