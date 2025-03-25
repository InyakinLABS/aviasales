import React from 'react'
import { useDispatch } from 'react-redux'

import styles from './ticketsButtons.module.scss'
import { setSort } from './ticketsSortSlice'

const Buttons = () => {
  const dispatch = useDispatch()

  const changeSort = (sort) => {
    dispatch(setSort(sort))
  }
  return (
    <div className={styles['tickets-buttons']}>
      <div className={styles.button}>
        <input type="radio" name="radio" id="radio1" onChange={() => changeSort('cheapest')} />
        <label htmlFor="radio1">Самый дешевый</label>
      </div>
      <div className={styles.button}>
        <input type="radio" name="radio" id="radio2" onChange={() => changeSort('fastest')} />
        <label htmlFor="radio2">Самый быстрый</label>
      </div>
      <div className={styles.button}>
        <input type="radio" name="radio" id="radio3" onChange={() => changeSort('optimal')} />
        <label htmlFor="radio3">Оптимальный</label>
      </div>
    </div>
  )
}
export default Buttons
