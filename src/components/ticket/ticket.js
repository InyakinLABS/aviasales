import React from "react";
import styles from "./ticket.module.scss";
import { format, parseISO, addMinutes } from 'date-fns';

const Ticket = React.memo(({ ticket }) => {
  const { price, carrier, segments } = ticket;

  const formatSegmentTime = (date, duration) => {
    const departure = parseISO(date);
    const arrival = addMinutes(departure, duration);
    return `${format(departure, 'HH:mm')} - ${format(arrival, 'HH:mm')}`;
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  const getStopsLabel = (stops) => {
    switch (stops.length) {
      case 0: return 'Без пересадок';
      case 1: return '1 Пересадка';
      default: return `${stops.length} Пересадки`;
    }
  };

  const renderSegment = (segment, index) => (
    <div key={index} className={styles.from}>
      <div className={styles["from-content"]}>
        <p>{segment.origin} - {segment.destination}</p>
        <p className={styles.time}>{formatSegmentTime(segment.date, segment.duration)}</p>
      </div>
      
      <div className={styles["from-content"]}>
        <p>В пути</p>
        <p className={styles.time}>{formatDuration(segment.duration)}</p>
      </div>
      
      <div className={styles["from-content"]}>
        <p>{getStopsLabel(segment.stops)}</p>
        <p className={`${styles.time} ${styles.stop}`}>{segment.stops.join(', ')}</p>
      </div>
    </div>
  );

  return (
    <div className={styles.ticket}>
      <div className={styles['ticket-header']}>
        <span className={styles["ticket-price"]}>{price.toLocaleString()} Р</span>
        <img 
          className={styles["ticket-logo"]} 
          src={`//pics.avs.io/99/36/${carrier}.png`} 
          alt="Логотип авиакомпании"
        />
      </div>
      
      <div className={styles["ticket-content"]}>
        {segments.map((segment, index) => renderSegment(segment, index))}
      </div>
    </div>
  );

});

export default Ticket;