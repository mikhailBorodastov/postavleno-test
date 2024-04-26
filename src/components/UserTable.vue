<template>
  <div id="myGrid" style="height: 400px; width:100%;" class="ag-theme-alpine"></div>
  <div v-if="logData.length">
    <h2>Лог редактирования:</h2>
    <ul v-for="(logEntry, index) in logData" :key="index">
      <li>{{ logEntry }}</li>
    </ul>
  </div>
</template>
<script setup>
import {ref, onMounted, defineExpose, onBeforeMount, onBeforeUnmount} from 'vue';

const gridApi = ref(null);
const columnDefs = ref([
  {field: 'Имя', valueGetter: params => params.data.name.first},
  {field: 'Пол', valueGetter: params => params.data.gender},
  {field: 'Почта', valueGetter: params => params.data.email},
  {field: 'Возраст', valueGetter: params => params.data.dob.age},
  {
    field: 'Действия',
    cellRenderer: () => '<button class="table-delete">Удалить</button>',
    onCellClicked: params => deleteUser(params.data),
  },
]);
const rowData = ref([]);
const logData = ref([]);

const initializeGrid = () => {
  const gridDiv = document.querySelector('#myGrid');
  gridApi.value = window.agGrid.createGrid(gridDiv, {
    columnDefs: columnDefs.value,
    rowData: rowData.value,
    onGridReady: params => {
      gridApi.value = params.api;
    },
  });
};

const fetchUsers = async () => {
  const response = await fetch('https://randomuser.me/api/?results=5');
  const data = await response.json();
  rowData.value = data.results;
  gridApi.value.setGridOption('rowData', rowData.value);
};

const addUser = user => {
  rowData.value.push(user);
  gridApi.value.setGridOption('rowData', rowData.value);
  const logEntry = `Добавлен пользователь: "${user.name.first}"`;
  logData.value.push(logEntry);
};

const deleteUser = user => {
  const index = rowData.value.findIndex(u => u.email === user.email);
  if (index !== -1) {
    const deletedUser = rowData.value[index];
    rowData.value.splice(index, 1);
    gridApi.value.setGridOption('rowData', rowData.value);
    const logEntry = `Удалён пользователь: "${deletedUser.name.first}"`;
    logData.value.push(logEntry);
  }
};

onBeforeMount(() => {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js';
  script.async = true;
  script.onload = initializeGrid;
  document.head.appendChild(script);
});

onMounted(fetchUsers);

onBeforeUnmount(() => {
  if (gridApi.value) {
    gridApi.value.destroy();
  }
});

defineExpose({addUser});
</script>
