interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const ProgressBar = ({ currentStep, totalSteps, steps }: ProgressBarProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="flex flex-wrap justify-between text-xs sm:text-sm text-gray-600 gap-y-1">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`
              whitespace-nowrap
              ${index < currentStep ? 'text-blue-600 font-semibold' : ''} 
              ${index === currentStep ? 'text-purple-600 font-semibold' : ''}
            `}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};
