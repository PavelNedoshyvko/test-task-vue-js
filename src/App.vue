<template>
  <div class="app">
    <h1>User List</h1>
    <UserForm :addUser="addUser" />
    <UserDetails :userList="visibleUserList" :updateUser="updateUser" />
    <UserFilter :userFilter="userNameFilter" />
    <UserList :userList="visibleUserList" :deleteUser="deleteUser" />
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

import UserList from "./components/UserList.vue";
import UserForm from "./components/UserForm.vue";
import UserFilter from "./components/UserFilter.vue";
import UserDetails from "./components/UserDetails.vue";

export default {
  name: "App",
  components: { UserList, UserForm, UserFilter, UserDetails },

  setup() {
    const userList = ref([]);
    const visibleUserList = ref([]);

    const loadUsers = async () => {
      try {
        const res = await axios.get("https://reqres.in/api/users");
        userList.value = res.data.data;
        visibleUserList.value = userList.value;
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    loadUsers();

    const userNameFilter = (filterText) => {
      const filteredList = userList.value.filter((user) =>
        user.first_name.toLowerCase().includes(filterText.toLowerCase())
      );
      visibleUserList.value = filteredList;
    };

    const addUser = async (userData) => {
      try {
        const { data } = await axios.post(
          "https://reqres.in/api/users",
          userData
        );
        userList.value.push(data);
        visibleUserList.value = userList.value;
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    const deleteUser = async (id) => {
      try {
        await axios.delete(`https://reqres.in/api/users/${id}`);
        userList.value = userList.value.filter((user) => user.id !== id);
        visibleUserList.value = userList.value;
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    const updateUser = async (id, userData) => {
      try {
        await axios.put(`https://reqres.in/api/users/${id}`, userData);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    return {
      userList,
      visibleUserList,
      userNameFilter,
      addUser,
      deleteUser,
      updateUser,
    };
  },
};
</script>

<style>
body {
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: #fff;
}

ul {
  list-style-type: none;
  padding: 0;
}

h1 {
  text-align: center;
}

.app {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 25px;
  border-radius: 10px;
  background-color: rgb(204, 153, 102);
}
</style>
