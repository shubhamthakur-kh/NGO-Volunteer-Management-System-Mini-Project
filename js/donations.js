let donations = [];

// Load donors and projects from localStorage
function getDonors() {
    const stored = localStorage.getItem('donors');
    return stored ? JSON.parse(stored) : [];
}

const projects = [
  {
    id: 1,
    name: "Clean Water Initiative",
    status: "ongoing",
    goal: 50000,
    funds: 12000,
  },
  {
    id: 2,
    name: "Education Support",
    status: "ongoing",
    goal: 30000,
    funds: 8000,
  },
  {
    id: 3,
    name: "Disaster Relief",
    status: "planning",
    goal: 100000,
    funds: 25000,
  },
];

function loadDonations() {
    const stored = localStorage.getItem('donations');
    if (stored) {
        donations = JSON.parse(stored);
    } else {
        // Start with empty array if no data exists
        donations = [];
        saveDonations();
    }
}

function saveDonations() {
    localStorage.setItem('donations', JSON.stringify(donations));
}

function toggleDonationForm() {
  const form = document.getElementById('donation-add-card');
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
    document.getElementById('add-donation-form').reset();
  }
}

function addDonation(event) {
  event.preventDefault();
  
  const donorId = parseInt(document.getElementById('donation-donor').value);
  const projectId = parseInt(document.getElementById('donation-project').value) || null;
  const amount = parseFloat(document.getElementById('donation-amount').value);
  const date = document.getElementById('donation-date').value;
  const type = document.getElementById('donation-type').value;
  const note = document.getElementById('donation-note').value || '';
  
  if (!donorId || !amount || !date || !type) {
    alert('Please fill all required fields');
    return;
  }

  // ✅ Date validation — prevent past dates
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // remove time for fair comparison

  if (selectedDate < today) {
    alert('Donation date cannot be in the past.');
    return;
  }
  
  const newDonation = {
    id: donations.length > 0 ? Math.max(...donations.map(d => d.id)) + 1 : 1,
    donor_id: donorId,
    project_id: projectId,
    amount: amount,
    date: date,
    type: type,
    note: note
  };
  
  donations.push(newDonation);
  saveDonations();
  
  // Refresh the table
  renderDonations();
  
  // Reset form and hide it
  document.getElementById('add-donation-form').reset();
  toggleDonationForm();
  
  alert('Donation added successfully!');
}

function renderDonations() {
  const tbody = document.querySelector("#donation-table tbody");
  if (!tbody) return;
  
  const donors = getDonors();
  
  tbody.innerHTML = '';
  donations.forEach((d) => {
    const donor = donors.find((x) => x.id === d.donor_id);
    const proj = projects.find((x) => x.id === d.project_id);
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" +
      d.id +
      "</td><td>" +
      (donor ? donor.name : "-") +
      "</td><td>" +
      (proj ? proj.name : "General") +
      "</td><td>₹" +
      d.amount.toFixed(2) +
      "</td><td>" +
      d.date +
      "</td><td>" +
      d.type +
      "</td>";
    tbody.appendChild(tr);
  });
  attachSearch("donation-table", "donation-search");
}

function populateDonorDropdown() {
    const donors = getDonors();
    const donorSelect = document.getElementById('donation-donor');
    
    if (donorSelect) {
        // Clear existing options except the first one
        donorSelect.innerHTML = '<option value="">Select Donor</option>';
        
        // Add donors from localStorage
        donors.forEach(donor => {
            const option = document.createElement('option');
            option.value = donor.id;
            option.textContent = donor.name;
            donorSelect.appendChild(option);
        });
    }
}

function pageInit() {
  loadDonations();
  renderDonations();
  
  // Populate donor dropdown with data from localStorage
  populateDonorDropdown();
  
  // Listen for changes in donors to update dropdown
  window.addEventListener('storage', function(e) {
    if (e.key === 'donors') {
      populateDonorDropdown();
    }
  });

  // ✅ Set min date for donation-date input
  const dateInput = document.getElementById("donation-date");
  if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0];
  }
}

// Make functions globally available
window.toggleDonationForm = toggleDonationForm;
window.addDonation = addDonation;
window.pageInit = pageInit;
