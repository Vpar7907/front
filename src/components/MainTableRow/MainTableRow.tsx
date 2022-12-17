import { MainTableRowProps, RowsStructure } from "./MainTableRow.types";
import { formatNum } from "./MainTableRow.services";
import style from "./MainTableRow.module.scss";
import MainTableRowPanel from "../MainTableRowPanel";
import first_folder from "../../images/first_folder.svg";
import second_folder from "../../images/second_folder.svg";
import document from "../../images/document.svg";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  getEditingRow,
  getEditRowData,
  getRowsStructureArray,
} from "../../store/selectors/rows.selector";
import {
  editRows,
  setEditingRow,
  setIsEdit,
} from "../../store/slices/rows.slice";
import { IEditingRow } from "../../models/project";

function MainTableRow({
  amountChild,
  level,
  index,
  id,
  parentId,
  ...props
}: MainTableRowProps) {
  const rowsStructureArray = useAppSelector(getRowsStructureArray);
  const isEdit = useAppSelector(getEditingRow);
  const editRowData = useAppSelector(getEditRowData);
  const dispatch = useAppDispatch();

  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [rowName, setRowName] = useState(props.rowName);
  const [salary, setSalary] = useState(props.salary);
  const [equipmentCosts, setEquipmentCosts] = useState(props.equipmentCosts);
  const [overheads, setOverheads] = useState(props.overheads);
  const [estimatedProfit, setEstimatedProfit] = useState(props.estimatedProfit);
  const [connectLineLength, setConnectLineLength] = useState<number>(0);

  let rowData: IEditingRow = {
    equipmentCosts,
    estimatedProfit,
    salary,
    rowName,
    overheads,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    supportCosts: 0,
  };

  useEffect(
    () => {
      setConnectLineLength(calcConnectLine());
    }, // eslint-disable-next-line
    [rowsStructureArray]
  );
  useEffect(
    () => {
      if (isEdit === id) {
        dispatch(setEditingRow(rowData));
      }
    }, // eslint-disable-next-line
    [equipmentCosts, estimatedProfit, salary, rowName, overheads, isEdit]
  );

  function onDbClick(e: React.MouseEvent) {
    if (e.detail === 2 && isEdit === null) {
      dispatch(setIsEdit(id));
      dispatch(setEditingRow(rowData));
    }
    if (e.detail === 2 && isEdit !== null) {
      dispatch(editRows({ id: isEdit, rowData: editRowData as IEditingRow }));
      dispatch(setIsEdit(id));
      dispatch(setEditingRow(rowData));
    }
  }

  function onKeyboardEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      dispatch(editRows({ id, rowData }));
      dispatch(setIsEdit(null));
    }
  }

  function calcConnectLine() {
    const indexCurrentRow = rowsStructureArray.findIndex(
      (row) => row.id === id
    );
    let tempArray = rowsStructureArray.splice(indexCurrentRow);
    tempArray.shift();
    const indexNextZeroLevelRow = tempArray.findIndex((row) => row.level === 0);

    if (indexNextZeroLevelRow !== -1) {
      tempArray = tempArray.slice(0, indexNextZeroLevelRow);
    }
    const nextIndex = tempArray.findIndex(
      (e: RowsStructure) => level === e.level
    );

    if (nextIndex === -1 && tempArray[0]?.level > level) {
      for (let i = tempArray.length - 1; i > 0; i--) {
        const element = tempArray[i];

        if (element.level - 1 === level) {
          break;
        }
        tempArray.pop();
      }

      return tempArray.length;
    }
    if (nextIndex !== -1) {
    }
    if (tempArray[0]?.level < level) {
      return 0;
    }
    if (nextIndex === -1) {
      return 0;
    }

    return nextIndex;
  }

  return (
    <tr className={style.row} onKeyDown={onKeyboardEnter} onClick={onDbClick}>
      <td>
        <div
          className={level !== 0 ? style.file : style.rootFile}
          style={{ marginLeft: 20 * level, position: "relative" }}
        >
          {connectLineLength !== 0 && (
            <div
              className={style.after}
              style={{ height: connectLineLength * 60 - 8 }}
            ></div>
          )}
          <div onMouseLeave={() => setOpenPanel(false)}>
            {openPanel ? (
              <MainTableRowPanel parentId={parentId} level={level} id={id} />
            ) : (
              <img
                onMouseEnter={() => {
                  if (isEdit !== id) {
                    setOpenPanel(true);
                  }
                }}
                onMouseLeave={() => {
                  setOpenPanel(false);
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
        {isEdit === id ? (
          <input
            className={
              isEdit === id ? style.input + " " + style.focus : style.input
            }
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
        {isEdit === id ? (
          <input
            className={
              isEdit === id ? style.input + " " + style.focus : style.input
            }
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSalary(+e.target.value)
            }
            value={salary}
          />
        ) : (
          <p className={style.row}>{formatNum(salary)}</p>
        )}
      </td>
      <td>
        {isEdit === id ? (
          <input
            className={
              isEdit === id ? style.input + " " + style.focus : style.input
            }
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEquipmentCosts(+e.target.value)
            }
            value={equipmentCosts}
          />
        ) : (
          <p className={style.row}>{formatNum(equipmentCosts)}</p>
        )}
      </td>
      <td>
        {isEdit === id ? (
          <input
            className={
              isEdit === id ? style.input + " " + style.focus : style.input
            }
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOverheads(+e.target.value)
            }
            value={overheads}
          />
        ) : (
          <p className={style.row}>{formatNum(overheads)}</p>
        )}
      </td>
      <td>
        {isEdit === id ? (
          <input
            className={
              isEdit === id ? style.input + " " + style.focus : style.input
            }
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEstimatedProfit(+e.target.value)
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
