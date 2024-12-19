import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

const ContactManager = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' }); // Alert state

    // Fetch contacts from the backend
    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/contacts');
            setContacts(response.data.data);
            setFilteredContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    // Add a new contact and handle success/error
 const addContact = async (newContact) => {
    try {
        const response = await axios.post('http://localhost:8000/api/contacts', newContact);

        if (response.data.success) {
            setAlert({ message: response.data.message, type: 'success' });
        } else {
            setAlert({ message: 'Validation errors occurred.', type: 'error' });
        }

        return response.data; // Return response to ContactForm
    } catch (error) {
        console.error('Error adding contact:', error);
        return { success: false, message: 'Failed to add contact. Please try again.' };
    }
};


    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div>
            <h1></h1>

            {/* Button to Open Modal */}
            <button
                onClick={() => setShowModal(true)}
                style={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
            >
                Create New Contact
            </button>

            {/* Modal */}
            {showModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            width: '90%',
                            maxWidth: '500px',
                        }}
                    >
                        <h3>Create New Contact</h3>
                        <ContactForm
                            onContactCreated={addContact}
                            onModalClose={() => setShowModal(false)}
                            fetchContacts={fetchContacts}
                        />
                    </div>
                </div>
            )}

            {/* Contact List */}
            <ContactList contacts={filteredContacts} />
        </div>
    );
};

export default ContactManager;
