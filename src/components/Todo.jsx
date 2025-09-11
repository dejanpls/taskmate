import Form from './Form.jsx';
import TaskList from './TaskList.jsx';
import Tabs from './Tabs';
import SortDropdown from './SortDropdown.jsx';
import CategoryFilter from './CategoryFilter.jsx';
import Deleted from './Deleted.jsx';

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
  return (
    <>
      <Form {...{ ...formData, categoryData, categoryInputData }} />

      <SortDropdown {...sortDropdownData} />

      <TaskList {...TaskListData} />

      <Tabs {...TabsData} />

      {showFilter && <CategoryFilter {...CategoryFilterData} />}

      {showDeleted && <Deleted {...DeletedData} />}
    </>
  );
}
