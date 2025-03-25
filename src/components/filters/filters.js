import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleFilter } from './filtersSlice'
import styles from './filters.module.scss'
const Filters = () => {
  const dispatch = useDispatch()
  const selectedFilters = useSelector((state) => state.filters.selectedFilters)

  const options = [
    { id: 1, label: 'Все', value: 'all' },
    { id: 2, label: 'Без пересадок', value: '0' },
    { id: 3, label: '1 пересадка', value: '1' },
    { id: 4, label: '2 Пересадки', value: '2' },
    { id: 5, label: '3 Пересадки', value: '3' },
  ]

  const handleCheckboxChange = (value) => {
    dispatch(toggleFilter(value))
  }

  return (
    <div className={styles.filters}>
      <div className={styles['filters-header']}>Количество пересадок</div>
      <ul className={styles['checkbox-list']}>
        {options.map(({ id, label, value }) => (
          <div className={`${styles['checkbox-field']} ${selectedFilters.includes(value) ? 'active' : ''}`} key={id}>
            <label>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedFilters.includes(value)}
                readOnly
                value={value}
                onClick={() => handleCheckboxChange(value)}
              />
              {label}
            </label>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Filters
