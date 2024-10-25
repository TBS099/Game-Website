//Main JS file for the site
// Helper function to validate the password strength
function password_checker(password) {
    const passwordRegex = /^(?=.*[0-9]).*$/;
    return passwordRegex.test(password);
}

//Function to show messages (both error and success)
function show_feedback_message(type, message, form_title, form_message) {
    form_title.style.marginBottom = '20px';
    form_message.innerHTML = `<div class="${type} message">${message}</div>`;
}

// Function to save user data to localStorage
function save_data(username, password, email, postcode, high_score) {
    const user_data = {
        password: password,
        email: email,
        postcode: postcode,
        high_score: high_score
    };
    localStorage.setItem(username, JSON.stringify(user_data));
}

// Function to handle user login
function user_login(submit_btnId, form_message, form_title) {
    const submitBtn = document.getElementById(submit_btnId);
    const formMessage = document.getElementById(form_message);
    const formTitle = document.getElementById(form_title);

    // Check if the login form is present
    if (document.querySelector('.game-login')) {
        submitBtn.addEventListener('click', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const user_data = JSON.parse(localStorage.getItem(username));

            // Check if user exists and password matches
            if (user_data && user_data.password === password) {
                // Set the logged-in user in session storage
                sessionStorage.setItem('logged_in_user', username);
                show_feedback_message('success', 'Login Successful', formTitle, formMessage);

                // Redirect to a specific URL after a second
                setTimeout(function () {
                    window.location.href = '.././game-home.html'; // Redirects to the given HTML page
                }, 1000);
            } else {
                show_feedback_message('error', 'Invalid username or password', formTitle, formMessage);
            }
        });
    }
}

// Function to change links based on user login status
function active_links() {
    if (sessionStorage.getItem('logged_in_user')) {
        // Hide login and register links, show logout link
        document.getElementById('hide-register').style.display = 'none';
        document.getElementById('hide-login').style.display = 'none';
        document.getElementById('hide-logout').style.display = 'block';
    }
    else {
        // Hide logout link, show login and register links
        document.getElementById('hide-logout').style.display = 'none';
        document.getElementById('hide-login').style.display = 'block';
        document.getElementById('hide-register').style.display = 'block';
    }
}

// Function to handle user logout
function logout() {
    if (document.getElementById('hide-logout')) {
        document.getElementById('hide-logout').addEventListener('click', function (event) {
            event.preventDefault();
            sessionStorage.removeItem('logged_in_user');
            window.location.href = '.././game-home.html'; // Redirects to the given html page
        });
    }
}

// Function to handle user registration
function register_user(formId, submit_btnId, messageId, titleId) {
    const registration_form = document.getElementById(formId);
    const submit_btn = document.getElementById(submit_btnId);
    const form_message = document.getElementById(messageId);
    const form_title = document.getElementById(titleId);
    const postcodeRegEx = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i;
    const passwordRegex = /^(?=.*[0-9]).*$/;

    // Function to validate form data
    function validation(username, password, confirm_password, email, postcode) {
        if (username === '' || password === '' || confirm_password === '' || email === '' || postcode === '') {
            show_feedback_message('error', 'All fields are required', form_title, form_message);
            return false;
        }

        if (postcodeRegEx.test(postcode) === false) {
            show_feedback_message('error', 'Invalid postcode', form_title, form_message);
            return false;
        }

        if (password !== confirm_password) {
            show_feedback_message('error', 'Passwords do not match', form_title, form_message);
            return false;
        }

        if (password.length < 7) {
            show_feedback_message('error', 'Password must be at least 7 characters long', form_title, form_message);
            return false;
        }
        else {
            if (passwordRegex.test(password) === false) {
                show_feedback_message('error', 'Password must contain at least 1 number', form_title, form_message);
                return false;
            }
        }

        if (localStorage.getItem(username) !== null) {
            show_feedback_message('error', 'Username already exists', form_title, form_message);
            return false;
        }

        for (let i = 0; i < localStorage.length; i++) {
            const existingUser = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (existingUser.email === email) {
                show_feedback_message('error', 'Email already in use', form_title, form_message);
                return false;
            }
        }

        return true; // All validations passed
    }

    // Event listener for form submission
    if (registration_form) {
        submit_btn.addEventListener('click', function (event) {
            event.preventDefault();

            // Clear existing messages
            if (form_message.innerHTML !== '') {
                form_message.innerHTML = '';
                form_title.style.marginBottom = '50px';
            }

            // Pull form data
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirm_password = document.getElementById('confirm-password').value;
            const email = document.getElementById('email').value;
            const postcode = document.getElementById('postcode').value;

            // Validate form data
            if (validation(username, password, confirm_password, email, postcode)) {
                // Save user data to localStorage
                save_data(username, password, email, postcode, 0);

                // Show success message
                show_feedback_message('success', 'Registration successful', form_title, form_message);

                //Set the logged-in user in session storage
                sessionStorage.setItem('logged_in_user', username);

                // Redirect to a specific URL after a second
                setTimeout(function () {
                    window.location.href = '.././game-home.html'; // Redirects to the given html page
                }, 1000);
            }
        });
    }
}

//Function to populate the leaderboard
function rankings_table() {
    if (document.querySelector('.leaderboard-list ol')) {
        const leaderboard_list = document.querySelector('.leaderboard-list ol');

        // Retrieve all player data from localStorage
        const players = [];
        for (let i = 0; i < localStorage.length; i++) {
            const username = localStorage.key(i);
            const user_data = JSON.parse(localStorage.getItem(username));
            if (user_data && user_data.high_score !== undefined) {
                players.push({ name: username, score: user_data.high_score });
            }
        }

        // Sort players by score in descending order
        players.sort((a, b) => b.score - a.score);

        // Prepare the top 10 players (or TBD if not enough)
        const top_players = players.slice(0, 10);

        // Populate the leaderboard with top players or TBD
        for (let i = 0; i < 10; i++) {
            const li = document.createElement('li'); // Create a new li element
            const leaderboard_div = document.createElement('div'); // Create a new div for leaderboard item
            leaderboard_div.classList.add('leaderboard-item'); // Add class

            // Create spans for player name and score
            const player_span = document.createElement('span');
            const score_span = document.createElement('span');

            if (i < top_players.length) {
                // Populate with actual player data
                player_span.classList.add('player-name');
                player_span.textContent = top_players[i].name; // Set player name

                score_span.classList.add('player-score');
                score_span.textContent = top_players[i].score; // Set player score
            } else {
                // Fill remaining slots with TBD
                player_span.classList.add('player-name');
                player_span.textContent = 'TBD'; // Placeholder name

                score_span.classList.add('player-score');
                score_span.textContent = '0'; // Placeholder score
            }

            // Append the spans to the leaderboard item
            leaderboard_div.appendChild(player_span);
            leaderboard_div.appendChild(score_span);

            // Append the leaderboard item to the list item
            li.appendChild(leaderboard_div);

            // Append the list item to the leaderboard list
            leaderboard_list.appendChild(li);
        }
    }
}

// Call functions to run on page load
user_login('submit-btn', 'form-message', 'form-title');
active_links();
logout();
register_user('game-registration-form', 'submit-btn', 'form-message', 'form-title');
rankings_table();