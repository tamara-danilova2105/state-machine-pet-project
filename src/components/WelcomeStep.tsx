import { Calendar, MapPin, Users } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep = ({ onStart }: WelcomeStepProps) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl mb-8">
        <h1 className="text-4xl font-bold mb-4">Корпоративный отдых 2025</h1>
        <p className="text-xl opacity-90">Приглашаем вас на незабываемое мероприятие!</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Дата</h3>
          <p className="text-gray-600">19-20 июля 2025</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <MapPin className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Место</h3>
          <p className="text-gray-600">База отдыха "Лесная"</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Активности</h3>
          <p className="text-gray-600">Спорт, развлечения, отдых</p>
        </div>
      </div>
      
      <button
        onClick={onStart}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
      >
        Зарегистрироваться
      </button>
    </div>
  );
};