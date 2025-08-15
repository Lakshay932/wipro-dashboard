const employees = [
    // Top-most manager, no one above
    { id: "40180081", name: "Vikas Dhiaya", managerId: null },

    // Lakshay reports to Vikas Dhiaya
    { id: "40180080", name: "Lakshay Sachdeva", managerId: "40180081" },

    // Team under Lakshay Sachdeva (all report to Lakshay)
    { id: "40180082", name: "Shriyam B.", managerId: "40180080" },
    { id: "40180083", name: "Shreyansh G.", managerId: "40180080" },
    { id: "40180084", name: "Arav K.", managerId: "40180080" },
    { id: "40180085", name: "Agrim M.", managerId: "40180080" },
    { id: "40180086", name: "Ishan J.", managerId: "40180080" }
];



document.addEventListener("DOMContentLoaded", () => {
    // Get logged-in manager
    const loggedManager = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedManager) return;

    // Set manager name and ID in dashboard header
    if (document.getElementById("managerName")) {
        document.getElementById("managerName").textContent = loggedManager.name;
    }
    if (document.getElementById("managerID")) {
        document.getElementById("managerID").textContent = loggedManager.empCode;
    }

    // Render subordinates table
    const subordinates = employees.filter(e => e.managerId === loggedManager.empCode);
    const allComplaints = JSON.parse(localStorage.getItem("complaints") || "[]");
    let tableHTML = `<tr>
        <th>Name</th><th>ID</th><th>IS RAG</th><th>Reason</th><th>Comments</th><th>Action</th>
    </tr>`;
    subordinates.forEach(sub => {
        const count = allComplaints.filter(c => c.againstEmpId === sub.id).length;
        let ragPercent = Math.max(100 - count * 10, 0);
        let color = ragPercent > 80 ? 'green' : (ragPercent >= 40 ? 'amber' : 'red');
        tableHTML += `<tr>
            <td>${sub.name}</td>
            <td>${sub.id}</td>
            <td>
              <div class="progress-bar-container">
                <div class="progress-bar ${color}" style="width:${ragPercent}%">${ragPercent}%</div>
              </div>
            </td>
            <td>
              <select id="reason-${sub.id}" required>
                <option value="">Select</option>
                <option value="Location">Location</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Others">Others</option>
                <option value="Behavior">Behavior</option>
              </select>
            </td>
            <td><textarea id="comments-${sub.id}" placeholder="Type your comments here..." required rows="1"></textarea></td>
            <td>
              <button onclick="submitComplaintFor('${sub.id}', '${sub.name}')">Submit</button>
            </td>
        </tr>`;
    });
    document.getElementById("managerTable").innerHTML = tableHTML;

    // Set up 'View Previous' button
    document.getElementById("viewPrevious").onclick = function () {
        document.getElementById('previousRecordsModal').classList.add('active');
        showModal(loggedManager);
    };

    // Calculate manager's own RAG status
    const myComplaints = allComplaints.filter(c => c.againstEmpId === loggedManager.empCode);
    let ragPercentMe = Math.max(100 - myComplaints.length * 10, 0);
    let colorMe = ragPercentMe > 80 ? 'green' : (ragPercentMe >= 40 ? 'amber' : 'red');

    // Fill and color the progress bar for manager RAG
    const ragBarDiv = document.getElementById("rag-bar");
    if (ragBarDiv) {
        ragBarDiv.className = "progress-bar " + colorMe;
        ragBarDiv.style.width = ragPercentMe + "%";
        ragBarDiv.textContent = ragPercentMe + "%";
        ragBarDiv.title = colorMe.charAt(0).toUpperCase() + colorMe.slice(1) + " (" + ragPercentMe + "%)";
    }
});

function submitComplaintFor(empId, empName) {
    const reason = document.getElementById('reason-' + empId).value;
    const comments = document.getElementById('comments-' + empId).value.trim();
    if (!reason || !comments) {
        alert("Please select a reason and enter comments.");
        return;
    }
    saveComplaint(empId, empName, reason, comments);
    alert("Complaint registered!");
    window.location.reload();
}

function showModal(manager) {
    const allComplaints = JSON.parse(localStorage.getItem("complaints") || "[]");
    const previous = allComplaints.filter(c => c.managerId === manager.empCode);
    let tableHTML = `<tr><th>Employee</th><th>Reason</th><th>Comments</th><th>Date</th></tr>`;
    if (previous.length === 0) {
        tableHTML += `<tr><td colspan="4">No previous complaints found.</td></tr>`;
    } else {
        previous.forEach(c => {
            tableHTML += `<tr>
                <td>${c.againstEmpName} (${c.againstEmpId})</td>
                <td>${c.reason}</td>
                <td>${c.comments}</td>
                <td>${new Date(c.timestamp).toLocaleString()}</td>
            </tr>`;
        });
    }
    document.getElementById('previousTable').innerHTML = tableHTML;
}

function closeModal() {
    document.getElementById('previousRecordsModal').classList.remove('active');
}

function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}