const data = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        category: "Standard",
        type: "Business",
        status: "Active",
        joinDate: "2024-01-15"
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@example.com",
        category: "Premium",
        type: "Personal",
        status: "Active",
        joinDate: "2023-11-20"
    },
    {
        id: 3,
        name: "Carol Davis",
        email: "carol.davis@example.com",
        category: "Enterprise",
        type: "Business",
        status: "Inactive",
        joinDate: "2023-09-10"
    },
    {
        id: 4,
        name: "David Wilson",
        email: "david.wilson@example.com",
        category: "Standard",
        type: "Academic",
        status: "Pending",
        joinDate: "2024-02-01"
    },
    {
        id: 5,
        name: "Emma Martinez",
        email: "emma.martinez@example.com",
        category: "Premium",
        type: "Business",
        status: "Active",
        joinDate: "2023-08-25"
    },
    {
        id: 6,
        name: "Frank Brown",
        email: "frank.brown@example.com",
        category: "Enterprise",
        type: "Personal",
        status: "Active",
        joinDate: "2023-07-12"
    },
    {
        id: 7,
        name: "Grace Lee",
        email: "grace.lee@example.com",
        category: "Standard",
        type: "Personal",
        status: "Inactive",
        joinDate: "2024-01-08"
    },
    {
        id: 8,
        name: "Henry Taylor",
        email: "henry.taylor@example.com",
        category: "Premium",
        type: "Academic",
        status: "Active",
        joinDate: "2023-12-03"
    },
    {
        id: 9,
        name: "Iris Anderson",
        email: "iris.anderson@example.com",
        category: "Enterprise",
        type: "Business",
        status: "Pending",
        joinDate: "2024-02-05"
    },
    {
        id: 10,
        name: "Jack Thompson",
        email: "jack.thompson@example.com",
        category: "Standard",
        type: "Business",
        status: "Active",
        joinDate: "2024-01-22"
    }
];

// DOM Elements
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const typeSelect = document.getElementById("typeSelect");
const statusSelect = document.getElementById("statusSelect");
const resetBtn = document.getElementById("resetBtn");
const tableBody = document.getElementById("tableBody");
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const totalCount = document.getElementById("totalCount");

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
    console.log("[v0] Initializing filterable table with", data.length, "records");
    totalCount.textContent = data.length;
    renderTable(data);
    attachEventListeners();
});

// Attach event listeners for filtering
function attachEventListeners() {
    console.log("[v0] Attaching event listeners");
    
    // Search input - fires on every keystroke
    searchInput.addEventListener("input", function () {
        console.log("[v0] Search input changed:", this.value);
        filterAndRenderTable();
    });

    // Category filter
    categorySelect.addEventListener("change", function () {
        console.log("[v0] Category changed:", this.value);
        filterAndRenderTable();
    });

    // Type filter
    typeSelect.addEventListener("change", function () {
        console.log("[v0] Type changed:", this.value);
        filterAndRenderTable();
    });

    // Status filter
    statusSelect.addEventListener("change", function () {
        console.log("[v0] Status changed:", this.value);
        filterAndRenderTable();
    });

    // Reset button
    resetBtn.addEventListener("click", function () {
        console.log("[v0] Reset button clicked");
        resetFilters();
    });
}

// Main filter function - gets current filter values and applies filtering
function filterAndRenderTable() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    const selectedType = typeSelect.value;
    const selectedStatus = statusSelect.value;

    console.log("[v0] Filtering with:", {
        search: searchTerm,
        category: selectedCategory,
        type: selectedType,
        status: selectedStatus
    });

    // Array filtering technique - uses filter() method to check multiple criteria
    const filteredData = data.filter(function (record) {
        // Search filter - checks if name or email includes search term
        const matchesSearch =
            record.name.toLowerCase().includes(searchTerm) ||
            record.email.toLowerCase().includes(searchTerm);

        // Category filter - if selected, must match
        const matchesCategory = selectedCategory === "" || record.category === selectedCategory;

        // Type filter - if selected, must match
        const matchesType = selectedType === "" || record.type === selectedType;

        // Status filter - if selected, must match
        const matchesStatus = selectedStatus === "" || record.status === selectedStatus;

        // All criteria must be true (AND logic)
        return matchesSearch && matchesCategory && matchesType && matchesStatus;
    });

    console.log("[v0] Filtered results:", filteredData.length, "records");
    renderTable(filteredData);
    updateResultsCounter(filteredData.length);
}

// Render table rows based on filtered data
function renderTable(filteredData) {
    console.log("[v0] Rendering table with", filteredData.length, "rows");
    
    // Clear existing table body
    tableBody.innerHTML = "";

    // Check if no results
    if (filteredData.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    // Hide empty state if showing results
    emptyState.style.display = "none";

    // DOM manipulation - create and insert table rows dynamically
    filteredData.forEach(function (record) {
        // Create table row
        const row = document.createElement("tr");

        // Create table cells with data
        row.innerHTML = `
            <td>${escapeHtml(record.name)}</td>
            <td>${escapeHtml(record.email)}</td>
            <td><span class="category-badge">${escapeHtml(record.category)}</span></td>
            <td>${escapeHtml(record.type)}</td>
            <td>
                <span class="status-badge status-${record.status.toLowerCase()}">
                    ${escapeHtml(record.status)}
                </span>
            </td>
            <td>${formatDate(record.joinDate)}</td>
        `;

        // Append row to table body
        tableBody.appendChild(row);
    });
}

// Reset all filters to default state
function resetFilters() {
    console.log("[v0] Resetting all filters");
    
    searchInput.value = "";
    categorySelect.value = "";
    typeSelect.value = "";
    statusSelect.value = "";
    
    // Re-render with all data
    renderTable(data);
    updateResultsCounter(data.length);
}

// Update the results counter display
function updateResultsCounter(count) {
    resultCount.textContent = count;
    console.log("[v0] Updated result count:", count);
}

// Utility function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

// Utility function to escape HTML special characters (security)
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}