import React from 'react';
import Styles from './Filter.module.css';
import Modal from "../Modal";
import FilterOptions from './FilterOptions';
import { GlobalContext } from '../../GlobalContext';

type FilterProps = {
  handleToggle: () => void,
  options: {
    access: boolean,
    student: boolean,
    subject: boolean,
    group: boolean,
    createdby: boolean,
    status: boolean,
  },
}


const Filter = ({ handleToggle, options }: FilterProps) => {
  const { data } = React.useContext(GlobalContext);


  return (
    <Modal handleToggle={handleToggle}>
      <div className={Styles.container}>
        <div>
          <h2>Filtro</h2>
          <button onClick={handleToggle}>Fechar</button>
        </div>

        <div className={Styles.options}>
          {options.access && <FilterOptions dataKey='access' title='Acesso' options={[{id: 'student', name: 'Estudante'}, {id: 'teacher', name: 'Professor'}, {id: 'admin', name: 'Administrador'}]} />}
          {options.student && <FilterOptions dataKey='student' title='Alunos' options={data.users.filter((user) => user.access === 'student').map((user2) => ({id: user2.id, name: user2.name}))} />}
          {options.subject && <FilterOptions dataKey='subject' title='Matérias' options={data.subjects.map((subject) => ({id: subject.id, name: subject.name}))} />}
          {options.group && <FilterOptions dataKey='group' title='Turmas' options={data.groups.map((groups) => ({id: groups.id, name: groups.name}))} />}
          {options.createdby && <FilterOptions dataKey='createdby' title='Criado por' options={data.users.filter((user) => user.access !== 'student').map((user2) => ({id: user2.id, name: user2.name}))} />}
          {options.status && <FilterOptions dataKey='status' title='Estado' options={[{id: 'active', name: 'Ativado'}, {id: 'desactive', name: 'Desativado'}]} />}
        </div>
      </div>
    </Modal>
  )
}

export default Filter;