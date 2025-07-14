import { useState } from 'react';
import { Clock, Users, Trophy } from 'lucide-react';
import { Activity } from '../types';

interface ActivitiesStepProps {
  activities: Activity[];
  onSelect: (activities: string[]) => void;
  onBack: () => void;
}

export const ActivitiesStep = ({ activities, onSelect, onBack }: ActivitiesStepProps) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleActivityToggle = (activityId: string) => {
    const activity = activities.find(a => a.id === activityId);
    if (!activity) return;

    if (selectedActivities.includes(activityId)) {
      setSelectedActivities(selectedActivities.filter(id => id !== activityId));
    } else if (selectedActivities.length < 2) {
      // Проверяем конфликт времени
      const hasTimeConflict = selectedActivities.some(id => {
        const selectedActivity = activities.find(a => a.id === id);
        return selectedActivity?.time === activity.time;
      });

      if (!hasTimeConflict) {
        setSelectedActivities([...selectedActivities, activityId]);
      }
    }
  };

  const isActivityDisabled = (activity: Activity) => {
    if (selectedActivities.includes(activity.id)) return false;
    if (selectedActivities.length >= 2) return true;
    
    // Проверяем конфликт времени
    const hasTimeConflict = selectedActivities.some(id => {
      const selectedActivity = activities.find(a => a.id === id);
      return selectedActivity?.time === activity.time;
    });

    return hasTimeConflict;
  };

  const handleSubmit = () => {
    onSelect(selectedActivities);
  };

  const activitiesByTime = activities.reduce((acc, activity) => {
    if (!acc[activity.time]) {
      acc[activity.time] = [];
    }
    acc[activity.time].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Выберите активности</h2>
      <p className="text-center text-gray-600 mb-8">
        Вы можете выбрать не более 2 активностей. Активности в одно время недоступны для выбора.
      </p>

      <div className="space-y-8">
        {Object.entries(activitiesByTime).map(([time, timeActivities]) => (
          <div key={time} className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-500" />
              {time}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {timeActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedActivities.includes(activity.id)
                      ? 'border-green-500 bg-green-50'
                      : isActivityDisabled(activity)
                      ? 'border-gray-300 bg-gray-50 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => !isActivityDisabled(activity) && handleActivityToggle(activity.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 text-orange-500 mr-2" />
                      <h4 className="font-semibold">{activity.name}</h4>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {activity.booked}/{activity.capacity}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(activity.booked / activity.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Выбрано активностей: {selectedActivities.length}/2
        </p>
        {selectedActivities.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Выбранные активности:</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedActivities.map(activityId => {
                const activity = activities.find(a => a.id === activityId);
                return (
                  <div key={activityId} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {activity?.name} ({activity?.time})
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
        >
          Назад
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};