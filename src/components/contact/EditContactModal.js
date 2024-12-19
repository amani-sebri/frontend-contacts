import React, { useState, useEffect } from 'react';

const EditContactModal = ({ isEditing, currentContact, onClose, onSave }) => {
    const [updatedContact, setUpdatedContact] = useState(currentContact || {});

    useEffect(() => {
        if (currentContact) {
            setUpdatedContact(currentContact);
        }
    }, [currentContact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedContact((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(updatedContact);
    };

    if (!isEditing || !currentContact) return null; // Prevent rendering if `currentContact` is null

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Contact</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="first_name"
                            value={updatedContact.first_name || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="last_name"
                            value={updatedContact.last_name || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Age:
                        <input
                            type="number"
                            name="age"
                            value={updatedContact.age || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Country:
                        <input
                            type="text"
                            name="country"
                            value={updatedContact.country || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={updatedContact.email || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="phone_number"
                            value={updatedContact.phone_number || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit" className="submit-btn">Save Changes</button>
                    <button type="button" className="close-btn" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default EditContactModal;
