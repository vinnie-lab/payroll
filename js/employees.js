document.addEventListener('DOMContentLoaded', () => {
            // --- Sample Data ---
            const allEmployees = [
                { id: 'EMP001', name: 'Vincent Amonde', department: 'Technology', position: 'Lead Developer', email: 'john.d@example.com', phone: '0712345678', joined: '2021-05-12', status: 'Active', gender: 'Male' },
                { id: 'EMP002', name: 'Clinton Ndalo', department: 'HR', position: 'HR Manager', email: 'jane.s@example.com', phone: '0723456789', joined: '2020-01-20', status: 'Active', gender: 'Female' },
                { id: 'EMP003', name: 'Vincent Nyunja', department: 'Finance', position: 'Accountant', email: 'robert.b@example.com', phone: '0734567890', joined: '2022-08-01', status: 'Active', gender: 'Male' },
                { id: 'EMP004', name: 'Eunice Okelo', department: 'Technology', position: 'UI/UX Designer', email: 'emily.w@example.com', phone: '0745678901', joined: '2021-11-15', status: 'Active', gender: 'Female' },
                { id: 'EMP005', name: 'Leornard Oyungu', department: 'Marketing', position: 'Marketing Lead', email: 'michael.g@example.com', phone: '0756789012', joined: '2019-03-10', status: 'Active', gender: 'Male' },
                { id: 'EMP006', name: 'Mercy Adhiambo', department: 'Technology', position: 'Frontend Developer', email: 'sarah.b@example.com', phone: '0767890123', joined: '2023-02-28', status: 'Active', gender: 'Female' },
                { id: 'EMP007', name: 'Nancy Waititu', department: 'Operations', position: 'Manager', email: 'david.k@example.com', phone: '0778901234', joined: '2018-07-01', status: 'On Leave', gender: 'Male' },
                { id: 'EMP008', name: 'Laura Hill', department: 'Finance', position: 'Analyst', email: 'laura.h@example.com', phone: '0789012345', joined: '2023-06-19', status: 'Active', gender: 'Female' },
            ];

            let filteredEmployees = [...allEmployees];
            let currentPage = 1;
            const rowsPerPage = 5;

            const tableBody = document.getElementById('employeeTableBody');
            const searchInput = document.getElementById('employeeSearchInput');
            const paginationContainer = document.getElementById('pagination');
            const modal = document.getElementById('employeeModal');
            const closeBtn = document.querySelector('.close-btn');
            const closeFooterBtn = document.querySelector('.close-btn-footer');

            // --- Modal Logic ---
            const openModal = (employee) => {
                document.getElementById('modalEmpName').textContent = employee.name;
                document.getElementById('modalEmpId').textContent = employee.id;
                document.getElementById('modalEmpDept').textContent = employee.department;
                document.getElementById('modalEmpPos').textContent = employee.position;
                document.getElementById('modalEmpEmail').textContent = employee.email;
                document.getElementById('modalEmpPhone').textContent = employee.phone;
                document.getElementById('modalEmpJoined').textContent = employee.joined;
                document.getElementById('modalEmpStatus').innerHTML = `<span class="status-badge status-${employee.status.toLowerCase()}">${employee.status}</span>`;
                modal.style.display = 'block';
            };

            const closeModal = () => {
                modal.style.display = 'none';
            };
            
            closeBtn.onclick = closeModal;
            closeFooterBtn.onclick = closeModal;
            window.onclick = (event) => {
                if (event.target == modal) {
                    closeModal();
                }
            };

            // --- Table & Pagination Logic ---
            const displayTable = () => {
                tableBody.innerHTML = '';
                const startIndex = (currentPage - 1) * rowsPerPage;
                const endIndex = startIndex + rowsPerPage;
                const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

                if (paginatedEmployees.length === 0) {
                    tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No employees found.</td></tr>';
                    return;
                }

                paginatedEmployees.forEach(emp => {
                    const row = document.createElement('tr');
                    
                    const statusClass = emp.status === 'Active' ? 'success' : 'danger';

                    row.innerHTML = `
                        <td>${emp.id}</td>
                        <td>${emp.name}</td>
                        <td>${emp.department}</td>
                        <td><span class="status-badge status-${statusClass}">${emp.status}</span></td>
                        <td><button class="btn btn-sm btn-secondary view-btn">View</button></td>
                    `;

                    row.querySelector('.view-btn').addEventListener('click', () => openModal(emp));
                    tableBody.appendChild(row);
                });
            };

            const setupPagination = () => {
                paginationContainer.innerHTML = '';
                const pageCount = Math.ceil(filteredEmployees.length / rowsPerPage);

                for (let i = 1; i <= pageCount; i++) {
                    const btn = document.createElement('button');
                    btn.innerText = i;
                    btn.classList.add('pagination-btn');
                    if (i === currentPage) {
                        btn.classList.add('active');
                    }
                    btn.addEventListener('click', () => {
                        currentPage = i;
                        displayTable();
                        setupPagination();
                    });
                    paginationContainer.appendChild(btn);
                }
            };

            // --- Search Logic ---
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                filteredEmployees = allEmployees.filter(emp => 
                    emp.id.toLowerCase().includes(searchTerm)
                );
                currentPage = 1;
                displayTable();
                setupPagination();
            });

            // Initial Load
            displayTable();
            setupPagination();
        });