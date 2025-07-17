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







var DepartmentGenderBarOptions = {
          series: [{
          name: 'Male',
          data: [44, 55, 41, 67, 22, 43, 21, 49]
        }, {
          name: 'Female',
          data: [13, 23, 20, 8, 13, 27, 33, 12]
        }, {
          name: 'Other',
          data: [11, 17, 15, 15, 21, 14, 15, 13]
        }],
          chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          stackType: '100%',
          toolbar: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            
            horizontal: true,
            dataLabels: {
              position: 'top' // 'top' | 'center' | 'bottom'
            }

          }
        },
        xaxis: {
          categories: ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations',
            'R&D', 'Customer Support'
          ],
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'bottom',
          offsetX: 0,
          offsetY: 0
        },
        };

        var DepartmentGenderBar = new ApexCharts(document.querySelector("#departmentGenderBar"), DepartmentGenderBarOptions);
        DepartmentGenderBar.render();



var empByDeptChartoptions = {
  series: [44, 55, 41, 17, 15],
  labels: ['IT', 'HR', 'Finance', 'Marketing', 'Sales'],  // 🔽 Department names
  chart: {
    type: 'donut',
    width: 380
  },
  legend: {
    position: 'bottom',           // 🔽 Always show legend at bottom
    horizontalAlign: 'center',    // 🔽 Optional: aligns like flex-row
    offsetY: 10
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
};
var empByDeptChart = new ApexCharts(document.querySelector("#empByDeptChart"), empByDeptChartoptions);
empByDeptChart.render();