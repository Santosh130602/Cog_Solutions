import { useEffect, useState } from 'react';
import { getTasks, deleteTask, completeTask, updateTask } from '../Apis/Api';
import { Trash2, FileText, X, Loader2 } from 'lucide-react';

const AllTaskList = ({ refresh }) => {
  const [tasks, setTasks] = useState([]);
  const [note, setNote] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const handleDelete = async (id) => {
    setActionLoading(id);
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleComplete = async (id) => {
    setActionLoading(id);
    try {
      await completeTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Failed to complete task:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAddNote = async (id) => {
    setActionLoading(id);
    try {
      await updateTask(id, { note });
      setNote('');
      setShowNoteModal(null);
      fetchTasks();
    } catch (error) {
      console.error('Failed to add note:', error);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl w-full mx-auto overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-center text-gray-400">
            <th>Status</th>
            <th>Task Title</th>
            <th>Priority</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task._id}
              className={`bg-gray-800 rounded-lg ${task.completed ? 'opacity-70' : ''}`}
            >
              <td className="p-2 text-center">
                {actionLoading === task._id ? (
                  <Loader2 className="animate-spin text-green-500" size={20} />
                ) : (
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleComplete(task._id)}
                    className="accent-green-500"
                  />
                )}
              </td>
              <td className={`p-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </td>
              <td className="p-2 text-center">{task.priority}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => {
                    setShowNoteModal(task);
                    setNote(task.note || '');
                  }}
                  className="text-blue-400 hover:text-blue-600"
                >
                  <FileText size={20} />
                </button>
              </td>
              <td className="p-2 flex space-x-2 justify-center">
                {actionLoading === task._id ? (
                  <Loader2 className="animate-spin text-red-500" size={20} />
                ) : (
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showNoteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-white">Add Note for Task</h2>
              <button
                onClick={() => {
                  setShowNoteModal(null);
                  setNote('');
                }}
                className="text-red-500 hover:text-red-700"
              >
                <X size={24} />
              </button>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your note here..."
              className="w-full p-2 bg-gray-800 text-white rounded-md mb-4 focus:outline-none border border-gray-600"
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleAddNote(showNoteModal._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {actionLoading === showNoteModal._id ? (
                  <Loader2 className="animate-spin mx-auto" size={20} />
                ) : (
                  'Save Note'
                )}
              </button>
              <button
                onClick={() => {
                  setShowNoteModal(null);
                  setNote('');
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTaskList;
