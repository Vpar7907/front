import style from "./MainTitle.module.scss";

function MainTitle(): JSX.Element {
  return (
    <div className={style.mainTitle}>
      <div>
        <p>Строительно-монтажные работы</p>
      </div>
    </div>
  );
}

export default MainTitle;
