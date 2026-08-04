// Assignment: Filter mock data to get records with ID 12, 13, and 14

// ── Mock Data ──────────────────────────────────────────────────────────────
const mockData = [
  { id: 10, name: "Alice",   age: 23, city: "New York"    },
  { id: 11, name: "Bob",     age: 31, city: "Los Angeles" },
  { id: 12, name: "Charlie", age: 28, city: "Chicago"     },
  { id: 13, name: "Diana",   age: 25, city: "Houston"     },
  { id: 14, name: "Edward",  age: 35, city: "Phoenix"     },
  { id: 15, name: "Fiona",   age: 22, city: "Philadelphia"},
  { id: 16, name: "George",  age: 40, city: "San Antonio" },
];

// ── IDs to filter ──────────────────────────────────────────────────────────
const targetIds = [12, 13, 14];

// ── Filter using Array.filter() ────────────────────────────────────────────
const filteredData = mockData.filter((item) => targetIds.includes(item.id));

// ── Output ─────────────────────────────────────────────────────────────────
console.log("Filtered Records (ID 12, 13, 14):");
console.log(filteredData);