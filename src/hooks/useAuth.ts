import React, { SetStateAction } from 'react';
import { GlobalContext } from "../GlobalContext";
import { getData } from '../helpers/data/getData';
import { getLoggedUser } from '../helpers/user/getLoggedUser';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const { setUser } = React.useContext(GlobalContext);
  const navigate = useNavigate();

  function authUser(login: string, password: string, setError: React.Dispatch<SetStateAction<string | null>>): void {
    const data = getData();
    const user = data.users.find((user) => user.login.toLowerCase() === login.toLowerCase() && user.password === password);

    if (user && user.status === 'active') {
      localStorage.setItem('logged', login);
      setUser(login);

      if (getLoggedUser()?.access === "student") {
        navigate('/estudante');
      } else {
        navigate('/painel');
      }
    
    } else if (user?.status === 'disable') {
      setError('Usuario inativo')
    } else {
      setError('Usuário ou Senha invalidos');
    }
  }

  function logoutUser(): void {
    localStorage.removeItem('logged');
    setUser(null);
  }

  return {
    authUser,
    logoutUser,
  }
}

export { useAuth };