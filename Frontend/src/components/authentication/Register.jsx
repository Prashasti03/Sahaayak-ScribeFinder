// import React, { useState } from "react";
// import Navbar from "../components_lite/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { Button } from "../ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import Select from "react-select";
// import RegisterStepper from "./RegisterStepper"; // NGO Stepper Component
// import { USER_API_ENDPOINT } from "../../../utils/data";
// import { toast } from "sonner";
// import axios from "axios";

// const Register = () => {
//   const [role, setRole] = useState("candidate");
//   const [numLanguages, setNumLanguages] = useState(0);
//   const [languages, setLanguages] = useState([]);

//   const [input, setInput] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "candidate",
//     profile_photo: "",
//     educational_qualification: "",
//     reader: false,
//     writer: false,
//     online: false,
//     offline: false,
//     written: false,
//     mcq: false,
//     numLanguages: "0",
//     languages: "",
//     state: "",
//     city: "",
//     audio_sample_url: "",
//     writing_sample_url: "",
//   });

//   const [profilePhotoFile, setProfilePhotoFile] = useState(null);
//   const [audioSampleFile, setAudioSampleFile] = useState(null); // Add this
//   const [writingSampleFile, setWritingSampleFile] = useState(null);

//   const navigate = useNavigate();

//   const languageOptions = [
//     { value: "English", label: "English" },
//     { value: "Hindi", label: "Hindi" },
//     { value: "Marathi", label: "Marathi" },
//     { value: "Tamil", label: "Tamil" },
//     { value: "Telugu", label: "Telugu" },
//     { value: "Kannada", label: "Kannada" },
//     { value: "Gujarati", label: "Gujarati" },
//     { value: "Bengali", label: "Bengali" },
//     { value: "Urdu", label: "Urdu" },
//     { value: "Punjabi", label: "Punjabi" },
//     { value: "Malayalam", label: "Malayalam" },
//     { value: "Other", label: "Other" },
//   ];

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const changeFileHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file && !file.type.startsWith("image/")) {
//       toast.error("Only image files are allowed!");
//       return;
//     }
//     if (file && file.size > 2 * 1024 * 1024) {
//       toast.error("File size should be less than 2MB");
//       return;
//     }
//     setProfilePhotoFile(file);
//   };

//   const checkboxHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.checked });
//   };

//   const validateForm = () => {
//     if (!input.name.trim()) return "Full name is required";
//     if (!input.email.trim()) return "Email is required";
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(input.email)) return "Invalid email format";

//     if (!input.phone.trim()) return "Phone number is required";
//     if (!/^\d{10}$/.test(input.phone)) return "Phone number must be 10 digits";

//     if (!input.password) return "Password is required";
//     if (input.password.length < 8)
//       return "Password must be at least 8 characters";

//     if (role === "candidate" || role === "scribe") {
//       if (!input.educational_qualification)
//         return "Educational qualification is required";
//     }

//     if (role === "scribe") {
//       if (!input.state.trim()) return "State is required";
//       if (!input.city.trim()) return "City is required";

//       if (numLanguages > 0) {
//         for (let i = 0; i < numLanguages; i++) {
//           if (!languages[i]) return `Please select Language ${i + 1}`;
//         }
//       }
//     }

//     return null; // no errors
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log("Form submit triggered - Role", role);

//     const errorMsg = validateForm();
//     if (errorMsg) {
//       toast.error(errorMsg);
//       return;
//     }

//     // const updatedInput = { ...input, role };

//     const formData = new FormData();

//     // Append all basic fields
//     formData.append("name", input.name);
//     formData.append("email", input.email);
//     formData.append("phone", input.phone);
//     formData.append("password", input.password);
//     formData.append("role", role);
//     formData.append("educational_qualification", input.educational_qualification);

//     // Object.keys(updatedInput).forEach((key) => {
//     //   if (key !== "numLanguages" && key !== "languages") {
//     //     formData.append(key, input[key]);
//     //   }
//     // });
//     // formData.append("numLanguages", numLanguages);
//     // formData.append(
//     //   "languages",
//     //   JSON.stringify(languages.map((lang) => lang?.value))
//     // );

//     // Append scribe-specific fields only if role is scribe
//     if (role === "scribe") {
//       formData.append("reader", input.reader);
//       formData.append("writer", input.writer);
//       formData.append("online", input.online);
//       formData.append("offline", input.offline);
//       formData.append("written", input.written);
//       formData.append("mcq", input.mcq);
//       formData.append("state", input.state);
//       formData.append("city", input.city);
//       formData.append("numLanguages", numLanguages);
//       formData.append(
//         "languages",
//         JSON.stringify(languages.map((lang) => lang?.value))
//       );

