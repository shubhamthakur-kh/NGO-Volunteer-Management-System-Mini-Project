// Event Data
const events = [
  {
    id: 1,
    project_id: 1,
    name: "Well Site Survey",
    date: "2025-10-20",
    location: "Village A",
    required: 8,
  },
  {
    id: 2,
    project_id: 1,
    name: "Well Installation Day",
    date: "2025-11-10",
    location: "Village B",
    required: 12,
  },
  {
    id: 3,
    project_id: 2,
    name: "Tutoring Session Oct",
    date: "2025-10-05",
    location: "Community Center",
    required: 6,
  },
  {
    id: 4,
    project_id: 3,
    name: "Relief Supplies Packing",
    date: "2025-10-18",
    location: "Warehouse",
    required: 10,
  },
];

// Project Data
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

// Render Table
function pageInit() {
  const tbody = document.querySelector("#event-table tbody");
  tbody.innerHTML = ""; // Prevent duplicates

  events.forEach((e) => {
    const proj = projects.find((p) => p.id === e.project_id);
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${e.id}</td>
      <td>${proj ? proj.name : "-"}</td>
      <td>${e.name}</td>
      <td>${e.date}</td>
      <td>${e.location}</td>
      <td>${e.required}</td>
    `;

    tbody.appendChild(tr);
  });

  attachSearch("event-table", "event-search");
}

// Show/Hide Add Event Form
function toggleEventForm() {
  const card = document.getElementById("event-add-card");
  card.style.display = card.style.display === "none" ? "block" : "none";
}

// Add Event Logic
function addEvent(e) {
  e.preventDefault();

  const project_id = parseInt(document.getElementById("event-project").value);
  const name = document.getElementById("event-name").value;
  const location = document.getElementById("event-location").value;
  const date = document.getElementById("event-date").value;
  const required = parseInt(document.getElementById("event-required").value);

  const newEvent = {
    id: events.length + 1,
    project_id,
    name,
    date,
    location,
    required,
  };

  events.push(newEvent);

  // Refresh table
  pageInit();

  // Hide form
  toggleEventForm();

  // Reset form
  document.getElementById("add-event-form").reset();
}

// Make functions globally available for inline HTML calls
window.toggleEventForm = toggleEventForm;
window.addEvent = addEvent;
window.pageInit = pageInit;

// Run on page load
document.addEventListener("DOMContentLoaded", pageInit);
