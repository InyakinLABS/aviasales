// features/selectors.js (мемоизация)
import { createSelector } from '@reduxjs/toolkit';

const selectAllTickets = state => state.tickets.tickets;
const selectFilters = state => state.filters.selectedFilters;
const selectSortBy = state => state.sort.sortBy;

// features/selectors.js
export const selectProcessedTickets = createSelector(
    [selectAllTickets, selectFilters, selectSortBy],
    (tickets, filters, sortBy) => {
      // Фильтрация
      const filtered = tickets.filter(ticket => 
        filters.some(filter => {
          if (filter === 'all') return true;
          return ticket.segments.every(segment => 
            segment.stops.length === parseInt(filter)
          );
        })
      );
  
      // Сортировка
      return filtered.sort((a, b) => {
        if (sortBy === 'cheapest') return a.price - b.price;
        if (sortBy === 'fastest') {
          const aDuration = a.segments.reduce((sum, s) => sum + s.duration, 0);
          const bDuration = b.segments.reduce((sum, s) => sum + s.duration, 0);
          return aDuration - bDuration;
        }
        if (sortBy === 'optimal') {
            // Простая логика: сначала смотрим на цену, потом на время
            const priceDiff = a.price - b.price;
            if (Math.abs(priceDiff) > 2000) { // Если разница больше 2000 руб
              return priceDiff;               // Сортируем по цене
            }
            // Иначе сортируем по времени
            const aDuration = a.segments.reduce((sum, s) => sum + s.duration, 0);
            const bDuration = b.segments.reduce((sum, s) => sum + s.duration, 0);
            return aDuration - bDuration;
          }
          
        return 0;
      });
    }
  );
  
  export const selectVisibleTickets = createSelector(
    [selectProcessedTickets, state => state.tickets.visibleCount],
    (tickets, count) => tickets.slice(0, count)
  );