let events = [];
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

function loadEvents() {
    const stored = localStorage.getItem('events');
    if (stored) {
        events = JSON.parse(stored);
    } else {
        // Start with empty array if no data exists
        events = [];
        saveEvents();
    }
}

function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}
function toggleEventForm() {
  const form = document.getElementById('event-add-card');
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
    document.getElementById('add-event-form').reset();
  }
}

function addEvent(event) {
  event.preventDefault();
  
  const projectId = parseInt(document.getElementById('event-project').value);
  const name = document.getElementById('event-name').value;
  const location = document.getElementById('event-location').value;
  const date = document.getElementById('event-date').value;
  const required = parseInt(document.getElementById('event-required').value);
  
  if (!projectId || !name || !location || !date || !required) {
    alert('Please fill all required fields');
    return;
  }
  
  const newEvent = {
    id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
    project_id: projectId,
    name: name,
    date: date,
    location: location,
    required: required
  };
  
  events.push(newEvent);
  saveEvents();
  
  // Refresh the table
  renderEvents();
  
  // Reset form and hide it
  document.getElementById('add-event-form').reset();
  toggleEventForm();
  
  alert('Event added successfully!');
}

function renderEvents() {
  const tbody = document.querySelector("#event-table tbody");
  if (!tbody) return;
  
  tbody.innerHTML = '';
  events.forEach((e) => {
    const proj = projects.find((p) => p.id === e.project_id);
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" +
      e.id +
      "</td><td>" +
      (proj ? proj.name : "-") +
      "</td><td>" +
      e.name +
      "</td><td>" +
      e.date +
      "</td><td>" +
      e.location +
      "</td><td>" +
      e.required +
      "</td>";
    tbody.appendChild(tr);
  });
  attachSearch("event-table", "event-search");
}

function pageInit() {
  loadEvents();
  renderEvents();
}

// Make functions globally available
window.toggleEventForm = toggleEventForm;
window.addEvent = addEvent;
