import React ,{useEffect}from "react";
import Ticket from "../ticket/ticket";
import "./ticketsList.scss"
import { showMoreTickets, resetVisibleCount } from '../ticket/ticketSlice';
import {  useSelector,useDispatch } from 'react-redux';
import { selectVisibleTickets, selectProcessedTickets } from '../../features/selectors';
import { Button} from 'antd';
const TicketsList = () => {
    const {  error } = useSelector(state => state.tickets);
    const dispatch = useDispatch();
    const visibleTickets = useSelector(selectVisibleTickets);
    const processedTickets = useSelector(selectProcessedTickets);
    const { sortBy } = useSelector(state => state.sort);
    const { selectedFilters } = useSelector(state => state.filters);
    useEffect(() => {
        dispatch(resetVisibleCount());
      }, [sortBy, selectedFilters, dispatch]);
    if (error) return <div>Ошибка: {error}</div>;
  
    return(
        <ul className="tickets-list">
        {visibleTickets.map((ticket,index) => (
          <Ticket key={index} ticket={ticket} />
        ))}
  
        {visibleTickets.length < processedTickets.length && (
             <Button className="show-more"type="primary"  onClick={() => dispatch(showMoreTickets())}>Показать еще 10</Button>
        )}
      </ul>
    )
}

export default TicketsList