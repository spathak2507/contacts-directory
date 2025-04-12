import React, { useEffect, useState } from 'react';
import { getContacts, createContact, updateContact, deleteContact } from './services/contactService';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

const App: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any | null>(null);
  const [formErrors, setFormErrors] = useState<any | null>(null); // State to store form errors

  // Fetch contacts from the backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error: any) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  // Open popup for creating a new contact
  const handleCreateNew = () => {
    setEditingContact(null); // Clear editing data
    setFormErrors(null); // Clear previous errors
    setIsPopupOpen(true); // Open popup
  };

  // Open popup for editing an existing contact
  const handleEdit = (contact: any) => {
    setEditingContact(contact); // Set the contact to edit
    setFormErrors(null); // Clear previous errors
    setIsPopupOpen(true); // Open popup
  };

  // Handle form submission for creating or updating a contact
  const handleSubmit = async (contact: any) => {
    try {
      if (editingContact) {
        // Update existing contact
        await updateContact(editingContact.id, contact);
      } else {
        // Create new contact
        await createContact(contact);
      }
      // Refresh the contact list
      const updatedContacts = await getContacts();
      setContacts(updatedContacts);
      setIsPopupOpen(false); // Close popup
    } catch (error: any) {
      if (error.response && error.response.data) {
        setFormErrors(error.response.data); // Pass validation errors to the form
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  // Delete a contact
  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id);
      const updatedContacts = await getContacts();
      setContacts(updatedContacts);
    } catch (error: any) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div>
      <header className="app-header">
        <h1>Contacts Directory</h1>
        <button className="create-new-button" onClick={handleCreateNew}>
          Create New
        </button>
      </header>
      <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
      {isPopupOpen && (
        <ContactForm
          initialData={editingContact}
          onSubmit={handleSubmit}
          onClose={() => setIsPopupOpen(false)}
          errors={formErrors} // Pass errors to the form
        />
      )}
    </div>
  );
};

export default App;