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
}

export interface MainTableRowProps extends MainTableRow {
  id: number;
  level?: number;
  amountChild?: number;
  index?: number;
  child: MainTableRowProps[] | [];
}

export interface MainTableRowState {
  rowName: string;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  amountChild: number;
}
