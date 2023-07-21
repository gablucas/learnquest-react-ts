import React from 'react';
import Styles from './Filter.module.css';
import Modal from "../Modal";
import { GlobalContext } from '../../GlobalContext';
import { FilterProp } from '../../types/Filter';
import FilterOptions from './FilterOptions';


const Filter = ({ options, setToggle }: FilterProp) => {
  const { data } = React.useContext(GlobalContext)

  return (
    <Modal setToggle={setToggle}>
      <div className={Styles.container}>
        <div>
          <h2>Filtro</h2>
          <button onClick={() => setToggle(false)}>Fechar</button>
        </div>

        <div className={Styles.options}>
          {options.access && <FilterOptions dataKey='access' title='Acesso' options={[{id: 'student', name: 'Estudante'}, {id: 'teacher', name: 'Professor'}, {id: 'admin', name: 'Administrador'}]} />}
          {options.student && <FilterOptions dataKey='student' title='Matérias' options={data.users.filter((user) => user.access === 'student').map((user2) => ({id: user2.id, name: user2.name}))} />}
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