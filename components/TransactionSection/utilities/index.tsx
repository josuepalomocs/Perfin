import { GridCellParams, GridColDef, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";

export const getTestRows = (): GridRowsProp => {
  return [
    { id: 1, name: "Target", date: "Oct 24", account: "Chase Checking 5847", amount: "+$5.45" },
    { id: 2, name: "Chase", date: "Oct 21", account: "Chase Checking 5847", amount: "-$64.75" },
    { id: 3, name: "Amazon", date: "Oct 14", account: "Capital One Credit 8478", amount: "-$23.48" },
    { id: 4, name: "Spotify", date: "Sep 25", account: "Capital One Credit 8478", amount: "+$7.87" },
    { id: 5, name: "Apple", date: "Sep 11", account: "Chase Checking 5847", amount: "-$1024.27" },
  ];
};

export const getDataGridColumns = (): GridColDef[] => {
  return [
    { field: "name", headerName: "Name", width: 200 },
    { field: "account", headerName: "Account", width: 200 },
    { field: "date", headerName: "Date", width: 100 },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      cellClassName: (params: GridCellParams<number>) => {
        return params.value!.toString().charAt(0) === "+" ? "positiveValue" : "negativeValue";
      },
    },
  ];
};

export const getDataGridRows = (): GridRowsProp => {
  return getTestRows();
};
