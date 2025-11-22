import React from 'react';
import { Card, CardContent } from "../ui/card";
import Navbar from './Navbar';
import Footer from './Footer';

const History = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">History</h1>
          <p className="text-gray-600 mt-2">Your activity history</p>
        </div>

        <Card>
          <CardContent className="py-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No History Yet</h3>
            <p className="text-gray-600">Your activity history will appear here.</p>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default History;