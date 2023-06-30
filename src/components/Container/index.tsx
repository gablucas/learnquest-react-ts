import Styles from './Container.module.css';
import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode,
  tag?: 'section' | 'div'
}

const Container = ({ children, tag = 'section' }: ContainerProps) => {
  
  if(tag === 'section')
  return (
    <section className={`${Styles.container} ${Styles.section}`}>
      { children }
    </section>
  )

  return (
    <div className={Styles.container}>
      { children }
    </div>
  )
}

export default Container