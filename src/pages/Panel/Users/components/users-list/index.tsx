import Panel from '../../../Panel.module.css';
import { IStudent, IUser } from '../../../../../types/Users';
import { ButtonEditUser } from '../button-edit-user';
import { ButtonRemoveUser } from '../button-remove-user';
import { ButtonMobileInfo } from '../button-mobile-info';

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
          <ButtonMobileInfo user={user} />
          {user.id !== 'U1' && (
            <>
              <ButtonEditUser userID={user.id} />
              <ButtonRemoveUser userEmail={user.email} />
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default UsersList;