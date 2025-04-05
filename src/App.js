import React, { useState } from 'react';

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
      console.error(error.message);
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

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', textAlign: 'center' }}>
      <h1>Генератор паролей</h1>
      <label>
        Длина пароля:
        <input
          type="number"
          value={length}
          min="4"
          max="128"
          onChange={(e) => setLength(e.target.value)}
          style={{ marginLeft: 10 }}
        />
      </label>
      <br /><br />
      <button onClick={generatePassword}>Сгенерировать</button>
      <br /><br />
      {password && (
        <>
          <input value={password} readOnly style={{ width: '100%' }} />
          <br />
          <button onClick={copyToClipboard}>Скопировать</button>
          {copied && <p style={{ color: 'green' }}>Скопировано!</p>}
        </>
      )}
    </div>
  );
}

export default App;