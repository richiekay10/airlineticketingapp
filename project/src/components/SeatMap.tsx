import React from 'react';
import type { Seat } from '../types';

interface Props {
  seats: Seat[];
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
}

const SeatMap: React.FC<Props> = ({ seats, selectedSeats, onSeatSelect }) => {
  const columns = ['A', 'B', 'C', '', 'D', 'E', 'F'];
  const rows = Math.max(...seats.map(seat => seat.row));

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="flex justify-center mb-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded border-2 border-gray-300 bg-white"></div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded border-2 border-indigo-600 bg-indigo-50"></div>
                <span className="text-sm text-gray-600">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded border-2 border-gray-300 bg-gray-100"></div>
                <span className="text-sm text-gray-600">Occupied</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Plane nose */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Column labels */}
            {columns.map((col, i) => (
              <div key={i} className="flex justify-center py-2 text-sm font-medium text-gray-500">
                {col}
              </div>
            ))}

            {/* Seats */}
            {Array.from({ length: rows }, (_, row) => (
              <React.Fragment key={row}>
                {columns.map((col, colIndex) => {
                  if (col === '') {
                    return <div key={`aisle-${row}-${colIndex}`} className="flex justify-center items-center">
                      <span className="text-sm text-gray-500">{row + 1}</span>
                    </div>;
                  }

                  const seat = seats.find(s => s.row === row + 1 && s.column === col);
                  if (!seat) return <div key={`empty-${row}-${colIndex}`} />;

                  const isSelected = selectedSeats.includes(seat.id);
                  const isAvailable = seat.available;

                  return (
                    <button
                      key={seat.id}
                      onClick={() => isAvailable && onSeatSelect(seat.id)}
                      disabled={!isAvailable}
                      className={`
                        w-full aspect-square rounded border-2 transition-colors
                        ${isSelected
                          ? 'border-indigo-600 bg-indigo-50'
                          : isAvailable
                            ? 'border-gray-300 bg-white hover:border-indigo-600 hover:bg-indigo-50'
                            : 'border-gray-300 bg-gray-100 cursor-not-allowed'
                        }
                      `}
                    >
                      <span className="text-sm">{seat.id}</span>
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;