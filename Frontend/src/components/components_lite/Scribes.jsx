// import React from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'

// import React, { useState } from "react";

// const Scribes = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [gratitudeStars, setGratitudeStars] = useState(5);
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Great work!", stars: 5 },
//     { id: 2, text: "Thank you so much!", stars: 5 },
//   ]);
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedDateIndex, setSelectedDateIndex] = useState(null);

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   const handleStarClick = (index) => {
//     setGratitudeStars(index + 1);
//   };

//   const handleMessageStarClick = (msgId, starIndex) => {
//     setMessages((prev) =>
//       prev.map((msg) =>
//         msg.id === msgId ? { ...msg, stars: starIndex + 1 } : msg
//       )
//     );
//   };

//   const addMessage = () => {
//     if (!newMessage.trim()) return;
//     setMessages((prev) => [
//       ...prev,
//       { id: Date.now(), text: newMessage.trim(), stars: 5 },
//     ]);
//     setNewMessage("");
//   };

//   const handleDateClick = (index) => {
//     setSelectedDateIndex(index === selectedDateIndex ? null : index);
//   };

//   return (
//     <div>
//         <Navbar></Navbar>
//         <div style={styles.container} onClick={() => menuOpen && setMenuOpen(false)}>
//       <header style={styles.header}>
//         <h3>Scribes</h3>
//         <div style={styles.userMenu} onClick={(e) => e.stopPropagation()}>
//           <div style={styles.userIcon} onClick={toggleMenu}>
//             👤
//           </div>
//           {menuOpen && (
//             <div style={styles.dropdown}>
//               <a href="#profile" style={styles.dropdownItem}>
//                 Your Profile
//               </a>
//               <a href="#history" style={styles.dropdownItem}>
//                 History
//               </a>
//               <a href="#logout" style={styles.dropdownItem}>
//                 Logout
//               </a>
//             </div>
//           )}
//         </div>
//       </header>

//       <div style={styles.main}>
//         <h4 style={styles.sectionTitle}>Upcoming Exams</h4>
//         <div style={styles.calendar}>
//           <div style={styles.calendarHeader}>
//             <div style={styles.calendarRing}></div>
//             <div style={styles.calendarRing}></div>
//             <div style={styles.calendarRing}></div>
//           </div>
//           <div style={styles.calendarGrid}>
//             {[...Array(5)].map((_, i) => (
//               <div
//                 key={i}
//                 onClick={() => handleDateClick(i)}
//                 style={{
//                   ...styles.calendarBlock,
//                   backgroundColor:
//                     i === selectedDateIndex ? "#82b1ff" : "#455A64",
//                   cursor: "pointer",
//                 }}
//                 title={`Exam slot ${i + 1}`}
//               />
//             ))}
//           </div>
//         </div>

//         <h4 style={styles.sectionTitle}>Schedule</h4>
//         <p style={styles.scheduleText}>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//         </p>

//         <h4 style={styles.sectionTitle}>Gratitude Stars</h4>
//         <div>
//           {[...Array(5)].map((_, i) => (
//             <span
//               key={i}
//               style={{
//                 cursor: "pointer",
//                 color: i < gratitudeStars ? "#455A64" : "#ccc",
//                 fontSize: 28,
//                 marginRight: 5,
//               }}
//               onClick={() => handleStarClick(i)}
//             >
//               ★
//             </span>
//           ))}
//         </div>

//         <div style={{ marginTop: 30 }}>
//           <h5>Gratitude Messages</h5>
//           {messages.map(({ id, text, stars }) => (
//             <div key={id} style={styles.message}>
//               <div style={styles.userIcon}>👤</div>
//               <div>
//                 <div>
//                   {[...Array(5)].map((_, i) => (
//                     <span
//                       key={i}
//                       style={{
//                         cursor: "pointer",
//                         color: i < stars ? "#455A64" : "#ccc",
//                         fontSize: 20,
//                         marginRight: 3,
//                       }}
//                       onClick={() => handleMessageStarClick(id, i)}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//                 <p style={styles.messageText}>{text}</p>
//               </div>
//             </div>
//           ))}

//           <div style={{ marginTop: 15 }}>
//             <textarea
//               rows={3}
//               placeholder="Add a gratitude message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               style={styles.textarea}
//             />
//             <button onClick={addMessage} style={styles.button}>
//               Add Message
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//     <Footer></Footer>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     fontFamily: "Arial, sans-serif",
//     color: "#455A64",
//     maxWidth: 600,
//     margin: "20px auto",
//     border: "1px solid #ccc",
//     userSelect: "none",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderBottom: "1px solid #ccc",
//     padding: "10px 20px",
//     position: "relative",
//   },
//   userMenu: {
//     position: "relative",
//     cursor: "pointer",
//   },
//   userIcon: {
//     fontSize: 28,
//     userSelect: "none",
//   },
//   dropdown: {
//     position: "absolute",
//     top: 40,
//     right: 0,
//     backgroundColor: "#fff",
//     border: "1px solid #ccc",
//     padding: 10,
//     display: "flex",
//     flexDirection: "column",
//     gap: 8,
//     fontSize: 14,
//     minWidth: 120,
//     zIndex: 10,
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//   },
//   dropdownItem: {
//     textDecoration: "none",
//     color: "#455A64",
//     cursor: "pointer",
//   },
//   main: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   calendar: {
//     border: "2px solid #455A64",
//     borderRadius: 5,
//     padding: 10,
//     maxWidth: 250,
//     marginBottom: 20,
//   },
//   calendarHeader: {
//     display: "flex",
//     justifyContent: "space-around",
//     marginBottom: 10,
//   },
//   calendarRing: {
//     width: 12,
//     height: 30,
//     border: "4px solid #455A64",
//     borderRadius: "10px 10px 0 0",
//   },
//   calendarGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     gap: 10,
//   },
//   calendarBlock: {
//     height: 30,
//     borderRadius: 3,
//   },
//   scheduleText: {
//     color: "#9eabb3",
//     fontSize: 12,
//   },
//   stars: {
//     color: "#455A64",
//     fontSize: 24,
//     marginBottom: 10,
//   },
//   message: {
//     display: "flex",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 15,
//   },
//   messageText: {
//     marginTop: 0,
//     fontSize: 14,
//     color: "#455A64",
//   },
//   textarea: {
//     width: "100%",
//     borderRadius: 5,
//     border: "1px solid #ccc",
//     padding: 8,
//     fontSize: 14,
//     fontFamily: "Arial, sans-serif",
//     resize: "vertical",
//   },
//   button: {
//     marginTop: 8,
//     padding: "8px 12px",
//     backgroundColor: "#455A64",
//     color: "#fff",
//     border: "none",
//     borderRadius: 5,
//     cursor: "pointer",
//   },
//   footer: {
//     borderTop: "1px solid #ccc",
//     padding: 10,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// };


// export default Scribes;


import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enIN from "date-fns/locale/en-IN";
import Navbar from "./Navbar.jsx"


const locales = {
  "en-IN": enIN,
};


const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const ScribeDashboard = () => {
  // Sample gratitude messages
  const [gratitudeMessages] = useState([
    { id: 1, name: "Candidate A", message: "Thank you for helping me in the exam!", rating: 5 },
    { id: 2, name: "Candidate B", message: "Really supportive and kind.", rating: 4 },
  ]);

  // Sample events for calendar
  const [events] = useState([
    {
      title: "Math Exam",
      start: new Date(2025, 8, 25, 10, 0), // Sept 25, 2025, 10 AM
      end: new Date(2025, 8, 25, 13, 0),
    },
    {
      title: "Science Exam",
      start: new Date(2025, 8, 27, 14, 0),
      end: new Date(2025, 8, 27, 17, 0),
    },
  ]);

  const averageRating =
    gratitudeMessages.reduce((acc, g) => acc + g.rating, 0) / gratitudeMessages.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-100 p-4 shadow">
        <h1 className="text-xl font-bold">Scribe Dashboard</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Your Profile</DropdownMenuItem>
            <DropdownMenuItem>History</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Upcoming Exams with Calendar */}
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4">Upcoming Exams</h2>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 400 }}
            />
          </CardContent>
        </Card>

         {/* Schedule */}
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Schedule</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>Math Exam - 25th Sept, 10 AM</li>
              <li>Science Exam - 27th Sept, 2 PM</li>
            </ul>
          </CardContent>
        </Card>

        {/* Gratitude Stars */}
        <Card>
          <CardContent className="flex flex-col items-center p-4">
            <h2 className="font-semibold mb-2">Gratitude Stars</h2>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.round(averageRating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">{averageRating.toFixed(1)} / 5</p>
          </CardContent>
        </Card>

        {/* Gratitude Messages */}
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4">Gratitude Messages</h2>
            {gratitudeMessages.map((g) => (
              <div key={g.id} className="mb-4 border-b pb-2">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>{g.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{g.name}</span>
                </div>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < g.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-1">{g.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center text-sm text-gray-500">
        © 2025 Scribe Finder
      </footer>
    </div>
  );
};

export default ScribeDashboard;

