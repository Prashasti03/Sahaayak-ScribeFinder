// import React, { useState } from 'react'
// import { Card, CardContent } from "../ui/card";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { Label } from "../ui/label";
// import { Calendar } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { Search } from "lucide-react";
// import Navbar from './Navbar';
// import Footer from './Footer';
// import axios from 'axios'
// import { toast } from 'sonner';

// const Candidates = () => {
//     // const [date, setDate] = useState(new Date());
//       const [scribes, setScribes] = useState([]);
//   const [filteredScribes, setFilteredScribes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // const scribes = [
//   //   { id: 1, name: "John Doe", location: "Mumbai", education: "BA", type: "Reader" },
//   //   { id: 2, name: "Amit Sharma", location: "Pune", education: "BCom", type: "Writer" },
//   //   { id: 3, name: "Sara Khan", location: "Delhi", education: "MA", type: "Reader" },
//   // ];

//   // Filter states
//   const [filters, setFilters] = useState({
//     city: '',
//     state: '',
//     educational_qualification: '',
//     language: '',
//     reader: false,
//     writer: false,
//     online: false,
//     offline: false,
//     written: false,
//     mcq: false
//   });

//   // Exam information state
//   const [examInfo, setExamInfo] = useState({
//     examinationName: '',
//     type: [],
//     need: [],
//     language: '',
//     date: '',
//     reportingTime: '',
//     examLocation: ''
//   });

//   // States and cities data (same as before)
//   const statesAndCities = {
//     "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Latur", "Thane", "Nashik"],
//     "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
//     "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
//     "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
//     "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"]
//   };

//   const languageOptions = [
//     "English", "Hindi", "Marathi", "Tamil", "Telugu", "Kannada", 
//     "Gujarati", "Bengali", "Urdu", "Punjabi", "Malayalam", "Other"
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//         <Navbar></Navbar>
//         {/* Header */}
//       <header className="text-center bg-blue-600 text-white p-4 text-xl font-bold">
//         Candidate Dashboard
//       </header>

//       <div className="flex flex-1">
//         {/* Sidebar Filter */}
//         <aside className="w-64 bg-white shadow p-4 space-y-4">
//           <h2 className="font-semibold text-lg">Filter</h2>

//           <div>
//             <Label>City</Label>
//             <select id="city"
//                 name="city"
//                 className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" >
//                 <option value="">Select City</option>
//                 <option value="pune">Pune</option>
//                 <option value="Delhi">Delhi</option>
//                 <option value="mumbai">Mumbai</option>
//                 <option value="nagpur">Nagpur</option>
//                 <option value="bengaluru">Bengaluru</option>
//             </select>
//           </div>

//           <div>
//             <Label>Highest Degree</Label>
//             <select id="degree"
//                 name="degree"
//                 className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" >
//                 <option value="">Select Degree</option>
//                 <option value="Below 10th">Below 10th / Below Matriculation</option>
//                 <option value="10th">10th / Matriculation</option>
//                 <option value="12th">12th / Intermediate</option>
//                 <option value="Diploma">Diploma</option>
//                 <option value="Bachelors">Bachelor’s / Under-Graduate</option>
//                 <option value="Masters">Master’s / Post-Graduate</option>
//                 <option value="PhD">PhD / Doctorate</option>
//             </select>
//           </div>

//           <div>
//             <Label>Language</Label>
//             <select id="language"
//                 name="language"
//                 className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" >
//                 <option value="">Select Language</option>
//                 <option value="english">Engilsh</option>
//                 <option value="hindi">Hindi</option>
//                 <option value="marathi">Marathi</option>
//                 <option value="tamil">Tamil</option>
//                 <option value="telugu">Telugu</option>
//                 <option value="kannada">Kannada</option>
//                 <option value="gujarati">Gujarati</option>
//                 <option value="bengali">Bengali</option>
//                 <option value="urdu">Urdu</option>
//                 <option value="punjabi">Punjabi</option>
//                 <option value="malayalam">Malayalam</option>
//                 <option value="other">Other</option>
//             </select>
//           </div>

//           <div>
//             <Label>Type</Label>
//             <select id="type"
//                 name="type"
//                 className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" >
//                 <option value="">Select Type</option>
//                 <option value="reader">Reader</option>
//                 <option value="writer">Writer</option>
//                 <option value="online">Online</option>
//                 <option value="offline">Offline</option>
//                 <option value="mcq">MCQ</option>
//                 <option value="written">Written</option>
//             </select>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6 space-y-6">
//           {/* Exam Information */}
//           <section className="bg-white shadow rounded-xl p-6 space-y-4">
//             <h2 className="font-semibold text-lg border-b pb-2">Exam Information</h2>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label>Examination Name</Label>
//                 <Input placeholder="Enter exam name" className="mt-2" />
//               </div>

