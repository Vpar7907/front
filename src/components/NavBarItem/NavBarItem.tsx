import { NavBarItemProps } from "./NavBarItem.types";
import nav_list from "../../images/nav_list.svg";
import style from "./NavBarItem.module.scss";

function NavBarItem({ entity }: NavBarItemProps): JSX.Element {
  return (
    <li className={style.menuItem}>
      <img src={nav_list} alt="marker" />
      <div>
        <p className={style.ellipsis}>{entity.rowName}</p>
      </div>
    </li>
  );
}

export default NavBarItem;
