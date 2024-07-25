document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const welcomeMessage = document.getElementById('welcome-message');
    const mapContainer = document.getElementById('map');
    const noteMessage = document.createElement('div');

    noteMessage.textContent = "We look forward to you joining us!";
    noteMessage.classList.add('note-message');
    form.parentNode.insertBefore(noteMessage, form.nextSibling);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = form.elements[0].value;
        welcomeMessage.textContent = `Welcome, ${name}! Thank you for registering.`;
        welcomeMessage.style.display = 'block';
        form.style.border = '2px solid red';
        noteMessage.style.display = 'block';
        form.reset();
    });

    // Initialize and add the map
    function initMap() {
        // The location of the event (example coordinates)
        const eventLocation = { lat: 40.7128, lng: -74.0060 };

        // Create the map, centered at the event location
        const map = new google.maps.Map(mapContainer, {
            zoom: 12,
            center: eventLocation,
        });

        // Add a marker at the event location
        new google.maps.Marker({
            position: eventLocation,
            map: map,
            title: "Event Location"
        });
    }

    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Make initMap global so the callback can find it
    window.initMap = initMap;
});