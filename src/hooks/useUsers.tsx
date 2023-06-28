interface IStudent {
  id: string,
  access: string,
  nome: string,
  email: string,
  instituition: string,
  password: string | number,
  status: 'active' | 'disabled',
}

interface ITeacher {
  id: string,
  access: string,
  nome: string,
  email: string,
  instituition: string,
  password: string | number,
  status: 'active' | 'disabled',
}

export interface IInstituition {
  id: string,
  access: string,
  nome: string,
  email: string,
  password: string | number,
  users: Array<IStudent | ITeacher>,
  preferences: {
    defaultPassword: string | number,
  }
}

// Tipo usado no retorno da função 'useUsers'
type ReturnUseUsers = {
  instituitions: IInstituition[],
  registerUser: (user: IInstituition) => void,
  loggedUser : () => string,
}


const useUsers = (): ReturnUseUsers => {
  const instituitions: IInstituition[] = JSON.parse(localStorage.getItem('instituitions') || '[]');

  function registerUser(user: IInstituition): void {
      instituitions.push(user as IInstituition);
      localStorage.setItem('instituitions', JSON.stringify(instituitions));
  }

  function loggedUser(): string {
    return localStorage.getItem('logged') as string;
  }

  return {
    instituitions,
    registerUser,
    loggedUser,
  }

}

export default useUsers;