interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const ProgressBar = ({ currentStep, totalSteps, steps }: ProgressBarProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progressPercentage}%` }}
      />
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        {steps.map((step, index) => (
          <span 
            key={index}
            className={`${index < currentStep ? 'text-blue-600 font-semibold' : index === currentStep ? 'text-purple-600 font-semibold' : ''}`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};