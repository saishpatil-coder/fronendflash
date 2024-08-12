import React, { useState } from "react";
import Flashcard from "./Flashcard";

const Dashboard = ({
  flashcards,
  addFlashcard,
  deleteFlashcard,
  editFlashcard, // New prop for editing
  question,
  setQuestion,
  setAnswer,
  answer,
}) => {
  const [isEditing, setIsEditing] = useState(null); // Track which flashcard is being edited

  const handleEditClick = (flashcard) => {
    setIsEditing(flashcard.id);
    setQuestion(flashcard.question);
    setAnswer(flashcard.answer);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (isEditing) {
      editFlashcard(isEditing, question, answer);
      setIsEditing(null);
    } else {
      addFlashcard();
    }
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="dashboard">
      <h2>{isEditing ? "Edit Flashcard" : "Add New Flashcard"}</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit">
          {isEditing ? "Update Flashcard" : "Add Flashcard"}
        </button>
      </form>

      <h2>Existing Flashcards</h2>
      <div className="fcards">
        {flashcards.length > 0 ? (
          flashcards.map((flashcard) => (
            <div className="fcard" key={flashcard.id} style={{ marginBottom: "10px" }}>
              <Flashcard
                question={flashcard.question}
                answer={flashcard.answer}
              />
              <div className="btn">
              <button onClick={() => handleEditClick(flashcard)}>
                Edit
              </button>
              <button onClick={() => deleteFlashcard(flashcard.id)}>
                Delete
              </button>
              </div>
            </div>
          ))
        ) : (
          <p>No flashcards available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
