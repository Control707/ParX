document.addEventListener('DOMContentLoaded', function () {

    // Constants based on the provided information
    const imageWidth = 1280; // Image width in pixels
    const imageHeight = 720; // Image height in pixels
    const spotWidth = 17; // Width of each spot in pixels
    const spotHeight = 36; // Height of each spot in pixels
    const startingTopPositionFirstRow = 10; // Starting top position for the first row in pixels
    const startingLeftPosition = 121; // Starting left position in pixels
    const startingTopPositionSecondRow = 80; // Starting top position for the second row in pixels

    // Function to calculate percentage width for each spot
    function calculatePercentageWidth() {
        return (spotWidth / imageWidth) * 100;
    }

    // Function to calculate percentage height for each spot
    function calculatePercentageHeight() {
        return (spotHeight / imageHeight) * 100;
    }

    // Function to calculate percentage top position for each spot in the first row
    function calculatePercentageTopFirstRow(index) {
        return ((startingTopPositionFirstRow / imageHeight) * 100);
    }

    // Function to calculate percentage top position for each spot in the second row
    function calculatePercentageTopSecondRow(index) {
        return ((startingTopPositionSecondRow / imageHeight) * 100);
    }

    // Function to calculate percentage left position for each spot
    function calculatePercentageLeft(index) {
        return (((index % 55) * spotWidth) / imageWidth) * 100 + (startingLeftPosition / imageWidth) * 100;
    }


    // Your other JavaScript code goes here...



    const parkingSpotContainer = document.getElementById('parking-spots');
    const totalSpotsFirstRow = 55; // Total number of spots in the first row
    const totalSpotsSecondRow = 32; // Total number of spots in the second row
    const totalSpots = totalSpotsFirstRow + totalSpotsSecondRow;

    // Generate both rows of parking spots
    for (let i = 0; i < totalSpots; i++) {
        const spot = document.createElement('div');
        spot.className = 'parking-spot available';
        spot.setAttribute('data-spot-id', i + 1);
        spot.style.width = `${calculatePercentageWidth()}%`;
        spot.style.height = `${calculatePercentageHeight()}%`;
        if (i < totalSpotsFirstRow) {
            spot.style.top = `${calculatePercentageTopFirstRow(i)}%`;
        } else {
            spot.style.top = `${calculatePercentageTopSecondRow(i - totalSpotsFirstRow)}%`;
        }
        spot.style.left = `${calculatePercentageLeft(i)}%`;
        parkingSpotContainer.appendChild(spot);

        spot.addEventListener('click', (event) => {
            const spotId = event.target.dataset.spotId;
            openReservationModal(spotId);
        });
    }


    //resreved spots




    const parkingSpots = document.querySelectorAll('.parking-spot');
    const errorModal = document.getElementById('error-modal');
    const errorMessage = document.getElementById('error-message');
    const closeErrorModal = document.getElementById('close-error-modal');

    parkingSpots.forEach((spot) => {
        spot.addEventListener('click', function () {
            if (this.classList.contains('reserved')) {
                // Spot is reserved, display the error message in the modal
                errorMessage.textContent = 'This spot is reserved.';
                errorMessage.classList.add('red-text'); // Add red color to the message
                errorModal.style.display = 'block';
            } else {
                // Implement reservation logic for available spots here
                // For example, open a reservation form
            }
        });
    });

    // Close the error modal when clicking the close button (x)
    closeErrorModal.addEventListener('click', function () {
        errorModal.style.display = 'none';
    });

    // Close the error modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === errorModal) {
            errorModal.style.display = 'none';
        }
    });


    // ... Existing JavaScript code ...


    const reservationModal = document.getElementById('reservation-modal');
    const closeReservationModal = document.getElementById('close-reservation-modal');
    const reservationForm = document.getElementById('reservation-form');
    const dayInput = document.getElementById('day');
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    const costDisplay = document.getElementById('cost-display');
    function openReservationModal(spotId) {
        // Display the spot ID in the modal
        const spotIdInModal = document.getElementById('spot-id-in-modal');
        spotIdInModal.textContent = `Spot ID: ${spotId}`;
    }
    // Open the reservation modal when an available spot is clicked
    parkingSpots.forEach((spot) => {
        spot.addEventListener('click', function () {
            if (this.classList.contains('available')) {
                const spotId = this.dataset.spotId; // Get the spot ID
                openReservationModal(spotId); // Pass the spot ID to the modal function
                reservationModal.style.display = 'block';
            } else {
                // Handle reserved spots or other logic
            }
        });
    });

    // Close the reservation modal when the close button is clicked
    closeReservationModal.addEventListener('click', function () {
        reservationModal.style.display = 'none';
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === reservationModal) {
            reservationModal.style.display = 'none';
        }
    });

    // Dynamically populate options for "from" and "to" hours
    // You can adjust the range and formatting as needed
    for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        fromSelect.innerHTML += `<option value="${hour}:00">${hour}:00</option>`;
        toSelect.innerHTML += `<option value="${hour}:00">${hour}:00</option>`;
    }

    // Calculate and display estimated cost when form values change
    [dayInput, fromSelect, toSelect].forEach((element) => {
        element.addEventListener('change', calculateCost);
    });

    function calculateCost() {
        // Implement your cost calculation logic based on selected values
        // For demonstration, we'll assume a flat rate per hour
        const fromHour = parseInt(fromSelect.value.split(':')[0]);
        const toHour = parseInt(toSelect.value.split(':')[0]);
        const hoursSelected = toHour - fromHour;
        const cost = hoursSelected * 10; // Adjust the rate as needed
        costDisplay.textContent = `Estimated Cost: $${cost}`;
    }

    // Handle form submission
    reservationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Implement redirection to a payment page here
        alert('Redirecting to the payment page...');
        reservationModal.style.display = 'none';
    });



    // ... More JavaScript code ...
});


