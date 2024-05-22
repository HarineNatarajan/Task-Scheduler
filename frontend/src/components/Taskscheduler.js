import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Task.css';

export default function Taskscheduler() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [editId, setEditId] = useState(null); // Track the ID of the task being edited

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePost = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/tasks', { title, date, time });
      fetchTasks();
      setTitle('');
      setTime('');
      setDate('');
      alert('Task created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create Task');
    }
  };

  const handleEditPost = async (postId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/tasks/${postId}`);
      const { title, date, time } = response.data;
      setTitle(title);
      setDate(date);
      setTime(time);
      setEditId(postId); // Set the ID of the task being edited
    } catch (error) {
      console.error(error);
      alert('Failed to edit Task');
    }
  };

  const handleUpdatePost = async (postId) => {
    try {
      await axios.put(`http://127.0.0.1:5000/tasks/${postId}`, { title, date, time });
      fetchTasks();
      setTitle('');
      setDate('');
      setTime('');
      setEditId(null); // Reset editId after update
      alert('Task updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update Task');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/tasks/${postId}`);
      fetchTasks();
      alert('Task deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete Task');
    }
  };

  const handleMarkAsComplete = async (postId) => {
    try {
      await axios.put(`http://127.0.0.1:5000/tasks/${postId}/complete`);
      fetchTasks();
      alert('Task marked as complete');
    } catch (error) {
      console.error(error);
      alert('Failed to mark task as complete');
    }
  };

  return (
    <div>
      <h3><center>Task Scheduler</center></h3> 
      <form>
        <div className="mb">
          <label className="form-label">Task Name:</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} /><br></br>
        </div>
        <div className="mb">
          <label className="form-label">Date & Time:</label>
          <input type="Date" value={date} onChange={(e) => setDate(e.target.value)}></input> 
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)}></input><br></br>
          <br></br>
          {editId ? (
            <button onClick={() => handleUpdatePost(editId)}>Update Task</button>
          ) : (
            <button onClick={handleCreatePost}>Create Task</button>
          )}
        </div>
      </form>
      <div>
        {tasks.map(task => (
          <div key={task.id} style={{ margin: '20px' }}>
            <cardgroup>
            <div className="card" style={{ width: '18rem', height: '18rem' }}>
              <h3>Task Name: {task.title}</h3>
              <h4>Date: {task.date} </h4>
              <h4>Time: {task.time}</h4>
              <h4>Created At: {new Date(parseInt(task.id)).toLocaleString()}</h4>
              {task.completed ? (
                <button disabled>Completed</button>
              ) : (
                <>
                  <button onClick={() => handleEditPost(task.id)}>Edit</button>
                  <button onClick={() => handleMarkAsComplete(task.id)}>Mark as Complete</button>
                </>
              )}
              <button onClick={() => handleDeletePost(task.id)}>Delete</button>
            </div>
            </cardgroup>
          </div>
        ))}
      </div>
    </div>
  )
}
