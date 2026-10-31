import React from "react";

const DigitalClock: React.FC = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="clock-widget">
      <div style={{ fontSize: "3rem", fontWeight: "600" }}>{formattedTime}</div>
      <div style={{ marginTop: "0.5rem", opacity: 0.7 }}>{date}</div>
    </div>
  );
};

const AnalogClock: React.FC = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDegrees = seconds * 6;
  const minuteDegrees = minutes * 6 + seconds * 0.1;
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="analog-clock">
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        {/* Clock face */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" />
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="7"
            x2="50"
            y2="14"
            strokeDasharray="1 2"
            transform={`rotate(${i * 30}, 50, 50)`}
          />
        ))}

        {/* Hour hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2={45 - Math.sin(hourDegrees * Math.PI / 180) * 35}
          strokeDasharray="8 0"
          transform={`rotate(${hourDegrees}, 50, 50)`}
        />

        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2={42 - Math.sin(minuteDegrees * Math.PI / 180) * 40}
          strokeDasharray="6 0"
          transform={`rotate(${minuteDegrees}, 50, 50)`}
        />

        {/* Second hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2={44 - Math.sin(secondDegrees * Math.PI / 180) * 46}
          strokeDasharray="4 0"
          transform={`rotate(${secondDegrees}, 50, 50)`}
        />

        {/* Center point */}
        <circle cx="50" cy="50" r="2" fill="currentColor" />
      </svg>
    </div>
  );
};

const CalendarWidget: React.FC = () => {
  const today = new Date();
  
  return (
    <div className="calendar-widget">
      <div style={{ fontSize: "1.25rem", fontWeight: "600" }}>
        {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </div>
      
      <div className="calendar-grid">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} style={{ 
            textAlign: "center", 
            fontSize: "0.75rem", 
            opacity: 0.6,
            padding: "4px"
          }}>
            {day}
          </div>
        ))}
        
        {/* Days of month */}
        {[...Array(35)].map((_, i) => {
          const day = new Date(today.getFullYear(), today.getMonth(), (i % 28) + 1);
          const isToday = 
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear();
          
          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                fontSize: "0.875rem",
                padding: "4px",
                opacity: isToday ? 1 : 0.6,
              }}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DigitalClock;

export { DigitalClock, AnalogClock, CalendarWidget };

