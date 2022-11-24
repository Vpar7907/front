import { MainLayoutProps } from "./MainLayout.types";
import style from "./MainLayout.module.scss";
import NavBar from "../components/NavBar/";
import Header from "../components/Header";

function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Header />
      </header>
      <nav className={style.nav}>
        <NavBar />
      </nav>
      <main className={style.main}>{children}</main>
    </div>
  );
}

export default MainLayout;
