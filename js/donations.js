const donations = [
  {
    id: 1,
    donor_id: 1,
    project_id: 1,
    amount: 5000,
    date: "2025-07-15",
    type: "one_time",
    note: "For water wells",
  },
  {
    id: 2,
    donor_id: 2,
    project_id: 2,
    amount: 2000,
    date: "2025-09-10",
    type: "one_time",
    note: "Tutoring materials",
  },
  {
    id: 3,
    donor_id: 3,
    project_id: null,
    amount: 10000,
    date: "2025-08-01",
    type: "one_time",
    note: "General support",
  },
  {
    id: 4,
    donor_id: 1,
    project_id: 3,
    amount: 15000,
    date: "2025-09-01",
    type: "one_time",
    note: "Disaster relief pledge",
  },
];
const donors = [
  {
    id: 1,
    name: "Kiran Charitable Trust",
    email: "contact@kirantrust.org",
    phone: "+919123123123",
  },
  {
    id: 2,
    name: "Anita Sharma",
    email: "anita.sharma@example.com",
    phone: "+919999000111",
  },
  {
    id: 3,
    name: "Global Aid",
    email: "info@globalaid.org",
    phone: "+441234567890",
  },
];
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
function pageInit() {
  const tbody = document.querySelector("#donation-table tbody");
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
