const AgGrid = {
    gridApi: null,

    init(selector, columnDefs, rowData, onGridReady) {
        const gridDiv = document.querySelector(selector);
        this.gridApi = window.agGrid.createGrid(gridDiv, {
            columnDefs,
            rowData,
            onGridReady,
        });
    },

    setRowData(rowData) {
        this.gridApi.setGridOption('rowData', rowData);
    },

    destroy() {
        if (this.gridApi) {
            this.gridApi.destroy();
        }
    },
};

export default AgGrid;