//       // Append audio and writing sample files for scribe
//       if (audioSampleFile) {
//         formData.append("audio_sample", audioSampleFile);
//       }
//       if (writingSampleFile) {
//         formData.append("writing_sample", writingSampleFile);
//       }
//     }

//       if (profilePhotoFile) {
//         formData.append("profile_photo", profilePhotoFile);
//       }

//       console.log("Submitting registration form for role...", role);

//       try {
//         const res = await axios.post(
//           `${USER_API_ENDPOINT}/register`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//             withCredentials: true,
//           }
//         );

//         if (res.data.success) {
//           navigate("/login");
//           toast.success(res.data.message);
//         } else {
//           toast.error(res.data.message);
//         }
//       } catch (error) {
//         console.error(error);
//         const errorMessage = error.response
//           ? error.response.data.message
//           : "An unexpected error occurred";
//         toast.error(errorMessage);
//       }
//     }
//   }

//     return (
//       <div>
//         <Navbar />
//         <div className="flex items-center justify-center max-w-7xl mx-auto">
//           <form
//             onSubmit={submitHandler}
//             className="w-full sm:w-1/2 shadow-lg rounded-xl border border-gray-500 p-8 space-y-5 my-10"
//           >
//             <h1 className="font-bold text-2xl mb-5 text-center text-blue-600">
//               Register
//             </h1>

//             {/* Role */}
//             <div>
//               <Label htmlFor="role">Role</Label>
//               <RadioGroup
//                 value={role}
//                 onValueChange={setRole}
//                 name="role"
//                 className="items-center gap-4 mt-4"
//               >
//                 <div className="flex items-center gap-3">
//                   <RadioGroupItem value="candidate" id="candidate" />
//                   <Label htmlFor="candidate">Candidate</Label>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <RadioGroupItem value="scribe" id="scribe" />
//                   <Label htmlFor="scribe">Scribe</Label>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <RadioGroupItem value="ngo" id="ngo" />
//                   <Label htmlFor="ngo">NGO</Label>
//                 </div>
//               </RadioGroup>
//             </div>

//             {/* If NGO → Stepper */}
//             {role === "ngo" ? (
//               <RegisterStepper />
//             ) : (
//               <>
//                 {/* Common Fields */}
//                 <div>
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     type="text"
//                     placeholder="John Doe"
//                     value={input.name}
//                     name="name"
//                     onChange={changeEventHandler}
//                     className="mt-2"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     type="email"
//                     name="email"
//                     placeholder="johndoe@gmail.com"
//                     value={input.email}
//                     onChange={changeEventHandler}
//                     className="mt-2"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="phone">Mobile no.</Label>
//                   <Input
//                     type="tel"
//                     name="phone"
//                     placeholder="9876543210"
//                     value={input.phone}
//                     onChange={changeEventHandler}
//                     className="mt-2"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="password">Password</Label>
//                   <Input
//                     type="password"
//                     name="password"
//                     placeholder="********"
//                     value={input.password}
//                     onChange={changeEventHandler}
//                     className="mt-2"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Must be at least 8 characters
//                   </p>
//                 </div>

//                 {/* Candidate Specific */}
//                 {role === "candidate" && (
//                   <div>
//                     <Label htmlFor="educational_qualification">
//                       Highest Degree
//                     </Label>
//                     <select
//                       id="educational_qualification"
//                       name="educational_qualification"
//                       value={input.educational_qualification}
//                       onChange={changeEventHandler}
//                       className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">Select Degree</option>
//                       <option value="Below 10th">Below 10th</option>
//                       <option value="10th">10th</option>
//                       <option value="12th">12th</option>
//                       <option value="Diploma">Diploma</option>
//                       <option value="Bachelors">Bachelor’s</option>
//                       <option value="Masters">Master’s</option>
//                       <option value="PhD">PhD</option>
//                     </select>
//                   </div>
//                 )}

//                 {/* Scribe Specific */}
//                 {role === "scribe" && (
//                   <>
//                     <div>
//                       <Label>State</Label>
//                       <Input
//                         type="text"
//                         name="state"
//                         value={input.state}
//                         onChange={changeEventHandler}
//                         className="mt-2"
//                       />
//                     </div>
//                     <div>
//                       <Label>City</Label>
//                       <Input
//                         type="text"
//                         name="city"
//                         value={input.city}
//                         onChange={changeEventHandler}
//                         className="mt-2"
//                       />
//                     </div>

