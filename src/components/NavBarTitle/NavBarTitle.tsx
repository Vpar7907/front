import arrow_down from "../../images/arrow_down.svg";
import style from "./NavBarTitle.module.scss";

function NavBarTitle(): JSX.Element {
  return (
    <div className={style.navTitle}>
      <div>
        <h3>Название проекта</h3>
        <p>Аббревиатура</p>
      </div>
      <div>
        <img src={arrow_down} alt="more" />
      </div>
    </div>
  );
}

export default NavBarTitle;
