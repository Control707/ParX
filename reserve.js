document.addEventListener('DOMContentLoaded', function () {

    // Constants based on the provided information
    const imageWidth = 1280; // Image width in pixels
    const imageHeight = 720; // Image height in pixels
    const spotWidth = 17; // Width of each spot in pixels
    const spotHeight = 36; // Height of each spot in pixels
    const startingTopPositionFirstRow = 10; // Starting top position for the first row in pixels
    const startingLeftPosition = 121; // Starting left position in pixels
    const startingTopPositionSecondRow = 80; // Starting top position for the second row in pixels
    const totalSpotsFirstRow = 55; // Total number of spots in the first row
    const totalSpotsSecondRow = 32 + 16; // Total number of spots in the second row (including the new spot)

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
        if (index < 32) {
            return ((startingTopPositionSecondRow / imageHeight) * 100);
        } else {
            const topPosition = startingTopPositionSecondRow; // 200px space
            return ((topPosition / imageHeight) * 100);
        }
    }

    // Function to calculate percentage left position for each spot
    function calculatePercentageLeft(index) {
        if (index < totalSpotsFirstRow) {
            return (((index % 55) * spotWidth) / imageWidth) * 100 + (startingLeftPosition / imageWidth) * 100;
        } else if (index < totalSpotsFirstRow + 32) {
            return (((index - totalSpotsFirstRow) % 32) * spotWidth) / imageWidth * 100 + (startingLeftPosition / imageWidth) * 100;
        } else {
            const newSpotsLeftOffset = 776; // Left offset for new spots after spot 102
            const leftPositionAfter102 = (((index - totalSpotsFirstRow - 32) % 16) * spotWidth) / imageWidth * 100 + (newSpotsLeftOffset / imageWidth) * 100;
            return leftPositionAfter102;
        }
    }

    // Your other JavaScript code goes here...

    const parkingSpotContainer = document.getElementById('parking-spots');
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
            spot.style.top = `${calculatePercentageTopSecondRow(i)}%`;
        }
        spot.style.left = `${calculatePercentageLeft(i)}%`;
        parkingSpotContainer.appendChild(spot);

        spot.addEventListener('click', (event) => {
            const spotId = event.target.dataset.spotId;
            openReservationModal(spotId);
        });


        //vertical spots

        function generateVerticalSpots() {
            const verticalSpotWidth = 36; // Width of each vertical spot in pixels
            const verticalSpotHeight = 17; // Height of each vertical spot in pixels
            const totalVerticalSpots = 40; // Total number of vertical spots
            const verticalColumnSpacing = 30; // Spacing between the two vertical columns
            const verticalStartingTopPosition = 370; // Starting top position for vertical spots
            const verticalStartingLeftPosition = 702; // Starting left position for vertical spots

            for (let i = 0; i < totalVerticalSpots; i++) {
                const spot = document.createElement('div');
                spot.className = 'parking-spot available';
                spot.setAttribute('data-spot-id', i + totalSpotsFirstRow + totalSpotsSecondRow + 1);
                spot.style.width = `${(verticalSpotWidth / imageWidth) * 100}%`;
                spot.style.height = `${(verticalSpotHeight / imageHeight) * 100}%`;

                const columnIndex = Math.floor(i / 20); // Determine the column
                const rowIndex = i % 20;
                const leftOffset = columnIndex * (verticalSpotWidth + verticalColumnSpacing);
                const leftPosition = verticalStartingLeftPosition + leftOffset;
                const topOffset = rowIndex * verticalSpotHeight;
                const topPosition = verticalStartingTopPosition + topOffset;

                spot.style.top = `${(topPosition / imageHeight) * 100}%`;
                spot.style.left = `${(leftPosition / imageWidth) * 100}%`;

                parkingSpotContainer.appendChild(spot);

                spot.addEventListener('click', (event) => {
                    const spotId = event.target.dataset.spotId;
                    openReservationModal(spotId);
                });
            }
        }



        // Generate vertical spots
        generateVerticalSpots();

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


    // reservation modal 


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
    // Handle form submission


    // Retrieve form data





    // ... More JavaScript code ...
});
function reserveSpot() {
    const spotId = document.getElementById('spot-id-in-modal').textContent.split(' ')[2];
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('day').value;
    const cost = (parseInt(to.split(':')[0]) - parseInt(from.split(':')[0])) * 10;

    // Handle the reservation logic here
    console.log('Spot ID:', spotId);
    console.log('From:', from);
    console.log('To:', to);
    console.log('Date:', date);
    console.log('Cost:', cost);

    // Redirect to the payment page
    const paymentUrl = `payment.html?spotId=${encodeURIComponent(spotId)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&cost=${encodeURIComponent(cost)}`;
    console.log('Payment URL:', paymentUrl);
    window.location.href = paymentUrl;
}

