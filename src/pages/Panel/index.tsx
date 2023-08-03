import styles from './Panel.module.css';
import Container from "../../components/Container";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChangeDefaultPassword from '../../components/ChangeDefaultPassword/ChangeDefaultPassword';

const Panel = () => {

  return (
    <Container>
      <div className={styles.panel}>
        <Sidebar />
        <Outlet />
        <ChangeDefaultPassword />
      </div>
    </Container>
  )
}

export default Panel;