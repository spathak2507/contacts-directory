using System.Collections.Generic;
using System.Threading.Tasks;
using ContactsAPI.Models;
using ContactsAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactsAPI.Controllers
{
    // This controller handles all API requests related to the Contact entity.
    // It provides endpoints for CRUD operations (Create, Read, Update, Delete).
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly IContactService _contactService;

        // Constructor to inject the contact service into the controller.
        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        // GET: api/Contact
        // Retrieves all contacts from the database.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> Get()
        {
            // Fetch all contacts using the service and return them.
            return Ok(await _contactService.GetAllContactsAsync());
        }

        // GET: api/Contact/{id}
        // Retrieves a specific contact by its ID.
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> Get(int id)
        {
            // Fetch the contact with the given ID using the service.
            var contact = await _contactService.GetContactByIdAsync(id);

            // If the contact doesn't exist, return a 404 Not Found response.
            if (contact == null)
                return NotFound();

            // Return the contact if found.
            return Ok(contact);
        }

        // POST: api/Contact
        [HttpPost]
        public async Task<ActionResult<Contact>> Post([FromBody] Contact contact)
        {
            // Check if the request data is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return 400 Bad Request with validation errors
            }

            // Add the new contact using the service
            var createdContact = await _contactService.CreateContactAsync(contact);

            // Return a 201 Created response with the newly created contact
            return CreatedAtAction(nameof(Get), new { id = createdContact.Id }, createdContact);
        }

        // PUT: api/Contact/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Contact contact)
        {
            // Check if the request data is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return 400 Bad Request with validation errors
            }

            // Update the contact using the service
            var success = await _contactService.UpdateContactAsync(id, contact);

            // If the contact doesn't exist, return a 404 Not Found response
            if (!success)
                return NotFound();

            // Return a 204 No Content response to indicate success
            return NoContent();
        }

        // DELETE: api/Contact/{id}
        // Deletes a contact by its ID.
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // Delete the contact using the service.
            var success = await _contactService.DeleteContactAsync(id);

            // If the contact doesn't exist, return a 404 Not Found response.
            if (!success)
                return NotFound();

            // Return a 204 No Content response to indicate success.
            return NoContent();
        }
    }
}