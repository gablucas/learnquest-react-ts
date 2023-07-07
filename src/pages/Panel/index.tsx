import styles from './Panel.module.css';
import Container from "../../components/Container";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Panel = () => {

  return (
    <Container>
      <div className={styles.panel}>
        <Sidebar />
        <Outlet />
      </div>
    </Container>
  )
}

export default Panel;