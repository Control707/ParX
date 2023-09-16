// Function to parse URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Retrieve and display form data on the payment page
document.addEventListener('DOMContentLoaded', function () {
    const spotId = getUrlParameter('spotId');
    const from = getUrlParameter('from');
    const to = getUrlParameter('to');
    const date = getUrlParameter('date');
    const cost = getUrlParameter('cost');

    // Display the form data in the payment page elements
    document.getElementById('spot-id').textContent = `Spot ID: ${spotId}`;
    document.getElementById('date').textContent = `Date: ${date}`;
    document.getElementById('from').textContent = `From: ${from}`;
    document.getElementById('to').textContent = `To: ${to}`;
    document.getElementById('cost').textContent = `Total Cost: $${cost}`;
});

const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const spotId = document.getElementById('spot-id').textContent;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const tag = document.getElementById('tag').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const cardNumber = document.getElementById('card-number').value;
    const cardName = document.getElementById('card-name').value;
    const exp = document.getElementById('exp').value;
    const cvc = document.getElementById('cvc').value;
    const zipCode = document.getElementById('zip-code').value;

    // Get the missing values from the URL parameters
    const date = getUrlParameter('date');
    const from = getUrlParameter('from');
    const to = getUrlParameter('to');
    const cost = getUrlParameter('cost');

    // Check if all required fields are filled
    if (!firstName || !lastName || !tag || !email || !phone || !cardNumber || !cardName || !exp || !cvc || !zipCode) {
        alert('Please complete all fields correctly.');
        return; // Don't proceed with the reservation
    }

    const spotIdParts = spotId.split(' ');
    const spotIdNumeric = parseInt(spotIdParts[2]);  // Assuming the numeric part is at index 2

    const data = {
        spot_id: spotIdNumeric,
        date,
        from_time: from,
        to_time: to,
        cost,
        first_name: firstName,
        last_name: lastName,
        tag,
        email,
        phone,
        card_number: cardNumber,
        card_name: cardName,
        exp,
        cvc,
        zip_code: zipCode
    };

    try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5500/reservations', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 201) {
                    const responseData = JSON.parse(xhr.responseText);
                    console.log('Reservation successful:', responseData);

                    // Display "Payment Complete" message
                    document.getElementById('paymentForm').innerHTML = '<p>Payment Complete</p>';

                    // Redirect to index.html after 5 seconds
                    setTimeout(function () {
                        window.location.href = 'index.html';
                    }, 5000);
                } else {
                    console.error('Reservation failed:', xhr.statusText);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    } catch (error) {
        console.error('Reservation failed:', error);
    }
}


