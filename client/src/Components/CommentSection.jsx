import React, { useState, useEffect } from 'react';

const CommentSection = ({ taskId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch comments when the component mounts or taskId changes
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError('');
      try {
        // Replace with your API endpoint
        const response = await fetch(`/api/comments/task/${taskId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const data = await response.json();
        setComments(data.comments || []); // Update state with fetched comments
      } catch (err) {
        setError('Error fetching comments');
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchComments();
    }
  }, [taskId]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!comment.trim()) {
      setStatusMessage('Comment cannot be empty.');
      return;
    }

    setLoading(true);
    setStatusMessage('');
    try {
      // Replace with your API endpoint for posting comments
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, content: comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const newComment = await response.json();
      setComments((prevComments) => [...prevComments, newComment.comment]);
      setComment('');
      setStatusMessage('Comment posted successfully!');
    } catch (err) {
      setStatusMessage('Error posting comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p>{comment.content}</p>
              </div>
            ))
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment"
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default CommentSection;
