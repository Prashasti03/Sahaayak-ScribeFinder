import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
import {Button} from '../ui/button';
import {Avatar, AvatarImage} from '../ui/avatar';
import {CircleUserRound, CircleUser, History, LogOut, User2} from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = false;
  return (
    <div>    
        <div className='flex h-16 px-5'>
            <div className='flex items-center gap-8'>   {/*This div is for left part of the navbar */}
            <h1 className='text-2xl font-bold'>
            <span className='text-[#022bf8]'>Sahaayak</span>
            </h1> 
            <ul  className='flex font-medium items-center gap-6 cursor-pointer'>
                <Link to={"/"}>Home</Link>
                <Link to={"/Candidates"}>Candidate</Link>
                <Link to={"/Scribes"}>Scribe</Link>
                <Link to={"/ngos"}>NGO</Link>
                <li>General Instructions</li>
                <li>About Us</li>
            </ul>   
        </div> 
        <div className='px-5 ml-auto'>   {/*This div is for right part*/}
          {
            !user ? (
              <div className='flex items-center gap-2 cursor-pointer h-16'>
                <Link to={"/login"}>
                  <Button className='cursor-pointer bg-white text-black hover:bg-gray-200 border border-black'>Login</Button>
                </Link>
                <Link to={"/register"}>
                  <Button className='bg-blue-600 hover:bg-blue-700 cursor-pointer'>Register</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="items-center cursor-pointer mt-5 h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  </Avatar>
                  {/* <CircleUserRound className='h-16 w-9 cursor-pointer'></CircleUserRound> */}
                </PopoverTrigger>
              <PopoverContent className='w-35'>
                {/* <div className='flex items-center gap-4 space-y-2'>
                  <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                </Avatar>
                <div>
                  <h3 className='font-medium'>Prashasti Dhanorkar</h3>
                  <p className='text-sm text-muted-foreground'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>
                </div> */}
                  <div className='flex flex-col my-2 text-gray-600'>
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <User2></User2>
                      <Button variant="link">Profile</Button>
                    </div>
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <History></History>
                      <Button variant="link">History</Button>
                    </div>
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <LogOut></LogOut>
                      <Button variant="link">Logout</Button>
                    </div>                                    
                  </div>                
                </PopoverContent>
              </Popover>
              )
            }
            </div>
          </div> 
        </div>
  )
}

export default Navbar
