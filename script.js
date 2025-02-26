document.getElementById("rsvp-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    if (!name || !email) {
        document.getElementById("rsvp-response").innerHTML = "Please fill out all fields!";
        return;
    }

    fetch("http://127.0.0.1:5000/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("rsvp-response").innerHTML = data.message;
        updateRSVPList();
    })
    .catch(error => console.error("Error:", error));
});

// Function to fetch RSVP list
function updateRSVPList() {
    fetch("http://127.0.0.1:5000/rsvp-list")
    .then(response => response.json())
    .then(data => {
        let rsvpList = document.getElementById("rsvp-list");
        rsvpList.innerHTML = "";
        
        if (data.length === 0) {
            rsvpList.innerHTML = "<p>No RSVPs yet.</p>";
            return;
        }

        data.forEach((rsvp, index) => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${rsvp.name}</strong> (${rsvp.email})`;
            rsvpList.appendChild(listItem);
        });
    })
    .catch(error => console.error("Error fetching RSVPs:", error));
}

// Load RSVP list when page loads
document.addEventListener("DOMContentLoaded", updateRSVPList);
