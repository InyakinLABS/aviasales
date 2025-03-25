// features/tickets/ticketsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchId: null,
  tickets: [],
  loading: false,
  error: null,
  stop: false,
  hasMore: true,
  visibleCount: 10,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setSearchId(state, action) {
      state.searchId = action.payload;
    },
    addTickets(state, action) {
      state.tickets = [...state.tickets, ...action.payload];
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setStop(state, action) {
      state.stop = action.payload;
      state.hasMore = !action.payload;
    },
    resetTickets(state) {
      state.tickets = [];
      state.hasMore = true;
      state.stop = false;
    },
    showMoreTickets(state) {
      state.visibleCount += 10;
    },
    resetVisibleCount(state) {
      state.visibleCount = 10;
    },
  },
});

export const { setSearchId, addTickets, setLoading, setError, setStop, resetTickets,resetVisibleCount,showMoreTickets, } = ticketsSlice.actions;
export const fetchSearchId = () => async (dispatch) => {
  try {
    const response = await fetch('https://aviasales-test-api.kata.academy/search');
    if (!response.ok) throw new Error('Ошибка получения searchId');
    const { searchId } = await response.json();
    
    dispatch(setSearchId(searchId));

  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const fetchTickets = (searchId,attemptss=0) => async (dispatch) => {
  dispatch(setLoading(true));
  let attempts = attemptss;
  const MAX_ATTEMPTS = 5;
  const RETRY_DELAY = 1000;// Задержка между запросами

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      );
      
      if (!response.ok) {
        if (response.status === 500 && attempts < MAX_ATTEMPTS-1) {
          attempts++;
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          return fetchData(attempts);
        }
        // Если достигнут лимит попыток или другая ошибка
        dispatch(setStop(true));
        dispatch(setLoading(false));
        return;
      }

      const data = await response.json();
      dispatch(addTickets(data.tickets));
      
      if (data.stop) {
        dispatch(setStop(true));
      } else {
        setTimeout(fetchData, 100);
      }
      
    } catch (error) {
      if (attempts >= MAX_ATTEMPTS) {
        dispatch(setStop(true));
      }
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  fetchData();
};

export default ticketsSlice.reducer;