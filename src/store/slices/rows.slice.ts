import axios, { AxiosResponse } from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_URL, eID } from "../../http";
import {
  IEditingRow,
  IRowAdd,
  IRowDataInitial,
  IRowResponse,
  IRowResponseWithParentID,
} from "../../models/project";
import { composeRowArray } from "../../components/MainTable/MainTable.services";
import { MainTableRow } from "../../components/MainTableRow/MainTableRow.types";

const initialState: IRowDataInitial = {
  loading: false,
  rows: [],
  error: "",
  editingRow: null,
  isEdit: null,
};

export const fetchRows = createAsyncThunk("row/list", () => {
  return axios
    .get(`${API_URL}/v1/outlay-rows/entity/${eID}/row/list`)
    .then((response) => response.data);
});

export const editRows = createAsyncThunk(
  "row/edit",
  (data: { id: number; rowData: IEditingRow }) => {
    return axios
      .post(`${API_URL}/v1/outlay-rows/entity/${eID}/row/${data.id}/update`, {
        ...data.rowData,
      })
      .then((response) => response.data);
  }
);

export const addRows = createAsyncThunk(
  "row/add",
  (parentId: number | null) => {
    return axios
      .post<IRowResponseWithParentID, AxiosResponse<IRowResponse>>(
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
        return { response: response.data, parentId };
      });
  }
);

export const deleteRows = createAsyncThunk("row/delete", (rID: number) => {
  return axios
    .delete(`${API_URL}/v1/outlay-rows/entity/${eID}/row/${rID}/delete`)
    .then(() => {
      return rID;
    });
});

const rowsSlice = createSlice({
  name: "rows",
  initialState,
  reducers: {
    setEditingRow: (state, action: PayloadAction<IEditingRow | null>) => {
      state.editingRow = action.payload;
    },
    setIsEdit: (state, action: PayloadAction<number | null>) => {
      state.isEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRows.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchRows.fulfilled,
      (state, action: PayloadAction<MainTableRow[]>) => {
        state.loading = false;
        state.rows = action.payload.flatMap((e) => composeRowArray(e));
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
        state.rows = state.rows.filter((row) => row.id !== action.payload);
        const childrens = state.rows.filter(
          (row) => row.parentId === action.payload
        );
        state.rows = state.rows.filter(
          (row) => row.parentId !== action.payload
        );

        for (let child of childrens) {
          state.rows = state.rows.filter((row) => row.parentId !== child.id);
        }
      }
    );
    builder.addCase(deleteRows.rejected, (state, action) => {
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(
      editRows.fulfilled,
      (state, action: PayloadAction<IRowResponse>) => {
        const prevRow = state.rows.filter(
          (row) => row.id === action.payload.current.id
        )[0];
        const index = state.rows.findIndex(
          (row) => row.id === action.payload.current.id
        );
        const editingRow: MainTableRow = {
          ...action.payload.current,
          parentId: prevRow.parentId,
          level: prevRow.level,
          child: prevRow.child,
        };
        state.rows.splice(index, 1, editingRow);
      }
    );
    builder.addCase(editRows.rejected, (state, action) => {
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(
      addRows.fulfilled,
      (state, action: PayloadAction<IRowAdd>) => {
        if (action.payload.parentId === null) {
          state.rows.push({
            ...action.payload.response.current,
            parentId: action.payload.parentId,
            level: 0,
            child: [],
          });
        } else {
          const parentInd = state.rows.findIndex(
            (row) => action.payload.parentId === row.id
          );
          const parentLevel = state.rows[parentInd].level;
          const addingRow: MainTableRow = {
            ...action.payload.response.current,
            level: (parentLevel as number) + 1,
            child: [],
            parentId: action.payload.parentId,
          };

          state.rows.splice(parentInd + 1, 0, addingRow);
        }
      }
    );
  },
});

export const { setEditingRow, setIsEdit } = rowsSlice.actions;
export default rowsSlice.reducer;
