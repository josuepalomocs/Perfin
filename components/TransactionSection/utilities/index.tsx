import { GridCellParams, GridColDef, GridRowsProp } from "@mui/x-data-grid";

export const getDataGridColumns = (): GridColDef[] => {
  return [
    { field: "name", headerName: "Name", width: 250 },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      cellClassName: (params: GridCellParams<number>) => {
        return params.value!.toString().charAt(0) === "-" ? "negativeValue" : "positiveValue";
      },
    },
    { field: "type", headerName: "Type", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
  ];
};
