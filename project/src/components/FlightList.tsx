import React from 'react';
import { Plane, Luggage, Coffee } from 'lucide-react';
import type { Flight, SearchParams } from '../types';

const MOCK_FLIGHTS: Flight[] = [
  {
    id: 1,
    airline: 'SkyWings',
    flightNumber: 'SW123',
    departureTime: '08:00',
    arrivalTime: '10:30',
    price: 299,
    duration: '2h 30m',
    aircraft: 'Boeing 737-800',
    availableSeats: Array.from({ length: 30 }, (_, i) => ({
      id: `${i + 1}A`,
      row: i + 1,
      column: 'A',
      type: 'economy',
      price: 0,
      available: true
    })),
    baggageOptions: [
      { id: 1, weight: 20, price: 30 },
      { id: 2, weight: 30, price: 50 }
    ],
    mealOptions: [
      { id: 1, name: 'Chicken Pasta', description: 'Served with salad', price: 15, dietaryType: ['halal'] },
      { id: 2, name: 'Vegetarian Curry', description: 'Served with rice', price: 15, dietaryType: ['vegetarian', 'vegan'] }
    ]
  },
  {
    id: 2,
    airline: 'AirSpeed',
    flightNumber: 'AS456',
    departureTime: '11:15',
    arrivalTime: '13:45',
    price: 349,
    duration: '2h 30m',
    aircraft: 'Airbus A320',
    availableSeats: Array.from({ length: 30 }, (_, i) => ({
      id: `${i + 1}A`,
      row: i + 1,
      column: 'A',
      type: 'economy',
      price: 0,
      available: true
    })),
    baggageOptions: [
      { id: 1, weight: 20, price: 30 },
      { id: 2, weight: 30, price: 50 }
    ],
    mealOptions: [
      { id: 1, name: 'Beef Steak', description: 'Served with potatoes', price: 18, dietaryType: ['halal'] },
      { id: 2, name: 'Mediterranean Plate', description: 'Hummus and falafel', price: 15, dietaryType: ['vegetarian', 'vegan'] }
    ]
  }
];

interface Props {
  searchParams: SearchParams;
  onSelect: (flight: Flight) => void;
}

const FlightList: React.FC<Props> = ({ searchParams, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{searchParams.from}</span>
              <span className="mx-2">→</span>
              <span className="font-medium">{searchParams.to}</span>
            </div>
            <div className="text-sm text-gray-600">
              <span>{searchParams.date}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span>{searchParams.passengers} passenger(s)</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="capitalize">{searchParams.class} Class</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_FLIGHTS.map((flight) => (
          <div
            key={flight.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Plane className="h-5 w-5 text-indigo-600" />
                    <span className="font-medium text-gray-900">{flight.airline}</span>
                    <span className="text-sm text-gray-500">({flight.flightNumber})</span>
                  </div>
                  <div className="text-sm text-gray-500">{flight.aircraft}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">${flight.price}</div>
                  <div className="text-sm text-gray-500">per passenger</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-2xl font-bold">{flight.departureTime}</div>
                  <div className="text-sm text-gray-500">{searchParams.from}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-px bg-gray-300"></div>
                  <div className="text-sm text-gray-500 mt-1">{flight.duration}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{flight.arrivalTime}</div>
                  <div className="text-sm text-gray-500">{searchParams.to}</div>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Luggage className="h-4 w-4" />
                  <span>{flight.baggageOptions.length} baggage options</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Coffee className="h-4 w-4" />
                  <span>{flight.mealOptions.length} meal options</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => onSelect(flight)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;