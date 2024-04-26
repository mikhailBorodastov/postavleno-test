<template>
  <h1>Добавление пользователя</h1>
  <div class="container">
    <UserForm @user-added="addUser" />
    <UserTable ref="userTable" />
    <UserLog :log-data="logData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserForm from './components/UserForm.vue';
import UserTable from './components/UserTable.vue';
import UserLog from './components/UserLog.vue';

const userTable = ref(null);
const logData = ref([]);

const addUser = user => {
  userTable.value.addUser(user);
};

const handleUserAction = event => {
  logData.value.push(event.detail);
};

onMounted(() => {
  addEventListener('user-action', handleUserAction);
});
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
