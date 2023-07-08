import useData from "../../hooks/useData";
import useForm from "../../hooks/useForm";
import Input from "../Inputs/Input";
import Modal from "../Modal";

const ChangePassword = () => {
  const { editPassword } = useData();
  const password = useForm('');
  const confirmPassword = useForm('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (password.validate() && confirmPassword.validate() && password.value === confirmPassword.value) {
      e.preventDefault();
      editPassword(password.value)
    }
  }

  return (
    <Modal>
      <h2>Defina uma nova senha</h2>
      <form onSubmit={handleSubmit}>
        <Input type="password" label="Nova senha" {...password} />
        <Input type="password" label="Confirmar nova senha" {...confirmPassword} />
        <button>Salvar nova senha</button>
      </form>
    </Modal>
  )
}

export default ChangePassword;