//               <div>
//                 <Label>Type</Label>
//                 <div className="flex gap-2 mt-1">
//                   <label><input id="online" type="checkbox" name="type" /> Online</label>
//                   <label><input id="offline" type="checkbox" name="type" /> Offline</label>
//                   <label><input id="written" type="checkbox" name="type" /> Written</label>
//                   <label><input id="mcq" type="checkbox" name="type" /> MCQ</label>
//                 </div>
//               </div>

//               <div>
//                 <Label>Need</Label>
//                 <div className="flex gap-2 mt-1">
//                   <label><input id="reader" type="checkbox" name="need" /> Reader</label>
//                   <label><input id="writer" type="checkbox" name="need" /> Writer</label>
//                 </div>
//               </div>

//               <div>
//                 <Label>Language</Label>
//                 <Input placeholder="Exam language" className="mt-2" />
//               </div>

//               <div>
//                 <Label>Day and Date</Label>
//                 <div className="flex items-center space-x-2 mt-2">
//                   <Input type="date" />
//                   <Calendar className="h-5 w-5 text-gray-500" />
//                 </div>
//               </div>

//               <div>
//                 <Label>Reporting Time</Label>
//                 <Input type="time" className="mt-2" />
//               </div>

//               <div className="col-span-2">
//                 <Label>Exam Location</Label>
//                 <Input placeholder="Enter exam center" className="mt-2"/>
//               </div>
//             </div>
//           </section>

//           {/* Search Bar */}
//           <div className="flex items-center gap-2">
//             <Input placeholder="Search by Location, Education, Type..." />
//             <Button><Search className="w-4 h-4 mr-1" /> Search</Button>
//           </div>

//           {/* Available Scribes */}
//           <section>
//             <h2 className="font-semibold text-lg mb-4">Available Scribes</h2>
//             <div className="grid grid-cols-3 gap-4">
//               {scribes.map((scribe) => (
//                 <Card key={scribe.id} className="rounded-2xl shadow">
//                   <CardContent className="p-4 text-center space-y-2">
//                     <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto"></div>
//                     <p className="font-semibold">{scribe.name}</p>
//                     <p className="text-sm text-gray-600">{scribe.location}</p>
//                     <p className="text-sm">Education: {scribe.education}</p>
//                     <p className="text-sm">Type: {scribe.type}</p>
//                     <div className="flex justify-center gap-2 mt-3">
//                       <Button size="sm">View</Button>
//                       <Button size="sm" variant="secondary">Request</Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </section>
//         </main>
//       </div>
//       <Footer></Footer>
      
//     </div>
//   )
// }

// export default Candidates



import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Calendar, Search, Play, FileText, Loader2 } from "lucide-react";
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { toast } from 'sonner';

