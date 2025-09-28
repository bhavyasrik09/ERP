// ================= Navigation =================
function navigate(page) {
  window.location.href = page;
}

// ================= Local UI interactions =================

// Example: Show "Updated!" message for static edit forms
function showUpdateMessage(elementId) {
  const msgDiv = document.getElementById(elementId);
  if (msgDiv) {
    msgDiv.style.display = "block";
    setTimeout(() => { msgDiv.style.display = "none"; }, 2000);
  }
}

// Example: Handling static edit buttons in tables
document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      // Assume each row has a div with id="updateMsg"
      const row = e.target.closest("tr");
      const msgDiv = row.querySelector(".update-message");
      if (msgDiv) {
        msgDiv.style.display = "inline-block";
        setTimeout(() => { msgDiv.style.display = "none"; }, 2000);
      }
    });
  });
});
