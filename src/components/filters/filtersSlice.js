import { createSlice } from '@reduxjs/toolkit';

const initialFilters = ['0', '1', '2', '3']; // Все возможные фильтры пересадок
const allFilter = 'all'; // Специальный фильтр "Все"

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedFilters: [allFilter,...initialFilters],
  },
  reducers: {
    toggleFilter: (state, action) => {
      const filter = action.payload;
      const current = new Set(state.selectedFilters);

      // 1. Обработка клика на "Все"
      if (filter === allFilter) {
        current.clear();
        if (!state.selectedFilters.includes(allFilter)) {
          current.add(allFilter);
          initialFilters.forEach(f => current.add(f));
        }
      } 
      // 2. Обработка обычного фильтра
      else {
        // 2.1 Если был выбран "Все", снимаем его и выбираем только текущий фильтр
        if (current.has(allFilter)) {
          current.clear();
          current.add(filter);
        } 
        // 2.2 Если фильтр уже выбран - снимаем
        else if (current.has(filter)) {
          current.delete(filter);
          // Если сняли последний фильтр - включаем "Все"
          if (current.size === 0) current.add(allFilter);
        } 
        // 2.3 Если фильтр не выбран - добавляем
        else {
          current.add(filter);
          // Проверяем, все ли фильтры выбраны
          const allSelected = initialFilters.every(f => current.has(f));
          if (allSelected) {
            current.clear();
            current.add(allFilter);
            initialFilters.forEach(f => current.add(f));
          }
        }
      }

      state.selectedFilters = Array.from(current);
    }
  }
});

export const { toggleFilter } = filtersSlice.actions;
export default filtersSlice.reducer;