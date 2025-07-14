import { createMachine, assign } from 'xstate';
import { RegistrationData } from '../types';

export interface RegistrationContext {
  data: RegistrationData;
  error?: string;
  invitationId?: string;
}

export type RegistrationEvent =
  | { type: 'START_REGISTRATION' }
  | { type: 'SELECT_TRANSFER'; transfer: { type: 'self' | 'organized'; slotId?: string } }
  | { type: 'SELECT_ACCOMMODATION'; accommodation: { optionId: string; guestIds: string[] } }
  | { type: 'SELECT_ACTIVITIES'; activities: string[] }
  | { type: 'ACCEPT_INVITATION'; invitationId: string }
  | { type: 'REJECT_INVITATION' }
  | { type: 'COMPLETE_REGISTRATION' }
  | { type: 'GO_BACK' }
  | { type: 'RESTART' };

export const registrationMachine = createMachine({
  id: 'registration',
  initial: 'welcome',
  context: {
    data: {} as RegistrationData
  },
  types: {
    context: {} as RegistrationContext,
    events: {} as RegistrationEvent
  },
  states: {
    welcome: {
      on: {
        START_REGISTRATION: 'checkInvitation'
      }
    },
    checkInvitation: {
      always: [
        {
          target: 'invitationPrompt',
          guard: ({ context }) => !!context.invitationId
        },
        {
          target: 'transfer'
        }
      ]
    },
    invitationPrompt: {
      on: {
        ACCEPT_INVITATION: {
          target: 'activities',
          actions: assign(({ context, event }) => ({
            data: {
              ...context.data,
              invitationId: event.invitationId
            }
          }))
        },
        REJECT_INVITATION: 'accommodation'
      }
    },
    transfer: {
      on: {
        SELECT_TRANSFER: {
          target: 'accommodation',
          actions: assign(({ context, event }) => ({
            data: {
              ...context.data,
              transfer: event.transfer
            }
          }))
        },
        GO_BACK: 'welcome'
      }
    },
    accommodation: {
      on: {
        SELECT_ACCOMMODATION: {
          target: 'activities',
          actions: assign(({ context, event }) => ({
            data: {
              ...context.data,
              accommodation: event.accommodation
            }
          }))
        },
        GO_BACK: 'transfer'
      }
    },
    activities: {
      on: {
        SELECT_ACTIVITIES: {
          target: 'summary',
          actions: assign(({ context, event }) => ({
            data: {
              ...context.data,
              activities: event.activities
            }
          }))
        },
        GO_BACK: [
          {
            target: 'accommodation',
            guard: ({ context }) => !context.invitationId
          },
          {
            target: 'invitationPrompt'
          }
        ]
      }
    },
    summary: {
      on: {
        COMPLETE_REGISTRATION: 'completed',
        GO_BACK: 'activities'
      }
    },
    completed: {
      on: {
        RESTART: 'welcome'
      }
    }
  }
});