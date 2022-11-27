import MainTableRow from "../MainTableRow";
import style from "./MainTable.module.scss";
import { composeRowArray } from "./MainTable.services";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { eID } from "../../http";
import { toJS } from "mobx";
import { MainTableRowProps } from "../MainTableRow/MainTableRow.types";

function MainTable(): JSX.Element {
  const { store } = useContext(Context);

  async function onGetData() {
    await store.getData(eID);
  }

  let data = toJS(store.data);
  useEffect(() => {
    onGetData();
    const fileStructureArray = data.flatMap((e: MainTableRowProps) =>
      composeRowArray(e).map((elements) => elements.level)
    );
    store.setFileStructureArray(fileStructureArray as number[]);
  }, [store.data]);

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
        {data.flatMap((e) =>
          composeRowArray(e).flatMap((elements, i) => (
            <MainTableRow {...elements} key={elements.id} index={i} />
          ))
        )}
      </tbody>
    </table>
  );
}

export default observer(MainTable);
