import { useEffect, useState } from "react";
import { getTasks, completeTask, updateTask, reviseTask } from "../Apis/Api";
import { FileText, X, Loader2, ChevronDown, ChevronUp, Link, Star } from "lucide-react";

const dsaTopics = [
  "Array", "String", "LinkedList", "Stack", "Queue", "Heap",
  "Graph", "Tree", "Binary Tree", "Binary Search Tree",
  "Recursion", "Backtracking", "Dynamic Programming",
  "Greedy Algorithm", "Bit Manipulation", "Trie",
  "Segment Tree", "Fenwick Tree", "Hashing", "Sorting",
  "Searching", "Graph Algorithms", "Mathematical",
  "Divide and Conquer"
];

const AllTaskList = ({ refresh }) => {
  const [tasks, setTasks] = useState({});
  const [note, setNote] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState({});
  const [revising, setRevising] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await getTasks();
      if (typeof data === "object" && data !== null) {
        setTasks(data);
      } else {
        console.error("API response is not an object:", data);
        setTasks({});
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const handleComplete = async (id) => {
    setActionLoading(id);
    try {
      await completeTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Failed to complete task:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAddNote = async (id) => {
    setActionLoading(id);
    try {
      await updateTask(id, { note });
      setNote("");
      setShowNoteModal(null);
      fetchTasks();
    } catch (error) {
      console.error("Failed to add note:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRevise = async (id) => {
    setRevising(id);
    try {
      await reviseTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Failed to mark task as repeated:", error);
    } finally {
      setRevising(null);
    }
  };

  const toggleTopic = (topic) => {
    setExpandedTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
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
      {dsaTopics.map((topic) => (
        <div key={topic} className="mb-4">
          <button
            onClick={() => toggleTopic(topic)}
            className="flex items-center justify-between w-full p-3 bg-gray-800 rounded-md"
          >
            <span className="text-lg font-semibold">{topic}</span>
            {expandedTopics[topic] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {expandedTopics[topic] && (
            <>
              {tasks[topic] && tasks[topic].length > 0 ? (
                <table className="w-full border-separate border-spacing-y-2 mt-2">
                  <thead>
                    <tr className="text-center text-gray-400">
                      <th>Status</th>
                      <th>Problem</th>
                      <th>Repeated</th>
                      <th>Notes</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks[topic].map((task) => (
                      <tr key={task._id} className={`bg-gray-800 rounded-lg ${task.completed ? "opacity-70" : ""}`}>
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
                        <td className={`p-2 text-center ${task.completed ? " text-gray-200" : ""}`}>{task.title}</td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => handleRevise(task._id)}
                            className={task.repeaded ? "text-yellow-400" : "text-gray-500 hover:text-yellow-400"}
                          >
                            {revising === task._id ? (
                              <Loader2 className="animate-spin mx-auto" size={20} />
                            ) : (
                              <Star size={20} fill={task.repeaded ? "yellow" : "none"} />
                            )}
                          </button>
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => {
                              setShowNoteModal(task);
                              setNote(task.note || "");
                            }}
                            className="text-blue-400 hover:text-blue-600"
                          >
                            <FileText size={20} />
                          </button>
                        </td>
                        <td className="p-2 text-center">
                          <a
                            href={task.problemLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-green-600"
                          >
                            <Link size={20} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-gray-400">No problems added under {topic}  🤷🏼‍♀️ 🤷🏼‍♀️</div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllTaskList;
