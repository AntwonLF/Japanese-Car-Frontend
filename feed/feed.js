document.addEventListener('DOMContentLoaded', function() {
    // Fetch cars and populate them on the page
    const container = document.getElementById('car-container');
    const template = document.getElementById('car-template');

    fetch('https://japaneseapi-d77dff58683e.herokuapp.com/api/cars')
        .then(response => response.json())
        .then(cars => {
            cars.forEach(car => {
                const carClone = template.cloneNode(true);
                carClone.style.display = 'block';
                carClone.querySelector('.car-make-model').textContent = `${car.make} ${car.model}`;
                carClone.querySelector('.car-year').textContent = `Year: ${car.year}`;
                container.appendChild(carClone);
            });
        })
        .catch(error => console.error('Error', error));

    // Function to handle liking a car
    function likeCar(carId, userId) {
        fetch(`https://japaneseapi-d77dff58683e.herokuapp.com/api/users/${userId}/like/${carId}`, {
            method: 'POST',
            // Include any necessary headers, like authentication tokens
        })
        .then(response => {
            if (response.ok) {
                console.log('Car liked successfully');
                // Optionally update the UI to reflect the like
            } else {
                console.error('Failed to like car');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Event listener for car creation form
    document.getElementById("createCarForm").addEventListener("submit", function(event) {
        event.preventDefault();
    
        const formData = {
            make: document.getElementById("make").value,
            model: document.getElementById("model").value,
            year: document.getElementById("year").value,
            // picture: document.getElementById("picture").value
        };
    
        fetch('https://japaneseapi-d77dff58683e.herokuapp.com/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to create car');
            }
        })
        .then(newCar => {
            const carClone = document.getElementById('car-template').cloneNode(true);
            carClone.style.display = 'block';
            carClone.querySelector('.car-make-model').textContent = `${newCar.make} ${newCar.model}`;
            carClone.querySelector('.car-year').textContent = `Year: ${newCar.year}`;

            // Reset the form and update the UI with the new car
            document.getElementById("createCarForm").reset();
            container.appendChild(carClone);
        })
        .catch(error => console.error('Error:', error));
    });

    // Logout button event listener
    document.getElementById('logout-button').addEventListener('click', function() {
        fetch('https://japaneseapi-d77dff58683e.herokuapp.com/api/users/logout', {
            method: 'POST',
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '../login/login.html';
            } else {
                console.error('Logout failed');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Profile button event listener
    document.getElementById('view-profile-button').addEventListener('click', function() {
        window.location.href = '../profile/profile.html'; 
    });
});
