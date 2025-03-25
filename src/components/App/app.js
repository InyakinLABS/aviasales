import React, { useEffect } from "react";

import Filters from "../filters/filters";
import logo from "./Logo.svg"
import '../../normalize.css';
import styles from './app.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import Buttons from "../ticketsButtons/ticketsButtons";
import TicketsList from "../tickets-list/tickets-list";
import { selectVisibleTickets } from '../../features/selectors.js';
import { Alert } from 'antd';
import { fetchSearchId, fetchTickets,resetTickets } from '../ticket/ticketSlice.js';
import Loader from "../loader/loader.js";


const App = () => {
  const dispatch = useDispatch();
  const { searchId, loading, error, hasMore } = useSelector(state => state.tickets);
  const filteredTickets = useSelector(selectVisibleTickets);

  useEffect(() => {
    dispatch(fetchSearchId());
    return () => dispatch(resetTickets());
  }, [dispatch]);

  useEffect(() => {
    if (searchId && hasMore) {
      dispatch(fetchTickets(searchId));
    }
  }, [searchId, hasMore, dispatch]);


  return (
    <div>
      
      {error && <div>Ошибка: {error}</div>}
      {/* Остальной интерфейс */}
      <div className={styles.app}>
        <img className={styles.logo} src={logo} alt="Aviasales logo"/>
        <div className={styles.wrapper}>
          <Filters/>
          <div className={styles.tickets}>
            <Buttons/>
            {filteredTickets.length === 0 && !loading && (
         <Alert
         message="Увы :("
         description="Не найдено рейсов, соответствующих заданным фильрам"
         type="info"
       />
      )}
      {loading && <Loader/>}
      <TicketsList tickets={filteredTickets} />
      
            
          </div>
        </div>
      </div>
      </div>
  );
};

export default App;