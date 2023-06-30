import styles from './Panel.module.css';
import Container from "../../components/Container";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Panel = () => {

  return (
    <Container>
      <div className={styles.panel}>
        <div>
          <Sidebar />
        </div>
        <Outlet />
      </div>
    </Container>
  )
}

export default Panel;