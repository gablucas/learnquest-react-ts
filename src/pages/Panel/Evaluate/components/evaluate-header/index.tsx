import Panel from '../../../Panel.module.css';

const EvaluateHeader = () => {

  return (
    <div>
      <span>Título</span>
      <span>Aluno</span>
      <span>Criada por</span>
      <span>Matéria</span>
      <span className={Panel.mobile}>Informações</span>
      <span>Avaliar</span>
    </div>
  )
}

export default EvaluateHeader;