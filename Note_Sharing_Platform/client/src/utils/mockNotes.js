const mockNotes = [
  {
    id: "1",
    title: "Data Structures - Complete Unit 3",
    subject: "Computer Science",
    course: "CS201",
    uploader: "Alex Mercer",
    downloads: 142,
    rating: 4.8,
    reviews: [
      { name: "John Doe", rating: 5, comment: "Super helpful, covers all trees and graphs topics!" },
      { name: "Emily Watson", rating: 4, comment: "Very detailed, though some diagrams are hand-drawn." }
    ],
    color: "blue",
    stroke: "#3d5af1",
    date: "July 12, 2026",
    type: "PDF",
    description: "Detailed study notes for Unit 3 covering Trees (Binary, AVL, B-Trees), Heaps, and Graph algorithms (DFS, BFS, Dijkstra)."
  },
  {
    id: "2",
    title: "Thermodynamics & Fluid Mechanics Notes",
    subject: "Mechanical Engineering",
    course: "ME302",
    uploader: "Sarah Chen",
    downloads: 89,
    rating: 4.5,
    reviews: [
      { name: "Michael K.", rating: 4, comment: "Good formulas sheet included at the end." }
    ],
    color: "green",
    stroke: "#22c55e",
    date: "June 28, 2026",
    type: "PDF",
    description: "Lecture notes and tutorial problems covering the First and Second Laws of Thermodynamics, entropy, control volume analysis, and fluid dynamics."
  },
  {
    id: "3",
    title: "Operating Systems - Processes & Threads",
    subject: "Computer Science",
    course: "CS204",
    uploader: "Aditi Sharma",
    downloads: 215,
    rating: 4.9,
    reviews: [
      { name: "Rohan Gupta", rating: 5, comment: "The explanation of semaphores and mutexes is top-notch." },
      { name: "Ananya Sen", rating: 5, comment: "Brilliant notes! Got me an A." }
    ],
    color: "pink",
    stroke: "#ec4899",
    date: "July 19, 2026",
    type: "PDF",
    description: "Complete guide on CPU scheduling, process synchronization, deadlocks, and threads vs. processes."
  },
  {
    id: "4",
    title: "Organic Chemistry - Carbonyl Compounds",
    subject: "Chemistry",
    course: "CH101",
    uploader: "Elena Rostova",
    downloads: 64,
    rating: 4.2,
    reviews: [
      { name: "Lucas P.", rating: 4, comment: "Reaction mechanisms are clearly written." }
    ],
    color: "amber",
    stroke: "#f59e0b",
    date: "May 15, 2026",
    type: "DOC",
    description: "Mechanisms for nucleophilic addition, Aldol condensation, Grignard reactions, and oxidation/reduction of carbonyl compounds."
  },
  {
    id: "5",
    title: "Calculus II - Integration Techniques",
    subject: "Mathematics",
    course: "MA102",
    uploader: "Aditi Sharma",
    downloads: 304,
    rating: 4.7,
    reviews: [
      { name: "Alex M.", rating: 5, comment: "Integration by parts has never been easier to understand." }
    ],
    color: "blue",
    stroke: "#3d5af1",
    date: "June 10, 2026",
    type: "PDF",
    description: "Comprehensive review of integration by parts, trigonometric substitution, partial fractions, and improper integrals."
  }
];

export default mockNotes;
