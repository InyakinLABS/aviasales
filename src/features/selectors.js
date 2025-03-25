import { createSelector } from '@reduxjs/toolkit'

const selectAllTickets = (state) => state.tickets.tickets
const selectFilters = (state) => state.filters.selectedFilters
const selectSortBy = (state) => state.sort.sortBy

export const selectProcessedTickets = createSelector(
  [selectAllTickets, selectFilters, selectSortBy],
  (tickets, filters, sortBy) => {
    const filtered = tickets.filter((ticket) =>
      filters.some((filter) => {
        if (filter === 'all') return true
        return ticket.segments.every((segment) => segment.stops.length === parseInt(filter))
      })
    )

    return filtered.sort((a, b) => {
      if (sortBy === 'cheapest') return a.price - b.price
      if (sortBy === 'fastest') {
        const aDuration = a.segments.reduce((sum, s) => sum + s.duration, 0)
        const bDuration = b.segments.reduce((sum, s) => sum + s.duration, 0)
        return aDuration - bDuration
      }
      if (sortBy === 'optimal') {
        const priceDiff = a.price - b.price
        if (Math.abs(priceDiff) > 2000) {
          return priceDiff
        }
        const aDuration = a.segments.reduce((sum, s) => sum + s.duration, 0)
        const bDuration = b.segments.reduce((sum, s) => sum + s.duration, 0)
        return aDuration - bDuration
      }

      return 0
    })
  }
)

export const selectVisibleTickets = createSelector(
  [selectProcessedTickets, (state) => state.tickets.visibleCount],
  (tickets, count) => tickets.slice(0, count)
)
