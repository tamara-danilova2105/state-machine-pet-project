# registrationMachine.ts — описание state-машины

Машина управления шагами регистрации на корпоратив построена с использованием `xstate`. Она описывает возможные состояния, переходы между ними и правила, по которым формируется поведение интерфейса.

---

## Сценарий регистрации

1. Стартовая страница (`welcome`)
2. Выбор трансфера (`transfer`)
3. Проверка наличия приглашения (`postTransferCheck`)
4. Приглашение к размещению (`invitationPrompt`)
5. Выбор размещения (`accommodation`)
6. Выбор активностей (`activities`)
7. Подтверждение (`summary`)
8. Завершение (`completed`)

---

### Таблица переходов состояний регистрации

```markdown
| Текущее состояние     | Событие                  | Следующее состояние        | Условие                               |
|-----------------------|--------------------------|----------------------------|---------------------------------------|
| `welcome`             | `START_REGISTRATION`     | `transfer`                 | —                                     |
| `transfer`            | `SELECT_TRANSFER`        | `postTransferCheck`        | —                                     |
| `transfer`            | `GO_BACK`                | `welcome`                  | —                                     |
| `postTransferCheck`   | *(автоматически)*        | `invitationPrompt`         | если `invitationId` есть              |
| `postTransferCheck`   | *(автоматически)*        | `accommodation`            | если `invitationId` отсутствует       |
| `invitationPrompt`    | `ACCEPT_INVITATION`      | `activities`               | —                                     |
| `invitationPrompt`    | `REJECT_INVITATION`      | `accommodation`            | —                                     |
| `accommodation`       | `SELECT_ACCOMMODATION`   | `activities`               | —                                     |
| `accommodation`       | `GO_BACK`                | `transfer`                 | —                                     |
| `activities`          | `SELECT_ACTIVITIES`      | `summary`                  | —                                     |
| `activities`          | `GO_BACK`                | `accommodation`            | если `invitationId` нет               |
| `activities`          | `GO_BACK`                | `invitationPrompt`         | если `invitationId` есть              |
| `summary`             | `COMPLETE_REGISTRATION`  | `completed`                | —                                     |
| `summary`             | `GO_BACK`                | `activities`               | —                                     |
| `completed`           | `RESTART`                | `welcome`                  | —                                     |
```
### Состояния в пользовательской логике

- `welcome`: старт, кнопка регистрации
- `transfer`: выбор транспорта (самостоятельно или трансфер)
- `postTransferCheck`: проверка приглашения
- `invitationPrompt`: согласие/отказ на совместное проживание
- `accommodation`: выбор варианта размещения
- `activities`: выбор до 2 активностей, учёт пересечений
- `summary`: финальная проверка перед отправкой
- `completed`: успех + возможность начать заново

---

## Структура `registrationMachine`

```ts
createMachine({
  id: 'registration',
  initial: 'welcome',
  context: { ... },
  types: { ... },
  states: { ... }
})
```

### `id`
Уникальный идентификатор машины. Используется для отладки и DevTools.  
Пример: `'registration'`.

### `initial`
Начальное состояние, с которого запускается машина.  
Пример: `'welcome'`.

### `context`
Объект, в котором хранятся данные между переходами.  
В нашем случае: `data` с информацией регистрации, `invitationId`, `error`.

### `types`
Раздел для описания типов (используется в TypeScript).  
Обеспечивает строгую типизацию `context` и `event`.

---

## Состояния (`states`)

Каждое состояние описывает:
- какие события оно может обработать (`on`)
- какие действия выполнить при входе/выходе (`entry`, `exit`)
- нужно ли сделать автоматический переход (`always`)

### `on`
Обработка входящих событий.

```ts
on: {
  EVENT_NAME: {
    target: 'nextState',
    actions: [...] // необязательно
  }
}
```

- `target` — состояние, в которое произойдёт переход
- `actions` — действия, выполняемые при переходе (например, обновить контекст)

### `actions`
Описывают, что делать при переходе.  
Самая частая — `assign`, которая обновляет `context`.

```ts
actions: assign(({ context, event }) => ({
  data: { ...context.data, transfer: event.transfer }
}))
```

### `always`
Автоматические переходы без события.  
Используются, если переход зависит от данных в `context`.

```ts
always: [
  { target: 'invitationPrompt', guard: ({ context }) => !!context.invitationId },
  { target: 'accommodation' }
]
```

### `guard`
Условие, при котором разрешён переход.  
Возвращает `true` или `false`:

```ts
guard: ({ context }) => context.data.transfer?.type === 'organized'
```

---

## Файл
Машина описана в [`src/machines/registrationMachine.ts`](../machines/registrationMachine.ts)
