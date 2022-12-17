import { RootState } from "../store";

export function getRowsArray(state: RootState) {
  return state.rows.rows;
}
export function getEditingRow(state: RootState) {
  return state.rows.isEdit;
}

export function getRowsStructureArray(state: RootState) {
  return state.rows.rows.map((e) => ({ id: e.id, level: e.level as number }));
}

export function getEditRowData(state: RootState) {
  return state.rows.editingRow;
}
