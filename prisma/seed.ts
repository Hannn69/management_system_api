import { PrismaClient, User, Company, Location, Category, Manufacturer, Supplier, AssetModel, StatusLabel, Department } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with at least 10 records per table...");

  // ========== USERS ==========
  console.log("📝 Creating users...");
  const passwordHash = await bcrypt.hash("password123", 12);
  const usersData = [
    { email: "admin@example.com", passwordHash, username: "admin" },
    { email: "manager@example.com", passwordHash, username: "manager" },
    { email: "user@example.com", passwordHash, username: "user" },
    { email: "alice@example.com", passwordHash, username: "alice" },
    { email: "bob@example.com", passwordHash, username: "bob" },
    { email: "charlie@example.com", passwordHash, username: "charlie" },
    { email: "david@example.com", passwordHash, username: "david" },
    { email: "eve@example.com", passwordHash, username: "eve" },
    { email: "frank@example.com", passwordHash, username: "frank" },
    { email: "grace@example.com", passwordHash, username: "grace" },
  ];

  const dbUsers: User[] = [];
  for (const user of usersData) {
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, slug: randomUUID() },
    });
    dbUsers.push(created);
  }
  console.log(`✓ Created ${dbUsers.length} users`);

  // ========== COMPANIES ==========
  console.log("🏢 Creating companies...");
  const companiesData = [
    { name: "Tech Corp", email: "contact@techcorp.com", phone: "555-0101" },
    { name: "Global Solutions", email: "info@globalsolutions.com", phone: "555-0102" },
    { name: "Innovate Inc", email: "hello@innovate.com", phone: "555-0103" },
    { name: "Apex Ltd", email: "support@apexltd.com", phone: "555-0104" },
    { name: "Nexus Systems", email: "contact@nexus.io", phone: "555-0105" },
    { name: "Zenith Enterprises", email: "office@zenith.com", phone: "555-0106" },
    { name: "Quantum Group", email: "quantum@qg.com", phone: "555-0107" },
    { name: "Summit Partners", email: "summit@summit.com", phone: "555-0108" },
    { name: "Velocity Web", email: "velocity@web.com", phone: "555-0109" },
    { name: "Titan Industries", email: "titan@industries.com", phone: "555-0110" },
    { name: "Ember Labs", email: "ember@labs.com", phone: "555-0111" },
    { name: "Solaris Co", email: "solaris@co.com", phone: "555-0112" },
  ];

  const dbCompanies: Company[] = [];
  for (const company of companiesData) {
    const created = await prisma.company.upsert({
      where: { name: company.name },
      update: {},
      create: { ...company, slug: randomUUID() },
    });
    dbCompanies.push(created);
  }
  console.log(`✓ Created/Updated ${dbCompanies.length} companies`);

  // ========== LOCATIONS ==========
  console.log("📍 Creating locations...");
  const locationsData = [
    { name: "New York HQ", city: "New York", country: "USA", address: "123 Wall St" },
    { name: "London Studio", city: "London", country: "UK", address: "45 Baker St" },
    { name: "Tokyo Hub", city: "Tokyo", country: "Japan", address: "7-8-9 Shibuya" },
    { name: "Berlin Lab", city: "Berlin", country: "Germany", address: "10 Alexanderplatz" },
    { name: "Singapore Office", city: "Singapore", country: "Singapore", address: "1 Marina Blvd" },
    { name: "Sydney Branch", city: "Sydney", country: "Australia", address: "20 Pitt St" },
    { name: "Paris Design", city: "Paris", country: "France", address: "30 Champs-Élysées" },
    { name: "Toronto Dev", city: "Toronto", country: "Canada", address: "40 Bay St" },
    { name: "Dubai Sales", city: "Dubai", country: "UAE", address: "50 Burj Blvd" },
    { name: "Seoul R&D", city: "Seoul", country: "South Korea", address: "60 Gangnam-daero" },
    { name: "Phnom Penh HQ", city: "Phnom Penh", country: "Cambodia", address: "70 Monivong Blvd" },
  ];

  const dbLocations: Location[] = [];
  for (const loc of locationsData) {
    const created = await prisma.location.upsert({
      where: { name: loc.name },
      update: {},
      create: { ...loc, slug: randomUUID(), companyId: dbCompanies[0].id },
    });
    dbLocations.push(created);
  }
  console.log(`✓ Created/Updated ${dbLocations.length} locations`);

  // ========== DEPARTMENTS ==========
  console.log("🏢 Creating departments...");
  const departmentsData = [
    { name: "Engineering" },
    { name: "Sales" },
    { name: "Marketing" },
    { name: "Finance" },
    { name: "Human Resources" },
    { name: "Operations" },
    { name: "Product" },
    { name: "Design" },
    { name: "Legal" },
    { name: "Customer Support" },
    { name: "IT Security" },
    { name: "Data Science" },
  ];

  const dbDepartments: Department[] = [];
  for (const dept of departmentsData) {
    const created = await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: { ...dept, slug: randomUUID(), companyId: dbCompanies[0].id },
    });
    dbDepartments.push(created);
  }
  console.log(`✓ Created/Updated ${dbDepartments.length} departments`);

  // ========== CATEGORIES ==========
  console.log("🏷️ Creating categories...");
  const categoriesData = [
    { name: "Laptops", type: "Asset" },
    { name: "Phones", type: "Asset" },
    { name: "Monitors", type: "Asset" },
    { name: "Keyboards", type: "Accessory" },
    { name: "Mice", type: "Accessory" },
    { name: "Office Chairs", type: "Asset" },
    { name: "Networking", type: "Asset" },
    { name: "Software Licenses", type: "Asset" },
    { name: "Consumables", type: "Consumable" },
    { name: "Components", type: "Component" },
    { name: "Server Hardware", type: "Asset" },
  ];

  const dbCategories: Category[] = [];
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: { ...cat, slug: randomUUID() },
    });
    dbCategories.push(created);
  }
  console.log(`✓ Created/Updated ${dbCategories.length} categories`);

  // ========== MANUFACTURERS ==========
  console.log("🏭 Creating manufacturers...");
  const manufacturersData = [
    { name: "Apple", url: "https://apple.com" },
    { name: "Dell", url: "https://dell.com" },
    { name: "HP", url: "https://hp.com" },
    { name: "Lenovo", url: "https://lenovo.com" },
    { name: "Samsung", url: "https://samsung.com" },
    { name: "Logitech", url: "https://logitech.com" },
    { name: "Cisco", url: "https://cisco.com" },
    { name: "Microsoft", url: "https://microsoft.com" },
    { name: "Asus", url: "https://asus.com" },
    { name: "Sony", url: "https://sony.com" },
    { name: "LG", url: "https://lg.com" },
  ];

  const dbManufacturers: Manufacturer[] = [];
  for (const manu of manufacturersData) {
    const created = await prisma.manufacturer.upsert({
      where: { name: manu.name },
      update: {},
      create: { ...manu, slug: randomUUID() },
    });
    dbManufacturers.push(created);
  }
  console.log(`✓ Created/Updated ${dbManufacturers.length} manufacturers`);

  // ========== SUPPLIERS ==========
  console.log("🚚 Creating suppliers...");
  const suppliersData = [
    { name: "Amazon Business", contactName: "Sales Team" },
    { name: "CDW", contactName: "Account Manager" },
    { name: "Best Buy", contactName: "Enterprise Sales" },
    { name: "B&H Photo", contactName: "Pro Sales" },
    { name: "Newegg", contactName: "Support" },
    { name: "Direct Systems", contactName: "Jane Smith" },
    { name: "Office Depot", contactName: "Order Desk" },
    { name: "Global Tech", contactName: "Mike Lee" },
    { name: "Insight", contactName: "Global Sales" },
    { name: "Zones", contactName: "Enterprise" },
    { name: "Connection", contactName: "Sales" },
  ];

  const dbSuppliers: Supplier[] = [];
  for (const sup of suppliersData) {
    const created = await prisma.supplier.upsert({
      where: { name: sup.name },
      update: {},
      create: { ...sup, slug: randomUUID() },
    });
    dbSuppliers.push(created);
  }
  console.log(`✓ Created/Updated ${dbSuppliers.length} suppliers`);

  // ========== ASSET MODELS ==========
  console.log("💻 Creating asset models...");
  const assetModelsData = [
    { name: "MacBook Pro 14", modelNumber: "MBP14-2023" },
    { name: "MacBook Air M2", modelNumber: "MBA-M2" },
    { name: "Dell XPS 15", modelNumber: "XPS15-9530" },
    { name: "ThinkPad X1 Carbon", modelNumber: "TP-X1-C11" },
    { name: "iPhone 14 Pro", modelNumber: "IP14-PRO" },
    { name: "iPhone 13", modelNumber: "IP13" },
    { name: "iPad Pro 12.9", modelNumber: "IPAD-P12" },
    { name: "Dell UltraSharp 27", modelNumber: "U2723QE" },
    { name: "HP EliteBook 840", modelNumber: "EB840-G9" },
    { name: "Logitech MX Master 3S", modelNumber: "MX-M3S" },
    { name: "Cisco Catalyst 9200", modelNumber: "C9200L" },
    { name: "Samsung Odyssey G9", modelNumber: "G9-ULTRA" },
    { name: "Microsoft Surface Pro 9", modelNumber: "SF-P9" },
    { name: "Asus ROG Zephyrus", modelNumber: "ROG-G14" },
    { name: "Sony WH-1000XM5", modelNumber: "WH1000XM5" },
  ];

  const dbAssetModels: AssetModel[] = [];
  for (const am of assetModelsData) {
    const created = await prisma.assetModel.upsert({
      where: { name: am.name },
      update: {},
      create: {
        ...am,
        slug: randomUUID(),
        categoryId: dbCategories[0].id,
        manufacturerId: dbManufacturers[0].id,
      },
    });
    dbAssetModels.push(created);
  }
  console.log(`✓ Created/Updated ${dbAssetModels.length} asset models`);

  // ========== STATUS LABELS ==========
  console.log("📊 Creating status labels...");
  const statusLabelsData = [
    { name: "Ready to Deploy", type: "Deployable" },
    { name: "Deployed", type: "Deployable" },
    { name: "In Repair", type: "Pending" },
    { name: "Broken", type: "Undeployable" },
    { name: "Lost/Stolen", type: "Archived" },
    { name: "Retired", type: "Archived" },
    { name: "Out for Maintenance", type: "Pending" },
    { name: "Testing", type: "Pending" },
    { name: "Storage", type: "Deployable" },
    { name: "Obsolete", type: "Archived" },
  ];

  const dbStatusLabels: StatusLabel[] = [];
  for (const sl of statusLabelsData) {
    const created = await prisma.statusLabel.upsert({
      where: { name: sl.name },
      update: {},
      create: { ...sl, slug: randomUUID() },
    });
    dbStatusLabels.push(created);
  }
  console.log(`✓ Created ${dbStatusLabels.length} status labels`);

  // ========== ASSETS ==========
  console.log("📦 Creating assets...");
  for (let i = 1; i <= 20; i++) {
    await prisma.asset.create({
      data: {
        assetTag: `AST-${10000 + i}`,
        name: `Asset ${i}`,
        serial: `SN-${randomUUID().slice(0, 8).toUpperCase()}`,
        modelId: dbAssetModels[i % dbAssetModels.length].id,
        statusId: dbStatusLabels[i % dbStatusLabels.length].id,
        companyId: dbCompanies[i % dbCompanies.length].id,
        locationId: dbLocations[i % dbLocations.length].id,
        supplierId: dbSuppliers[i % dbSuppliers.length].id,
        checkedOutUserId: dbUsers[i % dbUsers.length].id,
        notes: `Sample asset ${i} for testing.`,
      },
    });
  }
  console.log(`✓ Created 20 assets`);

  // ========== TASKS ==========
  console.log("📋 Creating tasks...");
  for (let i = 1; i <= 20; i++) {
    await prisma.task.create({
      data: {
        key: `TASK-${i}`,
        summary: `Maintenance task ${i}`,
        description: `Perform regular maintenance for asset bundle ${i}`,
        status: i % 3 === 0 ? "Done" : i % 2 === 0 ? "In progress" : "To do",
        userId: dbUsers[i % dbUsers.length].id,
        createdBy: dbUsers[0].id,
        updatedBy: dbUsers[0].id,
        space: "Inventory",
        workType: "Maintenance",
        priority: "High",
      },
    });
  }
  console.log(`✓ Created 20 tasks`);

  // ========== NOTIFICATIONS ==========
  console.log("🔔 Creating notifications...");
  for (let i = 1; i <= 20; i++) {
    await prisma.notification.create({
      data: {
        userId: dbUsers[i % dbUsers.length].id,
        type: i % 4 === 0 ? "ALERT" : i % 2 === 0 ? "INFO" : "WARNING",
        message: `System notification ${i} for your review.`,
        read: i % 5 === 0,
      },
    });
  }
  console.log(`✓ Created 20 notifications`);

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
