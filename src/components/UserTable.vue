<template>
  <div id="myGrid" style="height: 400px; width:100%;" class="ag-theme-alpine"></div>
</template>

<script setup>
import { ref, onMounted, defineExpose, onBeforeUnmount} from 'vue';
import AgGrid from '../utils/AgGrid';

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

const initializeGrid = () => {
  AgGrid.init('#myGrid', columnDefs.value, rowData.value, params => {
    gridApi.value = params.api;
  });
};

const fetchUsers = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=5');
    const data = await response.json();
    rowData.value = data.results;
    AgGrid.setRowData(rowData.value);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const addUser = user => {
  rowData.value.push(user);
  AgGrid.setRowData(rowData.value);
  const event = new CustomEvent('user-action', {
    detail: `Добавлен пользователь: "${user.name.first}"`,
    bubbles: true,
  });
  dispatchEvent(event);
};

const deleteUser = user => {
  console.log(user.id.value)
  const index = rowData.value.findIndex(u => u.email === user.email);
  if (index !== -1) {
    const deletedUser = rowData.value[index];
    rowData.value.splice(index, 1);
    AgGrid.setRowData(rowData.value);
    const event = new CustomEvent('user-action', {
      detail: `Удалён пользователь: "${deletedUser.name.first}"`,
      bubbles: true,
    });
    dispatchEvent(event);
  }
};

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js';
  script.async = true;
  script.onload = () => {
    initializeGrid();
    fetchUsers();
  };
  document.head.appendChild(script);
});

onBeforeUnmount(() => {
  AgGrid.destroy();
});

defineExpose({addUser});
</script>
