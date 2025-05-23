import React, { useState } from 'react';

const loshuGridMap = {
  1: [2, 1],
  2: [0, 2],
  3: [1, 0],
  4: [0, 0],
  5: [1, 1],
  6: [2, 2],
  7: [1, 2],
  8: [2, 0],
  9: [0, 1],
};

const createEmptyGrid = () => Array(3).fill().map(() => Array(3).fill(''));

const reduceToSingleDigit = (num) => {
  while (num > 9) {
    num = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return num;
};

const NumerologyCalculator = () => {
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [grid, setGrid] = useState(createEmptyGrid());
  const [results, setResults] = useState({ driver: '', conductor: '', kua: '' });

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!dob) return;

    const [yyyy, mm, dd] = dob.split('-');
    const day = parseInt(dd);

    const driver = reduceToSingleDigit(day);
    const totalDOB = dd + mm + yyyy;
    const conductor = reduceToSingleDigit(
      totalDOB.split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    );

    const yearSum = reduceToSingleDigit(
      yyyy.split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    );
    let kua;
    if (gender === 'Male') kua = reduceToSingleDigit(11 - yearSum);
    else kua = reduceToSingleDigit(yearSum + 4);

    const digitCounts = {};
    totalDOB.split('').forEach(d => {
      digitCounts[d] = (digitCounts[d] || '') + d;
    });
    digitCounts[driver] = (digitCounts[driver] || '') + driver;
    digitCounts[conductor] = (digitCounts[conductor] || '') + conductor;
    digitCounts[kua] = (digitCounts[kua] || '') + kua;

    const newGrid = createEmptyGrid();
    Object.entries(digitCounts).forEach(([digit, str]) => {
      const num = parseInt(digit);
      if (loshuGridMap[num]) {
        const [row, col] = loshuGridMap[num];
        newGrid[row][col] += str;
      }
    });

    setGrid(newGrid);
    setResults({ driver, conductor, kua });
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h2 style={styles.heading}>🔮 Numerology Calculator 🔮</h2>
        <form onSubmit={handleCalculate} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            style={styles.input}
          />
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            style={styles.input}
          />
          <select value={gender} onChange={e => setGender(e.target.value)} style={styles.input}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="submit" style={styles.button}>Calculate</button>
        </form>
  
        <div style={styles.grid}>
          {grid.flat().map((val, idx) => (
            <div key={idx} style={{ ...styles.cell, animationDelay: `${idx * 0.1}s` }}>{val}</div>
          ))}
        </div>
  
        <div style={styles.results}>
          <p><strong>Driver:</strong> {results.driver}</p>
          <p><strong>Conductor:</strong> {results.conductor}</p>
          <p><strong>KUA:</strong> {results.kua}</p>
        </div>
      </div>
    </div>
  );
  
};

const styles = {
container: {
  maxWidth: 700,
  margin: '30px auto',
  padding: '30px',
  backgroundImage: 'url("https://www.transparenttextures.com/patterns/gplay.png")',
  backgroundColor: '#e0eafc',
  backgroundSize: 'cover',
  backgroundRepeat: 'repeat',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  fontFamily: 'Arial, sans-serif',
},
outerContainer: {
  minHeight: '100vh',
  width: '100%',
  backgroundImage: 'url("https://www.transparenttextures.com/patterns/gplay.png")',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
},
 
  heading: {
    fontSize: '2rem',
    marginBottom: 20,
    color: '#333'
  },
  form: {
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    padding: '12px 15px',
    fontSize: 16,
    borderRadius: '6px',
    border: '1px solid #ccc',
    transition: 'border 0.3s ease',
  },
  button: {
    padding: '12px 20px',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    color: 'white',
    fontSize: 16,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    // gap: 1,
    marginTop: 20,
  },
  cell: {
    border: '2px solid #888',
    padding: 25,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    animation: 'fadeIn 0.5s ease forwards',
    opacity: 0,
  },
  results: {
    marginTop: 30,
    fontSize: 18,
    color: '#444',
    backgroundColor: '#f7f7f7',
    padding: 20,
    borderRadius: '8px',
    boxShadow: '0 5px 10px rgba(0,0,0,0.05)'
  },
};

export default NumerologyCalculator;

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);
