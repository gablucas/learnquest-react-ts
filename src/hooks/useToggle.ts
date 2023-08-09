import React from 'react';


const useToggle = (start?: boolean) => {
  const [toggle, setToggle] = React.useState(start ? start : false);

  function handleToggle(): void {
    setToggle(!toggle)
  }

  return {
    toggle,
    handleToggle
  }
}

export default useToggle;