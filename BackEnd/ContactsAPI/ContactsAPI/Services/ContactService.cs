using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Data;
using ContactsAPI.Exceptions;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Services
{
    // This service handles all the business logic for managing contacts.
    // It interacts with the database through the ContactDbContext.
    public class ContactService : IContactService
    {
        private readonly ContactDbContext _context;

        // Constructor to inject the database context.
        public ContactService(ContactDbContext context)
        {
            _context = context;
        }

        // Fetch all contacts from the database.
        public async Task<IEnumerable<Contact>> GetAllContactsAsync()
        {
            return await _context.Contacts.ToListAsync();
        }

        // Fetch a specific contact by its ID.
        public async Task<Contact> GetContactByIdAsync(int id)
        {
            return await _context.Contacts.FindAsync(id);
        }

        // Add a new contact to the database.
        public async Task<Contact> CreateContactAsync(Contact contact)
        {
            // Check if a contact with the same email already exists
            if (await _context.Contacts.AnyAsync(c => c.Email == contact.Email))
            {
                throw new UserFriendlyException("A contact with this email already exists");
            }

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        // Update an existing contact in the database.
        public async Task<bool> UpdateContactAsync(int id, Contact contact)
        {
            // Ensure the ID in the request matches the contact's ID.
            if (id != contact.Id)
                return false;

            // Mark the contact as modified.
            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                // Save changes to the database.
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                // Check if the contact still exists.
                if (!_context.Contacts.Any(e => e.Id == id))
                    return false;

                throw; // Re-throw the exception if it's not a concurrency issue.
            }
        }

        // Delete a contact from the database.
        public async Task<bool> DeleteContactAsync(int id)
        {
            // Find the contact by its ID.
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
                return false;

            // Remove the contact and save changes.
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}