// Cached weapons data to filter locally
let weaponsData = [];

// Fetch and render weapons data in a table
async function fetchAndDisplayWeapons() {
  try {
    console.log("Fetching weapons...");

    // Fetch data from the backend API
    const response = await fetch("http://localhost:8080/weapons");
    if (!response.ok) throw new Error("Failed to fetch weapons");

    weaponsData = await response.json(); // Cache data for filtering
    console.log("Weapons fetched:", weaponsData);

    renderTable(weaponsData); // Initial render with all weapons
  } catch (error) {
    console.error("Error fetching weapons:", error);
    document.querySelector("#results").innerHTML =
      "<p>Error loading weapons.</p>";
  }
}

// Render weapons in the table
function renderTable(weapons) {
  const tableBody = document.querySelector("#weaponsTable tbody");
  tableBody.innerHTML = ""; // Clear any existing rows

  if (weapons.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='7'>No weapons found.</td></tr>";
    return;
  }

  // Create table rows dynamically
  weapons.forEach((weapon) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${weapon.id || "N/A"}</td>
        <td>${weapon.Name || "Unknown"}</td>
        <td>${weapon.Type || "Unknown"}</td>
        <td>${weapon.Upgrade || "N/A"}</td>
        <td>${weapon.Damage || "N/A"}</td>
        <td>${weapon.Weight || "N/A"}</td>
        <td>${weapon.Gold || "N/A"}</td>
      `;
    tableBody.appendChild(row);
  });
}

// Filter weapons based on search and dropdowns
function filterWeapons() {
  const searchInput = document
    .querySelector("#searchInput")
    .value.toLowerCase();
  const typeFilter = document.querySelector("#typeFilter").value;
  const materialFilter = document.querySelector("#materialFilter").value;
  const categoriesFilter = document.querySelector("#categoriesFilter").value;

  // Filter logic
  const filteredWeapons = weaponsData.filter((weapon) => {
    const matchesSearch =
      !searchInput ||
      weapon.Name.toLowerCase().includes(searchInput) ||
      weapon.Type.toLowerCase().includes(searchInput);

    const matchesType = !typeFilter || weapon.Type === typeFilter;
    const matchesMaterial =
      !materialFilter || weapon.Upgrade === materialFilter;
    const matchesCategory =
      !categoriesFilter || weapon.Category === categoriesFilter;

    return matchesSearch && matchesType && matchesMaterial && matchesCategory;
  });

  renderTable(filteredWeapons);
}

// Add event listeners for filtering
document.querySelector("#searchInput").addEventListener("input", filterWeapons);
document.querySelector("#typeFilter").addEventListener("change", filterWeapons);
document
  .querySelector("#materialFilter")
  .addEventListener("change", filterWeapons);
document
  .querySelector("#categoriesFilter")
  .addEventListener("change", filterWeapons);
document
  .querySelector("#searchButton")
  .addEventListener("click", filterWeapons);
//------------------------------------------------------adding new weapon
document
  .getElementById("addWeaponForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const newWeapon = {
      Name: document.getElementById("name").value,
      Type: document.getElementById("type").value,
      Upgrade: document.getElementById("upgrade").value,
      Damage: parseInt(document.getElementById("damage").value),
      Weight: parseFloat(document.getElementById("weight").value),
      Gold: parseInt(document.getElementById("gold").value),
    };

    console.log("Submitting new weapon:", newWeapon);

    try {
      // Send POST request to server
      const response = await fetch("http://localhost:8080/weapons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWeapon),
      });

      if (!response.ok) throw new Error("Failed to add weapon");

      const result = await response.json();
      console.log("Weapon added successfully:", result);

      // Optionally refresh the weapons table to include the new weapon
      fetchAndDisplayWeapons();

      // Clear the form fields
      e.target.reset();
    } catch (error) {
      console.error("Error adding weapon:", error);
      alert("Failed to add weapon. Please try again.");
    }
  });

// Fetch data and display when the page loads
window.onload = fetchAndDisplayWeapons;
