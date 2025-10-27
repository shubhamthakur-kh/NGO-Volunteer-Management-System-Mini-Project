const assignments = [
  {
    id: 1,
    volunteer_id: 1,
    event_id: 1,
    assigned_date: "2025-10-05",
    hours: 6.5,
    role: "Survey assistant",
    status: "assigned",
  },
  {
    id: 2,
    volunteer_id: 2,
    event_id: 3,
    assigned_date: "2025-10-05",
    hours: 4.0,
    role: "Tutor",
    status: "completed",
  },
  {
    id: 3,
    volunteer_id: 3,
    event_id: 2,
    assigned_date: "2025-11-09",
    hours: 8.0,
    role: "Site labour",
    status: "assigned",
  },
  {
    id: 4,
    volunteer_id: 4,
    event_id: 4,
    assigned_date: "2025-10-17",
    hours: 5.0,
    role: "Packing lead",
    status: "assigned",
  },
  {
    id: 5,
    volunteer_id: 1,
    event_id: 2,
    assigned_date: "2025-11-10",
    hours: 0.0,
    role: "Volunteer",
    status: "assigned",
  },
];
const volunteers = [
  {
    id: 1,
    first: "Shubham",
    last: "Thakur",
    email: "shubham.thakur@example.com",
    phone: "+919999888777",
    city: "Pune",
    status: "active",
    joined: "2025-07-01",
  },
  {
    id: 2,
    first: "Riya",
    last: "Singh",
    email: "riya.singh@example.com",
    phone: "+919888777666",
    city: "Mumbai",
    status: "active",
    joined: "2024-09-10",
  },
  {
    id: 3,
    first: "Amit",
    last: "Kumar",
    email: "amit.kumar@example.com",
    phone: "+919777666555",
    city: "Delhi",
    status: "active",
    joined: "2023-05-05",
  },
  {
    id: 4,
    first: "Fatima",
    last: "Shaikh",
    email: "fatima.shaikh@example.com",
    phone: "+919666555444",
    city: "Hyderabad",
    status: "active",
    joined: "2024-12-12",
  },
  {
    id: 5,
    first: "John",
    last: "Doe",
    email: "john.doe@example.com",
    phone: "+919555444333",
    city: "Goa",
    status: "inactive",
    joined: "2022-01-01",
  },
];
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
function pageInit() {
  const tbody = document.querySelector("#assign-table tbody");
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
