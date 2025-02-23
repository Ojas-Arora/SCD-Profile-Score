document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0]; 
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Please log in first!");
        window.location.href = '/login.html';
        return;
    }

    try {
        const res = await fetch('http://localhost:5000/api/v1/users/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const user = await res.json();
        document.getElementById('username').value = user.username || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('title').value = user.title || '';
        document.getElementById('linkedin').value = user.linkedin || '';

        if (user.profilePic) {
            document.getElementById('profile-img').src = user.profilePic;
        }
    } catch (err) {
        console.error('Error fetching profile:', err);
    }
});

document.getElementById('profile-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('username').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('title', document.getElementById('title').value);
    formData.append('linkedin', document.getElementById('linkedin').value);

    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length > 0) {
        formData.append('profilePic', fileInput.files[0]);
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Please log in first!");
        return;
    }

    try {
        const res = await fetch('http://localhost:5000/api/v1/users/profile', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });

        if (!res.ok) throw new Error('Profile update failed');
        const data = await res.json();

        // Update UI
        document.getElementById('profile-img').src = data.user.profilePic;
        alert("Profile updated successfully!");
    } catch (err) {
        console.error('Error updating profile:', err);
    }
});
