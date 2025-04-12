import React from 'react';

interface ContactListProps {
  contacts: any[];
  onEdit: (contact: any) => void;
  onDelete: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onEdit, onDelete }) => {
  return (
    <div className="contact-list-container">
      <table className="contact-table">
        <thead>
          <tr>
            <th>#</th> {/* Serial number column */}
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact.id}>
              <td>{index + 1}</td> {/* Display serial number */}
              <td>{`${contact.firstName} ${contact.lastName}`}</td> {/* Combine firstName and lastName */}
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button className="edit-button" onClick={() => onEdit(contact)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => onDelete(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;