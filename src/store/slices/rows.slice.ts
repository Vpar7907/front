import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../../http";
import {
  IRowData,
  IRowDataInitial,
  IRowResponseWithParentID,
} from "../../models/project";
import { composeRowArray } from "../../components/MainTable/MainTable.services";
import { MainTableRowProps } from "../../components/MainTableRow/MainTableRow.types";

const initialState: IRowDataInitial = {
  loading: false,
  rows: [],
  fileStructure: [],
  error: "",
  editingRow: null,
};

const eID = 1;

export const fetchRows = createAsyncThunk("row/list", () => {
  return axios
    .get(`${API_URL}/v1/outlay-rows/entity/1/row/list`)
    .then((response) =>
      response.data.flatMap((e: MainTableRowProps) => composeRowArray(e))
    );
});

export const editRows = createAsyncThunk("row/list", () => {
  return axios
    .get(`${API_URL}/v1/outlay-rows/entity/1/row/list`)
    .then((response) => response.data);
});

export const addRows = createAsyncThunk("row/add", (parentId: number) => {
  return axios
    .post<IRowResponseWithParentID>(
      `${API_URL}/v1/outlay-rows/entity/${eID}/row/create`,
      {
        equipmentCosts: 0,
        estimatedProfit: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        parentId,
        rowName: "new",
        salary: 0,
        supportCosts: 0,
      }
    )
    .then((response) => {
      const res = response.data;
      console.log(res);

      return { response: res, parentId: parentId };
    });
});

export const deleteRows = createAsyncThunk("row/delete", (rID: number) => {
  return axios
    .delete(`${API_URL}/v1/outlay-rows/entity/${eID}/row/${rID}/delete`)
    .then((response) => {
      return rID;
    });
});

const rowsSlice = createSlice({
  name: "rows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRows.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchRows.fulfilled,
      (state, action: PayloadAction<IRowData[]>) => {
        state.loading = false;
        state.rows = action.payload;
        state.fileStructure = state.rows.flatMap(
          (e) => (e.level as number) + 1
        );
        state.error = "";
      }
    );
    builder.addCase(fetchRows.rejected, (state, action) => {
      state.loading = false;
      state.rows = [];
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(
      deleteRows.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.rows = state.rows.filter((e) => e.id !== action.payload);
        state.rows = state.rows.filter((e) => e.parentId !== action.payload);
      }
    );
    builder.addCase(deleteRows.rejected, (state, action) => {
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(addRows.fulfilled, (state, action: PayloadAction<any>) => {
      const parentInd = state.rows.findIndex(
        (e) => action.payload.parentId === e.id
      );
      const parentLevel = state.rows[parentInd].level;
      const addingRow = {
        ...action.payload.current,
        level: (parentLevel as number) + 1,
      }
      state.rows[parentInd].child.push(addingRow)
      state.rows.splice(parentInd + 1, 0, addingRow);
    });
  },
});

export default rowsSlice.reducer;