//                     <div>
//                       <Label>Highest Degree</Label>
//                       <select
//                         id="educational_qualification"
//                         name="educational_qualification"
//                         value={input.educational_qualification}
//                         onChange={changeEventHandler}
//                         className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Degree</option>
//                         <option value="Below 10th">Below 10th</option>
//                         <option value="10th">10th</option>
//                         <option value="12th">12th</option>
//                         <option value="Diploma">Diploma</option>
//                         <option value="Bachelors">Bachelor’s</option>
//                         <option value="Masters">Master’s</option>
//                         <option value="PhD">PhD</option>
//                       </select>
//                     </div>

//                     {/* Checkboxes */}
//                     <div className="mt-4">
//                       <Label>Exam Preferences</Label>
//                       <div className="flex gap-3 mt-2">
//                         <label className="flex gap-1 items-center">
//                           <Input
//                             type="checkbox"
//                             name="reader"
//                             checked={input.reader}
//                             onChange={checkboxHandler}
//                           />
//                           Reader
//                         </label>
//                         <label className="flex gap-1 items-center">
//                           <Input
//                             type="checkbox"
//                             name="writer"
//                             checked={input.writer}
//                             onChange={checkboxHandler}
//                           />
//                           Writer
//                         </label>
//                       </div>
//                       <div className="flex gap-3 mt-2">
//                         <label className="flex gap-1 items-center">
//                           <Input
//                             type="checkbox"
//                             name="online"
//                             checked={input.online}
//                             onChange={checkboxHandler}
//                           />
//                           Online
//                         </label>
//                         <label className="flex gap-1 items-center">
//                           <Input
//                             type="checkbox"
//                             name="offline"
//                             checked={input.offline}
//                             onChange={checkboxHandler}
//                           />
//                           Offline
//                         </label>
//                       </div>
//                       <div className="flex gap-3 mt-2">
//                         <label className="flex gap-1 items-center">
//                           <Input
//                             type="checkbox"
//                             name="written"
//                             checked={input.written}
//                             onChange={checkboxHandler}
//                           />
//                           Written
//                         </label>
//                         <label className="flex gap-1 items-center">
//                           <Input
//                             type="checkbox"
//                             name="mcq"
//                             checked={input.mcq}
//                             onChange={checkboxHandler}
//                           />
//                           MCQ
//                         </label>
//                       </div>
//                     </div>

//                     {/* Languages */}
//                     <div className="my-4">
//                       <Label>How many languages do you know?</Label>
//                       <Input
//                         type="number"
//                         min="0"
//                         placeholder="e.g. 2"
//                         value={numLanguages}
//                         onChange={(e) => {
//                           let count = parseInt(e.target.value) || 0;
//                           if (count < 0) count = 0;
//                           setNumLanguages(count);
//                           setLanguages(Array(count).fill(null));
//                         }}
//                         className="mt-2"
//                       />
//                     </div>
//                     <div className="space-y-3">
//                       {Array.from({ length: numLanguages }, (_, i) => (
//                         <div key={i}>
//                           <Label>Language {i + 1}</Label>
//                           <Select
//                             options={languageOptions}
//                             value={languages[i]}
//                             onChange={(selected) => {
//                               const updated = [...languages];
//                               updated[i] = selected;
//                               setLanguages(updated);
//                             }}
//                             placeholder="Select language"
//                             isClearable
//                             className="mt-1"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div>
//                       <Label htmlFor="audio_sample">Audio Sample</Label>
//                       <Input
//                         type="file"
//                         accept="audio/*"
//                         name="audio_sample"
//                         onChange={(e) => {
//                           const file = e.target.files?.[0];
//                           if (file) {
//                             // You can add validation here
//                             if (file.size > 10 * 1024 * 1024) {
//                               // 10MB limit
//                               toast.error("Audio file must be less than 10MB");
//                               return;
//                             }
//                             // Store the file separately for FormData
//                             setAudioSampleFile(file);
//                           }
//                         }}
//                         className="mt-2"
//                       />
//                       <p className="text-xs text-gray-500 mt-1">
//                         Upload an audio sample (max 10MB)
//                       </p>
//                     </div>

//                     <div>
//                       <Label htmlFor="writing_sample">Writing Sample</Label>
//                       <Input
//                         type="file"
//                         accept=".pdf,.doc,.docx,image/*"
//                         name="writing_sample"
//                         onChange={(e) => {
//                           const file = e.target.files?.[0];
//                           if (file) {
//                             if (file.size > 5 * 1024 * 1024) {
//                               // 5MB limit
//                               toast.error(
//                                 "Writing sample must be less than 5MB"
//                               );
//                               return;
//                             }
//                             setWritingSampleFile(file);
//                           }
//                         }}
//                         className="mt-2"
//                       />
//                       <p className="text-xs text-gray-500 mt-1">
//                         Upload a writing sample (PDF, DOC, or image, max 5MB)
//                       </p>
//                     </div>
//                   </>
//                 )}

