import React, { useState } from 'react';

const loshuGridMap = {
  1: [2, 1], // bottom center
  2: [0, 2], // top right
  3: [1, 0], // middle left
  4: [0, 0], // top left
  5: [1, 1], // center
  6: [2, 2], // bottom right
  7: [1, 2], // middle right
  8: [2, 0], // bottom left
  9: [0, 1], // top center
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
  const [grid, setGrid] = useState(createEmptyGrid());
  const [results, setResults] = useState({ driver: '', conductor: '', kua: '' });

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!dob) return;

    const [yyyy, mm, dd] = dob.split('-');
    const day = parseInt(dd);

    // Driver
    const driver = reduceToSingleDigit(day);

    // Conductor
    const totalDOB = dd + mm + yyyy;
    const conductor = reduceToSingleDigit(
      totalDOB.split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    );

    // KUA
    const yearSum = reduceToSingleDigit(
      yyyy.split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    );
    let kua;
    if (gender === 'Male') kua = reduceToSingleDigit(11 - yearSum);
    else kua = reduceToSingleDigit(yearSum + 4);

    // Grid
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
    <div style={styles.container}>
      <h2>Numerology Calculator</h2>
      <form onSubmit={handleCalculate} style={styles.form}>
        <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={styles.input} />
        <select value={gender} onChange={e => setGender(e.target.value)} style={styles.input}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button type="submit" style={styles.button}>Calculate</button>
      </form>

      <div style={styles.grid}>
        {grid.flat().map((val, idx) => (
          <div key={idx} style={styles.cell}>{val}</div>
        ))}
      </div>

      <div style={styles.results}>
        <p><strong>Driver:</strong> {results.driver}</p>
        <p><strong>Conductor:</strong> {results.conductor}</p>
        <p><strong>KUA:</strong> {results.kua}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    fontSize: 16,
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
    marginTop: 20
  },
  cell: {
    border: '1px solid #ccc',
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9'
  },
  results: {
    marginTop: 20,
    fontSize: 16
  }
};

export default NumerologyCalculator;
