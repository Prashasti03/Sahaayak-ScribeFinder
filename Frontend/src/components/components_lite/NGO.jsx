// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer"

// const locations = ["Pune", "Satara", "Mumbai", "Bangluru"];
// const degrees = ["High School", "Bachelor's", "Master's", "PhD"];
// const languages = ["English", "Hindi", "Marathi", "Gujarati"];
// const types = ["Online", "Offline", "Reader", "Writer", "Written", "MCQ"];

// const initialCandidates = [
//   {
//     id: 1,
//     name: "John Doe",
//     location: "Pune",
//     education: "Bachelor's",
//     type: "Online",
//     examType: "Written",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     location: "California",
//     education: "Master's",
//     type: "Part-time",
//     examType: "Oral",
//   },
//   {
//     id: 3,
//     name: "Jane Smith",
//     location: "California",
//     education: "Master's",
//     type: "Part-time",
//     examType: "Oral",
//   },
//   {
//     id: 4,
//     name: "Jane Smith",
//     location: "California",
//     education: "Master's",
//     type: "Part-time",
//     examType: "Oral",
//   },
// ];

// const initialScribes = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     location: "Texas",
//     education: "PhD",
//     type: "Internship",
//     audioSample: "Audio Link",
//     writingSample: "Writing Link",
//   },
//   {
//     id: 2,
//     name: "Bob Brown",
//     location: "Florida",
//     education: "Bachelor's",
//     type: "Full-time",
//     audioSample: "Audio Link",
//     writingSample: "Writing Link",
//   },{
//     id: 3,
//     name: "Bob Brown",
//     location: "Florida",
//     education: "Bachelor's",
//     type: "Full-time",
//     audioSample: "Audio Link",
//     writingSample: "Writing Link",
//   },{
//     id: 4,
//     name: "Bob Brown",
//     location: "Florida",
//     education: "Bachelor's",
//     type: "Full-time",
//     audioSample: "Audio Link",
//     writingSample: "Writing Link",
//   },

// ];

// const NGO = () => {
//   const [filters, setFilters] = useState({
//     location: "",
//     education: "",
//     language: "",
//     type: "",
//   });

//   const [candidates, setCandidates] = useState(initialCandidates);
//   const [scribes, setScribes] = useState(initialScribes);

//   // Filter helpers
//   const filterCandidates = candidates.filter((c) => {
//     return (
//       (!filters.location || c.location === filters.location) &&
//       (!filters.education || c.education === filters.education) &&
//       (!filters.type || c.type === filters.type)
//     );
//   });

//   const filterScribes = scribes.filter((s) => {
//     return (
//       (!filters.location || s.location === filters.location) &&
//       (!filters.education || s.education === filters.education) &&
//       (!filters.type || s.type === filters.type)
//     );
//   });

