using Microsoft.EntityFrameworkCore;
using ContactsAPI.Models;

namespace ContactsAPI.Data
{
    // This class represents the database context for the application.
    // It manages the Contact entity and handles database operations.
    public class ContactDbContext : DbContext
    {
        // Constructor to pass DbContext options to the base class.
        public ContactDbContext(DbContextOptions<ContactDbContext> options) : base(options) { }

        // DbSet represents the Contacts table in the database.
        public DbSet<Contact> Contacts { get; set; }

        // This method is used to configure the model and seed initial data.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data for the in-memory database.
            // This data will be available when the application starts.
            modelBuilder.Entity<Contact>().HasData(
                new Contact { Id = 1, FirstName = "Amit", LastName = "Sharma", Email = "amit.sharma@example.com", Phone = "9876543210" },
                new Contact { Id = 2, FirstName = "Priya", LastName = "Verma", Email = "priya.verma@example.com", Phone = "9123456789" },
                new Contact { Id = 3, FirstName = "Rahul", LastName = "Gupta", Email = "rahul.gupta@example.com", Phone = "9988776655" },
                new Contact { Id = 4, FirstName = "Sneha", LastName = "Patel", Email = "sneha.patel@example.com", Phone = "9876541230" },
                new Contact { Id = 5, FirstName = "Vikram", LastName = "Singh", Email = "vikram.singh@example.com", Phone = "9123456780" },
                new Contact { Id = 6, FirstName = "Anjali", LastName = "Nair", Email = "anjali.nair@example.com", Phone = "9988771122" },
                new Contact { Id = 7, FirstName = "Ravi", LastName = "Kumar", Email = "ravi.kumar@example.com", Phone = "9876509876" },
                new Contact { Id = 8, FirstName = "Pooja", LastName = "Reddy", Email = "pooja.reddy@example.com", Phone = "9123401234" },
                new Contact { Id = 9, FirstName = "Arjun", LastName = "Mehta", Email = "arjun.mehta@example.com", Phone = "9988709876" },
                new Contact { Id = 10, FirstName = "Kavita", LastName = "Chopra", Email = "kavita.chopra@example.com", Phone = "9876545678" }
            );
        }
    }
}