// Constants based on the provided information
const imageWidth = 1280; // Image width in pixels
const imageHeight = 770; // Image height in pixels
const totalSpots = 120; // Total number of spots
const spotWidth = 17; // Width of each spot in pixels
const spotHeight = 36; // Height of each spot in pixels
const startingTopPosition = 15; // Starting top position in pixels
const startingLeftPosition = 121; // Starting left position in pixels

// Function to calculate percentage width for each spot
function calculatePercentageWidth() {
    return (spotWidth / imageWidth) * 100;
}

// Function to calculate percentage height for each spot
function calculatePercentageHeight() {
    return (spotHeight / imageHeight) * 100;
}

// Function to calculate percentage top position for each spot
function calculatePercentageTop(index) {
    //const row = Math.floor(index / 50); // Assuming 10 spots per row
    return (startingTopPosition / imageHeight) * 100;
}

// Function to calculate percentage left position for each spot
function calculatePercentageLeft(index) {
    const col = index % 55;
    return ((col * spotWidth) / imageWidth) * 100 + (startingLeftPosition / imageWidth) * 100;
}

// Function to handle reserving a parking spot
function reserveParkingSpot(spotId) {
    // You can implement logic here to handle the reservation
    alert(`Parking spot ${spotId} reserved!`);
}

// Function to open the reservation modal for a parking spot
function openReservationModal(spotId) {
    // Assuming you have a modal element with id "reservation-modal"
    const modal = document.getElementById('reservation-modal');
    modal.style.display = 'block';  // Display the modal

    // Assuming you have a div to display the spot ID in the modal
    const spotIdDisplay = document.getElementById('spot-id-display');
    spotIdDisplay.textContent = `Spot ID: ${spotId}`;

    // Assuming you have a button to reserve the spot in the modal
    const reserveButton = document.getElementById('reserve-button');
    reserveButton.addEventListener('click', () => {
        reserveParkingSpot(spotId);
        modal.style.display = 'none'; // Close the modal after reservation
    });

    // Display the modal
    modal.style.display = 'block';
}

// Function to display an error modal
function displayErrorModal(message) {
    // Assuming you have a modal element with id "error-modal"
    const modal = document.getElementById('error-modal');

    // Assuming you have a div to display the error message in the modal
    const errorMessageDisplay = document.getElementById('error-message-display');
    errorMessageDisplay.textContent = message;

    // Display the modal
    modal.style.display = 'block';
}

// Your other JavaScript code goes here...

// For example, you can add event listeners to your parking spot elements to open the reservation modal
// Assuming you have parking spot elements with class "parking-spot" and data-spot-id attributes
const parkingSpotContainer = document.getElementById('parking-spots');
for (let i = 0; i < totalSpots; i++) {
    const spot = document.createElement('div');
    spot.className = 'parking-spot available';
    spot.setAttribute('data-spot-id', i + 1);
    spot.style.width = `${calculatePercentageWidth()}%`;
    spot.style.height = `${calculatePercentageHeight()}%`;
    spot.style.top = `${calculatePercentageTop(i)}%`;
    spot.style.left = `${calculatePercentageLeft(i)}%`;
    parkingSpotContainer.appendChild(spot);

    spot.addEventListener('click', (event) => {
        const spotId = event.target.dataset.spotId;
        openReservationModal(spotId);
    });
}

// Close the reservation modal when clicking on the close button
const closeButton = document.getElementById('modal-close-button');
closeButton.addEventListener('click', () => {
    const modal = document.getElementById('reservation-modal');
    modal.style.display = 'none';
});
