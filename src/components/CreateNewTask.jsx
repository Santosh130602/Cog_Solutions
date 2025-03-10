import { useState } from 'react';
import { addTask } from '../Apis/Api';
import { Loader2 } from 'lucide-react';

const CreateNewTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      setLoading(true); // Start loading
      try {
        await addTask({ title, priority });
        setTitle('');
        setPriority('Low');
        onTaskAdded();
      } catch (error) {
        console.error('Error adding task:', error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      console.log('Please enter a task title');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex items-center space-x-8 bg-gray-800 p-4 rounded-xl"
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
        disabled={loading}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border border-gray-600 p-2 rounded-md bg-gray-700 text-white focus:outline-none"
        disabled={loading}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
      <button
        type="submit"
        className={`flex items-center bg-blue-600 text-white px-4 py-2 rounded-md transition-colors ${
          loading ? 'bg-blue-500 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={20} />
            Adding...
          </>
        ) : (
          'Add Task'
        )}
      </button>
    </form>
  );
};

export default CreateNewTask;