//   // Handlers
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const addCandidate = () => {
//     const newCandidate = {
//       id: Date.now(),
//       name: "New Candidate",
//       location: "New York",
//       education: "Bachelor's",
//       type: "Full-time",
//       examType: "Written",
//     };
//     setCandidates((prev) => [...prev, newCandidate]);
//   };

//   const addScribe = () => {
//     const newScribe = {
//       id: Date.now(),
//       name: "New Scribe",
//       location: "California",
//       education: "Master's",
//       type: "Part-time",
//       audioSample: "Audio Link",
//       writingSample: "Writing Link",
//     };
//     setScribes((prev) => [...prev, newScribe]);
//   };

//   return (
//     <div>
//         <Navbar></Navbar>
//     <div style={styles.pageContainer}>
//       <aside style={styles.sidebar}>
        
//         <h3>Filter</h3>
//         <label>
//           Location
//           <select
//             name="location"
//             value={filters.location}
//             onChange={handleFilterChange}
//             style={styles.select}
//           >
//             <option value="">All</option>
//             {locations.map((loc) => (
//               <option key={loc} value={loc}>
//                 {loc}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Highest Degree Of Education
//           <select
//             name="education"
//             value={filters.education}
//             onChange={handleFilterChange}
//             style={styles.select}
//           >
//             <option value="">All</option>
//             {degrees.map((deg) => (
//               <option key={deg} value={deg}>
//                 {deg}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Language
//           <select
//             name="language"
//             value={filters.language}
//             onChange={handleFilterChange}
//             style={styles.select}
//           >
//             <option value="">All</option>
//             {languages.map((lang) => (
//               <option key={lang} value={lang}>
//                 {lang}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Type
//           <select
//             name="type"
//             value={filters.type}
//             onChange={handleFilterChange}
//             style={styles.select}
//           >
//             <option value="">All</option>
//             {types.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </label>
//       </aside>

//       <main style={styles.mainContent}>
//         <section style={styles.section}>
//           <div style={styles.sectionHeader}>
//             <h3>Candidates registered by you</h3>
//             <button onClick={addCandidate} style={styles.addButton}>
//               Add More
//             </button>
//           </div>
//           <div style={styles.cardGrid}>
//             {filterCandidates.length ? (
//               filterCandidates.map((c) => (
//                 <CardCandidate key={c.id} candidate={c} />
//               ))
//             ) : (
//               <p>No candidates found</p>
//             )}
//           </div>
//         </section>

//         <section style={styles.section}>
//           <div style={styles.sectionHeader}>
//             <h3>Scribes registered by you</h3>
//             <button onClick={addScribe} style={styles.addButton}>
//               Add More
//             </button>
//           </div>
//           <div style={styles.cardGrid}>
//             {filterScribes.length ? (
//               filterScribes.map((s) => <CardScribe key={s.id} scribe={s} />)
//             ) : (
//               <p>No scribes found</p>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//     </div>
//   );
// };

// const CardCandidate = ({ candidate }) => {
//   const { name, location, education, type, examType } = candidate;

//   const handleView = () => alert(`View details for ${name}`);
//   const handleRequest = () => alert(`Request action for ${name}`);

//   return (
//     <div style={styles.card}>
//       <div style={styles.avatarPlaceholder}></div>
//       <div style={styles.cardContent}>
//         <p><b>Name:</b> {name}</p>
//         <p><b>Location:</b> {location}</p>
//         <p><b>Education:</b> {education}</p>
//         <p><b>Type:</b> {type}</p>
//         <p><b>Exam Type:</b> {examType}</p>
//         <div style={styles.buttonRow}>
//           <button onClick={handleView} style={styles.button}>
//             View
//           </button>
//           <button onClick={handleRequest} style={styles.button}>
//             Request
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CardScribe = ({ scribe }) => {
//   const { name, location, education, type, audioSample, writingSample } = scribe;

//   const handleView = () => alert(`View details for ${name}`);
//   const handleRequest = () => alert(`Request action for ${name}`);

//   return (
//     <div style={styles.card}>
//       <div style={styles.avatarPlaceholder}></div>
//       <div style={styles.cardContent}>
//         <p><b>Name:</b> {name}</p>
//         <p><b>Location:</b> {location}</p>
//         <p><b>Education:</b> {education}</p>
//         <p><b>Type:</b> {type}</p>
//         <p><b>Audio Sample:</b> {audioSample}</p>
//         <p><b>Writing Sample:</b> {writingSample}</p>
//         <div style={styles.buttonRow}>
//           <button onClick={handleView} style={styles.button}>
//             View
//           </button>
//           <button onClick={handleRequest} style={styles.button}>
//             Request
//           </button>
//         </div>
      
//       </div>
//       </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     display: "flex",
//     height: "calc(100vh - 120px)", // Adjust for your header/footer heights
//     fontFamily: "Arial, sans-serif",
//     color: "#455A64",
//   },
//   sidebar: {
//     width: 200,
//     borderRight: "1px solid #ccc",
//     padding: 20,
//     display: "flex",
//     flexDirection: "column",
//     gap: 15,
//   },
//   select: {
//     width: "100%",
//     padding: 6,
//     marginTop: 5,
//     borderRadius: 4,
//     border: "1px solid #ccc",
//     fontSize: 14,
//   },
//   mainContent: {
//     flex: 1,
//     padding: 20,
//     overflowY: "auto",
//   },
//   section: {
//     marginBottom: 40,
//   },
//   sectionHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   addButton: {
//     backgroundColor: "#455A64",
//     color: "#fff",
//     border: "none",
//     padding: "8px 14px",
//     borderRadius: 5,
//     cursor: "pointer",
//   },
//   cardGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: 20,
//   },
//   card: {
//     border: "1px solid #ccc",
//     borderRadius: 6,
//     padding: 15,
//     backgroundColor: "#f9f9f9",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatarPlaceholder: {
//     backgroundColor: "#455A64",
//     borderRadius: "50%",
//     width: 80,
//     height: 80,
//     marginBottom: 15,
//   },
//   cardContent: {
//     width: "100%",
//   },
//   buttonRow: {
//     marginTop: 15,
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   button: {
//     backgroundColor: "#455A64",
//     color: "#fff",
//     border: "none",
//     padding: "6px 12px",
//     borderRadius: 4,
//     cursor: "pointer",
//   },
// };




// export default NGO



import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ProfileCard = ({ type }) => (
  <Card className="w-64 shadow-md rounded-2xl">
    <CardContent className="flex flex-col items-center p-4">
      {/* Avatar */}
      <Avatar className="w-16 h-16 bg-gray-300 flex items-center justify-center">
        <User className="w-10 h-10 text-gray-600" />
      </Avatar>

      {/* Info */}
      <div className="text-sm text-left w-full mt-4 space-y-1">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Location:</strong> Pune</p>
        <p><strong>Education:</strong> B.A.</p>
        <p><strong>Type:</strong> {type}</p>

        {type === "Candidate" ? (
          <p><strong>Exam Type:</strong> UPSC</p>
        ) : (
          <>
            <p><strong>Audio Sample:</strong> Available</p>
            <p><strong>Writing Sample:</strong> Available</p>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <Button variant="outline">View</Button>
        <Button>Request</Button>
      </div>
    </CardContent>
  </Card>
);

const NGODashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <Navbar></Navbar>
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
        <h1 className="text-xl font-bold">NGO Dashboard</h1>
        <Avatar className="w-10 h-10 bg-gray-300 flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </Avatar>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Filter */}
        <aside className="w-64 bg-gray-50 p-4 border-r overflow-y-auto">
          <h2 className="font-semibold mb-2">Filter</h2>
          <div className="space-y-4">
            {/* Location Dropdown */}
            <div>
              <label className="text-sm font-medium">Location</label>
              <Select>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="nagpur">Nagpur</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Education Dropdown */}
            <div>
              <label className="text-sm font-medium">Highest Degree of Education</label>
              <Select>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ba">B.A.</SelectItem>
                  <SelectItem value="bsc">B.Sc</SelectItem>
                  <SelectItem value="ma">M.A.</SelectItem>
                  <SelectItem value="msc">M.Sc</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language Dropdown */}
            <div>
              <label className="text-sm font-medium">Language</label>
              <Select>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="marathi">Marathi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Dropdown */}
            <div>
              <label className="text-sm font-medium">Type</label>
              <Select>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="candidate">Candidate</SelectItem>
                  <SelectItem value="scribe">Scribe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full mt-2">Apply Filter</Button>
          </div>
        </aside>

        {/* Content Section */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Candidates */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Candidates registered by you</h2>
            <Button onClick={() => navigate("/ngo-registration")}>
              Add More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <ProfileCard type="Candidate" />
            <ProfileCard type="Candidate" />
          </div>

          {/* Scribes */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Scribes registered by you</h2>
            <Button onClick={() => navigate("/ngo-registration")}>
              Add More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProfileCard type="Scribe" />
            <ProfileCard type="Scribe" />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="p-4 text-center bg-gray-100 border-t">
        <p className="text-sm text-gray-600">
          © 2025 NGO Portal. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default NGODashboard;
