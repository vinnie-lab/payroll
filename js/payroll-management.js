document.addEventListener('DOMContentLoaded', () => {
    // --- Sample Data ---
    const pendingPayrolls = [
        { id: 'PR001', department: 'Technology', month: 'July', year: 2025, amount: 1200000, status: 'Pending' },
        { id: 'PR002', department: 'Finance', month: 'March', year: 2025, amount: 800000, status: 'Pending' },
        { id: 'PR003', department: 'HR', month: 'July', year: 2025, amount: 500000, status: 'Pending' },

        { id: 'PR0020', department: 'Technology', month: 'July', year: 2025, amount: 1200000, status: 'Pending' },
        { id: 'PR0022', department: 'Finance', month: 'March', year: 2025, amount: 800000, status: 'Pending' },
        { id: 'PR0032', department: 'HR', month: 'July', year: 2025, amount: 500000, status: 'Pending' },

        { id: 'PR001', department: 'Technology', month: 'July', year: 2025, amount: 1200000, status: 'Pending' },
        { id: 'PR0021', department: 'Finance', month: 'March', year: 2025, amount: 800000, status: 'Pending' },
        { id: 'PR0031', department: 'HR', month: 'July', year: 2025, amount: 500000, status: 'Pending' }
    ];
    const payrollHistory = [
        { id: 'PR0011', department: 'Technology', month: 'August', year: 2022, amount: 1100000, status: 'Approved' },
        { id: 'PR0024', department: 'Finance', month: 'June', year: 2024, amount: 750000, status: 'Approved' },
        { id: 'PR0034', department: 'HR', month: 'May', year: 2024, amount: 480000, status: 'Approved' },
        { id: 'PR0011', department: 'Technology', month: 'August', year: 2022, amount: 1100000, status: 'Approved' },
        { id: 'PR0024', department: 'Finance', month: 'June', year: 2024, amount: 750000, status: 'Approved' },
        { id: 'PR0034', department: 'HR', month: 'May', year: 2024, amount: 480000, status: 'Approved' },
        { id: 'PR0011', department: 'Technology', month: 'August', year: 2022, amount: 1100000, status: 'Approved' },
        { id: 'PR0024', department: 'Finance', month: 'June', year: 2024, amount: 750000, status: 'Approved' },
        { id: 'PR0034', department: 'HR', month: 'May', year: 2024, amount: 480000, status: 'Approved' },
        { id: 'PR0011', department: 'Technology', month: 'August', year: 2022, amount: 1100000, status: 'Approved' },
        { id: 'PR0024', department: 'Finance', month: 'June', year: 2024, amount: 750000, status: 'Approved' },
        { id: 'PR0034', department: 'HR', month: 'May', year: 2024, amount: 480000, status: 'Approved' }
    ];
    // --- Utility ---
    function formatCurrency(val) { return 'KES ' + val.toLocaleString(); }
    
    // --- Fill Year/Month Selects ---
    function fillYearMonth(selectYear, selectMonth) {
        const years = [2025, 2024, 2023];
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        selectYear.innerHTML = '<option value="">Year</option>' + years.map(y => `<option>${y}</option>`).join('');
        selectMonth.innerHTML = '<option value="">Month</option>' + months.map(m => `<option>${m}</option>`).join('');
    }
    fillYearMonth(document.getElementById('pendingPayrollYear'), document.getElementById('pendingPayrollMonth'));
    fillYearMonth(document.getElementById('historyPayrollYear'), document.getElementById('historyPayrollMonth'));
    // --- Pending Payrolls Table with Pagination ---
    let filteredPending = [...pendingPayrolls];
    let pendingCurrentPage = 1;
    const pendingRowsPerPage = 5;

    function applyPendingFilters() {
        const term = document.getElementById('pendingPayrollSearch').value.toLowerCase();
        const year = document.getElementById('pendingPayrollYear').value;
        const month = document.getElementById('pendingPayrollMonth').value;

        filteredPending = pendingPayrolls.filter(p => {
            const matchesId = !term || p.id.toLowerCase().includes(term);
            const matchesYear = !year || p.year == year;
            const matchesMonth = !month || p.month == month;
            return matchesId && matchesYear && matchesMonth;
        });
        pendingCurrentPage = 1;
        renderPendingPayrolls();
    }

    document.getElementById('pendingPayrollSearch').addEventListener('input', applyPendingFilters);
    document.getElementById('pendingPayrollYear').addEventListener('change', applyPendingFilters);
    document.getElementById('pendingPayrollMonth').addEventListener('change', applyPendingFilters);

    function renderPendingPayrolls() {
        const tbody = document.getElementById('pendingPayrollTableBody');
        const start = (pendingCurrentPage - 1) * pendingRowsPerPage;
        const end = start + pendingRowsPerPage;
        const pageRows = filteredPending.slice(start, end);

        tbody.innerHTML = pageRows.length ? pageRows.map(p =>
            `<tr>
                <td>${p.id}</td>
                <td>${p.department}</td>
                <td>${p.month}</td>
                <td>${p.year}</td>
                <td>KES ${p.amount.toLocaleString()}</td>
                <td><span class="status-badge status-danger">${p.status}</span></td>
                <td>
                    <button class="btn small-btn-success approve-btn" data-id="${p.id}">Approve</button>
                    <button class="btn small-btn-secondary view-btn" data-id="${p.id}">Download</button>
                </td>
            </tr>`
        ).join('') : '<tr><td colspan="7" style="text-align:center;">No payrolls found.</td></tr>';

        // Pagination controls
        const pag = document.getElementById('pendingPayrollPagination');
        if (pag) {
            pag.innerHTML = '';
            const pageCount = Math.ceil(filteredPending.length / pendingRowsPerPage);
            if (pageCount > 1) {
                const prev = document.createElement('button');
                prev.textContent = 'Previous';
                prev.className = 'pagination-btn';
                prev.disabled = pendingCurrentPage === 1;
                prev.onclick = () => { pendingCurrentPage--; renderPendingPayrolls(); };
                pag.appendChild(prev);

                const status = document.createElement('span');
                status.className = 'pagination-status';
                status.textContent = `Page ${pendingCurrentPage} of ${pageCount}`;
                pag.appendChild(status);

                const next = document.createElement('button');
                next.textContent = 'Next';
                next.className = 'pagination-btn';
                next.disabled = pendingCurrentPage === pageCount;
                next.onclick = () => { pendingCurrentPage++; renderPendingPayrolls(); };
                pag.appendChild(next);
            }
        }
    }
    renderPendingPayrolls();

    // --- Payroll History Table with Pagination ---
    let filteredHistory = [...payrollHistory];
    let historyCurrentPage = 1;
    const historyRowsPerPage = 5;

    function applyHistoryFilters() {
        const term = document.getElementById('historyPayrollSearch').value.toLowerCase();
        const year = document.getElementById('historyPayrollYear').value;
        const month = document.getElementById('historyPayrollMonth').value;

        filteredHistory = payrollHistory.filter(p => {
            const matchesId = !term || p.id.toLowerCase().includes(term);
            const matchesYear = !year || p.year == year;
            const matchesMonth = !month || p.month == month;
            return matchesId && matchesYear && matchesMonth;
        });
        historyCurrentPage = 1;
        renderHistoryTable();
    }

    document.getElementById('historyPayrollSearch').addEventListener('input', applyHistoryFilters);
    document.getElementById('historyPayrollYear').addEventListener('change', applyHistoryFilters);
    document.getElementById('historyPayrollMonth').addEventListener('change', applyHistoryFilters);

    function renderHistoryTable() {
        const tbody = document.getElementById('historyPayrollTableBody');
        const start = (historyCurrentPage - 1) * historyRowsPerPage;
        const end = start + historyRowsPerPage;
        const pageRows = filteredHistory.slice(start, end);

        tbody.innerHTML = pageRows.length ? pageRows.map(p =>
            `<tr>
                <td>${p.id}</td>
                <td>${p.department}</td>
                <td>${p.month}</td>
                <td>${p.year}</td>
                <td>KES ${p.amount.toLocaleString()}</td>
                <td><span class="status-badge status-success">${p.status}</span></td>
                <td>
                    <a href="#" data-id="${p.id}">Download</a>
                    
                </td>
            </tr>`
        ).join('') : '<tr><td colspan="7" style="text-align:center;">No payrolls found.</td></tr>';

        // Pagination controls
        const pag = document.getElementById('payrollPagination');
        pag.innerHTML = '';
        const pageCount = Math.ceil(filteredHistory.length / historyRowsPerPage);
        if (pageCount > 1) {
            const prev = document.createElement('button');
            prev.textContent = 'Previous';
            prev.className = 'pagination-btn';
            prev.disabled = historyCurrentPage === 1;
            prev.onclick = () => { historyCurrentPage--; renderHistoryTable(); };
            pag.appendChild(prev);

            const status = document.createElement('span');
            status.className = 'pagination-status';
            status.textContent = `Page ${historyCurrentPage} of ${pageCount}`;
            pag.appendChild(status);

            const next = document.createElement('button');
            next.textContent = 'Next';
            next.className = 'pagination-btn';
            next.disabled = historyCurrentPage === pageCount;
            next.onclick = () => { historyCurrentPage++; renderHistoryTable(); };
            pag.appendChild(next);
        }
    }
    renderHistoryTable();
    // --- Modal Logic ---
    const payrollModal = document.getElementById('payrollModal');
    function openPayrollModal(payroll) {
        document.getElementById('modalTitle').textContent = `Payroll ${payroll.id}`;
        document.getElementById('modalBody').innerHTML = `
            <p><strong>Department:</strong> ${payroll.department}</p>
            <p><strong>Month:</strong> ${payroll.month}</p>
            <p><strong>Year:</strong> ${payroll.year}</p>
            <p><strong>Total Amount:</strong> ${formatCurrency(payroll.amount)}</p>
            <p><strong>Status:</strong> ${payroll.status}</p>
        `;
        payrollModal.classList.add('show');
    }
    document.getElementById('closePayrollModal').onclick = ()=>payrollModal.classList.remove('show');
    document.getElementById('closePayrollModalFooter').onclick = ()=>payrollModal.classList.remove('show');
    // --- Table Actions ---
    document.getElementById('pendingPayrollTableBody').addEventListener('click', e => {
        if(e.target.classList.contains('approve-btn')){
            const id = e.target.dataset.id;
            // Approve logic here
            alert('Payroll '+id+' approved!');
        }
        if(e.target.classList.contains('view-btn')){
            const id = e.target.dataset.id;
            const payroll = pendingPayrolls.find(p=>p.id===id);
            openPayrollModal(payroll);
        }
    });
    document.getElementById('historyPayrollTableBody').addEventListener('click', e => {
        const id = e.target.dataset.id;
        if(e.target.classList.contains('payslip-btn')){
            // Generate/download payslip logic
            alert('Payslip for '+id+' generated!');
        }
        if(e.target.classList.contains('view-btn')){
            const payroll = payrollHistory.find(p=>p.id===id);
            openPayrollModal(payroll);
        }
        if(e.target.classList.contains('update-btn')){
            // Update payroll logic
            alert('Update payroll '+id);
        }
    });
   
    // --- Sidebar Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarCloseBtn = document.querySelector('.sidebar-close-btn');
    const dashboardContainer = document.querySelector('.dashboard-container');
    const sidebar = document.querySelector('.sidebar');
    if(menuToggle && sidebarCloseBtn && dashboardContainer && sidebar){
        menuToggle.addEventListener('click', e=>{
            e.stopPropagation();
            dashboardContainer.classList.add('sidebar-visible');
        });
        sidebarCloseBtn.addEventListener('click', e=>{
            e.stopPropagation();
            dashboardContainer.classList.remove('sidebar-visible');
        });
        document.addEventListener('click', e=>{
            if(dashboardContainer.classList.contains('sidebar-visible') && !sidebar.contains(e.target)){
                dashboardContainer.classList.remove('sidebar-visible');
            }
        });
    }
});