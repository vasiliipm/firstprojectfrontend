import React, { useState } from 'react';
import './App.css'; // Вставь CSS сюда из шаблона

function App() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = async () => {
    try {
      const response = await fetch('https://firstprojectbackend-oyfq.onrender.com/api/generate-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ length: parseInt(length) })
      });

      if (!response.ok) {
        throw new Error('Ошибка при генерации пароля');
      }

      const data = await response.json();
      setPassword(data.password);
      setCopied(false);
    } catch (error) {
      console.error('Ошибка:', error.message);
    }
  };

  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
    } catch (err) {
      console.error('Ошибка при копировании:', err);
    }
  };

  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    return (strength / 4) * 100;
  };

  const getStrengthColor = () => {
    const s = getStrength();
    if (s < 40) return 'red';
    if (s < 70) return 'orange';
    return 'limegreen';
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>

      <label htmlFor="lengthInput">Password Length:</label>
      <input
        type="number"
        id="lengthInput"
        min="4"
        max="50"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />

      <button onClick={generatePassword}>Generate</button>

      {password && (
        <div id="output" className="fade-in">
          <input type="text" id="passwordOutput" value={password} readOnly />

          <button onClick={copyToClipboard}>Copy</button>

          <div id="strength-bar">
            <div
              id="strength-fill"
              style={{
                width: `${getStrength()}%`,
                background: getStrengthColor()
              }}
            ></div>
          </div>

          {copied && <div id="copySuccess">Copied to clipboard! ✅</div>}
        </div>
      )}
    </div>
  );
}

export default App;