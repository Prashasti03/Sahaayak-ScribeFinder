// import React, { useState, useEffect } from "react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { Button } from "../ui/button";
// import Select from "react-select"
// import axios from "axios";
// import { USER_API_ENDPOINT } from "../../../utils/data";

// const RegisterStepper = () => {
//   // Load saved draft from localStorage if exists
//   const savedDraft = JSON.parse(localStorage.getItem("ngoDraft")) || {
//     ngoInfo: {},
//     candidates: [],
//     scribes: []
//   };

//   const [formData, setFormData] = useState(savedDraft);
//   const [step, setStep] = useState(0); // step counter
//   const [totalSteps, setTotalSteps] = useState(1); // will be updated after counts
//   const [numLanguages, setNumLanguages] = useState(0);
//   const [languages, setLanguages] = useState([]);

//   const languageOptions = [
//   { value: "English", label: "English" },
//   { value: "Hindi", label: "Hindi" },
//   { value: "Marathi", label: "Marathi" },
//   { value: "Tamil", label: "Tamil" },
//   { value: "Telugu", label: "Telugu" },
//   { value: "Kannada", label: "Kannada" },
//   { value: "Gujarati", label: "Gujarati" },
//   { value: "Bengali", label: "Bengali" },
//   { value: "Urdu", label: "Urdu" },
//   { value: "Punjabi", label: "Punjabi" },
//   { value: "Malayalam", label: "Malayalam" },
//   { value: "Other", label: "Other" }
// ];

//   const changeFileHandler = (e) => {
//   const file = e.target.files?.[0];
//   setFormData((prev) => ({
//     ...prev,
//     ngoInfo: { ...prev.ngoInfo, profile_photo: file },
//   }));
// };

//   // Auto-save to localStorage whenever formData changes
//   useEffect(() => {
//     localStorage.setItem("ngoDraft", JSON.stringify(formData));
//   }, [formData]);

//   // Step screens
//   const steps = [
//     "NGO Info",
//     ...Array.from({ length: formData.numCandidates || 0 }, (_, i) => `Candidate ${i + 1}`),
//     ...Array.from({ length: formData.numScribes || 0 }, (_, i) => `Scribe ${i + 1}`),
//     "Review & Submit"
//   ];

//   // Handler for form inputs
//   const handleChange = (section, field, value, index = null) => {
//     setFormData((prev) => {
//       const updated = { ...prev };
//       if (index !== null) {
//         updated[section][index] = {
//           ...updated[section][index],
//           [field]: value
//         };
//       } else {
//         updated[section] = { ...updated[section], [field]: value };
//       }
//       return updated;
//     });
//   };

// //   const handleSubmit = async () => {

// //   const form = new FormData();
// //   Object.keys(formData.ngoInfo).forEach((key) => form.append(key, formData.ngoInfo[key]));
// //   form.append("numCandidates", formData.numCandidates);
// //   form.append("numScribes", formData.numScribes);
// //   form.append("candidates", JSON.stringify(formData.candidates));
// //   form.append("scribes", JSON.stringify(formData.scribes.map(s => ({
// //   ...s,
// //   languages: (s.languages || []).map(l => l?.value || "")
// // }))));
  
// //   await axios.post(`${USER_API_ENDPOINT}/register`, form, {
// //     headers: { "Content-Type": "multipart/form-data" },
// //     withCredentials: true
// //   });
// // };

// const handleSubmit = async () => {
//   try {
//     const form = new FormData();

//     // ✅ Append NGO fields
//     Object.entries(formData.ngoInfo).forEach(([key, value]) => {
//       form.append(key, value);
//     });

//     // ✅ Add mandatory role info (so backend knows it's NGO)
//     form.append("role", "NGO");

//     // ✅ Include number counts and JSON data
//     form.append("numCandidates", formData.numCandidates || 0);
//     form.append("numScribes", formData.numScribes || 0);
//     form.append("candidates", JSON.stringify(formData.candidates || []));
//     form.append(
//       "scribes",
//       JSON.stringify(
//         (formData.scribes || []).map((s) => ({
//           ...s,
//           languages: (s.languages || []).map((l) => l?.value || ""),
//         }))
//       )
//     );

//     // ✅ API call
//     const res = await axios.post(`${USER_API_ENDPOINT}/register`, form, {
//       headers: { "Content-Type": "multipart/form-data" },
//       withCredentials: true,
//     });

