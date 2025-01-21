import React, { useState } from 'react';
import { MapPin, Calendar, Users, Plane } from 'lucide-react';
import type { SearchParams } from '../types';

interface Props {
  onSearch: (params: SearchParams) => void;
}

const FlightSearch: React.FC<Props> = ({ onSearch }) => {
  const [formData, setFormData] = useState<SearchParams>({
    from: '',
    to: '',
    date: '',
    passengers: 1,
    class: 'economy'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.from}
              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Departure City"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Arrival City"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="number"
              min="1"
              max="9"
              value={formData.passengers}
              onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
              className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="relative md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <div className="grid grid-cols-3 gap-4">
            {(['economy', 'business', 'first'] as const).map((classType) => (
              <button
                key={classType}
                type="button"
                onClick={() => setFormData({ ...formData, class: classType })}
                className={`flex items-center justify-center space-x-2 p-3 rounded-lg border ${
                  formData.class === classType
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-gray-200 hover:border-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <Plane className="h-5 w-5" />
                <span className="capitalize">{classType}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          Search Flights
        </button>
      </div>
    </form>
  );
};

export default FlightSearch;