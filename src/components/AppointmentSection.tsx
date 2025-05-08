
import React from 'react';
import { Calendar, MapPin, Search, User, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const AppointmentSection = () => {
  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Schedule Your Appointment Online
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 appointment-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  type="text" 
                  placeholder="Search for Doctor" 
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  type="text" 
                  placeholder="Choose Location" 
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <Button className="bg-primary hover:bg-primary-dark text-white w-full">
                  Book an Appointment
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              <Card className="border border-gray-200 text-center specialty-icon hover:border-primary">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Find a Doctor</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 text-center specialty-icon hover:border-primary">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Book a Test</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 text-center specialty-icon hover:border-primary">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Teleconsult</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 text-center specialty-icon hover:border-primary">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Locate Hospital</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 text-center specialty-icon hover:border-primary">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Health Check</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