//     if (res.data.success) {
//       alert("✅ NGO registered successfully!");
//       localStorage.removeItem("ngoDraft");
//       window.location.href = "/login"; // ✅ Redirect to login
//     } else {
//       alert(res.data.message || "Registration failed");
//     }
//   } catch (err) {
//     console.error("Registration error:", err);
//     alert(err.response?.data?.message || "Server error during registration");
//   }
// };

//   // Step Components
//   const renderStep = () => {
//     if (step === 0) {
//       return (
//         <div>
//           <h2 className="font-bold text-lg">NGO Info</h2>
//           <div className="my-2">
//             <Label htmlFor="name">NGO Name</Label>
//             <Input
//               value={formData.ngoInfo.name || ""}
//               onChange={(e) => handleChange("ngoInfo", "name", e.target.value)}
//             />
//           </div>
//           <div className="my-2">
//             <Label htmlFor="address">Address</Label>
//             <Input
//               value={formData.ngoInfo.address || ""}
//               onChange={(e) => handleChange("ngoInfo", "address", e.target.value)}
//             />
//           </div>
//                       <div className='my-2'>
//             <Label htmlFor="email">Email</Label>
//             <Input type="email" placeholder="johndoe@gmail.com" className='mt-2' value={formData.ngoInfo.email || ""} onChange={(e) => handleChange("ngoInfo", "email", e.target.value)}></Input>
//             </div>

//             <div className='my-2'>
//             <Label htmlFor="phone">Mobile no.</Label>
//             <Input type="tel" value={formData.ngoInfo.phone || ""} onChange={(e) => handleChange("ngoInfo", "phone", e.target.value)} placeholder="+1234567890" className='mt-2'></Input>
//             </div>

//             <div className='my-2'>
//             <Label htmlFor="password">Password</Label>
//             <Input type="password" value={formData.ngoInfo.password || ""} onChange={(e) => handleChange("ngoInfo", "password", e.target.value)} placeholder="***********" className='mt-2'></Input>
//             <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
//             </div>      

//             {/* <div className='my-2'>
//             <Label htmlFor="confirmPassword">Confirm Password</Label>
//             <Input type="password" placeholder="***********" className='mt-2'></Input>
//             <p className="text-xs text-gray-500 mt-1"></p>
//             </div> */}

//             <div className='flex items-center gap-2'>
//               <Label htmlFor="profile_photo">Profile Photo</Label>
//               <Input type='file' accept='image/*' name="profile_photo" onChange={changeFileHandler} className='cursor-pointer'></Input>    {/*image/* accepts image of any format */}
//             </div>

//           <div className="my-2">
//             <Label htmlFor="candidateCount">How many Candidates?</Label>
//             <Input
//               type="number"
//               min="0"
//               value={formData.numCandidates || 0}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   numCandidates: Math.max(0, parseInt(e.target.value) || 0),
//                   candidates: Array.from({ length: Math.max(0, parseInt(e.target.value) || 0) }, () => ({}))
//                 }))
//               }
//             />
//           </div>
//           <div className="my-2">
//             <Label htmlFor="scribeCount">How many Scribes?</Label>
//             <Input
//               type="number"
//               min="0"
//               value={formData.numScribes || 0}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   numScribes: Math.max(0, parseInt(e.target.value) || 0),
//                   scribes: Array.from({ length: Math.max(0, parseInt(e.target.value) || 0) }, () => ({}))
//                 }))
//               }
//             />
//           </div>
//         </div>
//       );
//     }

//     // Candidate steps
//     if (step > 0 && step <= (formData.numCandidates || 0)) {
//       const index = step - 1;
//       return (
//         <div>
//           <h2 className="font-bold text-lg">Candidate {index + 1}</h2>
//           <div className="my-2">
//             <Label htmlFor="name">Name</Label>
//             <Input
//               value={formData.candidates[index]?.name || ""}
//               onChange={(e) =>
//                 handleChange("candidates", "name", e.target.value, index)
//               }
//             />
//           </div>
//           <div className="my-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               type="email"
//               value={formData.candidates[index]?.email || ""}
//               onChange={(e) =>
//                 handleChange("candidates", "email", e.target.value, index)
//               }
//             />
//           </div>
//           <div className="my-2">
//             <Label htmlFor="phone">Mobile No.</Label>
//             <Input
//               type="tel"
//               value={formData.candidates[index]?.phone || ""}
//               onChange={(e) =>
//                 handleChange("candidates", "phone", e.target.value, index)
//               }
//             />
//           </div>

