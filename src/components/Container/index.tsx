import styles from './Container.module.css';
import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode,
  tag?: 'section' | 'div'
}

const Container = ({ children, tag = 'section' }: ContainerProps) => {
  
  if(tag === 'section')
  return (
    <section className={styles.container}>
      { children }
    </section>
  )

  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}

export default Container