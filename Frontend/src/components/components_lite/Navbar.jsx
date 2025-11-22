// import React from 'react';
// import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
// import {Button} from '../ui/button';
// import {Avatar, AvatarImage} from '../ui/avatar';
// import {CircleUserRound, CircleUser, History, LogOut, User2} from "lucide-react";
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const user = false;
//   return (
//     <div>    
//         <div className='flex h-16 px-5'>
//             <div className='flex items-center gap-8'>   {/*This div is for left part of the navbar */}
//             <h1 className='text-2xl font-bold'>
//             <span className='text-[#022bf8]'>Sahaayak</span>
//             </h1> 
//             <ul  className='flex font-medium items-center gap-6 cursor-pointer'>
//                 <Link to={"/"}>Home</Link>
//                 <Link to={"/Candidates"}>Candidate</Link>
//                 <Link to={"/Scribes"}>Scribe</Link>
//                 <Link to={"/ngos"}>NGO</Link>
//                 <li>General Instructions</li>
//                 <li>About Us</li>
//             </ul>   
//         </div> 
//         <div className='px-5 ml-auto'>   {/*This div is for right part*/}
//           {
//             !user ? (
//               <div className='flex items-center gap-2 cursor-pointer h-16'>
//                 <Link to={"/login"}>
//                   <Button className='cursor-pointer bg-white text-black hover:bg-gray-200 border border-black'>Login</Button>
//                 </Link>
//                 <Link to={"/register"}>
//                   <Button className='bg-blue-600 hover:bg-blue-700 cursor-pointer'>Register</Button>
//                 </Link>
//               </div>
//             ) : (
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Avatar className="items-center cursor-pointer mt-5 h-10 w-10">
//                     <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//                   </Avatar>
//                   {/* <CircleUserRound className='h-16 w-9 cursor-pointer'></CircleUserRound> */}
//                 </PopoverTrigger>
//               <PopoverContent className='w-35'>
//                 {/* <div className='flex items-center gap-4 space-y-2'>
//                   <Avatar className="cursor-pointer">
//                   <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//                 </Avatar>
//                 <div>
//                   <h3 className='font-medium'>Prashasti Dhanorkar</h3>
//                   <p className='text-sm text-muted-foreground'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
//                 </div>
//                 </div> */}
//                   <div className='flex flex-col my-2 text-gray-600'>
//                     <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                       <User2></User2>
//                       <Button variant="link">Profile</Button>
//                     </div>
//                     <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                         <History></History>
//                       <Button variant="link">History</Button>
//                     </div>
//                     <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                       <LogOut></LogOut>
//                       <Button variant="link">Logout</Button>
//                     </div>                                    
//                   </div>                
//                 </PopoverContent>
//               </Popover>
//               )
//             }
//             </div>
//           </div> 
//         </div>
//   )
// }

// export default Navbar


import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { CircleUserRound, History, LogOut, User2, Bell, FileText, MessageSquare } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/profile', {
        withCredentials: true
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        setUserRole(response.data.user.role);
      }
    } catch (error) {
      // User not logged in or token expired
      setUser(null);
      setUserRole(null);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/logout', {}, {
        withCredentials: true
      });
      
      setUser(null);
      setUserRole(null);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  return (
    <div>    
      <div className='flex h-16 px-5'>
        <div className='flex items-center gap-8'>
          <h1 className='text-2xl font-bold'>
            <span className='text-[#022bf8]'>Sahaayak</span>
          </h1> 
          <ul className='flex font-medium items-center gap-6 cursor-pointer'>
            <Link to={"/"}>Home</Link>
            <Link to={"/Candidates"}>Candidate</Link>
            <Link to={"/Scribes"}>Scribe</Link>
            <Link to={"/ngos"}>NGO</Link>
            <li>General Instructions</li>
            <li>About Us</li>
          </ul>   
        </div> 
        
        <div className='px-5 ml-auto'>
          {!user ? (
            <div className='flex items-center gap-2 cursor-pointer h-16'>
              <Link to={"/login"}>
                <Button className='cursor-pointer bg-white text-black hover:bg-gray-200 border border-black'>Login</Button>
              </Link>
              <Link to={"/register"}>
                <Button className='bg-blue-600 hover:bg-blue-700 cursor-pointer'>Register</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Notification Bell for Requests */}
              {(userRole === 'candidate' || userRole === 'scribe') && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {/* You can add a badge for notification count */}
                      {/* <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        3
                      </span> */}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">Requests</h4>
                      
                      {userRole === 'candidate' && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Your Request Status:</p>
                          <div className="space-y-1">
                            {/* You can map through actual requests here */}
                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">Scribe: Anjali</span>
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">Scribe: Piyush</span>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Accepted</span>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => navigate('/request-status')}
                          >
                            View All Requests
                          </Button>
                        </div>
                      )}
                      
                      {userRole === 'scribe' && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Incoming Requests:</p>
                          <div className="space-y-1">
                            {/* You can map through actual requests here */}
                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">Candidate: John</span>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline" className="h-6">Accept</Button>
                                <Button size="sm" variant="outline" className="h-6">Reject</Button>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => navigate('/incoming-requests')}
                          >
                            Manage All Requests
                          </Button>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}

              {/* User Avatar Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="items-center cursor-pointer h-10 w-10 border-2 border-gray-300">
                    {user.profile_photo ? (
                      <AvatarImage src={`http://localhost:5000${user.profile_photo}`} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  {/* User Info */}
                  <div className="flex items-center gap-3 pb-3 border-b">
                    <Avatar className="h-10 w-10">
                      {user.profile_photo ? (
                        <AvatarImage src={`http://localhost:5000${user.profile_photo}`} alt={user.name} />
                      ) : (
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-sm">{user.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="flex flex-col py-2 space-y-1">
                    {/* Common Items for All Roles */}
                    <Button 
                      variant="ghost" 
                      className="justify-start gap-2"
                      onClick={() => navigate('/update-profile')}
                    >
                      <User2 className="h-4 w-4" />
                      Update Profile
                    </Button>

                    <Button 
                      variant="ghost" 
                      className="justify-start gap-2"
                      onClick={() => navigate('/history')}
                    >
                      <History className="h-4 w-4" />
                      History
                    </Button>

                    {/* Role-specific Items */}
                    {userRole === 'candidate' && (
                      <Button 
                        variant="ghost" 
                        className="justify-start gap-2"
                        onClick={() => navigate('/request-status')}
                      >
                        <FileText className="h-4 w-4" />
                        Request Status
                      </Button>
                    )}

                    {userRole === 'scribe' && (
                      <Button 
                        variant="ghost" 
                        className="justify-start gap-2"
                        onClick={() => navigate('/incoming-requests')}
                      >
                        <MessageSquare className="h-4 w-4" />
                        Incoming Requests
                      </Button>
                    )}

                    {userRole === 'ngo' && (
                      <Button 
                        variant="ghost" 
                        className="justify-start gap-2"
                        onClick={() => navigate('/ngo-dashboard')}
                      >
                        <FileText className="h-4 w-4" />
                        NGO Dashboard
                      </Button>
                    )}

                    {/* Logout */}
                    <Button 
                      variant="ghost" 
                      className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div> 
    </div>
  );
};

export default Navbar;