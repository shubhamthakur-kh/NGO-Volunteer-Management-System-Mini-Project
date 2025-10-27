// Load data from localStorage
function loadData() {
    // Load events
    const storedEvents = localStorage.getItem('events');
    const events = storedEvents ? JSON.parse(storedEvents) : [];
    
    // Load volunteers
    const storedVols = localStorage.getItem('volunteers');
    const volunteers = storedVols ? JSON.parse(storedVols) : [];
    
    // Update stats
    updateStats(volunteers.length, events.length);
    
    // Display recent donations
    displayRecentDonations();
}

function updateStats(volunteerCount, projectCount) {
    const statVol = document.getElementById('stat-vol');
    const statProjects = document.getElementById('stat-projects');
    
    if (statVol) statVol.textContent = volunteerCount;
    if (statProjects) statProjects.textContent = projectCount;
}

function displayRecentDonations() {
    const storedDonations = localStorage.getItem('donations');
    const storedDonors = localStorage.getItem('donors');
    
    const donations = storedDonations ? JSON.parse(storedDonations) : [];
    const donors = storedDonors ? JSON.parse(storedDonors) : [];
    
    // Get last 3 donations
    const recentDonations = donations.slice(-3);
    
    // Update the donations card if it exists
    const donationsCard = document.getElementById('donations-card');
    if (donationsCard && recentDonations.length > 0) {
        let html = '<div class="list-row"><div><strong>Recent Donations</strong></div></div>';
        recentDonations.forEach(d => {
            const donor = donors.find(don => don.id === d.donor_id);
            html += `<div class="list-row"><div><strong>${donor ? donor.name : 'Unknown'}</strong></div><div class="small">₹${d.amount.toFixed(2)} • ${d.date}</div></div>`;
        });
        donationsCard.innerHTML = html;
    }
}

function pageInit() {
    loadData();
}
