import { useEffect, useState } from 'react';
import { Bed, Users, UserPlus, X } from 'lucide-react';
import { AccommodationOption, User } from '../types';

interface AccommodationStepProps {
  accommodationOptions: AccommodationOption[];
  users: User[];
  hasAcceptedInvitation?: boolean;
  invitationFromUser?: User;
  onSelect: (accommodation: { optionId: string; guestIds: string[] }) => void;
  onBack: () => void;
}

export const AccommodationStep: React.FC<AccommodationStepProps> = ({
  accommodationOptions,
  users,
  hasAcceptedInvitation = false,
  invitationFromUser,
  onSelect,
  onBack
}) => {
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

  // Если принято приглашение, автоматически выбираем размещение и добавляем пригласившего как соседа
  useEffect(() => {
    if (hasAcceptedInvitation && accommodationOptions.length > 0) {
      const invitationAccommodation = accommodationOptions[0]; // Предполагаем, что это правильное размещение
      setSelectedOption(invitationAccommodation.id);
      if (invitationFromUser) {
        setSelectedGuests([invitationFromUser.id]);
      }
    }
  }, [hasAcceptedInvitation, accommodationOptions, invitationFromUser]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {hasAcceptedInvitation ? 'Ваше размещение' : 'Выберите размещение'}
      </h2>

      {hasAcceptedInvitation && (
        <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl mb-6">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm">✓</span>
            </div>
            <p className="text-green-800 font-semibold">
              Вы приняли приглашение от {invitationFromUser?.name}
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {accommodationOptions.map((option) => (
          <div
            key={option.id}
            className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-200 ${selectedOption === option.id ? 'ring-4 ring-blue-500 scale-105' : 'hover:shadow-xl'
              } ${hasAcceptedInvitation ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => !hasAcceptedInvitation && setSelectedOption(option.id)}
          >
            <Bed className={`w-12 h-12 mx-auto mb-4 ${selectedOption === option.id ? 'text-blue-500' : 'text-gray-400'
              }`}
            />
            <h3 className="text-xl font-semibold text-center mb-2">{option.name}</h3>
            <p className="text-gray-600 text-center mb-4">{option.description}</p>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              До {option.maxGuests} человек
            </div>
            {hasAcceptedInvitation && selectedOption === option.id && (
              <div className="mt-3 text-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Выбрано
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedOption && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center">
              <UserPlus className="w-6 h-6 mr-2 text-blue-500" />
              {hasAcceptedInvitation ? 'Соседи по комнате' : 'Пригласить соседей по комнате'}
            </h3>
            {!hasAcceptedInvitation && (
              <button
                onClick={() => setShowGuestSelector(!showGuestSelector)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                {showGuestSelector ? 'Скрыть' : 'Пригласить'}
              </button>
            )}
          </div>

          {selectedGuests.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">
                {hasAcceptedInvitation ? 'Соседи' : 'Приглашенные'} ({selectedGuests.length}):
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedGuests.map(guestId => {
                  const guest = users.find(u => u.id === guestId);
                  return (
                    <div key={guestId} className={`px-3 py-1 rounded-full text-sm flex items-center ${hasAcceptedInvitation ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                      {guest?.name}
                      {!hasAcceptedInvitation && (
                        <button
                          onClick={() => handleGuestToggle(guestId)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {showGuestSelector && !hasAcceptedInvitation && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-3">
                Можете пригласить еще {(selectedAccommodation?.maxGuests || 1) - 1 - selectedGuests.length} человек
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                {availableGuests.map(user => (
                  <div
                    key={user.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedGuests.includes(user.id)
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