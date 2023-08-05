import React from 'react';
import { GlobalContext } from '../../../../../GlobalContext';
import { Group } from '../../../../../types/Group';
import Panel from '../../../Panel.module.css';
import { useHelpers } from '../../../../../hooks/useHelpers';
import { MobileInfoData } from '../../../../../types/Commom';
import EditIcon from '../../../../../components/Icons/EditIcon';
import DeleteIcon from '../../../../../components/Icons/DeleteIcon';
import MoreInfo from '../../../../../components/Icons/MoreInfo';
import { useGroup } from '../../../../../hooks/useGroup';

interface GroupListProps {
  setGroupID: React.Dispatch<React.SetStateAction<string>>,
  setMobileInfo: React.Dispatch<React.SetStateAction<MobileInfoData[]>>,
}

const GroupList = ({ setGroupID, setMobileInfo}: GroupListProps) => {
  const { data, filter, setConfirm, setToggle } = React.useContext(GlobalContext);
  const { deleteGroup } = useGroup();
  const { isArrayEmpty, arrayIncludes } = useHelpers();

  let groups = data.groups;
  if (!isArrayEmpty(filter.group)) groups = groups.filter((groups) => arrayIncludes(filter.group, groups.id));
  if (!isArrayEmpty(filter.status)) groups = groups.filter((groups) => arrayIncludes(filter.status, groups.status));

  function handleEdit(classid: string): void {
    setGroupID(classid);
    setToggle('edit');
  }

  function handleRemoveGroup(id: string): void {
    setToggle('confirm');
    setConfirm({type: 'confirm', text: 'Deseja realmente excluir essa turma?', action: () => deleteGroup(id)});
  }

  function handleMobileInfo(m: Group): void {
    const name = {title: 'Nome', description: m.name};
    const students = {title: 'Estudantes', description: m.students.length};
    const status = {title: 'Estado', description: m.status ? 'Ativado' : 'Desativado'};

    setMobileInfo([name, students, status]);
    setToggle('mobile');
  }

  return (
      <>
        {groups.map((group) => (
          <div key={group.id} className={Panel.class}>
            <span>{group.name}</span>
            <span>{group.students.length}</span>
            <span>{group.teachers.length}</span>
            <span>{group.status === 'active' ? 'Ativado' : 'Desativado'}</span>
            <button className={Panel.mobile} onClick={() => handleMobileInfo(group)} ><MoreInfo /></button>
            <button onClick={() => handleEdit(group.id)}><EditIcon /></button>
            <button onClick={() => handleRemoveGroup(group.id)}><DeleteIcon /></button>
          </div>
        ))}
    </>
  )
}
export default GroupList;