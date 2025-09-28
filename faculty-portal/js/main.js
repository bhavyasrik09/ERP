// Navigate between pages
function navigate(page) {
  window.location.href = page;
}

// Example Dashboard Charts (using Chart.js)
function renderDashboardCharts() {
  const ctx1 = document.getElementById('attendanceChart');
  const ctx2 = document.getElementById('feesChart');

  if(ctx1) {
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Programming', 'Data Structures', 'Databases', 'Software Engg'],
        datasets: [{
          label: 'Attendance %',
          data: [85, 90, 75, 80],
          backgroundColor: '#3498db'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, max: 100 } }
      }
    });
  }

  if(ctx2) {
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
        datasets: [{
          label: 'Fees Collected',
          data: [5000, 4500, 6000, 7000],
          borderColor: '#27ae60',
          backgroundColor: 'rgba(39, 174, 96,0.2)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}

// Call on dashboard load
if(document.getElementById('attendanceChart') || document.getElementById('feesChart')){
  window.onload = renderDashboardCharts;
}
