import React, { useState } from 'react';
import { Plane, Calendar, MapPin, Search, CreditCard } from 'lucide-react';
import FlightSearch from './components/FlightSearch';
import FlightList from './components/FlightList';
import BookingForm from './components/BookingForm';
import type { Flight, SearchParams } from './types';

function App() {
  const [step, setStep] = useState(1);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: '',
    to: '',
    date: '',
    passengers: 1,
    class: 'economy'
  });
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setStep(2);
  };

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Plane className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SkyBooker</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <Search className="h-6 w-6" />
                <span className="ml-2 font-medium">Search</span>
              </div>
              <div className="h-0.5 w-16 bg-gray-200" />
              <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <Plane className="h-6 w-6" />
                <span className="ml-2 font-medium">Select Flight</span>
              </div>
              <div className="h-0.5 w-16 bg-gray-200" />
              <div className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <CreditCard className="h-6 w-6" />
                <span className="ml-2 font-medium">Book</span>
              </div>
            </div>
          </div>

          {step === 1 && <FlightSearch onSearch={handleSearch} />}
          {step === 2 && <FlightList searchParams={searchParams} onSelect={handleFlightSelect} />}
          {step === 3 && selectedFlight && <BookingForm flight={selectedFlight} searchParams={searchParams} />}
        </div>
      </main>
    </div>
  );
}

export default App;