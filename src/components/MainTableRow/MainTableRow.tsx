import { MainTableRowProps, MainTableRowState } from "./MainTableRow.types";
import { formatNum } from "./MainTableRow.services";
import style from "./MainTableRow.module.scss";
import MainTableRowPanel from "../MainTableRowPanel";
import first_folder from "../../images/first_folder.svg";
import second_folder from "../../images/second_folder.svg";
import document from "../../images/document.svg";
import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";

function MainTableRow({
  amountChild,
  level,
  index,
  id,
  ...props
}: MainTableRowProps | any) {
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const [rowName, setRowName] = useState(props.rowName);
  const [salary, setSalary] = useState(props.salary);
  const [equipmentCosts, setEquipmentCosts] = useState(props.equipmentCosts);
  const [overheads, setOverheads] = useState(props.overheads);
  const [estimatedProfit, setEstimatedProfit] = useState(props.estimatedProfit);

  const fileStructure = useAppSelector((state) => state.rows.fileStructure);

  function onUpdateHandler() {
    // store.updateRow(
    //   1,
    //   id,
    //   equipmentCosts,
    //   estimatedProfit,
    //   overheads,
    //   rowName,
    //   salary
    // );
  }

  function onDbClick(e: React.MouseEvent) {
    // if (e.detail === 2 && !store.isEditing) {
    //   store.setEditing(true);
    //   setFocus(true);
    // }
  }

  function onKeyboardEnter(e: React.KeyboardEvent) {
    // if (e.key === "Enter") {
    //   setFocus(false);
    //   onUpdateHandler();
    //   store.setEditing(false);
    // }
  }

  function calcConnectLine(fileStructureArray: number[]) {
    if (level === 0) {
      return fileStructureArray.lastIndexOf(2);
    }
    return amountChild;
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
            style={{ height: calcConnectLine(fileStructure) * 60 - 8 }}
          ></div>
          <div onMouseLeave={() => setOpenPanel(false)}>
            {openPanel ? (
              <MainTableRowPanel level={level} id={id} />
            ) : (
              <img
                onMouseEnter={() => {
                  setOpenPanel(true);
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

export default MainTableRow;
