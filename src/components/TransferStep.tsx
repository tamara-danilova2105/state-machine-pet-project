import { useState } from 'react';
import { Bus, Car, Clock, Users } from 'lucide-react';
import { TransferSlot } from '../types';

interface TransferStepProps {
  transferSlots: TransferSlot[];
  onSelect: (transfer: { type: 'self' | 'organized'; slotId?: string }) => void;
  onBack: () => void;
}

export const TransferStep = ({ transferSlots, onSelect, onBack }: TransferStepProps) => {
  const [selectedType, setSelectedType] = useState<'self' | 'organized' | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedType === 'self') {
      onSelect({ type: 'self' });
    } else if (selectedType === 'organized' && selectedSlot) {
      onSelect({ type: 'organized', slotId: selectedSlot });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Выберите способ добраться</h2>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div 
          className={`bg-white p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-200 ${
            selectedType === 'self' ? 'ring-4 ring-blue-500 scale-105' : 'hover:shadow-xl'
          }`}
          onClick={() => setSelectedType('self')}
        >
          <Car className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-center mb-2">Самостоятельно</h3>
          <p className="text-gray-600 text-center">Добираюсь своим транспортом</p>
        </div>
        
        <div 
          className={`bg-white p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-200 ${
            selectedType === 'organized' ? 'ring-4 ring-green-500 scale-105' : 'hover:shadow-xl'
          }`}
          onClick={() => setSelectedType('organized')}
        >
          <Bus className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-center mb-2">Организованный трансфер</h3>
          <p className="text-gray-600 text-center">Поездка на комфортабельном автобусе</p>
        </div>
      </div>

      {selectedType === 'organized' && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-blue-500" />
            Выберите время отправления
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {transferSlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedSlot === slot.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => setSelectedSlot(slot.id)}
              >
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-800">{slot.time}</div>
                  <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    {slot.booked}/{slot.capacity}
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(slot.booked / slot.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
          disabled={!selectedType || (selectedType === 'organized' && !selectedSlot)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};