import Panel from '../../../Panel.module.css';

const UsersHeaders = () => {

  return (
    <div>
      <span>Nome</span>
      <span>Email</span>
      <span>Acesso</span>
      <span>Estado</span>
      <span className={Panel.mobile}>Informações</span>
      <span>Editar</span>
      <span>Excluir</span>
    </div>
  )
}

export default UsersHeaders;