import { Link } from 'react-router-dom';
import Styles from './PageNotFount.module.css';

interface IPageNotFoundProps {
  title: string,
  message?: string,
  path: string,
}

const PageNotFound = ({ title, message, path }: IPageNotFoundProps) => {

  return (
    <div className={Styles.message}>
      <h1>{title}</h1>
      <span>{message}</span>
      <Link to={path}>Voltar</Link>
  </div>
  )
}

export default PageNotFound;