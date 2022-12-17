import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getRowsArray } from "../../store/selectors/rows.selector";
import { fetchRows } from "../../store/slices/rows.slice";
import MainTableRow from "../MainTableRow";
import style from "./MainTable.module.scss";

function MainTable(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRows());
  }, [dispatch]);

  const rows = useAppSelector(getRowsArray);

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
        {rows.map((elements, i) => (
          <MainTableRow {...elements} key={elements.id} index={i} />
        ))}
      </tbody>
    </table>
  );
}

export default MainTable;
