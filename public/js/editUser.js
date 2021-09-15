// Function to edit a user
async function editFormHandler(event) {
    event.preventDefault();

    let username = document.querySelector('input[name="user-name"]').value.trim();
    if(username.length) username = '"username": "' + username + '"';
    let password = document.querySelector('input[name="password"]').value.trim();
    if (!password.length) {
        alert('You must enter your current password to confirm changes or enter a new password.');
        return
    } else {
        password = '"password": "' + password + '"';
    }
    const id = document.querySelector('input[name="user-id"]').value;

    let userUpdate = '{' + [username, password].filter(value => value).join(',') + '}';
    userUpdate = JSON.parse(userUpdate)


    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userUpdate),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert(response.statusText);
        }

  }
  
  document.querySelector('.edit-user-form').addEventListener('submit', editFormHandler);