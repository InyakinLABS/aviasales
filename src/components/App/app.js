import React, { useEffect } from 'react'
import { Alert } from 'antd'
import '../../normalize.css'
import { useDispatch, useSelector } from 'react-redux'

import Filters from '../filters/filters'
import Buttons from '../ticketsButtons/ticketsButtons'
import { selectVisibleTickets } from '../../features/selectors.js'
import TicketsList from '../tickets-list/tickets-list'
import { fetchSearchId, fetchTickets, resetTickets } from '../ticket/ticketSlice.js'
import Loader from '../loader/loader.js'

import styles from './app.module.scss'
import logo from './Logo.svg'

const App = () => {
  const dispatch = useDispatch()
  const { searchId, loading, hasMore } = useSelector((state) => state.tickets)
  const filteredTickets = useSelector(selectVisibleTickets)

  useEffect(() => {
    dispatch(fetchSearchId())
    return () => dispatch(resetTickets())
  }, [dispatch])

  useEffect(() => {
    if (searchId && hasMore) {
      dispatch(fetchTickets(searchId))
    }
  }, [searchId, hasMore, dispatch])

  return (
    <div>
      <div className={styles.app}>
        <img className={styles.logo} src={logo} alt="Aviasales logo" />
        <div className={styles.wrapper}>
          <Filters />
          <div className={styles.tickets}>
            <Buttons />
            {filteredTickets.length === 0 && !loading && (
              <Alert message="Увы :(" description="Не найдено рейсов, соответствующих заданным фильрам" type="info" />
            )}
            {loading && <Loader />}
            <TicketsList tickets={filteredTickets} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
