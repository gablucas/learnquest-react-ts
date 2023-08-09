import Panel from '../Panel.module.css';
import GroupHeader from './components/group-header';
import GroupList from './components/group-list';

import { ButtonCleanFilter } from '../../../components/button-clean-filter';
import { ButtonCreateGroup } from './components/button-create-group';
import { ButtonFilter } from '../../../components/button-filter';

const Groups = () => {
  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <ButtonCreateGroup />
        <ButtonFilter isFiltered={['group' ,'status']} />
        <ButtonCleanFilter isFiltered={['group' ,'status']} />
      </div>

      <div className={`${Panel.info} ${Panel.groups}`}>
        <GroupHeader />
        <GroupList />
      </div>
    </section>
  )
}

export default Groups;