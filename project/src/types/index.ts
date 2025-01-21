export interface Flight {
  id: number;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: string;
  availableSeats: Seat[];
  aircraft: string;
  baggageOptions: BaggageOption[];
  mealOptions: MealOption[];
}

export interface Seat {
  id: string;
  row: number;
  column: string;
  type: 'economy' | 'business' | 'first';
  price: number;
  available: boolean;
}

export interface BaggageOption {
  id: number;
  weight: number;
  price: number;
}

export interface MealOption {
  id: number;
  name: string;
  description: string;
  price: number;
  dietaryType: string[];
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
  passengers: number;
  class: 'economy' | 'business' | 'first';
}