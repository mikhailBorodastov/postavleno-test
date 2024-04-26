<template>
  <h1>Добавление пользователя</h1>
  <div class="container">
    <UserForm @user-added="addUser" />
    <UserTable ref="userTable" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UserForm from './components/UserForm.vue';
import UserTable from './components/UserTable.vue';

const userTable = ref(null);

const addUser = user => {
  userTable.value.addUser(user);
};
</script>

<style>
.container {
  max-width: 1110px;
}

.table-delete {
  border: none;
  background-color: transparent;
  color: red;
  cursor: pointer;
  text-decoration: underline;
}
</style>
