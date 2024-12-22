import React, { useState, useEffect } from 'react';
// import Board from 'react-kanban';
// import 'react-kanban/dist/styles.css';

const KanbanBoard = () => {
  const [board, setBoard] = useState({
    columns: [
      {
        id: 'todo',
        title: 'To Do',
        cards: [],
      },
      {
        id: 'inprogress',
        title: 'In Progress',
        cards: [],
      },
      {
        id: 'done',
        title: 'Done',
        cards: [],
      },
    ],
  });

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tasks');
        const data = await response.json();

        // Assuming the API returns a list of tasks
        const formattedBoard = {
          columns: [
            { id: 'todo', title: 'To Do', cards: [] },
            { id: 'inprogress', title: 'In Progress', cards: [] },
            { id: 'done', title: 'Done', cards: [] },
          ],
        };

        // Assign tasks to the appropriate columns
        data.forEach(task => {
          const { id, title, description, date, time, status } = task;
          const card = { id, title, description, date, time };

          if (status === 'todo') {
            formattedBoard.columns[0].cards.push(card);
          } else if (status === 'inprogress') {
            formattedBoard.columns[1].cards.push(card);
          } else if (status === 'done') {
            formattedBoard.columns[2].cards.push(card);
          }
        });

        setBoard(formattedBoard);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Handle card move from one column to another
  const handleCardMove = async (fromColumnId, toColumnId, cardId) => {
    const newBoard = { ...board };
    const card = newBoard.columns
      .find(col => col.id === fromColumnId)
      .cards.find(card => card.id === cardId);

    // Remove the card from the original column
    newBoard.columns.find(col => col.id === fromColumnId).cards = newBoard.columns
      .find(col => col.id === fromColumnId)
      .cards.filter(card => card.id !== cardId);

    // Add the card to the new column
    newBoard.columns.find(col => col.id === toColumnId).cards.push(card);

    setBoard(newBoard);

    // Update the task status in the backend
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: toColumnId }), 
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Kanban Board</h2>
      <Board
        initialBoard={board}
        renderCard={({ card }) => (
          <div className="p-2 border rounded-md bg-gray-100">
            <h3 className="font-bold">{card.title}</h3>
            <p>{card.description}</p>
            <p><strong>Date:</strong> {card.date}</p>
            <p><strong>Time:</strong> {card.time}</p>
          </div>
        )}
        onCardDragEnd={handleCardMove}
      />
    </div>
  );
};

export default KanbanBoard;