const Candidates = () => {
  const [scribes, setScribes] = useState([]);
  const [filteredScribes, setFilteredScribes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    educational_qualification: '',
    language: '',
    reader: false,
    writer: false,
    online: false,
    offline: false,
    written: false,
    mcq: false
  });

  // Exam information state
  const [examInfo, setExamInfo] = useState({
    examinationName: '',
    type: [],
    need: [],
    language: '',
    date: '',
    reportingTime: '',
    examLocation: ''
  });

  // States and cities data
  const statesAndCities = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Latur", "Thane", "Nashik"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"]
  };

  const languageOptions = [
    "English", "Hindi", "Marathi", "Tamil", "Telugu", "Kannada", 
    "Gujarati", "Bengali", "Urdu", "Punjabi", "Malayalam", "Other"
  ];

  // Fetch all scribes from backend
  useEffect(() => {
    fetchScribes();
  }, []);

  const fetchScribes = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching scribes from API...');
      
      const response = await axios.get('http://localhost:5000/api/scribes', {
        withCredentials: true
      });
      
      console.log('API Response:', response.data);
      
      if (response.data.success) {
        setScribes(response.data.scribes);
        setFilteredScribes(response.data.scribes);
        toast.success(`Loaded ${response.data.scribes.length} scribes`);
      } else {
        setError('Failed to load scribes: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error fetching scribes:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to load scribes';
      setError(errorMsg);
      toast.error('Failed to load scribes: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = scribes;

    if (filters.city) {
      filtered = filtered.filter(scribe => 
        scribe.city?.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.state) {
      filtered = filtered.filter(scribe => 
        scribe.state?.toLowerCase().includes(filters.state.toLowerCase())
      );
    }

    if (filters.educational_qualification) {
      filtered = filtered.filter(scribe => 
        scribe.educational_qualification === filters.educational_qualification
      );
    }

    if (filters.language) {
      filtered = filtered.filter(scribe => 
        scribe.languages?.includes(filters.language)
      );
    }

    // Boolean filters
    if (filters.reader) {
      filtered = filtered.filter(scribe => scribe.reader);
    }
    if (filters.writer) {
      filtered = filtered.filter(scribe => scribe.writer);
    }
    if (filters.online) {
      filtered = filtered.filter(scribe => scribe.online);
    }
    if (filters.offline) {
      filtered = filtered.filter(scribe => scribe.offline);
    }
    if (filters.written) {
      filtered = filtered.filter(scribe => scribe.written);
    }
    if (filters.mcq) {
      filtered = filtered.filter(scribe => scribe.mcq);
    }

    setFilteredScribes(filtered);
  }, [filters, scribes]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExamInfoChange = (key, value) => {
    setExamInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCheckboxChange = (type, value, checked) => {
    if (type === 'type') {
      setExamInfo(prev => ({
        ...prev,
        type: checked 
          ? [...prev.type, value]
          : prev.type.filter(item => item !== value)
      }));
    } else if (type === 'need') {
      setExamInfo(prev => ({
        ...prev,
        need: checked 
          ? [...prev.need, value]
          : prev.need.filter(item => item !== value)
      }));
    }
  };

  const handleScribeRequest = async (scribeId) => {
  try {
    // Validate exam info
    if (!examInfo.examinationName || !examInfo.date || !examInfo.examLocation) {
      toast.error('Please fill all required exam information');
      return;
    }

    const response = await axios.post('http://localhost:5000/api/exam/request', {
      scribeId,
      examInfo
    }, {
      withCredentials: true,
    });

    if (response.data.success) {
      toast.success('Scribe request sent successfully!');
      // Clear exam info or reset form
      setExamInfo({
        examinationName: '',
        type: [],
        need: [],
        language: '',
        date: '',
        reportingTime: '',
        examLocation: ''
      });
    }
  } catch (error) {
    console.error('Error sending request:', error);
    const errorMessage = error.response?.data?.message || 'Failed to send request';
    toast.error(errorMessage);
  }
};

  const handleViewProfile = (scribe) => {
    // You can implement a modal or separate profile page
    console.log('View scribe profile:', scribe);
  };

  const handlePlayAudio = (audioUrl) => {
    if (audioUrl) {
      window.open(`http://localhost:5000${audioUrl}`, '_blank');
    } else {
      toast.error('No audio sample available');
    }
  };

  const handleViewWriting = (writingUrl) => {
    if (writingUrl) {
      window.open(`http://localhost:5000${writingUrl}`, '_blank');
    } else {
      toast.error('No writing sample available');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading scribes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <Button onClick={fetchScribes}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Header */}
      <header className="text-center bg-blue-600 text-white p-4 text-xl font-bold">
        Candidate Dashboard
      </header>

      <div className="flex flex-1">
        {/* Sidebar Filter */}
        <aside className="w-64 bg-white shadow p-4 space-y-4">
          <h2 className="font-semibold text-lg">Filter Scribes</h2>

          <div>
            <Label>State</Label>
            <select 
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select State</option>
              {Object.keys(statesAndCities).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <Label>City</Label>
            <select 
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select City</option>
              {filters.state && statesAndCities[filters.state]?.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <Label>Highest Degree</Label>
            <select 
              value={filters.educational_qualification}
              onChange={(e) => handleFilterChange('educational_qualification', e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Degree</option>
              <option value="Below 10th">Below 10th</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelors">Bachelor's</option>
              <option value="Masters">Master's</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <Label>Language</Label>
            <select 
              value={filters.language}
              onChange={(e) => handleFilterChange('language', e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Language</option>
              {languageOptions.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Boolean Filters */}
          <div className="space-y-2">
            <Label>Preferences</Label>
            <div className="space-y-1">
              {[
                { key: 'reader', label: 'Reader' },
                { key: 'writer', label: 'Writer' },
                { key: 'online', label: 'Online' },
                { key: 'offline', label: 'Offline' },
                { key: 'written', label: 'Written' },
                { key: 'mcq', label: 'MCQ' }
              ].map(pref => (
                <label key={pref.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters[pref.key]}
                    onChange={(e) => handleFilterChange(pref.key, e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{pref.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Button 
            onClick={() => setFilters({
              city: '', state: '', educational_qualification: '', language: '',
              reader: false, writer: false, online: false, offline: false, 
              written: false, mcq: false
            })}
            variant="outline"
            className="w-full"
          >
            Clear Filters
          </Button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Exam Information */}
          <section className="bg-white shadow rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-lg border-b pb-2">Exam Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Examination Name</Label>
                <Input 
                  placeholder="Enter exam name" 
                  className="mt-2"
                  value={examInfo.examinationName}
                  onChange={(e) => handleExamInfoChange('examinationName', e.target.value)}
                />
              </div>

              <div>
                <Label>Type</Label>
                <div className="flex gap-4 mt-2 flex-wrap">
                  {['online', 'offline', 'written', 'mcq'].map(type => (
                    <label key={type} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={examInfo.type.includes(type)}
                        onChange={(e) => handleCheckboxChange('type', type, e.target.checked)}
                      />
                      <span className="text-sm capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label>Need</Label>
                <div className="flex gap-4 mt-2">
                  {['reader', 'writer'].map(need => (
                    <label key={need} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={examInfo.need.includes(need)}
                        onChange={(e) => handleCheckboxChange('need', need, e.target.checked)}
                      />
                      <span className="text-sm capitalize">{need}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label>Language</Label>
                <Input 
                  placeholder="Exam language" 
                  className="mt-2"
                  value={examInfo.language}
                  onChange={(e) => handleExamInfoChange('language', e.target.value)}
                />
              </div>

              <div>
                <Label>Day and Date</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input 
                    type="date" 
                    value={examInfo.date}
                    onChange={(e) => handleExamInfoChange('date', e.target.value)}
                  />
                  <Calendar className="h-5 w-5 text-gray-500" />
                </div>
              </div>

              <div>
                <Label>Reporting Time</Label>
                <Input 
                  type="time" 
                  className="mt-2"
                  value={examInfo.reportingTime}
                  onChange={(e) => handleExamInfoChange('reportingTime', e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <Label>Exam Location</Label>
                <Input 
                  placeholder="Enter exam center" 
                  className="mt-2"
                  value={examInfo.examLocation}
                  onChange={(e) => handleExamInfoChange('examLocation', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <Input 
              placeholder="Search by name, location, education..." 
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                setFilteredScribes(
                  scribes.filter(scribe =>
                    scribe.user?.name?.toLowerCase().includes(searchTerm) ||
                    scribe.city?.toLowerCase().includes(searchTerm) ||
                    scribe.state?.toLowerCase().includes(searchTerm) ||
                    scribe.educational_qualification?.toLowerCase().includes(searchTerm)
                  )
                );
              }}
            />
            <Button>
              <Search className="w-4 h-4 mr-1" /> Search
            </Button>
          </div>

          {/* Available Scribes */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">
                Available Scribes ({filteredScribes.length})
              </h2>
              <p className="text-sm text-gray-600">
                Showing {filteredScribes.length} of {scribes.length} scribes
              </p>
            </div>

            {filteredScribes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No scribes found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    city: '', state: '', educational_qualification: '', language: '',
                    reader: false, writer: false, online: false, offline: false, 
                    written: false, mcq: false
                  })}
                  className="mt-2"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScribes.map((scribe) => (
                  <Card key={scribe._id} className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      {/* Profile Header */}
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                          {scribe.user?.profile_photo ? (
                            <img 
                              src={`http://localhost:5000${scribe.user.profile_photo}`} 
                              alt={scribe.user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-600 text-sm">No Photo</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-lg">{scribe.user?.name || 'Unknown'}</p>
                          <p className="text-sm text-gray-600">
                            {scribe.city}, {scribe.state}
                          </p>
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Education:</span> {scribe.educational_qualification || 'Not specified'}
                        </p>
                      </div>

                      {/* Languages */}
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Languages:</span> {scribe.languages?.join(', ') || 'Not specified'}
                        </p>
                      </div>

                      {/* Preferences */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Preferences:</p>
                        <div className="flex flex-wrap gap-1">
                          {scribe.reader && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Reader</span>}
                          {scribe.writer && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Writer</span>}
                          {scribe.online && <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Online</span>}
                          {scribe.offline && <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Offline</span>}
                          {scribe.written && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Written</span>}
                          {scribe.mcq && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">MCQ</span>}
                        </div>
                      </div>

                      {/* Samples */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Samples:</p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePlayAudio(scribe.audio_sample_url)}
                            className="flex items-center gap-1"
                            disabled={!scribe.audio_sample_url}
                          >
                            <Play className="w-3 h-3" /> Audio
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewWriting(scribe.writing_sample_url)}
                            className="flex items-center gap-1"
                            disabled={!scribe.writing_sample_url}
                          >
                            <FileText className="w-3 h-3" /> Writing
                          </Button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewProfile(scribe)}
                        >
                          View Profile
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleScribeRequest(scribe._id)}
                          disabled={!examInfo.examinationName}
                        >
                          Request Scribe
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Candidates;