//                 {/* File Upload */}
//                 <div className="flex items-center gap-2">
//                   <Label htmlFor="profile_photo">Profile Photo</Label>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     name="profile_photo"
//                     onChange={changeFileHandler}
//                     className="cursor-pointer"
//                   />
//                 </div>

//                 {/* Submit */}
//                 <Button className="w-full mt-4 cursor-pointer" type="submit">
//                   Register
//                 </Button>

//                 <p className="text-gray-500 text-md my-2">
//                   Already have an account?{" "}
//                   <Link to="/login" className="text-blue-700">
//                     Login
//                   </Link>
//                 </p>
//               </>
//             )}
//           </form>
//         </div>
//       </div>
//     );
  


// export default Register;



import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import RegisterStepper from "./RegisterStepper";
import { USER_API_ENDPOINT } from "../../../utils/data";
import { toast } from "sonner";
import axios from "axios";

const Register = () => {
  const [role, setRole] = useState("candidate");
  const [numLanguages, setNumLanguages] = useState(0);
  const [languages, setLanguages] = useState([]);

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "candidate",
    profile_photo: "",
    educational_qualification: "",
    reader: false,
    writer: false,
    online: false,
    offline: false,
    written: false,
    mcq: false,
    numLanguages: "0",
    languages: "",
    state: "",
    city: "",
    audio_sample_url: "",
    writing_sample_url: "",
  });

  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [audioSampleFile, setAudioSampleFile] = useState(null);
  const [writingSampleFile, setWritingSampleFile] = useState(null);

  const navigate = useNavigate();

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
    { value: "Other", label: "Other" },
  ];

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      toast.error("Only image files are allowed!");
      return;
    }
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }
    setProfilePhotoFile(file);
  };

  const checkboxHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.checked });
  };

  const validateForm = () => {
    if (!input.name.trim()) return "Full name is required";
    if (!input.email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) return "Invalid email format";

    if (!input.phone.trim()) return "Phone number is required";
    if (!/^\d{10}$/.test(input.phone)) return "Phone number must be 10 digits";

    if (!input.password) return "Password is required";
    if (input.password.length < 8) return "Password must be at least 8 characters";

    if (role === "candidate" || role === "scribe") {
      if (!input.educational_qualification) return "Educational qualification is required";
    }

    if (role === "scribe") {
      if (!input.state.trim()) return "State is required";
      if (!input.city.trim()) return "City is required";

      if (numLanguages > 0) {
        for (let i = 0; i < numLanguages; i++) {
          if (!languages[i]) return `Please select Language ${i + 1}`;
        }
      }
    }

    return null;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submit triggered - Role:", role);

    const errorMsg = validateForm();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    const formData = new FormData();
    
    // Append all basic fields
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("password", input.password);
    formData.append("role", role);
    formData.append("educational_qualification", input.educational_qualification);

    // Append scribe-specific fields only if role is scribe
    if (role === "scribe") {
      formData.append("reader", input.reader);
      formData.append("writer", input.writer);
      formData.append("online", input.online);
      formData.append("offline", input.offline);
      formData.append("written", input.written);
      formData.append("mcq", input.mcq);
      formData.append("state", input.state);
      formData.append("city", input.city);
      formData.append("numLanguages", numLanguages);
      formData.append("languages", JSON.stringify(languages.map((lang) => lang?.value)));
      
      // Append audio and writing sample files for scribe
      if (audioSampleFile) {
        formData.append("audio_sample", audioSampleFile);
      }
      if (writingSampleFile) {
        formData.append("writing_sample", writingSampleFile);
      }
    }

    // Append profile photo for all roles
    if (profilePhotoFile) {
      formData.append("profile_photo", profilePhotoFile);
    }

    console.log("Submitting registration form for role:", role);

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred";
      toast.error(errorMessage);
    }
  }; // ← This was missing - closing the submitHandler function

  // This is the component return - it was incorrectly inside submitHandler
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-1/2 shadow-lg rounded-xl border border-gray-500 p-8 space-y-5 my-10"
        >
          <h1 className="font-bold text-2xl mb-5 text-center text-blue-600">
            Register
          </h1>

          {/* Role */}
          <div>
            <Label htmlFor="role">Role</Label>
            <RadioGroup
              value={role}
              onValueChange={setRole}
              name="role"
              className="items-center gap-4 mt-4"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="candidate" id="candidate" />
                <Label htmlFor="candidate">Candidate</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="scribe" id="scribe" />
                <Label htmlFor="scribe">Scribe</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="ngo" id="ngo" />
                <Label htmlFor="ngo">NGO</Label>
              </div>
            </RadioGroup>
          </div>

          {/* If NGO → Stepper */}
          {role === "ngo" ? (
            <RegisterStepper />
          ) : (
            <>
              {/* Common Fields */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={input.name}
                  name="name"
                  onChange={changeEventHandler}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Mobile no.</Label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="9876543210"
                  value={input.phone}
                  onChange={changeEventHandler}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Candidate Specific */}
              {role === "candidate" && (
                <div>
                  <Label htmlFor="educational_qualification">
                    Highest Degree
                  </Label>
                  <select
                    id="educational_qualification"
                    name="educational_qualification"
                    value={input.educational_qualification}
                    onChange={changeEventHandler}
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
              )}

              {/* Scribe Specific */}
              {role === "scribe" && (
                <>
                  <div>
                    <Label>State</Label>
                    <Input
                      type="text"
                      name="state"
                      value={input.state}
                      onChange={changeEventHandler}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input
                      type="text"
                      name="city"
                      value={input.city}
                      onChange={changeEventHandler}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Highest Degree</Label>
                    <select
                      id="educational_qualification"
                      name="educational_qualification"
                      value={input.educational_qualification}
                      onChange={changeEventHandler}
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

                  {/* Checkboxes */}
                  <div className="mt-4">
                    <Label>Exam Preferences</Label>
                    <div className="flex gap-3 mt-2">
                      <label className="flex gap-1 items-center">
                        <Input
                          type="checkbox"
                          name="reader"
                          checked={input.reader}
                          onChange={checkboxHandler}
                        />
                        Reader
                      </label>
                      <label className="flex gap-1 items-center">
                        <Input
                          type="checkbox"
                          name="writer"
                          checked={input.writer}
                          onChange={checkboxHandler}
                        />
                        Writer
                      </label>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <label className="flex gap-1 items-center">
                        <Input
                          type="checkbox"
                          name="online"
                          checked={input.online}
                          onChange={checkboxHandler}
                        />
                        Online
                      </label>
                      <label className="flex gap-1 items-center">
                        <Input
                          type="checkbox"
                          name="offline"
                          checked={input.offline}
                          onChange={checkboxHandler}
                        />
                        Offline
                      </label>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <label className="flex gap-1 items-center">
                        <Input
                          type="checkbox"
                          name="written"
                          checked={input.written}
                          onChange={checkboxHandler}
                        />
                        Written
                      </label>
                      <label className="flex gap-1 items-center">
                        <Input
                          type="checkbox"
                          name="mcq"
                          checked={input.mcq}
                          onChange={checkboxHandler}
                        />
                        MCQ
                      </label>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="my-4">
                    <Label>How many languages do you know?</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 2"
                      value={numLanguages}
                      onChange={(e) => {
                        let count = parseInt(e.target.value) || 0;
                        if (count < 0) count = 0;
                        setNumLanguages(count);
                        setLanguages(Array(count).fill(null));
                      }}
                      className="mt-2"
                    />
                  </div>
                  <div className="space-y-3">
                    {Array.from({ length: numLanguages }, (_, i) => (
                      <div key={i}>
                        <Label>Language {i + 1}</Label>
                        <Select
                          options={languageOptions}
                          value={languages[i]}
                          onChange={(selected) => {
                            const updated = [...languages];
                            updated[i] = selected;
                            setLanguages(updated);
                          }}
                          placeholder="Select language"
                          isClearable
                          className="mt-1"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Audio and Writing Samples */}
                  <div>
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
                          setAudioSampleFile(file);
                        }
                      }}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Upload an audio sample (max 10MB)
                    </p>
                  </div>

                  <div>
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
                          setWritingSampleFile(file);
                        }
                      }}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Upload a writing sample (PDF, DOC, or image, max 5MB)
                    </p>
                  </div>
                </>
              )}

              {/* File Upload */}
              <div className="flex items-center gap-2">
                <Label htmlFor="profile_photo">Profile Photo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  name="profile_photo"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>

              {/* Submit */}
              <Button className="w-full mt-4 cursor-pointer" type="submit">
                Register
              </Button>

              <p className="text-gray-500 text-md my-2">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-700">
                  Login
                </Link>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}; // ← This closes the component

export default Register;

