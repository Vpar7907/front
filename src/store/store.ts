import { configureStore } from "@reduxjs/toolkit";
import rowsReducer from "./slices/rows.slice";

const store = configureStore({
  reducer: {
    rows: rowsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//  async getData(eID: number = 1) {
//   try {
//     this.setLoading(true);
//     const response = await axios.get<MainTableRowProps[]>(
//       `${API_URL}/v1/outlay-rows/entity/1/row/list`
//     );
//     this.setData(response.data);
//   } catch (e: any) {
//     console.log(e.response?.data?.message);
//   } finally {
//     this.setLoading(false);
//   }
// }

// async deleteRow(eID: number = 1, rID: number) {
//   try {
//     const response = axios.delete(
//       `${API_URL}/v1/outlay-rows/entity/${eID}/row/${rID}/delete`
//     );
//     console.log(response);
//   } catch (e) {
//     console.log(e);
//   }
// }

// async createRowInEntity(eID: number = 1, parentId: number) {
//   try {
//     const response = await axios.post(
//       `${API_URL}/v1/outlay-rows/entity/${eID}/row/create`,
//       {
//         equipmentCosts: 0,
//         estimatedProfit: 0,
//         machineOperatorSalary: 0,
//         mainCosts: 0,
//         materials: 0,
//         mimExploitation: 0,
//         overheads: 0,
//         parentId,
//         rowName: "new",
//         salary: 0,
//         supportCosts: 0,
//       }
//     );
//   } catch (e) {
//     console.log(e);
//   }
// }

// async updateRow(
//   eID: number = 1,
//   rID: number,
//   equipmentCosts: number,
//   estimatedProfit: number,
//   overheads: number,
//   rowName: string,
//   salary: number
// ) {
//   try {
//     const response = await axios.post(
//       `${API_URL}/v1/outlay-rows/entity/${eID}/row/${rID}/update`,
//       {
//         equipmentCosts,
//         estimatedProfit,
//         machineOperatorSalary: 0,
//         mainCosts: 0,
//         materials: 0,
//         mimExploitation: 0,
//         overheads,
//         rowName,
//         salary,
//         supportCosts: 0,
//       }
//     );
//   } catch (e) {
//     console.log(e);
//   }
// }
