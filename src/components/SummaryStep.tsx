import { CheckCircle, Bus, Car, Bed, Trophy } from 'lucide-react';
import { RegistrationData, TransferSlot, AccommodationOption, Activity, User } from '../types';

interface SummaryStepProps {
  data: RegistrationData;
  transferSlots: TransferSlot[];
  accommodationOptions: AccommodationOption[];
  activities: Activity[];
  users: User[];
  onComplete: () => void;
  onBack: () => void;
}

export const SummaryStep = ({
  data,
  transferSlots,
  accommodationOptions,
  activities,
  users,
  onComplete,
  onBack
}: SummaryStepProps) => {
  const selectedTransferSlot = data.transfer?.slotId ? 
    transferSlots.find(slot => slot.id === data.transfer.slotId) : null;
  
  const selectedAccommodation = data.accommodation ?
    accommodationOptions.find(opt => opt.id === data.accommodation.optionId) : null;
  
  const selectedActivities = activities.filter(activity => 
    data.activities.includes(activity.id)
  );

  const invitedGuests = data.accommodation?.guestIds.map(guestId => 
    users.find(user => user.id === guestId)
  ).filter(Boolean) || [];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Подтверждение регистрации</h2>
      
      <div className="space-y-6">
        {/* Трансфер */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            {data.transfer?.type === 'organized' ? (
              <Bus className="w-6 h-6 mr-2 text-green-500" />
            ) : (
              <Car className="w-6 h-6 mr-2 text-blue-500" />
            )}
            Трансфер
          </h3>
          <div className="text-gray-700">
            {data.transfer?.type === 'organized' ? (
              <div>
                <p className="font-semibold">Организованный трансфер</p>
                <p>Время отправления: {selectedTransferSlot?.time}</p>
              </div>
            ) : (
              <p>Самостоятельно</p>
            )}
          </div>
        </div>

        {/* Размещение */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Bed className="w-6 h-6 mr-2 text-blue-500" />
            Размещение
          </h3>
          <div className="text-gray-700">
            <p className="font-semibold">{selectedAccommodation?.name}</p>
            <p className="text-sm text-gray-600 mb-3">{selectedAccommodation?.description}</p>
            
            {invitedGuests.length > 0 && (
              <div>
                <p className="font-semibold mb-2">Приглашенные соседи:</p>
                <div className="flex flex-wrap gap-2">
                  {invitedGuests.map(guest => (
                    <div key={guest?.id} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {guest?.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Активности */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-orange-500" />
            Активности
          </h3>
          <div className="text-gray-700">
            {selectedActivities.length > 0 ? (
              <div className="space-y-2">
                {selectedActivities.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{activity.name}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Активности не выбраны</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
        <div className="flex items-center mb-3">
          <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-green-800">Готово к отправке!</h3>
        </div>
        <p className="text-green-700">
          Пожалуйста, проверьте все данные и подтвердите регистрацию. 
          После подтверждения вы получите письмо с деталями мероприятия.
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
        >
          Назад
        </button>
        <button
          onClick={onComplete}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg transform hover:scale-105"
        >
          Подтвердить регистрацию
        </button>
      </div>
    </div>
  );
};