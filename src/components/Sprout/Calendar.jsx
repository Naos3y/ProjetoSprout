import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="h-screen">
      <div className="max-h-screen overflow-y-auto max-w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-6">
        <Calendar onChange={setDate} value={date} selectRange={true} />
      </div>
    </div>
  );
}

export default App;
