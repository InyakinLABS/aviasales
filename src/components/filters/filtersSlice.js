import { createSlice } from '@reduxjs/toolkit'

const initialFilters = ['0', '1', '2', '3']
const allFilter = 'all'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedFilters: [allFilter, ...initialFilters],
  },
  reducers: {
    toggleFilter: (state, action) => {
      const filter = action.payload
      const current = new Set(state.selectedFilters)

      if (filter === allFilter) {
        current.clear()
        if (!state.selectedFilters.includes(allFilter)) {
          current.add(allFilter)
          initialFilters.forEach((f) => current.add(f))
        }
      } else {
        if (current.has(allFilter)) {
          current.clear()
          current.add(filter)
        } else if (current.has(filter)) {
          current.delete(filter)
          if (current.size === 0) current.add(allFilter)
        } else {
          current.add(filter)
          const allSelected = initialFilters.every((f) => current.has(f))
          if (allSelected) {
            current.clear()
            current.add(allFilter)
            initialFilters.forEach((f) => current.add(f))
          }
        }
      }

      state.selectedFilters = Array.from(current)
    },
  },
})

export const { toggleFilter } = filtersSlice.actions
export default filtersSlice.reducer
