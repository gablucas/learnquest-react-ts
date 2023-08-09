import React from 'react';
import Styles from './Filter.module.css';
import Modal from "../Modal";
import FilterOptions from './FilterOptions';
import { GlobalContext } from '../../GlobalContext';
import { FilterStateProps } from '../../types/Filter';

type FilterProps<T> = {
  handleToggle: () => void,
  options: T[],
}


const Filter = <T extends keyof FilterStateProps>({ handleToggle, options }: FilterProps<T>) => {
  const { data } = React.useContext(GlobalContext);
  console.log(options)

  const filterOptions = React.useMemo(() => (
    {
      access: [{id: 'student', name: 'Estudante'}, {id: 'teacher', name: 'Professor'}, {id: 'admin', name: 'Administrador'}],
      student: data.users.filter((user) => user.access === 'student').map((user2) => ({id: user2.id, name: user2.name})),
      subject: data.subjects.map((subject) => ({id: subject.id, name: subject.name})),
      group: data.groups.map((groups) => ({id: groups.id, name: groups.name})),
      createdby: data.users.filter((user) => user.access !== 'student').map((user2) => ({id: user2.id, name: user2.name})),
      status: [{id: 'active', name: 'Ativado'}, {id: 'desactive', name: 'Desativado'}],
    }), [data])

    console.log('Renderizou Filter')


  return (
    <Modal handleToggle={handleToggle}>
      <div className={Styles.container}>
        <div>
          <h2>Filtro</h2>
          <button onClick={handleToggle}>Fechar</button>
        </div>

        <div className={Styles.options}>
          {options.some((key) => key === 'access') && <FilterOptions dataKey='access' title='Acesso' options={filterOptions.access} />}
          {options.some((key) => key === 'student') && <FilterOptions dataKey='student' title='Alunos' options={filterOptions.student} />}
          {options.some((key) => key === 'subject') && <FilterOptions dataKey='subject' title='Matérias' options={filterOptions.subject} />}
          {options.some((key) => key === 'group') && <FilterOptions dataKey='group' title='Turmas' options={filterOptions.group} />}
          {options.some((key) => key === 'createdby') && <FilterOptions dataKey='createdby' title='Criado por' options={filterOptions.createdby} />}
          {options.some((key) => key === 'status') && <FilterOptions dataKey='status' title='Estado' options={filterOptions.status} />}
        </div>
      </div>
    </Modal>
  )
}

export default Filter;