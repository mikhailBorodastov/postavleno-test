<template>
  <form class="form" @submit.prevent="addUser">
    <div class="form-group">
      <label class="label" for="name">Имя:</label>
      <input class="input" id="name" v-model="newUser.name.first" placeholder="Имя" required>
    </div>
    <div class="form-group">
      <label class="label" for="gender">Пол:</label>
      <select class="select" id="gender" v-model="newUser.gender" required>
        <option value="" disabled>Выберете пол</option>
        <option v-for="option in genderOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label class="label" for="email">Почта:</label>
      <input class="input" id="email" v-model="newUser.email" placeholder="Почта" required>
    </div>
    <div class="form-group">
      <label class="label" for="age">Возраст:</label>
      <input class="input" id="age" type="number" v-model.number="newUser.dob.age" placeholder="Возраст" required>
    </div>
    <button class="button" type="submit">Добавить пользователя</button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const NEW_USER_TEMPLATE = {
  name: { first: '' },
  gender: '',
  email: '',
  dob: { age: null },
};

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const newUser = ref({ ...NEW_USER_TEMPLATE });

const emit = defineEmits(['user-added']);

const addUser = () => {
  emit('user-added', { ...newUser.value });
  newUser.value = { ...NEW_USER_TEMPLATE };
};
</script>

<style scoped>
.form {
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  max-width: 1110px;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.label {
  margin-bottom: 0.5rem;
}

.input,
.select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0567d1;
}

@media screen and (max-width: 767.3px) {
  .form {
    display: grid;
    grid-auto-flow: row;
  }
}
</style>
