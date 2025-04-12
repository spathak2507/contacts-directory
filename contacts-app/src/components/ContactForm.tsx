import React, { useState, useEffect } from 'react';

interface ContactFormProps {
    initialData?: any;
    onSubmit: (data: any) => void;
    onClose: () => void;
    errors?: any; // Validation errors passed from the parent
}

const ContactForm: React.FC<ContactFormProps> = ({ initialData, onSubmit, onClose, errors }) => {
    const [contact, setContact] = useState(
        initialData || { firstName: '', lastName: '', email: '', phone: '' }
    );

    // Update the form state when initialData changes
    useEffect(() => {
        if (initialData) {
            setContact(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(contact);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                 {/* General error message */}
                 {errors?.Message && <p className="general-error">{errors.Message}</p>}
                <form className="contact-form" onSubmit={handleSubmit}>
                   

                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={contact.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            required
                        />
                        {errors?.FirstName && <p className="error-text">{errors.FirstName[0]}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={contact.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            required
                        />
                        {errors?.LastName && <p className="error-text">{errors.LastName[0]}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        {errors?.Email && <p className="error-text">{errors.Email[0]}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={contact.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            required
                        />
                        {errors?.Phone && <p className="error-text">{errors.Phone[0]}</p>}
                    </div>
                    <button className="submit-button" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;