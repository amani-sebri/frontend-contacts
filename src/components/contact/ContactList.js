import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditContactModal from './EditContactModal';

const ContactList = () => {
    const [contacts, setContacts] = useState([]); // All contacts
    const [filteredContacts, setFilteredContacts] = useState([]); // Filtered contacts
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const [isEditing, setIsEditing] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);

    // Fetch contacts when the component mounts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/contacts');
                setContacts(response.data.data);
                setFilteredContacts(response.data.data); // Initially, all contacts are displayed
            } catch (error) {
                console.error('Error fetching contacts:', error);
                toast.error('Error fetching contacts.');
            }
        };

        fetchContacts();
    }, []); // Empty dependency array to run only once when the component mounts

    // Handle search input changes
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = contacts.filter(
            (contact) =>
                `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(value) ||
                contact.email.toLowerCase().includes(value) ||
                contact.phone_number.includes(value) ||
                contact.country.toLowerCase().includes(value)
        );

        setFilteredContacts(filtered);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/contacts/${id}`);
            if (response.data.success) {
                // Remove deleted contact from the state
                setContacts(contacts.filter((contact) => contact.id !== id));
                setFilteredContacts(filteredContacts.filter((contact) => contact.id !== id)); // Update filtered list
                toast.success('Contact deleted successfully!');
            } else {
                toast.error('Failed to delete the contact!');
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
            toast.error('Error deleting contact.');
        }
    };

    const handleEdit = (contact) => {
        setIsEditing(true);
        setCurrentContact(contact);
    };

    const handleUpdate = async (updatedContact) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/contacts/${updatedContact.id}`, updatedContact);
            if (response.data.success) {
                // Update the contact in the state
                setContacts(contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)));
                setFilteredContacts(
                    filteredContacts.map((contact) =>
                        contact.id === updatedContact.id ? updatedContact : contact
                    )
                ); // Update filtered list
                setIsEditing(false);
                setCurrentContact(null);
                toast.success('Contact updated successfully!');
            } else {
                toast.error('Failed to update the contact!');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
            toast.error('Error updating contact.');
        }
    };

    return (
        <div>
            <h2>Contact List</h2>

            {/* Search Bar */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                        padding: '10px',
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                    }}
                />
            </div>

            <table className="contact-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Country</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.first_name}</td>
                            <td>{contact.last_name}</td>
                            <td>{contact.age}</td>
                            <td>{contact.country}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone_number}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(contact)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Contact Modal */}
            <EditContactModal
                isEditing={isEditing}
                currentContact={currentContact}
                onClose={() => setIsEditing(false)}
                onSave={handleUpdate}
            />

            {/* Toast container to render the alerts */}
            <ToastContainer />
        </div>
    );
};

export default ContactList;
