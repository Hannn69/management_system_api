"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const crypto_1 = require("crypto");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🌱 Seeding database with at least 10 records per table...");
    console.log("📝 Creating users...");
    const passwordHash = await bcrypt.hash("password123", 12);
    const usersData = [
        { email: "admin@example.com", passwordHash },
        { email: "manager@example.com", passwordHash },
        { email: "analyst@example.com", passwordHash },
        { email: "sonvirak@example.com", passwordHash },
        { email: "alice@example.com", passwordHash },
        { email: "bob@example.com", passwordHash },
        { email: "charlie@example.com", passwordHash },
        { email: "david@example.com", passwordHash },
        { email: "eve@example.com", passwordHash },
        { email: "frank@example.com", passwordHash },
        { email: "grace@example.com", passwordHash },
    ];
    const dbUsers = [];
    for (const user of usersData) {
        const created = await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: { ...user, slug: (0, crypto_1.randomUUID)() },
        });
        dbUsers.push(created);
    }
    console.log(`✓ Created ${dbUsers.length} users`);
    console.log("🏢 Creating companies...");
    const companiesData = [
        "Tech Corp", "Global Solutions", "Creative Minds", "Nova Systems", "Echo Industries",
        "Vertex Group", "Zenith Holdings", "Quantum Inc", "Summit Enterprises", "Horizon Ltd",
        "Pinnacle Co", "Alpha Omega"
    ];
    const dbCompanies = [];
    for (const name of companiesData) {
        const email = `contact@${name.toLowerCase().replace(/\s+/g, "")}.com`;
        const phone = `1-800-${Math.floor(1000 + Math.random() * 9000)}`;
        const fax = `1-800-${Math.floor(1000 + Math.random() * 9000)}`;
        const notes = `${name} is a leading global organization with specialized departments.`;
        const created = await prisma.company.upsert({
            where: { name },
            update: { email, phone, fax, notes },
            create: {
                name,
                slug: (0, crypto_1.randomUUID)(),
                email,
                phone,
                fax,
                notes,
            },
        });
        dbCompanies.push(created);
    }
    console.log(`✓ Created/Updated ${dbCompanies.length} companies`);
    console.log("📍 Creating locations...");
    const locationsData = [
        { name: "New York Office", city: "New York", country: "USA" },
        { name: "London Studio", city: "London", country: "UK" },
        { name: "Tokyo Hub", city: "Tokyo", country: "Japan" },
        { name: "Paris Branch", city: "Paris", country: "France" },
        { name: "Berlin Site", city: "Berlin", country: "Germany" },
        { name: "Sydney HQ", city: "Sydney", country: "Australia" },
        { name: "Toronto Base", city: "Toronto", country: "Canada" },
        { name: "Dubai Tower", city: "Dubai", country: "UAE" },
        { name: "Singapore Point", city: "Singapore", country: "Singapore" },
        { name: "Seoul Center", city: "Seoul", country: "South Korea" },
        { name: "Mumbai Tech", city: "Mumbai", country: "India" },
    ];
    const dbLocations = [];
    for (let i = 0; i < locationsData.length; i++) {
        const loc = locationsData[i];
        const created = await prisma.location.upsert({
            where: { name: loc.name },
            update: {},
            create: {
                ...loc,
                slug: (0, crypto_1.randomUUID)(),
                address: `${100 + i} Main St`,
                zip: `ZIP-${1000 + i}`,
                currency: i % 2 === 0 ? "USD" : "EUR",
                companyId: dbCompanies[i % dbCompanies.length].id,
            },
        });
        dbLocations.push(created);
    }
    console.log(`✓ Created ${dbLocations.length} locations`);
    console.log("🏢 Creating departments...");
    const departmentsData = [
        "Engineering", "Sales", "Marketing", "Human Resources", "Finance",
        "IT Support", "Legal", "Operations", "Research & Development", "Customer Success",
        "Product Management", "Quality Assurance"
    ];
    const dbDepartments = [];
    for (let i = 0; i < departmentsData.length; i++) {
        const name = departmentsData[i];
        const created = await prisma.department.upsert({
            where: { name },
            update: {},
            create: {
                name,
                slug: (0, crypto_1.randomUUID)(),
                companyId: dbCompanies[i % dbCompanies.length].id,
                locationId: dbLocations[i % dbLocations.length].id,
                notes: `The ${name} department handles key business functions.`,
            },
        });
        dbDepartments.push(created);
    }
    console.log(`✓ Created ${dbDepartments.length} departments`);
    console.log("📦 Creating categories...");
    const categoriesData = [
        { name: "Laptops", type: "Asset" },
        { name: "Phones", type: "Asset" },
        { name: "Monitors", type: "Asset" },
        { name: "Tablets", type: "Asset" },
        { name: "Printers", type: "Asset" },
        { name: "Software Licenses", type: "License" },
        { name: "Keyboards", type: "Accessory" },
        { name: "Mice", type: "Accessory" },
        { name: "RAM Modules", type: "Component" },
        { name: "Office Supplies", type: "Consumable" },
        { name: "Networking Gear", type: "Asset" },
    ];
    const dbCategories = [];
    for (const cat of categoriesData) {
        const created = await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: { ...cat, slug: (0, crypto_1.randomUUID)() },
        });
        dbCategories.push(created);
    }
    console.log(`✓ Created ${dbCategories.length} categories`);
    console.log("🏭 Creating manufacturers...");
    const manufacturersData = [
        "Apple", "Dell", "Samsung", "HP", "Lenovo", "Microsoft", "Asus", "Logitech", "Cisco", "Sony", "LG"
    ];
    const dbManufacturers = [];
    for (const name of manufacturersData) {
        const created = await prisma.manufacturer.upsert({
            where: { name },
            update: {},
            create: {
                name,
                slug: (0, crypto_1.randomUUID)(),
                url: `https://www.${name.toLowerCase()}.com`,
                notes: `Main manufacturer for ${name} products.`,
            },
        });
        dbManufacturers.push(created);
    }
    console.log(`✓ Created ${dbManufacturers.length} manufacturers`);
    console.log("🛒 Creating suppliers...");
    const suppliersData = [
        "Amazon Business", "CDW", "Best Buy Enterprise", "Newegg Business", "B&H Photo",
        "Staples Advantage", "Office Depot", "Walmart Global", "Direct Tech", "Supply Pro", "Global Equip"
    ];
    const dbSuppliers = [];
    for (const name of suppliersData) {
        const created = await prisma.supplier.upsert({
            where: { name },
            update: {},
            create: {
                name,
                slug: (0, crypto_1.randomUUID)(),
                email: `sales@${name.toLowerCase().replace(/\s+/g, "")}.com`,
                notes: `Reliable supplier of hardware and software.`,
            },
        });
        dbSuppliers.push(created);
    }
    console.log(`✓ Created ${dbSuppliers.length} suppliers`);
    console.log("💻 Creating asset models...");
    const assetModelsData = [
        { name: "MacBook Pro 14", categoryIdx: 0, manufacturerIdx: 0, modelNumber: "A2442" },
        { name: "MacBook Air M2", categoryIdx: 0, manufacturerIdx: 0, modelNumber: "A2681" },
        { name: "Dell XPS 15", categoryIdx: 0, manufacturerIdx: 1, modelNumber: "X9520" },
        { name: "Dell Latitude 5420", categoryIdx: 0, manufacturerIdx: 1, modelNumber: "L5420" },
        { name: "iPhone 13 Pro", categoryIdx: 1, manufacturerIdx: 0, modelNumber: "A2638" },
        { name: "iPhone 14", categoryIdx: 1, manufacturerIdx: 0, modelNumber: "A2881" },
        { name: "Samsung Galaxy S22", categoryIdx: 1, manufacturerIdx: 2, modelNumber: "SM-S901" },
        { name: "Samsung G7 Monitor", categoryIdx: 2, manufacturerIdx: 2, modelNumber: "G7-32" },
        { name: "HP EliteDisplay", categoryIdx: 2, manufacturerIdx: 3, modelNumber: "E243" },
        { name: "iPad Pro 11", categoryIdx: 3, manufacturerIdx: 0, modelNumber: "A2377" },
        { name: "Microsoft Surface Pro 8", categoryIdx: 3, manufacturerIdx: 5, modelNumber: "SP8-01" },
        { name: "Logitech MX Master 3", categoryIdx: 7, manufacturerIdx: 7, modelNumber: "MX-M3" },
        { name: "Logitech Craft Keyboard", categoryIdx: 6, manufacturerIdx: 7, modelNumber: "LC-01" },
        { name: "Cisco Catalyst 9300", categoryIdx: 10, manufacturerIdx: 8, modelNumber: "C9300" },
        { name: "Sony WH-1000XM4", categoryIdx: 7, manufacturerIdx: 9, modelNumber: "XM4-01" },
    ];
    const dbAssetModels = [];
    for (const modelData of assetModelsData) {
        const created = await prisma.assetModel.upsert({
            where: { name: modelData.name },
            update: {},
            create: {
                name: modelData.name,
                slug: (0, crypto_1.randomUUID)(),
                categoryId: dbCategories[modelData.categoryIdx].id,
                manufacturerId: dbManufacturers[modelData.manufacturerIdx].id,
                modelNumber: modelData.modelNumber,
            },
        });
        dbAssetModels.push(created);
    }
    console.log(`✓ Created ${dbAssetModels.length} asset models`);
    console.log("🏷️  Creating status labels...");
    const statusLabelsData = [
        { name: "Ready to Deploy", type: "Deployable" },
        { name: "Deployed", type: "Deployable" },
        { name: "Pending", type: "Pending" },
        { name: "Archive", type: "Archived" },
        { name: "Broken - Not Fixable", type: "Undeployable" },
        { name: "Lost/Stolen", type: "Undeployable" },
        { name: "In Repair", type: "Undeployable" },
        { name: "Out for Diagnostic", type: "Undeployable" },
        { name: "Under Audit", type: "Pending" },
        { name: "Retired", type: "Archived" },
    ];
    const dbStatusLabels = [];
    for (const label of statusLabelsData) {
        const created = await prisma.statusLabel.upsert({
            where: { name: label.name },
            update: {},
            create: { ...label, slug: (0, crypto_1.randomUUID)() },
        });
        dbStatusLabels.push(created);
    }
    console.log(`✓ Created ${dbStatusLabels.length} status labels`);
    console.log("📦 Creating assets...");
    for (let i = 1; i <= 20; i++) {
        const assetTag = `AST-${String(i).padStart(5, "0")}`;
        const modelIdx = i % dbAssetModels.length;
        const statusIdx = i % dbStatusLabels.length;
        const userIdx = i % 2 === 0 ? (i % dbUsers.length) : null;
        await prisma.asset.upsert({
            where: { assetTag },
            update: {},
            create: {
                assetTag,
                slug: (0, crypto_1.randomUUID)(),
                name: `${dbAssetModels[modelIdx].name} - ${i}`,
                modelId: dbAssetModels[modelIdx].id,
                statusId: dbStatusLabels[statusIdx].id,
                companyId: dbCompanies[i % dbCompanies.length].id,
                locationId: dbLocations[i % dbLocations.length].id,
                supplierId: dbSuppliers[i % dbSuppliers.length].id,
                checkedOutUserId: userIdx !== null ? dbUsers[userIdx].id : null,
                purchaseCost: 500 + Math.random() * 2000,
                purchaseDate: new Date(),
                notes: `Dummy asset record #${i}`,
            },
        });
    }
    console.log(`✓ Created 20 assets`);
    console.log("📋 Creating tasks...");
    for (let i = 1; i <= 20; i++) {
        const key = `TASK-${i}`;
        await prisma.task.upsert({
            where: { key },
            update: {},
            create: {
                key,
                slug: (0, crypto_1.randomUUID)(),
                summary: `Maintenance Task ${i}: Check equipment stability`,
                userId: dbUsers[i % dbUsers.length].id,
                createdBy: dbUsers[0].id,
                updatedBy: dbUsers[0].id,
                status: i % 3 === 0 ? "Done" : i % 2 === 0 ? "In Progress" : "To do",
            }
        });
    }
    console.log(`✓ Created 20 tasks`);
    console.log("🔔 Creating notifications...");
    for (let i = 1; i <= 20; i++) {
        await prisma.notification.create({
            data: {
                userId: dbUsers[i % dbUsers.length].id,
                type: i % 2 === 0 ? "alert" : "info",
                message: `Notification ${i}: System update successfully applied to your account.`,
            }
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
//# sourceMappingURL=seed.js.map