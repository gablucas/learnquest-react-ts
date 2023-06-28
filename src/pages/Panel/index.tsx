import React from 'react';
import styles from './Panel.module.css';
import Container from "../../components/Container";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { GlobalContext } from "../../GlobalContext";

const Panel = () => {
  const { myData } = React.useContext(GlobalContext);


  return (
    <Container>
      <div className={styles.panel}>
        <div>
          <span>{myData && myData.nome}</span>

          <Sidebar />
        </div>
        <Outlet />
      </div>
    </Container>
  )
}

export default Panel;