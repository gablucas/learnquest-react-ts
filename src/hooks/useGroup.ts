import React from 'react';
import { GlobalContext } from "../GlobalContext";
import { getData } from "../helpers/data/getData";
import { Group } from "../types/Group";

const useGroup = () => {
  const { setData } = React.useContext(GlobalContext);

  function createGroup(newgroup: Group): void {
    const updateData = getData();
    updateData.groups.push(newgroup);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function deleteGroup(groupid: string): void {
    const updateData = getData();
    updateData.groups = updateData.groups.filter((c) => c.id !== groupid);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function editGroup(id: string, updateGroup: Group): void {
    const updateData = getData();
    updateData.groups = updateData.groups.map((group) => {
      if (group.id === id) {
        return {...updateGroup}
      }

      return group;
    })

    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  return {
    createGroup,
    deleteGroup,
    editGroup,
  }
}

export { useGroup };