let donors = [];

function loadDonors() {
    const stored = localStorage.getItem('donors');
    if (stored) {
        donors = JSON.parse(stored);
    } else {
        // Start with empty array if no data exists
        donors = [];
        saveDonors();
    }
    renderDonors();
}

function saveDonors() {
    localStorage.setItem('donors', JSON.stringify(donors));
}

function toggleDonorForm() {
  const form = document.getElementById('donor-add-card');
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
    document.getElementById('add-donor-form').reset();
  }
}

function addDonor(event) {
  event.preventDefault();
  
  const name = document.getElementById('donor-name').value;
  const email = document.getElementById('donor-email').value;
  const phone = document.getElementById('donor-phone').value;
  const address = document.getElementById('donor-address').value || '';
  
  if (!name || !email || !phone) {
    alert('Please fill all required fields');
    return;
  }
  
  const newDonor = {
    id: donors.length + 1,
    name: name,
    email: email,
    phone: phone,
    address: address
  };
  
  donors.push(newDonor);
  saveDonors();
  renderDonors();
  
  // Reset form and hide it
  document.getElementById('add-donor-form').reset();
  toggleDonorForm();
  
  alert('Donor added successfully!');
}

function renderDonors() {
  const tbody = document.querySelector("#donor-table tbody");
  if (!tbody) return;
  
  tbody.innerHTML = '';
  donors.forEach((d) => {
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" +
      d.id +
      "</td><td>" +
      d.name +
      "</td><td>" +
      d.email +
      "</td><td>" +
      d.phone +
      "</td>";
    tbody.appendChild(tr);
  });
  attachSearch("donor-table", "donor-search");
}

function pageInit() {
  loadDonors();
}

// Make functions globally available
window.toggleDonorForm = toggleDonorForm;
window.addDonor = addDonor;
