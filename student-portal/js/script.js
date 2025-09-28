const API_URL = "https://script.google.com/macros/s/AKfycbwO4FPtIQl84aDjCnvIz9rERm5frgIO_pR6G16j5BYwFGKHJngSsE2hmv2zhRmY7u1s/exec";

// ---------------- Login ----------------
async function login() {
  const regNo = document.getElementById("regNo").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_URL}?action=login&regNo=${regNo}&password=${password}`);
    const data = await res.json();

    if (data.status === "success" && data.role === "student") {
      localStorage.setItem("regNo", regNo);
      localStorage.setItem("role", "student");
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("errorMsg").innerText = "Invalid credentials!";
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Please try later.");
  }
}

// ---------------- Logout ----------------
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// ---------------- Sidebar Menu ----------------
function loadSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.innerHTML = `
    <h2>Student Portal</h2>
    <button onclick="goToPage('dashboard.html')">Dashboard</button>
    <button onclick="goToPage('fees.html')">Fees</button>
    <button onclick="goToPage('library.html')">Library</button>
    <button onclick="goToPage('hostel.html')">Hostel</button>
    <button onclick="goToPage('exams.html')">Exams & Marks</button>
    <button onclick="goToPage('attendance.html')">Attendance</button>
    <button onclick="goToPage('notifications.html')">Notifications</button>
    <button onclick="goToPage('subjects.html')">Subjects</button>
    <button onclick="logout()">Logout</button>
  `;
}

function goToPage(page) {
  window.location.href = page;
}

// ---------------- Load Profile ----------------
async function loadProfile() {
  const regNo = localStorage.getItem("regNo");
  const role = localStorage.getItem("role");

  if (!regNo || role !== "student") {
    alert("Please login as student first!");
    window.location.href = "index.html";
    return;
  }

  const res = await fetch(`${API_URL}?action=profile&regNo=${regNo}`);
  const data = await res.json();

  if (data.status === "notfound") {
    alert("Profile not found!");
    window.location.href = "index.html";
  } else {
    document.getElementById("studentName").innerText = data.Name;
    document.getElementById("regNo").innerText = data.RegisterNo;
    document.getElementById("dept").innerText = data.Dept;
    document.getElementById("batch").innerText = data.Batch;
    document.getElementById("email").innerText = data.Email;
  }
}

// ---------------- Load Fees ----------------
async function loadFees() {
  const regNo = localStorage.getItem("regNo");
  const res = await fetch(`${API_URL}?action=fees&regNo=${regNo}`);
  const data = await res.json();

  let tbody = "";
  data.forEach(f => {
    tbody += `<tr>
      <td>${f.CourseID}</td>
      <td>${f.Semester}</td>
      <td>${f.AmountPaid}</td>
      <td>${f.Status}</td>
      <td><button class="btn" onclick="showPayForm('${f.CourseID}','${f.Semester}','${f.AmountPaid}')">Pay</button></td>
    </tr>`;
  });
  document.querySelector("#feesTable tbody").innerHTML = tbody;
}

// Show pay form inside fees tab
function showPayForm(courseID, semester, amount) {
  const container = document.getElementById("payFormContainer");
  container.innerHTML = `
    <h3>Pay Fees for ${courseID} - Semester ${semester}</h3>
    <form id="payForm">
      <input type="number" id="payAmount" value="${amount}" required>
      <input type="file" id="screenshot" required>
      <button type="submit">Submit Payment</button>
    </form>
  `;
  document.getElementById("payForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const payAmount = document.getElementById("payAmount").value;
    const screenshot = document.getElementById("screenshot").files[0];
    // For fake GPay UI, we just accept the file and proceed
    if (!screenshot) { alert("Upload screenshot!"); return; }

    const regNo = localStorage.getItem("regNo");
    const res = await fetch(`${API_URL}?action=payFee&regNo=${regNo}&courseID=${courseID}&semester=${semester}&amount=${payAmount}&mode=GPay`);
    const data = await res.json();
    if (data.status === "success") {
      alert("Payment successful! TransactionID: " + data.TransactionID);
      container.innerHTML = "";
      loadFees();
    } else alert("Payment failed!");
  });
}

// ---------------- Load Library ----------------
async function loadLibrary() {
  const regNo = localStorage.getItem("regNo");
  const res = await fetch(`${API_URL}?action=library&regNo=${regNo}`);
  const data = await res.json();

  let tbody = "";
  data.forEach(b => {
    tbody += `<tr>
      <td>${b.BookID}</td>
      <td>${b.Title}</td>
      <td>${b.Author}</td>
      <td>${b.CopiesAvailable > 0 ? 'Available' : 'Not Available'}</td>
    </tr>`;
  });
  document.querySelector("#libraryTable tbody").innerHTML = tbody;
}

// ---------------- Load Hostel ----------------
async function loadHostel() {
  const regNo = localStorage.getItem("regNo");
  const res = await fetch(`${API_URL}?action=hostel&regNo=${regNo}`);
  const data = await res.json();

  let tbody = "";
  if (data.length === 0) {
    tbody = `<tr><td colspan="3">No hostel allocated</td></tr>`;
  } else {
    data.forEach(h => {
      tbody += `<tr>
        <td>${h.RoomNo}</td>
        <td>${h.HostelName}</td>
        <td>${h.Status}</td>
      </tr>`;
    });
  }
  document.querySelector("#hostelTable tbody").innerHTML = tbody;
}

// ---------------- Load Exams + Marks ----------------
async function loadExamsMarks() {
  const regNo = localStorage.getItem("regNo");
  const resExams = await fetch(`${API_URL}?action=exams&regNo=${regNo}`);
  const exams = await resExams.json();
  const resMarks = await fetch(`${API_URL}?action=marks&regNo=${regNo}`);
  const marks = await resMarks.json();

  let tbody = "";
  exams.forEach(e => {
    const subjectMarks = marks.find(m => m.SubjectCode === e.CourseID);
    tbody += `<tr>
      <td>${e.ExamID}</td>
      <td>${e.ExamName}</td>
      <td>${e.CourseID}</td>
      <td>${e.Semester}</td>
      <td>${subjectMarks ? subjectMarks.MarksObtained+'/'+subjectMarks.MaxMarks : '-'}</td>
    </tr>`;
  });
  document.querySelector("#examsTable tbody").innerHTML = tbody;
}

// ---------------- Load Attendance ----------------
async function loadAttendance() {
  const regNo = localStorage.getItem("regNo");
  const res = await fetch(`${API_URL}?action=attendance&regNo=${regNo}`);
  const data = await res.json();

  let tbody = "";
  if (data.length === 0) {
    tbody = `<tr><td colspan="3">No attendance records</td></tr>`;
  } else {
    data.forEach(a => {
      tbody += `<tr>
        <td>${a.SubjectCode}</td>
        <td>${a.SubjectName}</td>
        <td>${a.AttendancePercentage}%</td>
      </tr>`;
    });
  }
  document.querySelector("#attendanceTable tbody").innerHTML = tbody;
}

// ---------------- Load Notifications ----------------
async function loadNotifications() {
  const res = await fetch(`${API_URL}?action=notifications`);
  const data = await res.json();

  let html = "";
  data.forEach(n => {
    html += `<li><strong>${n.Title}</strong> (${n.Date}): ${n.Description}</li>`;
  });
  document.getElementById("notificationsList").innerHTML = html;
}

// ---------------- Load Subjects ----------------
async function loadSubjects() {
  const regNo = localStorage.getItem("regNo");
  const res = await fetch(`${API_URL}?action=subjects&regNo=${regNo}`);
  const data = await res.json();

  let tbody = "";
  data.forEach(s => {
    tbody += `<tr>
      <td>${s.SubjectCode}</td>
      <td>${s.SubjectName}</td>
      <td>${s.SubType}</td>
      <td>${s.Credit}</td>
      <td>${s.Staff}</td>
    </tr>`;
  });
  document.querySelector("#subjectsTable tbody").innerHTML = tbody;
}
