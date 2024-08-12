// Flashcard.js
import React, { useState } from 'react';

const Flashcard = ({  question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="flashcard" onClick={handleFlip} style={styles.card}>
      <div style={{ ...styles.innerCard, transform: flipped ? 'rotateY(180deg)' : '' }}>
        <div style={styles.front}>
          {question}
        </div>
        <div style={styles.back}>
          {answer}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    perspective: '1000px',
    width: '300px',
    height: '200px',
    margin: '20px auto',
    cursor: 'pointer',
  },
  innerCard: {
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    position: 'relative',
  },
  front: {
    borderRadius:'10px',
    backgroundColor: '#00FF7B',
    color: '#000',
    padding: '20px',
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow:'0px 0px 20px green'
  },
  back: {
    borderRadius:'10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    transform: 'rotateY(180deg)',
    backfaceVisibility: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow:'0px 0px 20px black'
  },
};

export default Flashcard;
