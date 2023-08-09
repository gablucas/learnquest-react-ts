import Panel from '../../../Panel.module.css';
import { IStudent, IUser } from '../../../../../types/Users';
import { ButtonEditUser } from '../button-edit-user';
import { ButtonMobileInfo } from '../../../../../components/button-mobile-info';
import { ButtonDeleteUser } from '../button-delete-user';

interface IUsersListProps {
  users: IUser[] | IStudent[],
}

const UsersList = ({ users }: IUsersListProps) => {

  return (
    <>
      {users.map((user) => (
        <div key={user.id} className={Panel.user}>
          <span>{user.name}</span>
          <span>{user.email}</span>
          <span>{user.access === 'admin' ? 'Admin' : user.access === 'teacher' ? 'Professor' : 'Aluno'}</span>
          <span>{user.status === 'active' ? 'Ativado' : 'Desativado'}</span>
          <ButtonMobileInfo info={[['Nome', user.name], ['Email', user.email], ['Acesso', user.access], ['Estado', user.status ? 'Ativado' : 'Desativado']]} />
          {user.id !== 'U1' && (
            <>
              <ButtonEditUser userID={user.id} />
              <ButtonDeleteUser userID={user.id} />
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default UsersList;