import React from 'react';
import { getData } from '../helpers/data/getData';
import { Subject } from '../types/Commom';
import { GlobalContext } from '../GlobalContext';

const useSubject = () => {
  const { setData } = React.useContext(GlobalContext);

  function createSubject(subject: Subject): void {
    const updateData = getData();
    updateData.subjects.push(subject);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function deleteSubject(subject: string): void {
    const updateData = getData();
    updateData.subjects = updateData.subjects.filter((f) => f.id !== subject)
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function editSubject(id: string, updateSubject: Subject): void {
    const updateData = getData();
    updateData.subjects = updateData.subjects.map((subject) => {
      if (subject.id === id) {
        return {...updateSubject}
      }

      return subject;
    })

    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  return {
    createSubject,
    deleteSubject,
    editSubject,
  }
}

export { useSubject };