import {
  MainTableRow,
  MainTableRowProps,
} from "../components/MainTableRow/MainTableRow.types";
import { MainTableRowPanelProps } from "../components/MainTableRowPanel/MainTableRowPanel.types";

export interface IEntity {
  id: number;
  rowName: string;
}

export interface IRowData extends MainTableRow {
  child: MainTableRowProps[];
}

export interface IRowDataInitial {
  loading: boolean;
  rows: MainTableRowProps[];
  fileStructure: number[];
  error: string;
}

interface IChanged {
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

interface ICurrent {
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

export interface IRowResponse {
  changed: IChanged[] | [];
  current: ICurrent;
}

export interface IRowResponseWithParentID {
  response: IRowResponse;
  parentId: number;
}
