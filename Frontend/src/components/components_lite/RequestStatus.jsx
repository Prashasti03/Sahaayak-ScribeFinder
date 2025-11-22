import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, Clock, MapPin, BookOpen, Loader2 } from "lucide-react";
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { toast } from 'sonner';

const RequestStatus = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidateRequests();
  }, []);

  const fetchCandidateRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/exam/candidate/requests', {
        withCredentials: true
      });

      if (response.data.success) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "bg-yellow-100 text-yellow-800", label: "Pending" },
      accepted: { class: "bg-green-100 text-green-800", label: "Accepted" },
      rejected: { class: "bg-red-100 text-red-800", label: "Rejected" }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Request Status</h1>
          <p className="text-gray-600 mt-2">Track your scribe requests</p>
        </div>

        {requests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Requests Yet</h3>
              <p className="text-gray-600 mb-4">You haven't made any scribe requests yet.</p>
              <Button onClick={() => window.location.href = '/Candidates'}>
                Browse Scribes
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {requests.map((request) => (
              <Card key={request._id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        Request for {request.scribe?.name}
                        {getStatusBadge(request.status)}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        Scribe Email: {request.scribe?.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Requested on {formatDate(request.createdAt)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Exam Information</h4>
                      
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{request.examInfo.examinationName}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{formatDate(request.examInfo.date)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{request.examInfo.reportingTime}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{request.examInfo.examLocation}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Preferences</h4>
                      
                      <div className="flex flex-wrap gap-1">
                        {request.examInfo.type.map((type, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-800 border"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {request.examInfo.need.map((need, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-800 border"
                          >
                            {need}
                          </span>
                        ))}
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Language: </span>
                        <span className="text-sm">{request.examInfo.language}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default RequestStatus;