import React, { useState } from 'react';
import { CreditCard, User, Mail, Phone, Plane, Luggage, Coffee } from 'lucide-react';
import type { Flight, SearchParams, BaggageOption, MealOption } from '../types';
import SeatMap from './SeatMap';

interface Props {
  flight: Flight;
  searchParams: SearchParams;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const BookingForm: React.FC<Props> = ({ flight, searchParams }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedBaggage, setSelectedBaggage] = useState<number[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      }
      if (prev.length < searchParams.passengers) {
        return [...prev, seatId];
      }
      return prev;
    });
  };

  const toggleBaggage = (id: number) => {
    setSelectedBaggage(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      }
      return [...prev, id];
    });
  };

  const toggleMeal = (id: number) => {
    setSelectedMeals(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      }
      return [...prev, id];
    });
  };

  const calculateTotal = () => {
    const basePrice = flight.price * searchParams.passengers;
    const baggagePrice = selectedBaggage.reduce((sum, id) => {
      const option = flight.baggageOptions.find(b => b.id === id);
      return sum + (option?.price || 0);
    }, 0);
    const mealsPrice = selectedMeals.reduce((sum, id) => {
      const option = flight.mealOptions.find(m => m.id === id);
      return sum + (option?.price || 0);
    }, 0);
    return basePrice + baggagePrice + mealsPrice;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeats.length !== searchParams.passengers) {
      alert('Please select seats for all passengers');
      return;
    }
    alert('Booking successful! Check your email for confirmation.');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 p-4 bg-indigo-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-4">Flight Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Flight</span>
              <span>{flight.airline} {flight.flightNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Aircraft</span>
              <span>{flight.aircraft}</span>
            </div>
            <div className="flex justify-between">
              <span>Route</span>
              <span>{searchParams.from} → {searchParams.to}</span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span>{searchParams.date}</span>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Passengers</span>
              <span>{searchParams.passengers}</span>
            </div>
            <div className="flex justify-between">
              <span>Class</span>
              <span className="capitalize">{searchParams.class}</span>
            </div>
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>${flight.price} per passenger</span>
            </div>
            <div className="flex justify-between font-medium text-gray-900">
              <span>Total Price</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Select Seats</h3>
          <p className="text-sm text-gray-500">
            Please select {searchParams.passengers} seat(s). Selected: {selectedSeats.length}
          </p>
          <SeatMap
            seats={flight.availableSeats}
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelect}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Baggage Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flight.baggageOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleBaggage(option.id)}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  selectedBaggage.includes(option.id)
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Luggage className="h-5 w-5 text-gray-400" />
                  <div className="text-left">
                    <div className="font-medium">{option.weight}kg Checked Baggage</div>
                    <div className="text-sm text-gray-500">Additional baggage allowance</div>
                  </div>
                </div>
                <div className="font-medium">${option.price}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Meal Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flight.mealOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleMeal(option.id)}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  selectedMeals.includes(option.id)
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Coffee className="h-5 w-5 text-gray-400" />
                  <div className="text-left">
                    <div className="font-medium">{option.name}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {option.dietaryType.map(type => (
                        <span key={type} className="capitalize mr-2">{type}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="font-medium">${option.price}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Passenger Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Payment Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                className="w-full rounded-md border border-gray-300 py-2.5 px-3 focus:outline -none focus:ring-2 focus:ring-indigo-500"
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Complete Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;