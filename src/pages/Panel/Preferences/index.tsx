import Styles from './Preferences.module.css';
import { DefaultPassword } from './components/default-password';

const Preferences = () => {

  return (
    <div className={Styles.preferences}>
      <DefaultPassword />
    </div>
  )
}

export default Preferences;