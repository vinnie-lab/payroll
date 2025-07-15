// Line Chart - Monthly Payroll Trends
    const monthlyPayrollCtx = document.getElementById('monthlyPayrollChart').getContext('2d');
    new Chart(monthlyPayrollCtx, {
        type: 'line',
        data: {
            labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                data: [1200000, 1150000, 1180000, 1230000, 1300000, 1280000],
                borderColor: '#0057A3',
                backgroundColor: 'rgba(0, 87, 163, 0.1)',
                tension: 0.3,
                pointRadius: 5,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: () => null,
                        label: context => `KSh ${context.raw.toLocaleString()}`
                    }
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#333' } },
                y: {
                    grid: { display: false },
                    ticks: {
                        callback: value => 'KSh ' + value.toLocaleString(),
                        color: '#333'
                    }
                }
            }
        }
    });

    // Donut Chart - Salary by Department
    const departmentSalaryCtx = document.getElementById('departmentSalaryChart').getContext('2d');
    new Chart(departmentSalaryCtx, {
        type: 'bar',
        data: {
            labels: ['HR', 'Finance', 'IT', 'Operations', 'Sales'],
            datasets: [{
                data: [350000, 420000, 500000, 390000, 460000],
                backgroundColor: ['#3EAF7C', '#2C9F67', '#8AD7B1', '#57BA92', '#146B4D'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            cutout: '60%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: () => null,
                        label: context => `${context.label}: KSh ${context.raw.toLocaleString()}`
                    }
                }
            }
        }
    });