// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const TaskComments = () => {
//   const { taskId } = useParams(); // Get taskId from URL
//   const [comments, setComments] = useState([]); // State for storing comments
//   const [content, setContent] = useState('');  // State for new comment
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch comments when the component mounts or taskId changes
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/comments/task/${taskId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if your API requires authentication
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Failed to fetch comments');
//         }

//         const fetchedComments = await response.json();
//         setComments(fetchedComments);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComments();
//   }, [taskId]);

//   // Handle new comment submission
//   const handlePostComment = async (e) => {
//     e.preventDefault();
//     if (content.trim() === '') {
//       alert('Comment cannot be empty');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/comments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if your API requires authentication
//         },
//         body: JSON.stringify({ taskId, content }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to post comment');
//       }

//       const newComment = await response.json();
//       setComments((prevComments) => [...prevComments, newComment]); // Add new comment to state
//       setContent(''); // Clear the input after submission
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Task Comments</h1>
//       {loading && <p>Loading comments...</p>}
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//       <div>
//         <h3>Comments</h3>
//         <ul>
//           {comments.map((comment) => (
//             <li key={comment._id}>
//               <p>{comment.content}</p>
//               <small>Posted by {comment.userId?.username || 'Unknown User'}</small>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h3>Post a New Comment</h3>
//         <form onSubmit={handlePostComment}>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Write your comment..."
//             rows="4"
//             cols="50"
//           />
//           <br />
//           <button type="submit">Post Comment</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TaskComments;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const { taskId } = useParams(); // Get taskId from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(response.data); // Assuming response contains the comments
      } catch (err) {
        setError('Failed to fetch comments.');
        console.error(err);
      }
    };

    fetchComments();
  }, [taskId, navigate]);

  const handlePostComment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/tasks/${taskId}/comments`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the comment list with the new comment
      setComments([...comments, response.data]);
      setNewComment(''); // Clear the input field
    } catch (err) {
      setError('Failed to post comment.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Comments for Task {taskId}</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <form onSubmit={handlePostComment}>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Post Comment
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-semibold">Comments:</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="border-b py-2">
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskComments;
