const volunteers = [{"id": 1, "first": "Shubham", "last": "Thakur", "email": "shubham.thakur@example.com", "phone": "+919999888777", "city": "Pune", "status": "active", "joined": "2025-07-01"}, {"id": 2, "first": "Riya", "last": "Singh", "email": "riya.singh@example.com", "phone": "+919888777666", "city": "Mumbai", "status": "active", "joined": "2024-09-10"}, {"id": 3, "first": "Amit", "last": "Kumar", "email": "amit.kumar@example.com", "phone": "+919777666555", "city": "Delhi", "status": "active", "joined": "2023-05-05"}, {"id": 4, "first": "Fatima", "last": "Shaikh", "email": "fatima.shaikh@example.com", "phone": "+919666555444", "city": "Hyderabad", "status": "active", "joined": "2024-12-12"}, {"id": 5, "first": "John", "last": "Doe", "email": "john.doe@example.com", "phone": "+919555444333", "city": "Goa", "status": "inactive", "joined": "2022-01-01"}];
function pageInit(){
  const tbody = document.querySelector('#vol-table tbody');
  volunteers.forEach(v=>{
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>'+v.id+'</td><td>'+v.first+' '+v.last+'</td><td>'+v.email+'</td><td>'+v.phone+'</td><td>'+v.city+'</td><td>'+v.status+'</td><td>'+v.joined+'</td>';
    tbody.appendChild(tr);
  });
  attachSearch('vol-table','vol-search');
}
