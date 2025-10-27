// Load data from localStorage
function getAssignments() {
    const stored = localStorage.getItem('assignments');
    return stored ? JSON.parse(stored) : [];
}

function getVolunteers() {
    const stored = localStorage.getItem('volunteers');
    return stored ? JSON.parse(stored) : [];
}

function getEvents() {
    const stored = localStorage.getItem('events');
    return stored ? JSON.parse(stored) : [];
}

function renderAssignments() {
    const tbody = document.querySelector("#assign-table tbody");
    if (!tbody) return;
    
    const assignments = getAssignments();
    const volunteers = getVolunteers();
    const events = getEvents();
    
    tbody.innerHTML = '';
    assignments.forEach((a) => {
        const vol = volunteers.find((v) => v.id === a.volunteer_id);
        const ev = events.find((e) => e.id === a.event_id);
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" +
            a.id +
            "</td><td>" +
            (vol ? vol.first + " " + vol.last : "-") +
            "</td><td>" +
            (ev ? ev.name : "-") +
            "</td><td>" +
            a.assigned_date +
            "</td><td>" +
            a.hours +
            "</td><td>" +
            a.role +
            "</td><td>" +
            a.status +
            "</td>";
        tbody.appendChild(tr);
    });
    attachSearch("assign-table", "assign-search");
}

function pageInit() {
    renderAssignments();
}
