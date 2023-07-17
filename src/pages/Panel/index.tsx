import React from 'react';
import styles from './Panel.module.css';
import Container from "../../components/Container";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import useData from '../../hooks/useData';
import { GlobalContext } from '../../GlobalContext';

const Panel = () => {
  const { data } = React.useContext(GlobalContext)
  const { getLoggedUser } = useData();

  return (
    <Container>
      <div className={styles.panel}>
        <Sidebar />
        <Outlet />
        {getLoggedUser()?.password == data?.preferences.defaultPassword && (<ChangePassword />)}
      </div>
    </Container>
  )
}

export default Panel;