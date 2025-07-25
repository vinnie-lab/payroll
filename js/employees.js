           
document.addEventListener('DOMContentLoaded', () => {
    // --- Sample Data ---
    const allEmployees = [
        { id: 'EMP001', name: 'Vincent Amonde', department: 'Technology', position: 'Lead Developer', email: 'vincent@example.com', phone: '0712345678', joined: '2021-05-12', status: 'Active', gender: 'Male' },
        { id: 'EMP002', name: 'Clinton Ndalo', department: 'HR', position: 'HR Manager', email: 'clinto@example.com', phone: '0723456789', joined: '2020-01-20', status: 'Active', gender: 'Female' },
        { id: 'EMP003', name: 'Vincent Nyunja', department: 'Finance', position: 'Accountant', email: 'nyunja@example.com', phone: '0734567890', joined: '2022-08-01', status: 'Active', gender: 'Male' },
        { id: 'EMP004', name: 'Eunice Okelo', department: 'Technology', position: 'UI/UX Designer', email: 'eunice@example.com', phone: '0745678901', joined: '2021-11-15', status: 'Active', gender: 'Female' },
        { id: 'EMP005', name: 'Leornard Oyungu', department: 'Marketing', position: 'Marketing Lead', email: 'leornard@example.com', phone: '0756789012', joined: '2019-03-10', status: 'Active', gender: 'Male' },
        { id: 'EMP006', name: 'Mercy Adhiambo', department: 'Technology', position: 'Frontend Developer', email: 'mercy.a@example.com', phone: '0767890123', joined: '2023-02-28', status: 'Active', gender: 'Female' },
        { id: 'EMP007', name: 'Nancy Waititu', department: 'Operations', position: 'Manager', email: 'nancy.w@example.com', phone: '0778901234', joined: '2018-07-01', status: 'On Leave', gender: 'Female' },
        { id: 'EMP008', name: 'Laura Hill', department: 'Finance', position: 'Analyst', email: 'laura.h@example.com', phone: '0789012345', joined: '2023-06-19', status: 'Active', gender: 'Female' },

        { id: 'EMP001', name: 'Vincent Amonde', department: 'Technology', position: 'Lead Developer', email: 'vincent@example.com', phone: '0712345678', joined: '2021-05-12', status: 'Active', gender: 'Male' },
        { id: 'EMP002', name: 'Clinton Ndalo', department: 'HR', position: 'HR Manager', email: 'clinto@example.com', phone: '0723456789', joined: '2020-01-20', status: 'Active', gender: 'Female' },
        { id: 'EMP003', name: 'Vincent Nyunja', department: 'Finance', position: 'Accountant', email: 'nyunja@example.com', phone: '0734567890', joined: '2022-08-01', status: 'Active', gender: 'Male' },
        { id: 'EMP004', name: 'Eunice Okelo', department: 'Technology', position: 'UI/UX Designer', email: 'eunice@example.com', phone: '0745678901', joined: '2021-11-15', status: 'Active', gender: 'Female' },
        { id: 'EMP005', name: 'Leornard Oyungu', department: 'Marketing', position: 'Marketing Lead', email: 'leornard@example.com', phone: '0756789012', joined: '2019-03-10', status: 'Active', gender: 'Male' },
        { id: 'EMP006', name: 'Mercy Adhiambo', department: 'Technology', position: 'Frontend Developer', email: 'mercy.a@example.com', phone: '0767890123', joined: '2023-02-28', status: 'Active', gender: 'Female' },
        { id: 'EMP007', name: 'Nancy Waititu', department: 'Operations', position: 'Manager', email: 'nancy.w@example.com', phone: '0778901234', joined: '2018-07-01', status: 'On Leave', gender: 'Female' },
        { id: 'EMP008', name: 'Laura Hill', department: 'Finance', position: 'Analyst', email: 'laura.h@example.com', phone: '0789012345', joined: '2023-06-19', status: 'Active', gender: 'Female' },

        { id: 'EMP001', name: 'Vincent Amonde', department: 'Technology', position: 'Lead Developer', email: 'vincent@example.com', phone: '0712345678', joined: '2021-05-12', status: 'Active', gender: 'Male' },
        { id: 'EMP002', name: 'Clinton Ndalo', department: 'HR', position: 'HR Manager', email: 'clinto@example.com', phone: '0723456789', joined: '2020-01-20', status: 'Active', gender: 'Female' },
        { id: 'EMP003', name: 'Vincent Nyunja', department: 'Finance', position: 'Accountant', email: 'nyunja@example.com', phone: '0734567890', joined: '2022-08-01', status: 'Active', gender: 'Male' },
        { id: 'EMP004', name: 'Eunice Okelo', department: 'Technology', position: 'UI/UX Designer', email: 'eunice@example.com', phone: '0745678901', joined: '2021-11-15', status: 'Active', gender: 'Female' },
        { id: 'EMP005', name: 'Leornard Oyungu', department: 'Marketing', position: 'Marketing Lead', email: 'leornard@example.com', phone: '0756789012', joined: '2019-03-10', status: 'Active', gender: 'Male' },
        { id: 'EMP006', name: 'Mercy Adhiambo', department: 'Technology', position: 'Frontend Developer', email: 'mercy.a@example.com', phone: '0767890123', joined: '2023-02-28', status: 'Active', gender: 'Female' },
        { id: 'EMP007', name: 'Nancy Waititu', department: 'Operations', position: 'Manager', email: 'nancy.w@example.com', phone: '0778901234', joined: '2018-07-01', status: 'On Leave', gender: 'Female' },
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
        document.getElementById('modalEmpStatus').innerHTML = `<span class="status-badge status-${employee.status.toLowerCase().replace(' ', '-')}">${employee.status}</span>`;
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
            const statusClass = emp.status === 'Active' ? 'success' : 'on-leave';
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

        if (pageCount <= 1) {
            return;
        }

        // Previous Button
        const prevBtn = document.createElement('button');
        prevBtn.innerText = 'Previous';
        prevBtn.classList.add('pagination-btn');
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            currentPage--;
            displayTable();
            setupPagination();
        });
        paginationContainer.appendChild(prevBtn);

        // Page Status Indicator
        const pageStatus = document.createElement('span');
        pageStatus.classList.add('pagination-status');
        pageStatus.textContent = `Page ${currentPage} of ${pageCount}`;
        paginationContainer.appendChild(pageStatus);

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.innerText = 'Next';
        nextBtn.classList.add('pagination-btn');
        nextBtn.disabled = currentPage === pageCount;
        nextBtn.addEventListener('click', () => {
            currentPage++;
            displayTable();
            setupPagination();
        });
        paginationContainer.appendChild(nextBtn);
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



// --- Sidebar Toggle Logic ---
    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebarCloseBtn = document.querySelector('.sidebar-close-btn');
        const dashboardContainer = document.querySelector('.dashboard-container');
        const sidebar = document.querySelector('.sidebar');

        // Ensure all elements exist before adding listeners
        if (menuToggle && sidebarCloseBtn && dashboardContainer && sidebar) {
            
            // Function to open the sidebar
            const openSidebar = () => {
                dashboardContainer.classList.add('sidebar-visible');
            };

            // Function to close the sidebar
            const closeSidebar = () => {
                dashboardContainer.classList.remove('sidebar-visible');
            };

            // --- Event Listeners ---

            // 1. Click hamburger icon to OPEN
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevents the document click listener from firing
                openSidebar();
            });

            // 2. Click 'X' button to CLOSE
            sidebarCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeSidebar();
            });

            // 3. Click OUTSIDE the sidebar to CLOSE
            document.addEventListener('click', (e) => {
                // Check if the sidebar is visible and the click was outside the sidebar itself
                if (dashboardContainer.classList.contains('sidebar-visible') && !sidebar.contains(e.target)) {
                    closeSidebar();
                }
            });
        }
    });
