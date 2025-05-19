import React, { useState } from "react";

const NumerologyCalculator = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);

  const nameToNumber = (name) => {
    const letters = name.toUpperCase().replace(/[^A-Z]/g, "");
    const values = {
      A:1, B:2, C:3, D:4, E:5, F:8, G:3, H:5, I:1,
      J:1, K:2, L:3, M:4, N:5, O:7, P:8, Q:1, R:2,
      S:3, T:4, U:6, V:6, W:6, X:5, Y:1, Z:7
    };
    let total = 0;
    for (let char of letters) {
      total += values[char] || 0;
    }
    return reduceToSingleDigit(total);
  };

  const dobToNumber = (dob) => {
    const digits = dob.replace(/[^0-9]/g, "").split("").map(Number);
    const total = digits.reduce((sum, num) => sum + num, 0);
    return reduceToSingleDigit(total);
  };

  const reduceToSingleDigit = (num) => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split("").reduce((sum, d) => sum + Number(d), 0);
    }
    return num;
  };

  const getMeaning = (num) => {
    const meanings = {
      1: "Leader, independent and ambitious",
      2: "Diplomatic, sensitive and cooperative",
      3: "Creative, social and optimistic",
      4: "Practical, reliable and grounded",
      5: "Adventurous, energetic and curious",
      6: "Responsible, loving and protective",
      7: "Spiritual, introspective and analytical",
      8: "Ambitious, powerful and materialistic",
      9: "Compassionate, humanitarian and wise",
      11: "Visionary, intuitive and inspirational",
      22: "Master builder, practical visionary",
      33: "Master teacher, loving and selfless"
    };
    return meanings[num] || "Unique vibration";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameNumber = nameToNumber(firstName + lastName);
    const dobNumber = dobToNumber(dob);
    setResult({
      nameNumber,
      nameMeaning: getMeaning(nameNumber),
      dobNumber,
      dobMeaning: getMeaning(dobNumber),
    });
  };

  return (
    <div style={styles.container}>
      <h1>Numerology Calculator</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Calculate</button>
      </form>
      {result && (
        <div style={styles.result}>
          <h3>Results:</h3>
          <p><strong>Name Number:</strong> {result.nameNumber} - {result.nameMeaning}</p>
          <p><strong>DOB Number:</strong> {result.dobNumber} - {result.dobMeaning}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to right, #283048, #859398)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    padding: "40px",
  },
  form: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "20px",
    marginTop: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    maxWidth: "400px",
    width: "100%",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  result: {
    marginTop: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: "15px",
    borderRadius: "10px",
    maxWidth: "400px",
    width: "100%",
  },
};

export default NumerologyCalculator;
