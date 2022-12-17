export interface MainTableRow {
  equipmentCosts: number;
  estimatedProfit: number;
  id: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
  total: number;
  parentId: number | null;
  amountChild?: number;
  level: number;
  child: MainTableRow[] | [];
}

export interface RowsStructure {
  id: number;
  level: number;
}

export interface MainTableRowProps extends MainTableRow {
  id: number;
  index: number;
}

export interface MainTableRowState {
  rowName: string;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  amountChild: number;
}
