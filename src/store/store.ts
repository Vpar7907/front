import axios from "axios";
import { makeAutoObservable } from "mobx";
import { composeRowArray } from "../components/MainTable/MainTable.services";
import {
  MainTableRow,
  MainTableRowProps,
} from "../components/MainTableRow/MainTableRow.types";
import { API_URL } from "../http";

export default class Store {
  data = [] as MainTableRowProps[];
  isLoading = false;
  fileStructureArray = [] as number[];
  isEditing = this.data.flatMap(e => composeRowArray(e)).flatMap(e => {e.id, isEditing: false}) as {isEditing: boolean, id: number}[]

  constructor() {
    makeAutoObservable(this);
  }

  setFileStructureArray(array: number[]) {
    this.fileStructureArray = array;
  }

  setData(data: MainTableRowProps[]) {
    this.data = data;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setEditing(id: number, bool: boolean) {
    let index = this.isEditing.findIndex((e) => e.id === id);
    this.isEditing[index] = { id, isEditing: bool };
  }

  async getData(eID: number = 1) {
    try {
      this.setLoading(true);
      const response = await axios.get<MainTableRowProps[]>(
        `${API_URL}/v1/outlay-rows/entity/1/row/list`
      );
      this.setData(response.data);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteRow(eID: number = 1, rID: number) {
    try {
      const response = axios.delete(
        `${API_URL}/v1/outlay-rows/entity/${eID}/row/${rID}/delete`
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  async createRowInEntity(eID: number = 1, parentId: number) {
    try {
      const response = await axios.post(
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
      );
    } catch (e) {
      console.log(e);
    }
  }

  async updateRow(
    eID: number = 1,
    rID: number,
    equipmentCosts: number,
    estimatedProfit: number,
    overheads: number,
    rowName: string,
    salary: number
  ) {
    try {
      const response = await axios.post(
        `${API_URL}/v1/outlay-rows/entity/${eID}/row/${rID}/update`,
        {
          equipmentCosts,
          estimatedProfit,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads,
          rowName,
          salary,
          supportCosts: 0,
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
}
