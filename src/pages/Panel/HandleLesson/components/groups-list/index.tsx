import React, { SetStateAction } from 'react';
import Error from '../../../../../components/Helper/Error';
import useValidate from '../../../../../hooks/useValidate';
import Styles from '../../HandleLesson.module.css';
import { getUserLoggedGroups } from '../../../../../helpers/group/getUserLoggedGroups';

interface IGroupListProps {
  groups: string[],
  setGroups: React.Dispatch<SetStateAction<string[]>>
}

const GroupsList = ({ groups, setGroups }: IGroupListProps) => {
  const { error } = useValidate();
  const userGroups = getUserLoggedGroups();

  function handleGroups(e: React.ChangeEvent<HTMLInputElement>, groupID: string): void {
    if (e.target.checked) {
      setGroups([...groups, groupID]);
    } else {
      setGroups(groups.filter((f) => f !== groupID));
    }
  }

  return (
    <div>
    <h2>Turmas</h2>
    <div className={Styles.groups}>
      {userGroups.map((groupMap) => (
        <div key={groupMap.id}>
          <input type='checkbox' checked={groups.some((group) => group === groupMap.id)} onChange={(e) => handleGroups(e, groupMap.id)}/>
          <label>{groupMap.name}</label>
        </div>
      ))}
      {userGroups.length === 0 && (<label>Sem turma criada, ativa ou vinculada</label>)}
    </div>
    {error === 'group' && (<Error>Selecione pelo menos uma turma</Error>)}
  </div>
  )
}

export default GroupsList