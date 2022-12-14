import style from "./MainTableRowPanel.module.scss";
import first_folder from "../../images/first_folder.svg";
import second_folder from "../../images/second_folder.svg";
import document from "../../images/document.svg";
import delete_icon from "../../images/delete.svg";
import { MainTableRowPanelProps } from "./MainTableRowPanel.types";

import { useAppDispatch } from "../../hooks/redux";
import { deleteRows, addRows } from "../../store/slices/rows.slice";

function MainTableRowPanel({ id, level, parentId }: MainTableRowPanelProps) {
  const dispatch = useAppDispatch();

  function onCreateHandler() {
    dispatch(addRows(id));
  }

  function onCreateHandlerFirst() {
    dispatch(addRows(null));
  }

  function onCreateHandlerThisLevel() {
    dispatch(addRows(parentId));
  }

  function onDeleteHandler() {
    dispatch(deleteRows(id));
  }

  if (level === 0) {
    return (
      <div className={style.panel}>
        <img src={first_folder} alt="file" onClick={onCreateHandlerFirst} />

        <img src={second_folder} alt="file" onClick={onCreateHandler} />

        <img src={document} alt="file" />

        <img src={delete_icon} alt="file" onClick={onDeleteHandler} />
        <div className={style.bgPanel} style={{ width: (4 - level) * 26 }} />
      </div>
    );
  }
  if (level === 1) {
    return (
      <div className={style.panel}>
        <img
          src={second_folder}
          alt="file"
          onClick={onCreateHandlerThisLevel}
        />

        <img src={document} onClick={onCreateHandler} alt="file" />

        <img src={delete_icon} alt="file" onClick={onDeleteHandler} />
        <div className={style.bgPanel} style={{ width: (4 - level) * 26 }} />
      </div>
    );
  }
  if (level === 2) {
    return (
      <div className={style.panel}>
        <img src={document} alt="file" onClick={onCreateHandlerThisLevel} />

        <img src={delete_icon} alt="file" onClick={onDeleteHandler} />
        <div className={style.bgPanel} style={{ width: (4 - level) * 26 }} />
      </div>
    );
  }

  return <></>;
}

export default MainTableRowPanel;