//           <div>
//             <Label htmlFor="educational_qualification">Highest Degree of Educational Qualification</Label>
//             <select
//               id="educational_qualification"
//               name="educational_qualification" 
//               value={formData.candidates[index]?.educational_qualification || ""} 
//               onChange={(e) =>
//                 handleChange("candidates", "educational_qualification", e.target.value, index)
//               }
//               className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Degree</option>
//               <option value="Below 10th">Below 10th / Below Matriculation</option>
//               <option value="10th">10th / Matriculation</option>
//               <option value="12th">12th / Intermediate</option>
//               <option value="Diploma">Diploma</option>
//               <option value="Bachelors">Bachelor’s / Under-Graduate</option>
//               <option value="Masters">Master’s / Post-Graduate</option>
//               <option value="PhD">PhD / Doctorate</option>
//             </select>
//           </div>

//           <div className="my-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               value={formData.candidates[index]?.password || ""}
//               onChange={(e) =>
//                 handleChange("candidates", "password", e.target.value, index)
//               }
//             />
//           </div>

//         </div>
//       );
//     }

//     // Scribe steps
//     const scribeStart = (formData.numCandidates || 0) + 1;
//     if (
//       step > (formData.numCandidates || 0) &&
//       step <= (formData.numCandidates || 0) + (formData.numScribes || 0)
//     ) {
//       const index = step - scribeStart;
//       return (
//         <div>
//           <h2 className="font-bold text-lg">Scribe {index + 1}</h2>
//           <div className="my-2">
//             <Label htmlFor="name">Name</Label>
//             <Input
//               value={formData.scribes[index]?.name || ""}
//               onChange={(e) =>
//                 handleChange("scribes", "name", e.target.value, index)
//               }
//             />
//           </div>
//           <div className="my-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               type="email"
//               value={formData.scribes[index]?.email || ""}
//               onChange={(e) =>
//                 handleChange("scribes", "email", e.target.value, index)
//               }
//             />
//           </div>

//           <div className="my-2">
//             <Label htmlFor="phone">Mobile No.</Label>
//             <Input
//               type="tel"
//               value={formData.scribes[index]?.phone || ""}
//               onChange={(e) =>
//                 handleChange("scribes", "phone", e.target.value, index)
//               }
//             />
//           </div>

//           <div className='my-2 mt-4'>
//             <Label htmlFor="address">Address</Label>
//             <div className='mt-4'>
//               <Label htmlFor="state">State</Label>
//                 <Input type="text" value={formData.scribes[index]?.state || ""} name="state" onChange={(e) =>
//                 handleChange("scribes", "state", e.target.value, index)
//               } className='mt-2'></Input>
//             </div>
//             <div className='mt-4'>
//               <Label htmlFor="city">City</Label>
//                 <Input type="text" value={formData.scribes[index]?.city || ""} name="city" onChange={(e) =>
//                 handleChange("scribes", "city", e.target.value, index)
//               } className='mt-2'></Input>
//             </div>                        
//           </div>

//           <div>
//             <Label htmlFor="educational_qualification">Highest Degree of Educational Qualification</Label>
//             <select
//               id="educational_qualification"
//               name="educational_qualification" 
//               value={formData.scribes[index]?.educational_qualification || ""} 
//               onChange={(e) =>
//                 handleChange("scribes", "educational_qualification", e.target.value, index)
//               }
//               className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Degree</option>
//               <option value="Below 10th">Below 10th / Below Matriculation</option>
//               <option value="10th">10th / Matriculation</option>
//               <option value="12th">12th / Intermediate</option>
//               <option value="Diploma">Diploma</option>
//               <option value="Bachelors">Bachelor’s / Under-Graduate</option>
//               <option value="Masters">Master’s / Post-Graduate</option>
//               <option value="PhD">PhD / Doctorate</option>
//             </select>
//           </div>

