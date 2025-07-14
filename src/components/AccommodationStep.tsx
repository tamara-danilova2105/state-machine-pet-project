import { useState } from 'react';
import { Bed, Users, UserPlus, X } from 'lucide-react';
import { AccommodationOption, User } from '../types';

interface AccommodationStepProps {
  accommodationOptions: AccommodationOption[];
  users: User[];
  onSelect: (accommodation: { optionId: string; guestIds: string[] }) => void;
  onBack: () => void;
}

export const AccommodationStep = ({ 
  accommodationOptions, 
  users, 
  onSelect, 
  onBack 
}: AccommodationStepProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [showGuestSelector, setShowGuestSelector] = useState(false);

  const selectedAccommodation = accommodationOptions.find(opt => opt.id === selectedOption);
  const availableGuests = users.filter(user => !selectedGuests.includes(user.id));

  const handleGuestToggle = (userId: string) => {
    if (selectedGuests.includes(userId)) {
      setSelectedGuests(selectedGuests.filter(id => id !== userId));
    } else if (selectedGuests.length < (selectedAccommodation?.maxGuests || 1) - 1) {
      setSelectedGuests([...selectedGuests, userId]);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onSelect({ optionId: selectedOption, guestIds: selectedGuests });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Выберите размещение</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {accommodationOptions.map((option) => (
          <div
            key={option.id}
            className={`bg-white p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-200 ${
              selectedOption === option.id ? 'ring-4 ring-blue-500 scale-105' : 'hover:shadow-xl'
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <Bed className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">{option.name}</h3>
            <p className="text-gray-600 text-center mb-4">{option.description}</p>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              До {option.maxGuests} человек
            </div>
          </div>
        ))}
      </div>

      {selectedOption && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center">
              <UserPlus className="w-6 h-6 mr-2 text-blue-500" />
              Пригласить соседей по комнате
            </h3>
            <button
              onClick={() => setShowGuestSelector(!showGuestSelector)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              {showGuestSelector ? 'Скрыть' : 'Пригласить'}
            </button>
          </div>

          {selectedGuests.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Приглашенные ({selectedGuests.length}):</h4>
              <div className="flex flex-wrap gap-2">
                {selectedGuests.map(guestId => {
                  const guest = users.find(u => u.id === guestId);
                  return (
                    <div key={guestId} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                      {guest?.name}
                      <button
                        onClick={() => handleGuestToggle(guestId)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {showGuestSelector && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-3">
                Можете пригласить еще {(selectedAccommodation?.maxGuests || 1) - 1 - selectedGuests.length} человек
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                {availableGuests.map(user => (
                  <div
                    key={user.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedGuests.includes(user.id)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleGuestToggle(user.id)}
                  >
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.department} • {user.position}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
        >
          Назад
        </button>
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};