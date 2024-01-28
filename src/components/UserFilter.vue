<template>
  <div>
    <label class="filter-label-input" for="userName"
      >Find user by first name</label
    >
    <input
      class="filter-input"
      type="text"
      name="userName"
      id="name"
      placeholder="Enter user first name"
      @input="userFilter($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "UserFilter",
  props: {
    userFilter: Function,
  },
};
</script>

<style scoped>
.filter-label-input {
  display: block;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}

.filter-input {
  width: calc(100% - 20px);
  padding-left: 20px;
  min-height: 40px;
  margin-bottom: 30px;
  border: 1px solid rgba(46, 47, 66, 0.4);
  border-radius: 4px;
  outline: transparent;
  transition: border-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-input:hover,
.filter-input:focus {
  border-color: black;
}
</style>
