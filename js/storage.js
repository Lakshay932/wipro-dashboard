function saveComplaint(againstEmpCode, againstEmpName, reason, comments) {
    const manager = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!manager) return;
    const complaint = {
        managerId: manager.empCode,
        managerName: manager.name,
        againstEmpId: againstEmpCode,
        againstEmpName: againstEmpName,
        reason: reason,
        comments: comments,
        timestamp: new Date().toISOString()
    };
    const complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
    complaints.push(complaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));
}

document.addEventListener("DOMContentLoaded", () => {
    const complaintsTable = document.getElementById("myComplaintsTable");
    if (complaintsTable) {
        const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        const allComplaints = JSON.parse(localStorage.getItem("complaints") || "[]");
        const myComplaints = allComplaints.filter(c => c.againstEmpId === loggedUser.empCode);
        let ragPercent = Math.max(100 - myComplaints.length * 10, 0);
        let color = ragPercent > 80 ? 'green' : (ragPercent >= 40 ? 'amber' : 'red');

        let tableHTML = `<tr>
            <th>From Manager</th><th>Reason</th><th>Comments</th><th>Date</th><th>IS RAG</th>
        </tr>`;
        if (myComplaints.length === 0) {
            tableHTML += `<tr><td colspan='5'>No complaints found.</td></tr>`;
        } else {
            myComplaints.forEach(c => {
                tableHTML += `<tr>
                    <td>${c.managerName} (${c.managerId})</td>
                    <td>${c.reason}</td>
                    <td>${c.comments}</td>
                    <td>${new Date(c.timestamp).toLocaleString()}</td>
                    <td>
                        <div class="progress-bar-container">
                            <div class="progress-bar ${color}" style="width:${ragPercent}%">${ragPercent}%</div>
                        </div>
                    </td>
                </tr>`;
            });
        }
        complaintsTable.innerHTML = tableHTML;
    }
});
