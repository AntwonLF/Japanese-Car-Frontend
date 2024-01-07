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
});
