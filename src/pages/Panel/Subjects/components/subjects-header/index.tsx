import Panel from '../../../Panel.module.css';

const SubjectsHeader = () => {
  return (
    <div>
      <span>Nome</span>
      <span>Aulas</span>
      <span>Estado</span>
      <span className={Panel.mobile}>Informações</span>
      <span>Editar</span>
      <span>Excluir</span>
    </div>
  )
}

export default SubjectsHeader;