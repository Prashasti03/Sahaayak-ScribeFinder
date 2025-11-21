import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Select from "react-select";
import { USER_API_ENDPOINT } from "../../../utils/data.js";
import { toast } from "sonner";
import axios from "axios";

const Login = () => {
  const [role, setRole] = useState("");

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "candidate",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value) => {
    setInput({ ...input, role: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }); // import USER_API_ENDPOINT from @/utils/data

      if (res.data.success) {
        toast.success(res.data.message);

        // Redirect based on role
        switch (input.role) {
          case 'candidate':
            navigate('/Candidates');
            break;
          case 'scribe':
            navigate('/Scribes');
            break;
          case 'ngo':
            navigate('/Ngos');
            break;
          default:
            navigate('/');
        }
      }
      // download sonner from shadcn ui, bcz it contains toaster which we hv to use in main.jsx
    } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occured";
      toast.error(errorMessage);
    }
  };

//   return (
//     <div>
//       <Navbar></Navbar>
//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={submitHandler}
//           className="w-full sm:w-1/2 shadow-lg rounded-xl border border-gray-500 rounded-md p-8 space-y-5 my-10"
//         >
//           <h1 className="font-bold text-2xl mb-5 text-center text-blue-600">
//             Login
//           </h1>

//           <div className="items-center justify-between">
//             <Label>Role</Label>
//             <RadioGroup
//               value={input.role}
//               onValueChange={(value) => setInput({ ...input, role: value })}
//               name="role"
//               className="items-center gap-4 mt-4"
//             >
//               <div className="flex items-center gap-3">
//                 <RadioGroupItem
//                   value="candidate"
//                   id="candidate"
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="candidate">Candidate</Label>
//               </div>
//               <div className="flex items-center gap-2">
//                 <RadioGroupItem
//                   value="scribe"
//                   id="scribe"
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="scribe">Scribe</Label>
//               </div>
//               <div className="flex items-center gap-2">
//                 <RadioGroupItem
//                   value="ngo"
//                   id="ngo"
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="ngo">NGO</Label>
//               </div>
//             </RadioGroup>
//           </div>

//           <div className="my-2">
//             <Label>Email</Label>
//             <Input
//               type="email"
//               placeholder="johndoe@gmail.com"
//               value={input.email}
//               name="email"
//               onChange={changeEventHandler}
//               className="mt-2"
//             ></Input>
//           </div>

//           <div className="my-2">
//             <Label>Password</Label>
//             <Input
//               type="password"
//               placeholder="***********"
//               value={input.password}
//               name="password"
//               onChange={changeEventHandler}
//               className="mt-2"
//             ></Input>
//             <p className="text-xs text-gray-500 mt-1">
//               Must be at least 8 characters
//             </p>
//           </div>

//           {/* <Button className='cursor-pointer'>Register</Button> */}
//           <Button className="w-full mt-4" type="submit">
//             Login
//           </Button>

//           {/* Already have an account then login */}
//           <p className="text-gray-500 text-md my-2">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-blue-700">
//               Register
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-full sm:w-1/2 shadow-lg rounded-xl border border-gray-500 p-8 space-y-5 my-10'>
          <h1 className='font-bold text-2xl mb-5 text-center text-blue-600'>Login</h1>

          <div className='items-center justify-between'>
            <Label>Role</Label>
            <RadioGroup
              value={input.role}
              onValueChange={handleRoleChange}
              name="role"
              className='items-center gap-4 mt-4'
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="candidate" id="candidate" className='cursor-pointer' />
                <Label htmlFor="candidate" className='cursor-pointer'>Candidate</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="scribe" id="scribe" className='cursor-pointer' />
                <Label htmlFor="scribe" className='cursor-pointer'>Scribe</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="ngo" id="ngo" className='cursor-pointer' />
                <Label htmlFor="ngo" className='cursor-pointer'>NGO</Label>
              </div>
            </RadioGroup>
          </div>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="johndoe@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className='mt-2'
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="***********"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className='mt-2'
            />
          </div>

          <Button className="w-full mt-4" type="submit">
            Login
          </Button>

          <p className='text-gray-500 text-md my-2 text-center'>
            Don't have an account? <Link to='/register' className='text-blue-700 hover:underline'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login;
