import { useState } from 'react';
import { addTask } from '../Apis/Api';
import { Loader2 } from 'lucide-react';

const dsaTopics = [
  'Array', 'String', 'LinkedList', 'Stack', 'Queue', 'Heap',
  'Graph', 'Tree', 'Binary Tree', 'Binary Search Tree',
  'Recursion', 'Backtracking', 'Dynamic Programming',
  'Greedy Algorithm', 'Bit Manipulation', 'Trie',
  'Segment Tree', 'Fenwick Tree', 'Hashing', 'Sorting',
  'Searching', 'Graph Algorithms', 'Mathematical',
  'Divide and Conquer'
];

const CreateNewTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [dsaTopic, setDsaTopic] = useState(dsaTopics[0]); 
  const [problemLink, setProblemLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && problemLink.trim()) {
      setLoading(true); 
      try {
        await addTask({ title, dsaTopic, problemLink });
        setTitle('');
        setDsaTopic(dsaTopics[0]);
        setProblemLink('');
        onTaskAdded();
      } catch (error) {
        console.error('Error adding task:', error.message);
      } finally {
        setLoading(false); 
      }
    } else {
      console.log('Please enter both a task title and problem link');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex item-center space-x-4 bg-gray-800 p-4 rounded-xl"
    >
      <input
        type="text"
        placeholder="Add a new DSA problem title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
        disabled={loading}
      />
      
      <input
        type="url"
        placeholder="Problem Link (e.g., LeetCode, Codeforces)"
        value={problemLink}
        onChange={(e) => setProblemLink(e.target.value)}
        className="p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
        disabled={loading}
      />

      <select
        value={dsaTopic}
        onChange={(e) => setDsaTopic(e.target.value)}
        className="border border-gray-600 p-2 rounded-md bg-gray-700 text-white focus:outline-none"
        disabled={loading}
      >
        {dsaTopics.map((topic) => (
          <option key={topic} value={topic}>{topic}</option>
        ))}
      </select>

      <button
        type="submit"
        className={`flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md transition-colors ${
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
