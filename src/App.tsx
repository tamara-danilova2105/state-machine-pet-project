import { useMachine } from '@xstate/react';
import { registrationMachine } from './machines/registrationMachine';
import { ProgressBar } from './components/ProgressBar';
import { WelcomeStep } from './components/WelcomeStep';
import { TransferStep } from './components/TransferStep';
import { AccommodationStep } from './components/AccommodationStep';
import { ActivitiesStep } from './components/ActivitiesStep';
import { SummaryStep } from './components/SummaryStep';
import { CompletedStep } from './components/CompletedStep';
import {
  transferSlots,
  accommodationOptions,
  activities,
  mockUsers,
  invitationMock
} from './data/mockData';
import { InvitationStep } from './components/InvitationStep';

const steps = ['Добро пожаловать', 'Трансфер', 'Размещение', 'Активности', 'Подтверждение'];

function App() {
  const [state, send] = useMachine(registrationMachine);
  
  const getCurrentStep = () => {
    switch (state.value) {
      case 'welcome': return 0;
      case 'transfer':
      case 'postTransferCheck': return 1;
      case 'invitationPrompt':
      case 'accommodation': return 2;
      case 'activities': return 3;
      case 'summary': return 4;
      default: return 0;
    }
  };

  const showProgressBar = !['welcome', 'completed'].includes(state.value as string);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {showProgressBar && (
          <ProgressBar
            currentStep={getCurrentStep()}
            totalSteps={steps.length}
            steps={steps}
          />
        )}

        <div className="mt-8">
          {state.matches('welcome') && (
            <WelcomeStep onStart={() => send({ type: 'START_REGISTRATION' })} />
          )}

          {state.matches('transfer') && (
            <TransferStep
              transferSlots={transferSlots}
              onSelect={(transfer) => send({ type: 'SELECT_TRANSFER', transfer })}
              onBack={() => send({ type: 'GO_BACK' })}
            />
          )}

          {state.matches('invitationPrompt') && (
            <InvitationStep
              invitation={invitationMock}
              accommodationOption={accommodationOptions.find(
                (opt) => opt.id === invitationMock.accommodationId
              )!}
              onAccept={() => send({ type: 'ACCEPT_INVITATION', invitationId: invitationMock.id })}
              onReject={() => send({ type: 'REJECT_INVITATION' })}
            />
          )}

          {state.matches('accommodation') && (
            <AccommodationStep
              accommodationOptions={accommodationOptions}
              users={mockUsers}
              onSelect={(accommodation) => send({ type: 'SELECT_ACCOMMODATION', accommodation })}
              onBack={() => send({ type: 'GO_BACK' })}
            />
          )}

          {state.matches('activities') && (
            <ActivitiesStep
              activities={activities}
              onSelect={(activities) => send({ type: 'SELECT_ACTIVITIES', activities })}
              onBack={() => send({ type: 'GO_BACK' })}
            />
          )}

          {state.matches('summary') && (
            <SummaryStep
              data={state.context.data}
              transferSlots={transferSlots}
              accommodationOptions={accommodationOptions}
              activities={activities}
              users={mockUsers}
              onComplete={() => send({ type: 'COMPLETE_REGISTRATION' })}
              onBack={() => send({ type: 'GO_BACK' })}
            />
          )}

          {state.matches('completed') && (
            <CompletedStep onRestart={() => send({ type: 'RESTART' })} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;