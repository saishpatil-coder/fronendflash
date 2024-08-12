import React, { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "./Flashcard";
import Dashboard from "./Dashboard";
const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isDash, setIsDash] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/flashcards")
      .then((response) => {
        setFlashcards(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the flashcards!", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(flashcards);
  }, [flashcards]);

  const addFlashcard = () => {
    if (!question || !answer) {
      console.error("Question and Answer fields cannot be empty");
      return;
    }

    axios
      .post("http://localhost:3001/flashcards", { question, answer })
      .then((response) => {
        const newFlashcard = { id: response.data.id, question, answer };
        setFlashcards([...flashcards, newFlashcard]);
        setQuestion("");
        setAnswer("");
      })
      .catch((error) => {
        console.error("There was an error adding the flashcard!", error);
      });
  };

  const deleteFlashcard = (id) => {
    if (!id) {
      console.error("Invalid ID:", id);
      return;
    }

    axios
      .delete(`http://localhost:3001/flashcards/${id}`)
      .then(() => {
        setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the flashcard!", error);
      });
  };

  const nextCard = () => {
    setCurrentIndex((currentIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex(
      currentIndex === 0 ? flashcards.length - 1 : currentIndex - 1
    );
  };
  const editFlashcard = (id, question, answer) => {
    axios
      .put(`http://localhost:3001/flashcards/${id}`, { question, answer })
      .then((response) => {
        setFlashcards(
          flashcards.map((flashcard) =>
            flashcard.id === id ? { id, question, answer } : flashcard
          )
        );
      })
      .catch((error) => {
        console.error("There was an error updating the flashcard!", error);
      });
  };
  return (
    <div className="app">
      <header>
        <h1>Saish Patil's Flashcard Learning Tool</h1>
        <button onClick={() => setIsDash(!isDash)}>
          {isDash ? "Goto Admin" : "Goto USER"}
        </button>
      </header>
      {loading ? (
        <p>Loading flashcards...</p>
      ) : isDash ? (
        flashcards.length > 0 ? (
          <>
            <div className="flashcard">
              <Flashcard
                flashcard={flashcards[currentIndex]}
                key={flashcards[currentIndex].id}
                question={flashcards[currentIndex].question}
                answer={flashcards[currentIndex].answer}
              />
            </div>
            <div className="btns">
              <button onClick={prevCard}>Previous</button>
              <button onClick={nextCard}>Next</button>
            </div>
          </>
        ) : (
          <p>No FlashCards Available</p>
        )
      ) : (
        <Dashboard
          flashcards={flashcards}
          addFlashcard={addFlashcard}
          deleteFlashcard={deleteFlashcard}
          question={question}
          setQuestion={setQuestion}
          setAnswer={setAnswer}
          answer={answer}
          editFlashcard={editFlashcard}
        />
      )}
    </div>
  );
};

export default App;
