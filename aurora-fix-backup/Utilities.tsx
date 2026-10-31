import React from "react";

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = React.useState({
    temp: Math.floor(Math.random() * 30 + 10),
    condition: ["Sunny", "Cloudy", "Rainy", "Snowy"][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 60 + 20)
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setWeather(prev => ({
        temp: prev.temp + Math.floor(Math.random() * 10 - 5),
        condition: prev.condition,
        humidity: prev.humidity + Math.floor(Math.random() * 10 - 5)
      }));
    }, 30000); // Update weather every 30 seconds
    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch(condition.toLowerCase()) {
      case "sunny": return "â˜€ï¸";
      case "cloudy": return "â˜ï¸";
      case "rainy": return "ðŸŒ§ï¸";
      case "snowy": return "â„ï¸";
      default: return "â˜€ï¸";
    }
  };

  return (
    <div className="weather-widget">
      <div style={{ fontSize: "2.5rem" }}>{getWeatherIcon(weather.condition)}</div>
      
      <div style={{ 
        fontSize: "3rem", 
        fontWeight: "600", 
        marginTop: "0.5rem" 
      }}>
        {weather.temp}Â°{Math.abs(weather.temp) > 27 ? "C" : "F"}
      </div>
      
      <div style={{ fontSize: "0.875rem", opacity: 0.6, marginTop: "0.25rem" }}>
        {weather.condition}
      </div>

      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        marginTop: "1rem", 
        fontSize: "0.75rem", 
        opacity: 0.5 
      }}>
        <span>ðŸ’§ {weather.humidity}% Humidity</span>
      </div>
    </div>
  );
};

const NotesEditor: React.FC = () => {
  const [notes, setNotes] = React.useState([{ id: 1, content: "Welcome to Aurora Desktop! ðŸŽ¨\n\nâœ¨ Drag and drop widgets around.\nâš™ï¸ Customize themes in settings." }]);
  
  const addNote = () => {
    setNotes([...notes, { id: Date.now(), content: "" }]);
  };

  const updateNote = (id: number, content: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, content } : note
    ));
  };

  return (
    <div className="notes-editor">
      {notes.map((note) => (
        <textarea
          key={note.id}
          value={note.content}
          onChange={(e) => updateNote(note.id, e.target.value)}
          style={{ 
            flex: 1, 
            resize: "none", 
            border: "none", 
            outline: "none",
            fontFamily: 'Segoe UI',
            fontSize: "0.875rem",
          }}
          rows={note.content.length > 0 ? Math.ceil(note.content.split(n).length / 2) : 3}
        />
      ))}
    </div>
  );
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Explore Aurora Desktop âœ¨", completed: false },
    { id: 2, text: "Customize your widgets ðŸŽ¨", completed: true },
    { id: 3, text: "Try different themes ðŸŒˆ", completed: false },
  ]);

  const addTodo = (text: string) => {
    setTodos([...todos, { 
      id: Date.now(), 
      text, 
      completed: false 
    }]);
  };

  return (
    <div className="todo-list">
      <textarea
        placeholder="Add a new task..."
        onChange={(e) => addTodo(e.target.value)}
        style={{ 
          width: "100%", 
          border: "none", 
          outline: "none", 
          resize: "none",
          fontFamily: 'Segoe UI',
          fontSize: "0.875rem",
          marginBottom: "0.5rem"
        }}
      />
      
      <div style={{ maxHeight: "60%" }}>
        {todos.map((todo) => (
          <div 
            key={todo.id}
            className="todo-item"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5rem",
              opacity: todo.completed ? 0.5 : 1,
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => {
                setTodos(todos.map(t => 
                  t.id === todo.id ? { ...t, completed: !t.completed } : t
                ));
              }}
              style={{ marginRight: "0.5rem", cursor: "pointer" }}
            />
            <span>{todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;

