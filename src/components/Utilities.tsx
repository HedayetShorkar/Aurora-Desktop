import React from "react";

export const WeatherWidget: React.FC = () => (
  <div className="weather-widget">
    <div style={{ fontSize: 28 }}>{"\u2600\uFE0F"}</div>
    <div style={{ fontSize: 30, fontWeight: 700 }}>Weather</div>
    <div style={{ opacity: .65, marginTop: 8 }}>
      Live weather is not connected yet.
    </div>
    <div style={{ fontSize: 12, opacity: .5, marginTop: 8 }}>
      No simulated temperature displayed
    </div>
  </div>
);

export const NotesEditor: React.FC = () => {
  const [note, setNote] = React.useState(() => {
    try {
      return localStorage.getItem("aurora-notes") ??
        "Welcome to Aurora Desktop!";
    } catch {
      return "Welcome to Aurora Desktop!";
    }
  });

  React.useEffect(() => {
    try { localStorage.setItem("aurora-notes", note); }
    catch { /* Storage unavailable */ }
  }, [note]);

  return (
    <div className="notes-editor" style={{ height: "100%" }}>
      <textarea
        aria-label="Notes"
        value={note}
        onChange={e => setNote(e.target.value)}
        style={{
          width: "100%", minHeight: 145, height: "100%",
          resize: "vertical", border: "none",
          outline: "none", background: "transparent",
          color: "inherit", fontFamily: "Segoe UI"
        }}
      />
    </div>
  );
};

type Todo = { id: number; text: string; completed: boolean };

export const TodoList: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem("aurora-todos");
      return saved ? JSON.parse(saved) as Todo[] : [];
    } catch {
      return [];
    }
  });
  const [draft, setDraft] = React.useState("");

  React.useEffect(() => {
    try { localStorage.setItem("aurora-todos", JSON.stringify(todos)); }
    catch { /* Storage unavailable */ }
  }, [todos]);

  const addTodo = () => {
    const text = draft.trim();
    if (!text) return;
    setTodos(prev => [...prev, {
      id: Date.now(), text, completed: false
    }]);
    setDraft("");
  };

  return (
    <div className="todo-list">
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          aria-label="New task"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") addTodo(); }}
          placeholder="Add a task..."
          style={{
            minWidth: 0, flex: 1, padding: 8,
            borderRadius: 8, border: "1px solid #cbd5e1"
          }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      {todos.map(todo => (
        <div key={todo.id} style={{
          display: "flex", gap: 8,
          alignItems: "center", marginBottom: 8
        }}>
          <input type="checkbox" checked={todo.completed}
            onChange={() => setTodos(prev => prev.map(t =>
              t.id === todo.id ? { ...t, completed: !t.completed } : t
            ))} />
          <span style={{
            flex: 1,
            textDecoration: todo.completed ? "line-through" : "none"
          }}>
            {todo.text}
          </span>
          <button aria-label="Delete task" onClick={() =>
            setTodos(prev => prev.filter(t => t.id !== todo.id))
          }>×</button>
        </div>
      ))}
    </div>
  );
};

export default WeatherWidget;
