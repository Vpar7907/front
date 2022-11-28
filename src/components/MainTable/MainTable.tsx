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
        {rows.loading && <tr>Loading...</tr>}
        {rows.rows.flatMap((elements, i) => (
          <MainTableRow {...elements} key={elements.id} index={i} />
        ))}
      </tbody>
    </table>
  );
}

export default MainTable;
