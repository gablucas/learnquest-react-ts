import Panel from '../../../Panel.module.css';

const StudentsHeader = () => {

  return (
    <div>
      <span>Nome</span>
      <span>Turma</span>
      <span>Level</span>
      <span className={Panel.mobile}>Informações</span>
      <span>Dados</span>
    </div>
  )
}

export default StudentsHeader;