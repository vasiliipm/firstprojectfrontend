import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://firstprojectbackend-oyfq.onrender.com/api/message")  // Пока локально
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Ошибка:", err));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Привет, мир!</h1>
      <p>Ответ от бэкенда: {message}</p>
    </div>
  );
}

export default App;