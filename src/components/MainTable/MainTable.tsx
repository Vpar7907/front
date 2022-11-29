import MainTableRow from "../MainTableRow";
import style from "./MainTable.module.scss";
import { composeRowArray } from "./MainTable.services";
import { useContext, useEffect } from "react";

import { eID } from "../../http";

import { MainTableRowProps } from "../MainTableRow/MainTableRow.types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchRows } from "../../store/slices/rows.slice";

function MainTable(): JSX.Element {
  const rows = useAppSelector((state) => state.rows);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRows());
    console.log(rows);
  }, []);
  console.log(rows);

  // async function onGetData() {
  //   await store.getData(eID);
  // }

  // useEffect(() => {
  //   onGetData();
  //   const fileStructureArray = data.flatMap((e: MainTableRowProps) =>
  //     composeRowArray(e).map((elements) => elements.level)
  //   );
  //   store.setFileStructureArray(fileStructureArray as number[]);
  // }, [store.data]);

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th className={style.th}>Уровень</th>
          <th className={style.th}>Наименование работ</th>
          <th className={style.th}>Основная з/п</th>
          <th className={style.th}>Оборудование</th>
          <th className={style.th}>Накладные расходы</th>
          <th className={style.th}>Сметная прибыль</th>
        </tr>
      </thead>
      <tbody>
        //{rows.loading && <tr><td>Loading...</td></tr>}
 // {rows.error !== "" && <tr><td>{rows.error}</td></tr>}
        {composeRowArray(
  {
    "id": 3560,
    "rowName": "Pochti Zakonchil 0_OP",
    "total": 5,
    "salary": 5,
    "mimExploitation": 0,
    "machineOperatorSalary": 0,
    "materials": 0,
    "mainCosts": 0,
    "supportCosts": 0,
    "equipmentCosts": 2,
    "overheads": 3,
    "estimatedProfit": 4,
    "child": [
      {
        "id": 22377,
        "rowName": "new",
        "total": 1,
        "salary": 0,
        "mimExploitation": 0,
        "machineOperatorSalary": 0,
        "materials": 0,
        "mainCosts": 0,
        "supportCosts": 0,
        "equipmentCosts": 0,
        "overheads": 0,
        "estimatedProfit": 0,
        "child": [
          {
            "id": 22384,
            "rowName": "new",
            "total": 0,
            "salary": 0,
            "mimExploitation": 0,
            "machineOperatorSalary": 0,
            "materials": 0,
            "mainCosts": 0,
            "supportCosts": 0,
            "equipmentCosts": 0,
            "overheads": 0,
            "estimatedProfit": 0,
            "child": []
          }
        ]
      },
      {
        "id": 22378,
        "rowName": "new",
        "total": 4,
        "salary": 0,
        "mimExploitation": 0,
        "machineOperatorSalary": 0,
        "materials": 0,
        "mainCosts": 0,
        "supportCosts": 0,
        "equipmentCosts": 0,
        "overheads": 0,
        "estimatedProfit": 0,
        "child": [
          {
            "id": 22388,
            "rowName": "new",
            "total": 0,
            "salary": 0,
            "mimExploitation": 0,
            "machineOperatorSalary": 0,
            "materials": 0,
            "mainCosts": 0,
            "supportCosts": 0,
            "equipmentCosts": 0,
            "overheads": 0,
            "estimatedProfit": 0,
            "child": []
          },
          {
            "id": 22389,
            "rowName": "new",
            "total": 0,
            "salary": 0,
            "mimExploitation": 0,
            "machineOperatorSalary": 0,
            "materials": 0,
            "mainCosts": 0,
            "supportCosts": 0,
            "equipmentCosts": 0,
            "overheads": 0,
            "estimatedProfit": 0,
            "child": []
          },
          {
            "id": 22390,
            "rowName": "new",
            "total": 0,
            "salary": 0,
            "mimExploitation": 0,
            "machineOperatorSalary": 0,
            "materials": 0,
            "mainCosts": 0,
            "supportCosts": 0,
            "equipmentCosts": 0,
            "overheads": 0,
            "estimatedProfit": 0,
            "child": []
          },
          {
            "id": 22391,
            "rowName": "new",
            "total": 0,
            "salary": 0,
            "mimExploitation": 0,
            "machineOperatorSalary": 0,
            "materials": 0,
            "mainCosts": 0,
            "supportCosts": 0,
            "equipmentCosts": 0,
            "overheads": 0,
            "estimatedProfit": 0,
            "child": []
          }
        ]
      },
      {
        "id": 22379,
        "rowName": "new",
        "total": 0,
        "salary": 0,
        "mimExploitation": 0,
        "machineOperatorSalary": 0,
        "materials": 0,
        "mainCosts": 0,
        "supportCosts": 0,
        "equipmentCosts": 0,
        "overheads": 0,
        "estimatedProfit": 0,
        "child": []
      },
      {
        "id": 22380,
        "rowName": "new",
        "total": 0,
        "salary": 0,
        "mimExploitation": 0,
        "machineOperatorSalary": 0,
        "materials": 0,
        "mainCosts": 0,
        "supportCosts": 0,
        "equipmentCosts": 0,
        "overheads": 0,
        "estimatedProfit": 0,
        "child": []
      },
      {
        "id": 22381,
        "rowName": "new",
        "total": 0,
        "salary": 0,
        "mimExploitation": 0,
        "machineOperatorSalary": 0,
        "materials": 0,
        "mainCosts": 0,
        "supportCosts": 0,
        "equipmentCosts": 0,
        "overheads": 0,
        "estimatedProfit": 0,
        "child": []
      }
    ]
  }
).flatMap((elements, i) => (
          <MainTableRow {...elements} key={elements.id} index={i} />
        ))}
      </tbody>
    </table>
  );
}

export default MainTable;
