import React from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

import ContactForm from './contact-form/contact-form';
import ContactList from './contact-list/contact-list';
import Filter from './filter/filter';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handleSubmit = data => {
    const equalName = this.state.contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );
    if (equalName) return alert(equalName.name + ' is already in contacts.');

    data.id = nanoid();
    this.setState(prev => ({ contacts: [data, ...prev.contacts] }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter, contacts } = this.state;

    return (
      <div className={css.container}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onSubmit={this.handleSubmit} />
        <h3 className={css.subtitle}>Contacts</h3>

        <Filter value={filter} onChange={this.changeFilter} />
        {contacts.length ? (
          <ContactList
            contacts={this.getVisibleContacts()}
            onDelete={this.deleteContacts}
          />
        ) : (
          <p className={css.message}>No any contacts</p>
        )}
      </div>
    );
  }
}

export default App;
