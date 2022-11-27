import { MainTableRowProps, MainTableRowState } from "./MainTableRow.types";
import { formatNum } from "./MainTableRow.services";
import style from "./MainTableRow.module.scss";
import MainTableRowPanel from "../MainTableRowPanel";
import first_folder from "../../images/first_folder.svg";
import second_folder from "../../images/second_folder.svg";
import document from "../../images/document.svg";
import { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

function MainTableRow({
  amountChild,
  level,
  index,
  id,
  ...props
}: MainTableRowProps | any) {
  const { store } = useContext(Context);

  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const [rowName, setRowName] = useState(props.rowName);
  const [salary, setSalary] = useState(props.salary);
  const [equipmentCosts, setEquipmentCosts] = useState(props.equipmentCosts);
  const [overheads, setOverheads] = useState(props.overheads);
  const [estimatedProfit, setEstimatedProfit] = useState(props.estimatedProfit);

  function onUpdateHandler() {
    store.updateRow(
      1,
      id,
      equipmentCosts,
      estimatedProfit,
      overheads,
      rowName,
      salary
    );
  }

  function onDbClick(e: React.MouseEvent) {
    if (e.detail === 2 && !store.isEditing) {
      store.setEditing(true);
      setFocus(true);
    }
  }

  function onKeyboardEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      setFocus(false);
      onUpdateHandler();
      store.setEditing(false);
    }
  }

  let indexFrom = store.fileStructureArray.indexOf(level + 1, index);

  let lengthConnectLine = 0;

  if (indexFrom !== -1) {
    lengthConnectLine =
      store.fileStructureArray.lastIndexOf(level + 1, indexFrom) - index;
  }

  let indexTo = store.fileStructureArray.lastIndexOf(level + 1);

  if (indexTo !== -1) {
    lengthConnectLine = indexTo - index;
  }

  if (level !== 0) {
    lengthConnectLine = amountChild;
  }

  return (
    <tr className={style.row} onKeyDown={onKeyboardEnter} onClick={onDbClick}>
      <td>
        <div
          className={level !== 0 ? style.file : style.rootFile}
          style={{ marginLeft: 20 * level, position: "relative" }}
        >
          <div
            className={style.after}
            style={{ height: lengthConnectLine * 60 - 8 }}
          ></div>
          <div onMouseLeave={() => setOpenPanel(false)}>
            {openPanel ? (
              <MainTableRowPanel level={level} id={id} />
            ) : (
              <img
                onMouseEnter={() => {
                  if (!store.isEditing) setOpenPanel(true);
                }}
                src={
                  level === 0
                    ? first_folder
                    : level === 1
                    ? second_folder
                    : level === 2
                    ? document
                    : ""
                }
                alt="file"
              />
            )}
          </div>
        </div>
      </td>
      <td>
        {focus ? (
          <input
            className={focus ? style.input + " " + style.focus : style.input}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRowName(e.target.value)
            }
            value={rowName}
          />
        ) : (
          <p className={style.row}>{rowName}</p>
        )}
      </td>
      <td>
        {focus ? (
          <input
            className={focus ? style.input + " " + style.focus : style.input}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSalary(e.target.value)
            }
            value={salary}
          />
        ) : (
          <p className={style.row}>{formatNum(salary)}</p>
        )}
      </td>
      <td>
        {focus ? (
          <input
            className={focus ? style.input + " " + style.focus : style.input}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEquipmentCosts(e.target.value)
            }
            value={equipmentCosts}
          />
        ) : (
          <p className={style.row}>{formatNum(equipmentCosts)}</p>
        )}
      </td>
      <td>
        {focus ? (
          <input
            className={focus ? style.input + " " + style.focus : style.input}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOverheads(e.target.value)
            }
            value={overheads}
          />
        ) : (
          <p className={style.row}>{formatNum(overheads)}</p>
        )}
      </td>
      <td>
        {focus ? (
          <input
            className={focus ? style.input + " " + style.focus : style.input}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEstimatedProfit(e.target.value)
            }
            value={estimatedProfit}
          />
        ) : (
          <p className={style.row}>{formatNum(estimatedProfit)}</p>
        )}
      </td>
    </tr>
  );
}

export default observer(MainTableRow);