//           <div className='mt-4'>
//             <Label htmlFor="type">Type of Exams you are comfortable with:</Label>
//           </div>
//           <div className='flex gap-2'>                        
//             <div className='flex gap-2'>
//             <Label htmlFor="reader">Reader</Label>
//             <Input id="reader" type="checkbox" checked={formData.scribes[index]?.reader || false} name="reader" onChange={(e) =>
//                 handleChange("scribes", "reader", e.target.checked, index)
//               }/>
//             </div>
//             <div className='flex items-center gap-2'>
//               <Label htmlFor="writer">Writer</Label>
//               <Input id="writer" type="checkbox" checked={formData.scribes[index]?.writer || false} name="writer" onChange={(e) =>
//                 handleChange("scribes", "writer", e.target.checked, index)
//               }/>
//             </div>
//           </div>
//           <div className='flex gap-2'>
//             <div className='flex gap-2'>
//             <Label htmlFor="online">Online</Label>
//             <Input id="online" type="checkbox" checked={formData.scribes[index]?.online || false} name="online" onChange={(e) =>
//                 handleChange("scribes", "online", e.target.checked, index)
//               }/>
//             </div>
//             <div className='flex items-center gap-2'>
//               <Label htmlFor="offline">Offline</Label>
//               <Input id="offline" type="checkbox" checked={formData.scribes[index]?.offline || false} name="offline" onChange={(e) =>
//                 handleChange("scribes", "offline", e.target.checked, index)
//               }/>
//             </div>
//           </div>
//           <div className='flex gap-2'>
//             <div className='flex gap-2'>
//             <Label htmlFor="written">Written</Label>
//             <Input id="written" type="checkbox" checked={formData.scribes[index]?.written || false} name="written" onChange={(e) =>
//                 handleChange("scribes", "written", e.target.checked, index)
//               }/>
//             </div>
//             <div className='flex items-center gap-2'>
//               <Label htmlFor="mcq">MCQ</Label>
//               <Input id="mcq" type="checkbox" checked={formData.scribes[index]?.mcq || false} name="mcq" onChange={(e) =>
//                 handleChange("scribes", "mcq", e.target.checked, index)
//               }/>
//             </div>
//           </div>                      
//           <div className='my-4'>                        
//             <Label htmlFor="languageCount">How many languages do you know?</Label>
//             <Input 
//               id="language" 
//               type="number" 
//               min="0" 
//               placeholder="5"
//               value={formData.scribes[index]?.numLanguages || ""}
//               name='numLanguages'
//               onChange={(e)=>{
//                 let count = parseInt(e.target.value)|| 0;
//                 if (count<0) count = 0;
//                 // setNumLanguages (count);
//                 // setLanguages(Array(count).fill(null))
//                 handleChange("scribes", "numLanguages", count, index);
//                 handleChange("scribes", "languages", Array(count).fill(null), index);
//               }}
//               className= "mt-2" />
//           </div>
//           {/* Dynamic Dropdowns */}
//           <div className="space-y-3">
//             {Array.from({ length: formData.scribes[index]?.numLanguages || 0 }, (_, i) => (
//               <div key={i}>
//                 <Label htmlFor={`language-${i}`}>Language {i + 1}</Label>
//                 <Select
//                   id={`language-${i}`}
//                   options={languageOptions}
//                   // value={languages[i]}
//                   value={formData.scribes[index]?.languages?.[i] || null}
//                   onChange={(selected) => {
//                     // const updated = [...languages];
//                     // updated[i] = selected;
//                     // setLanguages(updated);
//                     const updated = [...(formData.scribes[index]?.languages || [])];
//                     updated[i] = selected;
//                     handleChange("scribes", "languages", updated, index);
//                   }}
//                   placeholder="Select or search a language"
//                   isClearable
//                   className="mt-1"
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="my-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               value={formData.scribes[index]?.password || ""}
//               onChange={(e) =>
//                 handleChange("scribes", "password", e.target.value, index)
//               }
//             />
//           </div>

//         </div>
//       );
//     }

//     // Review
//     return (
//       <div>
//         <h2 className="font-bold text-lg">Review & Submit</h2>
//         <pre className="bg-gray-100 p-3 rounded-md">
//           {JSON.stringify(formData, null, 2)}
//         </pre>
//         <Button className="mt-4 w-full" onClick={handleSubmit}>Submit</Button>
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-xl mx-auto shadow-md p-6 rounded-lg">
//       <h1 className="text-2xl font-bold text-blue-600 mb-4">NGO Registration</h1>
//       {/* Step indicator */}
//       <div className="mb-4">
//         <p className="text-sm text-gray-500">
//           Step {step + 1} of {steps.length}: <b>{steps[step]}</b>
//         </p>
//       </div>

//       {renderStep()}

//       {/* Navigation */}
//       <div className="flex justify-between mt-6">
//         {step > 0 && (
//           <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
//             Back
//           </Button>
//         )}
//         {step < steps.length - 1 && (
//           <Button onClick={() => setStep((s) => s + 1)}>Next</Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegisterStepper;



