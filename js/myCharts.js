var options = {
          series: [{
            name: 'Salary',
            data: [4000, 1000, 4408, 4700, 540, 5800, 6900, 1100, 1200, 13800]
        }],
          chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
            dataLabels: {
              position: 'top' // 'top' | 'center' | 'bottom'
            }

          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'R&D', 'Customer Support', 'Legal', 'Admin'
          ],
          title: {
            text: 'Salary in KSh'
          }
          
        },
        
        
        };

        var chart = new ApexCharts(document.querySelector("#departmentSalaryBar"), options);
        chart.render();

        var optionsLine = {
          series: [{
          name: 'Salary',
          data: [31, 40, 28, 51, 42, 109, 100, 120, 130, 140, 150, 160]
        }, {
          name: 'Bonus',
          data: [11, 32, 45, 32, 34, 52, 41, 55, 60, 65, 70, 75]
        }],
          chart: {
          height: 350,
          type: 'area',
          toolbar: false,
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',  
            'Dec'
            
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },

          
        },
        };

        var MonthlyPayrollLine = new ApexCharts(document.querySelector("#monthlyPayrollLineChart"), optionsLine);
        MonthlyPayrollLine.render();