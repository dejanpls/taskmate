import Form from './Form.jsx';
import TaskList from './TaskList.jsx';
import Tabs from './Tabs';
import SortDropdown from './SortDropdown.jsx';
import CategoryFilter from './CategoryFilter.jsx';
import Deleted from './Deleted.jsx';

import { useState } from 'react';

export default function Todo({
  formData,
  categoryData,
  categoryInputData,
  sortDropdownData,
  TaskListData,
  TabsData,
  CategoryFilterData,
  showFilter,
  showDeleted,
  DeletedData,
}) {
  const [activeIndexes, setActiveIndexes] = useState([]);

  const handleIndexesChange = (id) => {
    setActiveIndexes((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  return (
    <>
      <Form {...{ ...formData, categoryData, categoryInputData }} />

      <SortDropdown {...sortDropdownData} />

      <TaskList
        {...TaskListData}
        activeIndexes={activeIndexes}
        handleIndexesChange={handleIndexesChange}
      />

      <Tabs {...TabsData} />

      {showFilter && <CategoryFilter {...CategoryFilterData} />}

      {showDeleted && <Deleted {...DeletedData} />}
    </>
  );
}
