import { MainTableRowProps } from "../MainTableRow/MainTableRow.types";

export function composeRowArray(
  rowData: MainTableRowProps | undefined,
  rowArray: MainTableRowProps[] = [],
  level: number = 0,
  amountChildren: number = 0
): MainTableRowProps[] {
  if (!rowData) return [];

  rowArray.push({ ...rowData, level, amountChild: rowData.child.length });

  if (rowData.child) {
    level += 1;

    for (let child of rowData.child) {
      composeRowArray(child, rowArray, level);
    }

    level -= 1;
  }

  return rowArray;
}
