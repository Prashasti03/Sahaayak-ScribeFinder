import React, { useState } from 'react'
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Search } from "lucide-react";
import Navbar from './Navbar';
import Footer from './Footer';

const Candidates = () => {
    // const [date, setDate] = useState(new Date());

  const scribes = [
    { id: 1, name: "John Doe", location: "Mumbai", education: "BA", type: "Reader" },
    { id: 2, name: "Amit Sharma", location: "Pune", education: "BCom", type: "Writer" },
    { id: 3, name: "Sara Khan", location: "Delhi", education: "MA", type: "Reader" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar></Navbar>
        {/* Header */}
      <header className="text-center bg-blue-600 text-white p-4 text-xl font-bold">
        Candidate Dashboard
      </header>

      <div className="flex flex-1">
        {/* Sidebar Filter */}
        <aside className="w-64 bg-white shadow p-4 space-y-4">
          <h2 className="font-semibold text-lg">Filter</h2>

          <div>
            <Label>City</Label>
            <select id="city"
                name="city"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" >
                <option value="">Select City</option>
                <option value="pune">Pune</option>
                <option value="Delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="nagpur">Nagpur</option>
                <option value="bengaluru">Bengaluru</option>
            </select>
          </div>

          <div>
            <Label>Highest Degree</Label>
            <select id="degree"
                name="degree"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" >
                <option value="">Select Degree</option>
                <option value="Below 10th">Below 10th / Below Matriculation</option>
                <option value="10th">10th / Matriculation</option>
                <option value="12th">12th / Intermediate</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelors">Bachelor’s / Under-Graduate</option>
                <option value="Masters">Master’s / Post-Graduate</option>
                <option value="PhD">PhD / Doctorate</option>
            </select>
          </div>

          <div>
            <Label>Language</Label>
            <select id="language"
                name="language"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" >
                <option value="">Select Language</option>
                <option value="english">Engilsh</option>
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
                <option value="tamil">Tamil</option>
                <option value="telugu">Telugu</option>
                <option value="kannada">Kannada</option>
                <option value="gujarati">Gujarati</option>
                <option value="bengali">Bengali</option>
                <option value="urdu">Urdu</option>
                <option value="punjabi">Punjabi</option>
                <option value="malayalam">Malayalam</option>
                <option value="other">Other</option>
            </select>
          </div>

          <div>
            <Label>Type</Label>
            <select id="type"
                name="type"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" >
                <option value="">Select Type</option>
                <option value="reader">Reader</option>
                <option value="writer">Writer</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="mcq">MCQ</option>
                <option value="written">Written</option>
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Exam Information */}
          <section className="bg-white shadow rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-lg border-b pb-2">Exam Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Examination Name</Label>
                <Input placeholder="Enter exam name" className="mt-2" />
              </div>

              <div>
                <Label>Type</Label>
                <div className="flex gap-2 mt-1">
                  <label><input id="online" type="checkbox" name="type" /> Online</label>
                  <label><input id="offline" type="checkbox" name="type" /> Offline</label>
                  <label><input id="written" type="checkbox" name="type" /> Written</label>
                  <label><input id="mcq" type="checkbox" name="type" /> MCQ</label>
                </div>
              </div>

              <div>
                <Label>Need</Label>
                <div className="flex gap-2 mt-1">
                  <label><input id="reader" type="checkbox" name="need" /> Reader</label>
                  <label><input id="writer" type="checkbox" name="need" /> Writer</label>
                </div>
              </div>

              <div>
                <Label>Language</Label>
                <Input placeholder="Exam language" className="mt-2" />
              </div>

              <div>
                <Label>Day and Date</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input type="date" />
                  <Calendar className="h-5 w-5 text-gray-500" />
                </div>
              </div>

              <div>
                <Label>Reporting Time</Label>
                <Input type="time" className="mt-2" />
              </div>

              <div className="col-span-2">
                <Label>Exam Location</Label>
                <Input placeholder="Enter exam center" className="mt-2"/>
              </div>
            </div>
          </section>

          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <Input placeholder="Search by Location, Education, Type..." />
            <Button><Search className="w-4 h-4 mr-1" /> Search</Button>
          </div>

          {/* Available Scribes */}
          <section>
            <h2 className="font-semibold text-lg mb-4">Available Scribes</h2>
            <div className="grid grid-cols-3 gap-4">
              {scribes.map((scribe) => (
                <Card key={scribe.id} className="rounded-2xl shadow">
                  <CardContent className="p-4 text-center space-y-2">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto"></div>
                    <p className="font-semibold">{scribe.name}</p>
                    <p className="text-sm text-gray-600">{scribe.location}</p>
                    <p className="text-sm">Education: {scribe.education}</p>
                    <p className="text-sm">Type: {scribe.type}</p>
                    <div className="flex justify-center gap-2 mt-3">
                      <Button size="sm">View</Button>
                      <Button size="sm" variant="secondary">Request</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer></Footer>
      
    </div>
  )
}

export default Candidates
