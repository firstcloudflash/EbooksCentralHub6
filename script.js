// Custom scripts for EbooksCentralHub

document.addEventListener('DOMContentLoaded', function() {
    console.log('EbooksCentralHub scripts loaded');

    // Toggle navigation menu on small screens
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });

    // Fetching eBooks from API
    async function fetchEbooks() {
        try {
            const response = await fetch('/api/products'); // Replace with your actual API endpoint
            if (!response.ok) throw new Error('Failed to fetch eBooks');
            const ebooks = await response.json();
            displayEbooks(ebooks);
        } catch (error) {
            console.error('Error fetching eBooks:', error);
        }
    }

    function displayEbooks(ebooks) {
        const ebookContainer = document.querySelector('#ebook-container');
        if (!ebookContainer) return;

        ebookContainer.innerHTML = ''; // Clear existing content

        ebooks.forEach(ebook => {
            const ebookElement = document.createElement('div');
            ebookElement.classList.add('ebook-item');
            ebookElement.innerHTML = `
                <h3>${ebook.title}</h3>
                <p>${ebook.description}</p>
                <p>Price: $${ebook.price}</p>
                <button class="btn btn-primary add-to-cart" data-id="${ebook.id}">Add to Cart</button>
            `;
            ebookContainer.appendChild(ebookElement);
        });

        // Add event listeners for "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Example AJAX request to add an item to the shopping cart
    async function addToCart(event) {
        const ebookId = event.target.getAttribute('data-id');
        console.log(`Adding eBook with ID ${ebookId} to cart.`);

        try {
            const response = await fetch('/api/cart', { // Replace with your actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: ebookId })
            });
            if (!response.ok) throw new Error('Failed to add to cart');
            const result = await response.json();
            console.log('Add to cart response:', result);
            alert('eBook added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }

    // Basic form validation for contact forms
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            console.log('Form submitted:', { name, email, message });
            alert('Your message has been sent successfully!');
            contactForm.reset(); // Reset the form fields
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Load initial eBook data
    fetchEbooks();
});
