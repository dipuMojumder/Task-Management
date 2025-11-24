const db = require('./config/db');

async function seedDatabase() {
    try {
        // Check if tasks already exist (avoid duplicate seeding)
        const [existing] = await db.query("SELECT COUNT(*) AS total FROM tasks");
        if (existing[0].total > 0) {
            console.log("⚠️ Database already seeded. No action taken.");
            process.exit();
        }

        // 15 sample tasks
        const sampleTasks = [
            ["Learn MySQL", "Complete database module", "pending"],
            ["Finish Web Lab 03", "CRUD + MySQL", "in-progress"],
            ["Study Algorithms", "Solve graph problems", "completed"],
            ["Buy Groceries", "Rice, Oil, Vegetables", "pending"],
            ["Learn Node.js", "Practice Express routes", "pending"],
            ["Build Portfolio", "Add frontend projects", "in-progress"],
            ["Clean Room", "Organize study desk", "completed"],
            ["Practice Java", "OOP revision", "pending"],
            ["Read Book", "Chapter 5 of DBMS", "pending"],
            ["Gym Workout", "Leg day", "in-progress"],
            ["Install Linux", "Try Ubuntu", "pending"],
            ["Create API", "REST API practice", "completed"],
            ["Fix Bugs", "Debug task routes", "in-progress"],
            ["Cook Dinner", "Pasta and chicken", "completed"],
            ["Learn Git", "Branching and merging", "pending"]
        ];

        // Insert all tasks
        const sql = "INSERT INTO tasks (title, description, status) VALUES ?";
        await db.query(sql, [sampleTasks]);

        console.log("✔️ 15 sample tasks inserted successfully!");
        process.exit();

    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

seedDatabase();
