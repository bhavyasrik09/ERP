// ================= Dashboard Charts =================
document.addEventListener("DOMContentLoaded", () => {

  // ---------- Attendance Chart ----------
  const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
  new Chart(attendanceCtx, {
    type: 'bar',
    data: {
      labels: ['CSE-A', 'CSE-B', 'ECE-A', 'ECE-B', 'EEE-A', 'EEE-B', 'MECH-A', 'MECH-B'],
      datasets: [{
        label: 'Average Attendance %',
        data: [92, 88, 85, 80, 90, 87, 89, 86],
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });

  // ---------- Marks Chart ----------
  const marksCtx = document.getElementById('marksChart').getContext('2d');
  new Chart(marksCtx, {
    type: 'line',
    data: {
      labels: ['Programming', 'Data Structures', 'Databases', 'OS', 'Software Engineering'],
      datasets: [{
        label: 'Average Marks',
        data: [78, 82, 74, 80, 88],
        borderColor: 'rgba(255, 99, 132, 0.8)',
        fill: false,
        tension: 0.4
      }]
    },
    options: { responsive: true }
  });

  // ---------- Fees Collected Chart ----------
  const feesCtx = document.getElementById('feesChart').getContext('2d');
  new Chart(feesCtx, {
    type: 'pie',
    data: {
      labels: ['CSE-BE', 'ECE-BE', 'EEE-BE', 'MECH-BE'],
      datasets: [{
        label: 'Fees Collected',
        data: [250000, 200000, 180000, 220000],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ]
      }]
    },
    options: { responsive: true }
  });

  // ---------- Library Transactions Chart ----------
  const libraryCtx = document.getElementById('libraryChart').getContext('2d');
  new Chart(libraryCtx, {
    type: 'doughnut',
    data: {
      labels: ['Borrowed', 'Available'],
      datasets: [{
        label: 'Library Books',
        data: [12, 8],
        backgroundColor: [
          'rgba(153, 102, 255, 0.7)',
          'rgba(201, 203, 207, 0.7)'
        ]
      }]
    },
    options: { responsive: true }
  });

  // ---------- Hostel Occupancy Chart ----------
  const hostelCtx = document.getElementById('hostelChart').getContext('2d');
  new Chart(hostelCtx, {
    type: 'bar',
    data: {
      labels: ['Alpha', 'Beta'],
      datasets: [{
        label: 'Occupied Beds',
        data: [5, 3],
        backgroundColor: 'rgba(255, 159, 64, 0.7)'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, stepSize: 1 } }
    }
  });

});
