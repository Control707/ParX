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