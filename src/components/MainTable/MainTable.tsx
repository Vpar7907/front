import MainTableRow from "../MainTableRow";
import style from "./MainTable.module.scss";

function MainTable(): JSX.Element {
  return (
    <table className={style.table}>
      <thead>
        <th className={style.th}>Уровень</th>
        <th className={style.th}>Наименование работ</th>
        <th className={style.th}>Основная з/п</th>
        <th className={style.th}>Оборудование</th>
        <th className={style.th}>Накладные расходы</th>
        <th className={style.th}>Сметная прибыль</th>
      </thead>
      <tbody>
        <MainTableRow/>
      </tbody>
    </table>
  );
}

export default MainTable;
