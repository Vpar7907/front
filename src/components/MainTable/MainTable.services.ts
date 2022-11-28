import { eID } from "../../http";
import { MainTableRowProps } from "../MainTableRow/MainTableRow.types";

export function composeRowArray(
  rowData: MainTableRowProps | undefined,
  rowArray: MainTableRowProps[] = [],
  level: number = 0,
  parentId: number = eID
): MainTableRowProps[] {
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