import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Select from "react-select"
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../utils/data";
import { toast } from "sonner";

const RegisterStepper = () => {
  // States and Cities Data (same as Register.jsx)
  const statesAndCities = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Latur", "Thane", "Nashik", "Aurangabad", "Solapur"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Rewa"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Dharwad"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Vellore"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Allahabad", "Meerut", "Ghaziabad"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Pushkar"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Darjeeling"]
  };

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Marathi", label: "Marathi" },
    { value: "Tamil", label: "Tamil" },
    { value: "Telugu", label: "Telugu" },
    { value: "Kannada", label: "Kannada" },
    { value: "Gujarati", label: "Gujarati" },
    { value: "Bengali", label: "Bengali" },
    { value: "Urdu", label: "Urdu" },
    { value: "Punjabi", label: "Punjabi" },
    { value: "Malayalam", label: "Malayalam" },
    { value: "Other", label: "Other" }
  ];

  // Load saved draft from localStorage if exists
  const savedDraft = JSON.parse(localStorage.getItem("ngoDraft")) || {
    ngoInfo: {},
    candidates: [],
    scribes: []
  };

  const [formData, setFormData] = useState(savedDraft);
  const [step, setStep] = useState(0);

  // Auto-save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("ngoDraft", JSON.stringify(formData));
  }, [formData]);

  // Step screens
  const steps = [
    "NGO Info",
    ...Array.from({ length: formData.numCandidates || 0 }, (_, i) => `Candidate ${i + 1}`),
    ...Array.from({ length: formData.numScribes || 0 }, (_, i) => `Scribe ${i + 1}`),
    "Review & Submit"
  ];

  // Handler for form inputs
  const handleChange = (section, field, value, index = null) => {
    setFormData((prev) => {
      const updated = { ...prev };
      if (index !== null) {
        updated[section][index] = {
          ...updated[section][index],
          [field]: value
        };
      } else {
        updated[section] = { ...updated[section], [field]: value };
      }
      return updated;
    });
  };

  // Handle file uploads for scribes
  const handleScribeFileUpload = (fileType, file, index) => {
    setFormData((prev) => {
      const updated = { ...prev };
      updated.scribes[index] = {
        ...updated.scribes[index],
        [fileType]: file
      };
      return updated;
    });
  };

  // Handle state selection for scribes
  const handleStateChange = (selectedOption, index) => {
    const state = selectedOption?.value || "";
    const cities = statesAndCities[state] || [];
    
    setFormData((prev) => {
      const updated = { ...prev };
      updated.scribes[index] = {
        ...updated.scribes[index],
        state: state,
        city: "" // Reset city when state changes
      };
      return updated;
    });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({
      ...prev,
      ngoInfo: { ...prev.ngoInfo, profile_photo: file },
    }));
  };

  // Validation function
  const validateCurrentStep = () => {
    if (step === 0) {
      // NGO Info validation
      const { name, email, phone, password, address } = formData.ngoInfo;
      if (!name?.trim()) return "NGO name is required";
      if (!email?.trim()) return "Email is required";
      if (!/^\d{10}$/.test(phone)) return "Phone number must be 10 digits";
      if (!password || password.length < 8) return "Password must be at least 8 characters";
      if (!address?.trim()) return "Address is required";
    }
    
    // Candidate validation
    if (step > 0 && step <= (formData.numCandidates || 0)) {
      const index = step - 1;
      const candidate = formData.candidates[index];
      if (!candidate?.name?.trim()) return `Candidate ${index + 1}: Name is required`;
      if (!candidate?.email?.trim()) return `Candidate ${index + 1}: Email is required`;
      if (!candidate?.educational_qualification) return `Candidate ${index + 1}: Educational qualification is required`;
      if (!candidate?.password || candidate.password.length < 8) return `Candidate ${index + 1}: Password must be at least 8 characters`;
    }
    
    // Scribe validation
    const scribeStart = (formData.numCandidates || 0) + 1;
    if (step > (formData.numCandidates || 0) && step <= (formData.numCandidates || 0) + (formData.numScribes || 0)) {
      const index = step - scribeStart;
      const scribe = formData.scribes[index];
      if (!scribe?.name?.trim()) return `Scribe ${index + 1}: Name is required`;
      if (!scribe?.email?.trim()) return `Scribe ${index + 1}: Email is required`;
      if (!scribe?.state) return `Scribe ${index + 1}: State is required`;
      if (!scribe?.city) return `Scribe ${index + 1}: City is required`;
      if (!scribe?.educational_qualification) return `Scribe ${index + 1}: Educational qualification is required`;
      if (!scribe?.password || scribe.password.length < 8) return `Scribe ${index + 1}: Password must be at least 8 characters`;
    }
    
    return null;
  };

  const handleSubmit = async () => {
    try {
      const validationError = validateCurrentStep();
      if (validationError && step === steps.length - 1) {
        toast.error(validationError);
        return;
      }

      const form = new FormData();

      // ✅ Append NGO fields
      Object.entries(formData.ngoInfo).forEach(([key, value]) => {
        if (key === "profile_photo" && value instanceof File) {
          form.append("profile_photo", value);
        } else {
          form.append(key, value);
        }
      });

      // ✅ FIX: Use lowercase "ngo" to match backend enum
      form.append("role", "ngo");

      // ✅ Include number counts and JSON data
      form.append("numCandidates", formData.numCandidates || 0);
      form.append("numScribes", formData.numScribes || 0);
      form.append("candidates", JSON.stringify(formData.candidates || []));
      
      // Prepare scribes data with file information
      const scribesData = (formData.scribes || []).map((scribe, index) => {
        const scribeData = {
          ...scribe,
          languages: (scribe.languages || []).map((l) => l?.value || ""),
          // Files will be handled separately in backend
        };
        return scribeData;
      });
      
      form.append("scribes", JSON.stringify(scribesData));

      // ✅ API call
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("✅ NGO registered successfully!");
        localStorage.removeItem("ngoDraft");
        window.location.href = "/login";
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.message || "Server error during registration");
    }
  };

  // Step Components
  const renderStep = () => {
    if (step === 0) {
      return (
        <div>
          <h2 className="font-bold text-lg">NGO Info</h2>
          <div className="my-2">
            <Label htmlFor="name">NGO Name</Label>
            <Input
              value={formData.ngoInfo.name || ""}
              onChange={(e) => handleChange("ngoInfo", "name", e.target.value)}
            />
          </div>
          <div className="my-2">
            <Label htmlFor="address">Address</Label>
            <Input
              value={formData.ngoInfo.address || ""}
              onChange={(e) => handleChange("ngoInfo", "address", e.target.value)}
            />
          </div>
          <div className='my-2'>
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="johndoe@gmail.com" className='mt-2' value={formData.ngoInfo.email || ""} onChange={(e) => handleChange("ngoInfo", "email", e.target.value)}></Input>
          </div>

          <div className='my-2'>
            <Label htmlFor="phone">Mobile no.</Label>
            <Input type="tel" value={formData.ngoInfo.phone || ""} onChange={(e) => handleChange("ngoInfo", "phone", e.target.value)} placeholder="9876543210" className='mt-2'></Input>
          </div>

          <div className='my-2'>
            <Label htmlFor="password">Password</Label>
            <Input type="password" value={formData.ngoInfo.password || ""} onChange={(e) => handleChange("ngoInfo", "password", e.target.value)} placeholder="***********" className='mt-2'></Input>
            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
          </div>

          <div className='flex items-center gap-2'>
            <Label htmlFor="profile_photo">Profile Photo</Label>
            <Input type='file' accept='image/*' name="profile_photo" onChange={changeFileHandler} className='cursor-pointer'></Input>
          </div>

          <div className="my-2">
            <Label htmlFor="candidateCount">How many Candidates?</Label>
            <Input
              type="number"
              min="0"
              value={formData.numCandidates || 0}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  numCandidates: Math.max(0, parseInt(e.target.value) || 0),
                  candidates: Array.from({ length: Math.max(0, parseInt(e.target.value) || 0) }, () => ({}))
                }))
              }
            />
          </div>
          <div className="my-2">
            <Label htmlFor="scribeCount">How many Scribes?</Label>
            <Input
              type="number"
              min="0"
              value={formData.numScribes || 0}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  numScribes: Math.max(0, parseInt(e.target.value) || 0),
                  scribes: Array.from({ length: Math.max(0, parseInt(e.target.value) || 0) }, () => ({}))
                }))
              }
            />
          </div>
        </div>
      );
    }

    // Candidate steps (unchanged)
    if (step > 0 && step <= (formData.numCandidates || 0)) {
      const index = step - 1;
      return (
        <div>
          <h2 className="font-bold text-lg">Candidate {index + 1}</h2>
          <div className="my-2">
            <Label htmlFor="name">Name</Label>
            <Input
              value={formData.candidates[index]?.name || ""}
              onChange={(e) =>
                handleChange("candidates", "name", e.target.value, index)
              }
            />
          </div>
          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              value={formData.candidates[index]?.email || ""}
              onChange={(e) =>
                handleChange("candidates", "email", e.target.value, index)
              }
            />
          </div>
          <div className="my-2">
            <Label htmlFor="phone">Mobile No.</Label>
            <Input
              type="tel"
              value={formData.candidates[index]?.phone || ""}
              onChange={(e) =>
                handleChange("candidates", "phone", e.target.value, index)
              }
            />
          </div>

          <div>
            <Label htmlFor="educational_qualification">Highest Degree</Label>
            <select
              id="educational_qualification"
              name="educational_qualification" 
              value={formData.candidates[index]?.educational_qualification || ""} 
              onChange={(e) =>
                handleChange("candidates", "educational_qualification", e.target.value, index)
              }
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              value={formData.candidates[index]?.password || ""}
              onChange={(e) =>
                handleChange("candidates", "password", e.target.value, index)
              }
            />
          </div>
        </div>
      );
    }

    // Scribe steps (UPDATED)
    const scribeStart = (formData.numCandidates || 0) + 1;
    if (step > (formData.numCandidates || 0) && step <= (formData.numCandidates || 0) + (formData.numScribes || 0)) {
      const index = step - scribeStart;
      const currentScribe = formData.scribes[index] || {};
      const cities = statesAndCities[currentScribe.state] || [];
      
      const stateOptions = Object.keys(statesAndCities).map(state => ({
        value: state,
        label: state
      }));
      
      const cityOptions = cities.map(city => ({
        value: city,
        label: city
      }));

      return (
        <div>
          <h2 className="font-bold text-lg">Scribe {index + 1}</h2>
          <div className="my-2">
            <Label htmlFor="name">Name</Label>
            <Input
              value={currentScribe.name || ""}
              onChange={(e) =>
                handleChange("scribes", "name", e.target.value, index)
              }
            />
          </div>
          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              value={currentScribe.email || ""}
              onChange={(e) =>
                handleChange("scribes", "email", e.target.value, index)
              }
            />
          </div>

          <div className="my-2">
            <Label htmlFor="phone">Mobile No.</Label>
            <Input
              type="tel"
              value={currentScribe.phone || ""}
              onChange={(e) =>
                handleChange("scribes", "phone", e.target.value, index)
              }
            />
          </div>

          {/* UPDATED: State-City Dropdowns */}
          <div className='my-2 mt-4'>
            <Label>Location</Label>
            <div className='mt-2'>
              <Label htmlFor="state">State</Label>
              <Select
                options={stateOptions}
                value={stateOptions.find(opt => opt.value === currentScribe.state) || null}
                onChange={(selected) => handleStateChange(selected, index)}
                placeholder="Select State"
                isClearable
                className="mt-1"
              />
            </div>
            <div className='mt-2'>
              <Label htmlFor="city">City</Label>
              <Select
                options={cityOptions}
                value={cityOptions.find(opt => opt.value === currentScribe.city) || null}
                onChange={(selected) => handleChange("scribes", "city", selected?.value || "", index)}
                placeholder="Select City"
                isClearable
                isDisabled={!currentScribe.state}
                className="mt-1"
              />
            </div>                        
          </div>

          <div>
            <Label htmlFor="educational_qualification">Highest Degree</Label>
            <select
              id="educational_qualification"
              name="educational_qualification" 
              value={currentScribe.educational_qualification || ""} 
              onChange={(e) =>
                handleChange("scribes", "educational_qualification", e.target.value, index)
              }
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Exam Preferences (unchanged) */}
          <div className='mt-4'>
            <Label>Exam Preferences</Label>
          </div>
          <div className='flex gap-2'>                        
            <div className='flex gap-2'>
              <Label htmlFor="reader">Reader</Label>
              <Input id="reader" type="checkbox" checked={currentScribe.reader || false} name="reader" onChange={(e) =>
                  handleChange("scribes", "reader", e.target.checked, index)
                }/>
            </div>
            <div className='flex items-center gap-2'>
              <Label htmlFor="writer">Writer</Label>
              <Input id="writer" type="checkbox" checked={currentScribe.writer || false} name="writer" onChange={(e) =>
                  handleChange("scribes", "writer", e.target.checked, index)
                }/>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='flex gap-2'>
              <Label htmlFor="online">Online</Label>
              <Input id="online" type="checkbox" checked={currentScribe.online || false} name="online" onChange={(e) =>
                  handleChange("scribes", "online", e.target.checked, index)
                }/>
            </div>
            <div className='flex items-center gap-2'>
              <Label htmlFor="offline">Offline</Label>
              <Input id="offline" type="checkbox" checked={currentScribe.offline || false} name="offline" onChange={(e) =>
                  handleChange("scribes", "offline", e.target.checked, index)
                }/>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='flex gap-2'>
              <Label htmlFor="written">Written</Label>
              <Input id="written" type="checkbox" checked={currentScribe.written || false} name="written" onChange={(e) =>
                  handleChange("scribes", "written", e.target.checked, index)
                }/>
            </div>
            <div className='flex items-center gap-2'>
              <Label htmlFor="mcq">MCQ</Label>
              <Input id="mcq" type="checkbox" checked={currentScribe.mcq || false} name="mcq" onChange={(e) =>
                  handleChange("scribes", "mcq", e.target.checked, index)
                }/>
            </div>
          </div>                      
          
          {/* Languages (unchanged) */}
          <div className='my-4'>                        
            <Label htmlFor="languageCount">How many languages do you know?</Label>
            <Input 
              id="language" 
              type="number" 
              min="0" 
              placeholder="5"
              value={currentScribe.numLanguages || ""}
              name='numLanguages'
              onChange={(e)=>{
                let count = parseInt(e.target.value)|| 0;
                if (count<0) count = 0;
                handleChange("scribes", "numLanguages", count, index);
                handleChange("scribes", "languages", Array(count).fill(null), index);
              }}
              className= "mt-2" />
          </div>
          
          <div className="space-y-3">
            {Array.from({ length: currentScribe.numLanguages || 0 }, (_, i) => (
              <div key={i}>
                <Label htmlFor={`language-${i}`}>Language {i + 1}</Label>
                <Select
                  id={`language-${i}`}
                  options={languageOptions}
                  value={currentScribe.languages?.[i] || null}
                  onChange={(selected) => {
                    const updated = [...(currentScribe.languages || [])];
                    updated[i] = selected;
                    handleChange("scribes", "languages", updated, index);
                  }}
                  placeholder="Select language"
                  isClearable
                  className="mt-1"
                />
              </div>
            ))}
          </div>

          {/* NEW: Audio & Writing Sample Uploads */}
          <div className="my-4">
            <Label htmlFor="audio_sample">Audio Sample</Label>
            <Input
              type="file"
              accept="audio/*"
              name="audio_sample"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 10 * 1024 * 1024) {
                    toast.error("Audio file must be less than 10MB");
                    return;
                  }
                  handleScribeFileUpload("audio_sample", file, index);
                }
              }}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">Upload an audio sample (max 10MB)</p>
          </div>

          <div className="my-4">
            <Label htmlFor="writing_sample">Writing Sample</Label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              name="writing_sample"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 5 * 1024 * 1024) {
                    toast.error("Writing sample must be less than 5MB");
                    return;
                  }
                  handleScribeFileUpload("writing_sample", file, index);
                }
              }}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">Upload a writing sample (PDF, DOC, or image, max 5MB)</p>
          </div>

          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              value={currentScribe.password || ""}
              onChange={(e) =>
                handleChange("scribes", "password", e.target.value, index)
              }
            />
          </div>
        </div>
      );
    }

    // Review (unchanged)
    return (
      <div>
        <h2 className="font-bold text-lg">Review & Submit</h2>
        <pre className="bg-gray-100 p-3 rounded-md">
          {JSON.stringify(formData, null, 2)}
        </pre>
        <Button className="mt-4 w-full" onClick={handleSubmit}>Submit</Button>
      </div>
    );
  };

  // Navigation with validation
  const handleNext = () => {
    const validationError = validateCurrentStep();
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="max-w-xl mx-auto shadow-md p-6 rounded-lg">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">NGO Registration</h1>
      {/* Step indicator */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Step {step + 1} of {steps.length}: <b>{steps[step]}</b>
        </p>
      </div>

      {renderStep()}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        )}
        {step < steps.length - 1 && (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </div>
  );
};

export default RegisterStepper;