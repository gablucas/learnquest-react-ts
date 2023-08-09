import Panel from '../Panel.module.css';
import UsersHeaders from './components/users-header';
import UsersList from './components/users-list';
import { ButtonCreateUser } from './components/button-create-user';
import { ButtonCleanFilter } from '../../../components/button-clean-filter';
import { ButtonFilter } from '../../../components/button-filter';

const Users = () => {

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <ButtonCreateUser />
        <ButtonFilter isFiltered={['access', 'status']} />
        <ButtonCleanFilter isFiltered={['access', 'status']} />
      </div>

      <div className={`${Panel.info} ${Panel.users}`}>
        <UsersHeaders />
        <UsersList />
      </div>
    </section>
  )
}

export default Users;