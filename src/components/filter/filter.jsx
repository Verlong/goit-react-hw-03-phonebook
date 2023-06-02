import React from 'react';
import PropTypes from 'prop-types';
import css from './filter.module.css';

const Filter = ({ value, onChange }) => (
  <div className={css.filterContainer}>
    <label className={css.filterLabel}>Find contacts by name</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={css.filterInput}
    />
  </div>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
