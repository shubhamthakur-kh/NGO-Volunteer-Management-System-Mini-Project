const donors = [{"id": 1, "name": "Kiran Charitable Trust", "email": "contact@kirantrust.org", "phone": "+919123123123"}, {"id": 2, "name": "Anita Sharma", "email": "anita.sharma@example.com", "phone": "+919999000111"}, {"id": 3, "name": "Global Aid", "email": "info@globalaid.org", "phone": "+441234567890"}];
function pageInit(){
  const tbody = document.querySelector('#donor-table tbody');
  donors.forEach(d=>{
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>'+d.id+'</td><td>'+d.name+'</td><td>'+d.email+'</td><td>'+d.phone+'</td>';
    tbody.appendChild(tr);
  });
  attachSearch('donor-table','donor-search');
}
