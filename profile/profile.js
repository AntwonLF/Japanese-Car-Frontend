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

    document.getElementById('view-feed-button').addEventListener('click', function() {
        window.location.href = '../feed/feed.html'; 
    }); 

    document.getElementById('add-car-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const userEmail = sessionStorage.getItem('userEmail');
         if (!userEmail) {
            console.error('User email not found');
            return;
    }

        const  carData = {
            make: document.getElementById('make').value,
            model: document.getElementById('model').value,
            year: document.getElementById('year').value
        };
        fetch (`https://japaneseapi-d77dff58683e.herokuapp.com/api/users/email/${userEmail}/cars`, {
            methood: 'POST',
            headers: {
     },

            body: JSON.stringify(carData)
        })

        .then (response => response.json())
        .then(data => {
            console.log('Car added:', data);
        })
        .catch(error => {
            console.error('Error adding car', error);
        });
    });

});
