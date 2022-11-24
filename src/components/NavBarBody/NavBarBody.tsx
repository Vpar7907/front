import { entityData } from "../../data/entity";
import NavBarItem from "../NavBarItem";
import style from "./NavBarBody.module.scss";

function NavBarBody(): JSX.Element {
  return (
    <ul className={style.menu}>
      {entityData.map((el) => (
        <NavBarItem entity={el} />
      ))}
    </ul>
  );
}

export default NavBarBody;
