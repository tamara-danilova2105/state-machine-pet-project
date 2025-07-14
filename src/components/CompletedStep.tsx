import { CheckCircle, Calendar, Mail, FileText } from 'lucide-react';

interface CompletedStepProps {
  onRestart: () => void;
}

export const CompletedStep = ({ onRestart }: CompletedStepProps) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-4">Регистрация завершена!</h2>
        <p className="text-lg text-gray-600">
          Спасибо за регистрацию на корпоративное мероприятие. Мы рады видеть вас среди участников!
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Что дальше?</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <Mail className="w-6 h-6 text-blue-500 mt-1 mr-3" />
            <div className="text-left">
              <p className="font-semibold">Подтверждение на email</p>
              <p className="text-sm text-gray-600">В течение 10 минут вы получите письмо с деталями</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="w-6 h-6 text-green-500 mt-1 mr-3" />
            <div className="text-left">
              <p className="font-semibold">Добавьте в календарь</p>
              <p className="text-sm text-gray-600">19-20 июля 2025, База отдыха "Лесная"</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <FileText className="w-6 h-6 text-purple-500 mt-1 mr-3" />
            <div className="text-left">
              <p className="font-semibold">Подготовка к мероприятию</p>
              <p className="text-sm text-gray-600">Список необходимых вещей будет направлен дополнительно</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Контакты для связи</h3>
        <p className="text-gray-600">
          По всем вопросам обращайтесь в HR-отдел: 
          <br />
          📞 +7 (495) 123-45-67
          <br />
          📧 hr@company.ru
        </p>
      </div>

      <button
        onClick={onRestart}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
      >
        Новая регистрация
      </button>
    </div>
  );
};