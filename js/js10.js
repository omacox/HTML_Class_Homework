document.addEventListener('DOMContentLoaded', function () {
    initializeSlider();
    initializeFormHandling();
    initializeNavLinks();
    initializeImageCarousel();
});

function initializeSlider() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const imageFolder = 'images/';
    const imageFiles = ['GURHZ9nb0AAxGbA.png', 'GUT8X0jWsAQXDri.jpeg', 'GUUjaJgWQAAjvii.jpeg', 'GUVSEewWIAAIvFA.png', 'GUVvDkGa8AAsx8.jpeg', 'GUgkWZfW0AAQkax.jpeg'];
    let currentIndex = 0;

    // Load images into the slider
    imageFiles.forEach(file => {
        const img = document.createElement('img');
        img.src = imageFolder + file;
        sliderWrapper.appendChild(img);
    });

    const images = sliderWrapper.querySelectorAll('img');
    const totalImages = images.length;

    // Function to update the slider
    function updateSlider() {
        images.forEach((img, index) => {
            img.classList.remove('active');
            //if (index === currentIndex) {
            //    img.classList.add('active');
            // }
            if (index === currentIndex) {
                console.log(`Displaying image: ${img.src}`);
                img.classList.add('active');
            }
        });
        currentIndex = (currentIndex + 1) % totalImages;
    }

    // Initial call to set up the first image
    updateSlider();

    // Set an interval to automatically slide images
    setInterval(updateSlider, 5000); // 5 seconds
}

function initializeFormHandling() {
    const form = document.getElementById('contactForm');
    const additionalInfo = document.getElementById('additional');

    // Auto-expand textarea
    additionalInfo.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Form validation and submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Remove existing error messages
        document.querySelectorAll('.error').forEach(el => el.remove());

        let isValid = true;

        // Validate email
        const email = document.getElementById('email');
        if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate homepage
        const homepage = document.getElementById('homepage');
        if (!isValidURL(homepage.value)) {
            showError(homepage, 'Please enter a valid URL');
            isValid = false;
        }

        // Validate date of birth
        const dob = document.getElementById('dob');
        if (!isValidDate(dob.value)) {
            showError(dob, 'Please enter a valid date in YYYY-MM-DD format');
            isValid = false;
        }

        // Check if all required fields are filled
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value) {
                showError(field, 'This field is required');
                isValid = false;
            }
        });

        if (isValid) {
            // Create JSON file
            const formData = new FormData(form);
            const jsonData = JSON.stringify(Object.fromEntries(formData));

            console.log(jsonData);

            // Create and download JSON file
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'form_data.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Clear the form manually
            clearForm();

            // Show success message
            alert('Form submitted successfully! JSON file has been downloaded.');

            // Scroll back to the top of the form
            form.scrollIntoView({ behavior: 'smooth' });
        }
    });

    function clearForm() {
        // Clear all input fields
        form.querySelectorAll('input').forEach(input => {
            if (input.type !== 'submit') {
                input.value = '';
            }
        });

        // Clear textarea
        additionalInfo.value = '';
        additionalInfo.style.height = 'auto';

        // If you have any select elements, reset them to their first option
        form.querySelectorAll('select').forEach(select => {
            select.selectedIndex = 0;
        });
    }

    function showError(element, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        element.parentNode.insertBefore(error, element.nextSibling);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    function isValidDate(date) {
        return !isNaN(Date.parse(date));
    }
}

function initializeNavLinks() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            sections.forEach(section => {
                section.style.display = 'none';
            });

            document.getElementById(targetId).style.display = 'block';

            if (targetId === 'news') {
                fetchRSSFeed();
            }
        });
    });

    function fetchRSSFeed() {
        const RSS_URL = 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml';
        const feedContainer = document.getElementById("rss-feed-container");

        feedContainer.innerHTML = '<p>Loading news...</p>';

        fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(RSS_URL))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status !== 'ok') {
                    throw new Error('Feed status is not ok');
                }

                const items = data.items;
                if (items.length === 0) {
                    feedContainer.innerHTML = '<p>No news items available at the moment. Please check back later.</p>';
                    return;
                }

                let html = '';
                items.forEach(item => {
                    html += `
                        <article>
                            <h3>
                                <a href="${item.link}" target="_blank" rel="noopener">
                                    ${item.title}
                                </a>
                            </h3>
                            <p>${item.description}</p>
                        </article>
                    `;
                });
                feedContainer.innerHTML = html;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                feedContainer.innerHTML = '<p>Error loading news. Please try again later.</p>';
            });
    }
}

function initializeImageCarousel() {
    // Image carousel functionality
    const images = ['GURHZ9nb0AAxGbA.png', 'GUT8X0jWsAQXDri.jpeg', 'GUUjaJgWQAAjvii.jpeg', 'GUVSEewWIAAIvFA.png', 'GUVvDkGa8AAsx8.jpeg', 'GUgkWZfW0AAQkax.jpeg'];
    let currentImageIndex = 0;
    const carouselImage = document.getElementById('carousel-image');
    const prevImageButton = document.querySelector('#images .carousel-button.prev');
    const nextImageButton = document.querySelector('#images .carousel-button.next');

    function updateCarouselImage() {
        carouselImage.src = `images/${images[currentImageIndex]}`;
    }

    prevImageButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateCarouselImage();
    });

    nextImageButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateCarouselImage();
    });

    // Initialize the carousel
    updateCarouselImage();

    function displayImagesFromFolder() {
        const imageContainer = document.querySelector('.image-container');
        const imageFolder = 'images/';
        const imageFiles = ['GURHZ9nb0AAxGbA.png', 'GUT8X0jWsAQXDri.jpeg', 'GUUjaJgWQAAjvii.jpeg', 'GUVSEewWIAAIvFA.png', 'GUVvDkGa8AAsx8.jpeg', 'GUgkWZfW0AAQkax.jpeg'];

        // Loop through each image file and create an img element
        imageFiles.forEach(file => {
            const img = document.createElement('img');
            img.src = imageFolder + file;
            img.alt = file.split('.')[0];  // Optional: Add alt text based on file name
            imageContainer.appendChild(img);
        });
    }

    // Call the function after DOM is loaded
    document.addEventListener('DOMContentLoaded', function () {
        displayImagesFromFolder();
    });
};