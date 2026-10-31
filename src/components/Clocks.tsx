import React from "react";

export const DigitalClock: React.FC = () => {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="clock-widget">
      <div style={{ fontSize: "2.5rem", fontWeight: 650 }}>
        {now.toLocaleTimeString("en-US")}
      </div>
      <div style={{ opacity: 0.65, marginTop: 8 }}>
        {now.toLocaleDateString("en-US", {
          weekday: "long", month: "long",
          day: "numeric", year: "numeric"
        })}
      </div>
    </div>
  );
};

export const AnalogClock: React.FC = () => {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const second = now.getSeconds() * 6;
  const minute = now.getMinutes() * 6 + now.getSeconds() * 0.1;
  const hour = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;

  return (
    <div className="analog-clock">
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="47" fill="none"
          stroke="currentColor" strokeWidth="2" opacity=".6" />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="50" y1="7" x2="50" y2="13"
            stroke="currentColor" strokeWidth="2"
            transform={`rotate(${i * 30} 50 50)`} />
        ))}
        <line x1="50" y1="50" x2="50" y2="28"
          stroke="currentColor" strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${hour} 50 50)`} />
        <line x1="50" y1="50" x2="50" y2="19"
          stroke="currentColor" strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${minute} 50 50)`} />
        <line x1="50" y1="54" x2="50" y2="14"
          stroke="#ef4444" strokeWidth="1.5"
          transform={`rotate(${second} 50 50)`} />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
      </svg>
    </div>
  );
};

export const CalendarWidget: React.FC = () => {
  const [offset, setOffset] = React.useState(0);
  const today = new Date();
  const month = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = month.getDay();
  const days = new Date(year, monthIndex + 1, 0).getDate();

  return (
    <div className="calendar-widget">
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 12
      }}>
        <button onClick={() => setOffset(v => v - 1)}>‹</button>
        <strong>
          {month.toLocaleDateString("en-US", {
            month: "long", year: "numeric"
          })}
        </strong>
        <button onClick={() => setOffset(v => v + 1)}>›</button>
      </div>
      <div className="calendar-grid">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
          <div key={d} style={{ textAlign: "center", opacity: .6 }}>
            {d}
          </div>
        ))}
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const day = i + 1;
          const active = day === today.getDate() &&
            monthIndex === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div key={day} style={{
              textAlign: "center", padding: "6px 2px",
              borderRadius: 8,
              background: active ? "#2563eb" : "transparent",
              color: active ? "#fff" : "inherit",
              fontWeight: active ? 700 : 400
            }}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DigitalClock;
