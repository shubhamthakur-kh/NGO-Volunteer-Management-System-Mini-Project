// Volunteers data management
let volunteers = [];
    
function loadVolunteers() {
    const stored = localStorage.getItem('volunteers');
    volunteers = stored ? JSON.parse(stored) : [];
    renderVolunteers();
}

function saveVolunteers() {
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
}

function renderVolunteers() {
    const tbody = document.getElementById('vol-table')?.querySelector('tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    volunteers.forEach((vol, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${vol.name}</td>
            <td>${vol.email}</td>
            <td>${vol.phone}</td>
            <td>${vol.city}</td>
            <td><span class="badge ${vol.status === 'Active' ? 'badge-success' : 'badge-inactive'}">${vol.status}</span></td>
            <td>${vol.joined}</td>
            <td>
                <button class="btn-small" onclick="deleteVolunteer(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addVolunteer(event) {
    event.preventDefault();
    
    const name = document.getElementById('vol-name').value;
    const email = document.getElementById('vol-email').value;
    const phone = document.getElementById('vol-phone').value;
    const city = document.getElementById('vol-city').value;
    const status = document.getElementById('vol-status').value;
    
    if (!name || !email || !phone || !city) {
        alert('Please fill all required fields');
        return;
    }
    
    const newVolunteer = {
        name,
        email,
        phone,
        city,
        status,
        joined: new Date().toISOString().split('T')[0]
    };
    
    volunteers.push(newVolunteer);
    saveVolunteers();
    renderVolunteers();
    
    // Reset form
    document.getElementById('add-volunteer-form').reset();
    document.getElementById('vol-add-card').style.display = 'none';
    alert('Volunteer added successfully!');
}

function deleteVolunteer(index) {
    if (confirm('Are you sure you want to delete this volunteer?')) {
        volunteers.splice(index, 1);
        saveVolunteers();
        renderVolunteers();
    }
}

function toggleAddForm() {
    const card = document.getElementById('vol-add-card');
    if (card) {
        card.style.display = card.style.display === 'none' ? 'block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadVolunteers();
    attachSearch('vol-table', 'vol-search');
});

// Make functions available globally
window.deleteVolunteer = deleteVolunteer;
window.toggleAddForm = toggleAddForm;
window.addVolunteer = addVolunteer;