document.addEventListener('DOMContentLoaded', function() {
    // logout 
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

    // add car to profile 
    document.getElementById('add-car-form').addEventListener('submit', addCarToUser);

    async function addCarToUser(event) {
        event.preventDefault();
        const make = document.getElementById('make').value;
        const model = document.getElementById('model').value;
        const year = document.getElementById('year').value;

        const car = { make, model, year };
        
        let cars = JSON.parse(localStorage.getItem('userCars')) || [];

        try {
            const response = await fetch(`https://japaneseapi-d77dff58683e.herokuapp.com/api/users/${userId}/cars`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ make, model, year }),
            });
            if(!response.ok) {
                throw new Error('Failed to add car');
            }
            const result = await response.json();
            console.log('Car added:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    document.getElementById('view-feed-button').addEventListener('click', function() {
        window.location.href = '../feed/feed.html'; 
    }); 
});
