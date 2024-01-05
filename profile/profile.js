document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logout-button').addEventListener('click', logoutUser);
    document.getElementById('add-car-form').addEventListener('submit', addCarToUser);

   // Logout functionality
    document.getElementById('logout-button').addEventListener('click', function() {
            fetch('https://japaneseapi-d77dff58683e.herokuapp.com/api/users/logout', {
                method: 'POST',
                credentials: 'include'
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

        async function addCarToUser(event) {
            event.preventDefault();
            const make = document.getElementById('make').value;
            const model = document.getElementById('model').value;
            const year = document.getElementById('year').value;

            try {
                const response = await fetch('https://japaneseapi-d77dff58683e.herokuapp.com/api/your-add-car-endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ make, model, year }),
                });
                if(!response.ok) {
                    throw new Error('Faiiled to add car');
                }
                    const result = await response.json();
                    console.log('Car aded:', result);
            } catch (error) {
                console.error('Error:', error);
            }
        }
});