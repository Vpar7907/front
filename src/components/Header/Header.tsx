import style from "./Header.module.scss";
import arrow_back from "../../images/arrow_back.svg";
import menu_header from "../../images/menu_header.svg";

function Header(): JSX.Element {
  return (
    <div className={style.header}>
      <ul>
        <li>
          <img src={menu_header} alt="Menu" />
        </li>
        <li>
          <img src={arrow_back} alt="Back" />
        </li>
        <li className={[style.item, style.active].join(" ")}>
          <p>Просмотр</p>
        </li>
        <li className={style.item}>
          <p>Управление</p>
        </li>
      </ul>
    </div>
  );
}

export default Header;
