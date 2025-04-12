import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/Contact'; // Updated base URL to match the API endpoints

// Fetch all contacts
export const getContacts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data; // Returns an array of Contact objects
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

// Fetch a single contact by ID
export const getContactById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data; // Returns a single Contact object
  } catch (error) {
    console.error(`Error fetching contact with ID ${id}:`, error);
    throw error;
  }
};

// Create a new contact
export const createContact = async (contact: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}) => {
  try {
    const response = await axios.post(API_BASE_URL, contact);
    return response.data; // Returns the created Contact object
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

// Update an existing contact by ID
export const updateContact = async (
  id: string,
  contact: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }
) => {
  try {
    await axios.put(`${API_BASE_URL}/${id}`, contact);
    return; // Returns 204 No Content if successful
  } catch (error) {
    console.error(`Error updating contact with ID ${id}:`, error);
    throw error;
  }
};

// Delete a contact by ID
export const deleteContact = async (id: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return; // Returns 204 No Content if successful
  } catch (error) {
    console.error(`Error deleting contact with ID ${id}:`, error);
    throw error;
  }
};