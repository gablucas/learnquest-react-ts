import React from 'react';

type ErrorProp = {
  children: React.ReactNode,
}

const Error = ({ children }: ErrorProp) => {

  return (
    <span style={{color: 'red', fontSize: '0.875rem', fontWeight: '600'}}>{children}</span>
  )
}

export default Error;