import React from 'react';

const useToggle = () => {
  const [toggle, setToggle] = React.useState(false);

  function handleToggle(): void {
    setToggle(!toggle)
  }

  return {
    toggle,
    handleToggle
  }
}

export default useToggle;