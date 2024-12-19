import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const ContactForm = ({ onContactCreated, onModalClose, fetchContacts }) => {
    const [contact, setContact] = useState({
        first_name: '',
        last_name: '',
        age: '',
        country: '',
        email: '',
        phone_number: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the parent function to handle contact creation
            const response = await onContactCreated(contact);

            if (response.success) {
                // Reset form and close modal on success
                setContact({
                    first_name: '',
                    last_name: '',
                    age: '',
                    country: '',
                    email: '',
                    phone_number: '',
                });
                fetchContacts(); // Refresh the contact list
                onModalClose(); // Close the modal
                toast.success('Contact created successfully!'); // Show success message
            } else if (response.errors) {
                // Show validation errors using toast
                response.errors.forEach((error) => toast.error(error));
            } else if (response.message) {
                // Show specific error message
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            toast.error('An error occurred while creating the contact.');
        }
    };

    return (
        <div className="modal-content">
            <form className="contact-form" onSubmit={handleSubmit}>
                {/* Input Fields */}
                <label>
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        value={contact.first_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        value={contact.last_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={contact.age}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={contact.country}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phone_number"
                        value={contact.phone_number}
                        onChange={handleChange}
                        required
                    />
                </label>

                <div className="form-buttons">
                    <button className="submit-btn" type="submit">
                        Create
                    </button>
                    <button
                        type="button"
                        className="close-btn"
                        onClick={onModalClose}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
