import { Link } from 'react-router-dom';
import Styles from './PageNotFount.module.css';

interface IPageNotFoundProps {
  message: string,
  path: string,
}

const PageNotFound = ({message, path}: IPageNotFoundProps) => {

  return (
    <div className={Styles.message}>
      <h1>{message}</h1>
      <Link to={path}>Voltar</Link>
  </div>
  )
}

export default PageNotFound;