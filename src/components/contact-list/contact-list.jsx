import React from 'react';
import PropTypes from 'prop-types';
import css from './contact-list.module.css';

function ContactList({ contacts, onDelete }) {
  return (
    <div className={css.contactList}>
      {contacts.map(({ id, name, number }, idx) => (
        <div key={id} className={css.contactItem}>
          <div className={css.contactIndex}>{idx + 1}</div>
          <div className={css.contactDetails}>
            {name}: {number}
          </div>
          <button className={css.deleteButton} onClick={() => onDelete(id)}>
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};

export default ContactList;
