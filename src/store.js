import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './components/filters/filtersSlice';
import sortReducer from './components/ticketsButtons/ticketsSortSlice';
import ticketsReducer from './components/ticket/ticketSlice'
export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    sort: sortReducer,
    tickets:ticketsReducer,
  },
  devTools: {
    // Настройки DevTools (опционально)
    name: 'Tickets App', // Имя вашего приложения в DevTools
    trace: true, // Включает трассировку стека для действий
    traceLimit: 25, // Лимит трассировки
    serialize: true, // Для работы с сериализуемыми данными
    features: {
      pause: true, // Возможность ставить на паузу
      lock: true, // Блокировка изменений
      persist: false, // Отключаем сохранение состояния
      export: true, // Экспорт/импорт состояния
      jump: true, // Переход по действиям
      skip: true, // Пропуск действий
      reorder: true, // Изменение порядка редьюсеров
    }
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['tickets/addTickets'], // Игнорируем проверку для этих экшенов
        ignoredPaths: ['tickets.tickets'], // Игнорируем проверку для этого пути в состоянии
        warnAfter: 100 // Увеличиваем лимит для предупреждений
      }
    })
});

export default store;