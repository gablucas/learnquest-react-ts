import React from 'react';
import { GlobalContext } from '../../../../../GlobalContext';
import Panel from '../../../Panel.module.css';
import { useHelpers } from '../../../../../hooks/useHelpers';
import { ButtonEditGroup } from '../button-edit-group';
import { ButtonMobileInfo } from '../../../../../components/button-mobile-info';
import { ButtonDeleteGroup } from '../button-delete-group';

const GroupList = () => {
  const { data, filter } = React.useContext(GlobalContext);
  const { isArrayEmpty, arrayIncludes } = useHelpers();

  let groups = data.groups;
  if (!isArrayEmpty(filter.group)) groups = groups.filter((groups) => arrayIncludes(filter.group, groups.id));
  if (!isArrayEmpty(filter.status)) groups = groups.filter((groups) => arrayIncludes(filter.status, groups.status));


  return (
      <>
        {groups.map((group) => (
          <div key={group.id} className={Panel.class}>
            <span>{group.name}</span>
            <span>{group.students.length}</span>
            <span>{group.teachers.length}</span>
            <span>{group.status === 'active' ? 'Ativado' : 'Desativado'}</span>
            <ButtonMobileInfo info={[['Nome', group.name], ['Alunos', group.students.length], ['Professores', group.teachers.length], ['Estado', group.status === 'active' ? 'Ativado' : 'Desativado']]} />
            <ButtonEditGroup groupID={group.id} />
            <ButtonDeleteGroup groupID={group.id} />
          </div>
        ))}
    </>
  )
}
export default GroupList;