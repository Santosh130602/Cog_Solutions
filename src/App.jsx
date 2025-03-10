import { useState } from 'react';
import CreateNewTask from './components/CreateNewTask';
import AllTaskList from './components/AllTaskList';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded = () => setRefresh(!refresh);

  return (
    <div className="h-screen w-screen  bg-black flex flex-col items-center  overflow-auto">
      <div className="w-full  bg-black p-6  shadow-md">
        <h1 className="text-3xl font-bold  mb-12 p-4 text-center text-red-600">
        Cognocore Solutions Task Management
        </h1>
        <CreateNewTask onTaskAdded={handleTaskAdded} />
        <AllTaskList refresh={refresh} />
      </div>
    </div>
  );
};

export default App;
