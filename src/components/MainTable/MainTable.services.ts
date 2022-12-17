import { eID } from "../../http";
import { MainTableRow } from "../MainTableRow/MainTableRow.types";

export function composeRowArray(
  rowData: MainTableRow | undefined,
  rowArray: MainTableRow[] = [],
  level: number = 0,
  parentId: number = eID
): MainTableRow[] {
  if (!rowData) return [];

  rowArray.push({
    ...rowData,
    level,
    amountChild: rowData.child.length,
    parentId,
  });
  parentId = rowData.id;
  if (rowData.child) {
    level += 1;

    for (let child of rowData.child) {
      composeRowArray(child, rowArray, level, parentId);
    }

    level -= 1;
  }

  return rowArray;
}
