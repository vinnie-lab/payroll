           
document.addEventListener('DOMContentLoaded', () => {
    // --- Sample Data ---
    const allDepartments = [
        { id: 'DEP001', name: 'Administration', Manager: 'Vincent Amonde',totalEmployees: 10, email: 'admin@zephyra.com', phone: '0712345678', joined: '2021-05-12', status: 'Active' },
        { id: 'DEP002', name: 'Finance', Manager: 'Clinton Ouma',totalEmployees: 2, email: 'finance@zephyra.com', phone: '0723456789', joined: '2020-01-20', status: 'Active' },
        { id: 'DEP003', name: 'Human Resources', Manager: 'Nyunja',totalEmployees: 4, email: 'hr@zephyra.com', phone: '0734567890', joined: '2022-08-01', status: 'Active' },
        { id: 'DEP004', name: 'Sales Department', Manager: 'Eunice',totalEmployees: 5, email: 'sales@zephyra.com', phone: '0745678901', joined: '2021-11-15', status: 'Active' },
        { id: 'DEP005', name: 'Marketing', Manager: 'Leornard',totalEmployees: 15, email: 'marketing@zephyra.com', phone: '0756789012', joined: '2019-03-10', status: 'Active' },
        { id: 'DEP006', name: 'Technology', Manager: 'Mercy Adhiambo',totalEmployees: 5, email: 'tech@zephyra.com', phone: '0767890123', joined: '2023-02-28', status: 'Active' },
        { id: 'DEP007', name: 'Operations', Manager: 'Nancy Waititu',totalEmployees: 2, email: 'op@zephyra.com', phone: '0778901234', joined: '2018-07-01', status: 'On Leave' },
        { id: 'DEP008', name: 'Biostatistics', Manager: 'Laura Hill',totalEmployees: 1, email: 'bios@zephyra.com', phone: '0789012345', joined: '2023-06-19', status: 'Active' },

        
    ];

    let filteredDepartments = [...allDepartments];
    let currentPage = 1;
    const rowsPerPage = 5;

    const tableBody = document.getElementById('departmentTableBody');
    const searchInput = document.getElementById('departmentSearchInput');
    const paginationContainer = document.getElementById('pagination');
    const modal = document.getElementById('departmentModal');
    const closeBtn = document.querySelector('.close-btn');
    const closeFooterBtn = document.querySelector('.close-btn-footer');

    // --- Modal Logic ---
    const openModal = (department) => {
        document.getElementById('modalDepName').textContent = department.name;
        document.getElementById('modalDepId').textContent = department.id;
        document.getElementById('modalDepMan').textContent = department.Manager;
        document.getElementById('modalDepEmail').textContent = department.email;
        document.getElementById('modalDepPhone').textContent = department.phone;
        document.getElementById('modalDepJoined').textContent = department.joined;
        document.getElementById('modalDepTotalEmp').innerHTML = department.totalEmployees;
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
        const paginatedDepartments = filteredDepartments.slice(startIndex, endIndex);

        if (paginatedDepartments.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No Departements found.</td></tr>';
            return;
        }

        paginatedDepartments.forEach(dep => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${dep.id}</td>
                <td>${dep.name}</td>
                <td>${dep.Manager}</td>
                <td>${dep.totalEmployees}</td>
                <td><button class="btn btn-sm btn-secondary view-btn">View</button></td>
            `;
            row.querySelector('.view-btn').addEventListener('click', () => openModal(dep));
            tableBody.appendChild(row);
        });
    };

    const setupPagination = () => {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(filteredDepartments.length / rowsPerPage);

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
        filteredDepartments = allDepartments.filter(dep => 
            dep.id.toLowerCase().includes(searchTerm) || dep.name.toLowerCase().includes(searchTerm)
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
