function deleteCar(make, model, year, carElement) {
    fetch(`https://japaneseapi-d77dff58683e.herokuapp.com/api/cars/${make}/${model}/${year}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log('Car deleted successfully');
            carElement.remove(); 
        } else {
            throw new Error('Failed to delete car');
        }
    })
    .catch(error => console.error('Error:', error));
}

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
                carClone.setAttribute('data-make', car.make);
                carClone.setAttribute('data-model',car.model);
                carClone.setAttribute('data-year', car.year);
                carClone.querySelector('.car-make-model').textContent = `${car.make} ${car.model}`;
                carClone.querySelector('.car-year').textContent = `Year: ${car.year}`;

                const deleteButton = carClone.querySelector('.delete-car-button');
                deleteButton.addEventListener('click', function(){
                    deleteCar(car.make, car.model, car.year, carClone);
                });

                container.appendChild(carClone);
            });
        })
        .catch(error => console.error('Error', error));

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

    // Update cars
    document.getElementById("updateCarForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const make = document.getElementById("update-make").value;
        const model = document.getElementById("update-model").value;
        const year = document.getElementById("update-year").value;
        const updatedData = {
            make: document.getElementById("update-new-make").value,
            model: document.getElementById("update-new-model").value,
            year: document.getElementById("update-new-year").value
        };

        fetch(`https://japaneseapi-d77dff58683e.herokuapp.com/api/cars/${make}/${model}/${year}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update car');
            }
        })
        .then(updatedCar => {
            console.log('Car updated successfully:', updatedCar);
        
            const carElements = document.querySelectorAll('.car');
        
            carElements.forEach(carElement => {
                if (carElement.getAttribute('data-make') === make &&
                    carElement.getAttribute('data-model') === model &&
                    carElement.getAttribute('data-year') === year.toString()) {
                    carElement.querySelector('.car-make-model').textContent = `${updatedCar.make} ${updatedCar.model}`;
                    carElement.querySelector('.car-year').textContent = `Year: ${updatedCar.year}`;
                    carElement.setAttribute('data-make', updatedCar.make);
                    carElement.setAttribute('data-model', updatedCar.model);
                    carElement.setAttribute('data-year', updatedCar.year.toString());
                }
            });
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