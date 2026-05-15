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
    console.log("🌱 Seeding database with UUID slugs...");
    console.log("📝 Creating users...");
    const passwordHash = await bcrypt.hash("password123", 12);
    const usersData = [
        { email: "admin@example.com", passwordHash },
        { email: "manager@example.com", passwordHash },
        { email: "analyst@example.com", passwordHash },
        { email: "sonvirak@example.com", passwordHash },
        { email: "alice@example.com", passwordHash },
        { email: "bob@example.com", passwordHash },
    ];
    const dbUsers = [];
    for (const user of usersData) {
        const created = await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                ...user,
                slug: (0, crypto_1.randomUUID)(),
            },
        });
        dbUsers.push(created);
    }
    console.log(`✓ Created ${dbUsers.length} users`);
    console.log("🏢 Creating companies...");
    const companiesData = [
        { name: "Tech Corp", email: "contact@techcorp.com", phone: "1-800-TECH-01", fax: "1-800-TECH-02" },
        { name: "Global Solutions", email: "info@globalsolutions.com", phone: "1-800-GLOB-01", fax: "1-800-GLOB-02" },
    ];
    const dbCompanies = [];
    for (const company of companiesData) {
        const created = await prisma.company.upsert({
            where: { name: company.name },
            update: {},
            create: {
                ...company,
                slug: (0, crypto_1.randomUUID)(),
                notes: `${company.name} is a leading organization.`,
            },
        });
        dbCompanies.push(created);
    }
    console.log(`✓ Created ${dbCompanies.length} companies`);
    console.log("📍 Creating locations...");
    const locationsData = [
        { name: "New York Office", city: "New York", state: "NY", country: "USA", address: "123 Broadway", zip: "10001", currency: "USD" },
        { name: "London Studio", city: "London", state: "England", country: "UK", address: "456 Oxford St", zip: "W1A 1AA", currency: "GBP" },
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
                companyId: dbCompanies[i % dbCompanies.length].id,
            },
        });
        dbLocations.push(created);
    }
    console.log(`✓ Created ${dbLocations.length} locations`);
    console.log("📦 Creating categories...");
    const categoriesData = [
        { name: "Laptops", type: "Asset" },
        { name: "Phones", type: "Asset" },
        { name: "Monitors", type: "Asset" },
    ];
    const dbCategories = [];
    for (const cat of categoriesData) {
        const created = await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: {
                ...cat,
                slug: (0, crypto_1.randomUUID)(),
            },
        });
        dbCategories.push(created);
    }
    console.log(`✓ Created ${dbCategories.length} categories`);
    console.log("🏭 Creating manufacturers...");
    const manufacturersData = [
        { name: "Apple", url: "https://apple.com" },
        { name: "Dell", url: "https://dell.com" },
        { name: "Samsung", url: "https://samsung.com" },
    ];
    const dbManufacturers = [];
    for (const mfr of manufacturersData) {
        const created = await prisma.manufacturer.upsert({
            where: { name: mfr.name },
            update: {},
            create: {
                ...mfr,
                slug: (0, crypto_1.randomUUID)(),
            },
        });
        dbManufacturers.push(created);
    }
    console.log(`✓ Created ${dbManufacturers.length} manufacturers`);
    console.log("🛒 Creating suppliers...");
    const suppliersData = [
        { name: "Amazon Business", email: "business@amazon.com" },
        { name: "CDW", email: "sales@cdw.com" },
    ];
    const dbSuppliers = [];
    for (const sup of suppliersData) {
        const created = await prisma.supplier.upsert({
            where: { name: sup.name },
            update: {},
            create: {
                ...sup,
                slug: (0, crypto_1.randomUUID)(),
            },
        });
        dbSuppliers.push(created);
    }
    console.log(`✓ Created ${dbSuppliers.length} suppliers`);
    console.log("💻 Creating asset models...");
    const assetModelsData = [
        { name: "MacBook Pro 14", categoryIdx: 0, manufacturerIdx: 0, modelNumber: "A2442" },
        { name: "Dell XPS 15", categoryIdx: 0, manufacturerIdx: 1, modelNumber: "X9520" },
        { name: "iPhone 13 Pro", categoryIdx: 1, manufacturerIdx: 0, modelNumber: "A2638" },
        { name: "Samsung G7", categoryIdx: 2, manufacturerIdx: 2, modelNumber: "G7-32" },
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
    ];
    const dbStatusLabels = [];
    for (const label of statusLabelsData) {
        const created = await prisma.statusLabel.upsert({
            where: { name: label.name },
            update: {},
            create: {
                ...label,
                slug: (0, crypto_1.randomUUID)(),
            },
        });
        dbStatusLabels.push(created);
    }
    console.log(`✓ Created ${dbStatusLabels.length} status labels`);
    console.log("📦 Creating assets...");
    const assetsData = [
        { assetTag: "AST-001", name: "MBP 14 - John", modelIdx: 0, statusIdx: 1, userIdx: 0 },
        { assetTag: "AST-002", name: "MBP 14 - Stock", modelIdx: 0, statusIdx: 0, userIdx: null },
        { assetTag: "AST-003", name: "XPS 15 - Stock", modelIdx: 1, statusIdx: 0, userIdx: null },
        { assetTag: "AST-004", name: "iPhone 13 - Sarah", modelIdx: 2, statusIdx: 1, userIdx: 1 },
        { assetTag: "AST-005", name: "Monitor G7", modelIdx: 3, statusIdx: 4, userIdx: null },
        { assetTag: "AST-006", name: "iPad Air", modelIdx: 0, statusIdx: 2, userIdx: null },
        { assetTag: "AST-007", name: "Old Laptop", modelIdx: 1, statusIdx: 3, userIdx: null },
        { assetTag: "AST-008", name: "Lost iPhone", modelIdx: 2, statusIdx: 5, userIdx: null },
    ];
    for (const asset of assetsData) {
        await prisma.asset.upsert({
            where: { assetTag: asset.assetTag },
            update: {},
            create: {
                assetTag: asset.assetTag,
                slug: (0, crypto_1.randomUUID)(),
                name: asset.name,
                modelId: dbAssetModels[asset.modelIdx].id,
                statusId: dbStatusLabels[asset.statusIdx].id,
                companyId: dbCompanies[0].id,
                locationId: dbLocations[0].id,
                supplierId: dbSuppliers[0].id,
                checkedOutUserId: asset.userIdx !== null ? dbUsers[asset.userIdx].id : null,
                purchaseCost: 1500.00,
                purchaseDate: new Date(),
            },
        });
    }
    console.log("📋 Creating tasks...");
    for (let i = 1; i <= 10; i++) {
        const key = `TASK-${i}`;
        await prisma.task.upsert({
            where: { key },
            update: {},
            create: {
                key,
                slug: (0, crypto_1.randomUUID)(),
                summary: `Task ${i} summary`,
                userId: dbUsers[0].id,
                createdBy: dbUsers[0].id,
                updatedBy: dbUsers[0].id,
            }
        });
    }
    console.log("🔔 Creating notifications...");
    for (let i = 1; i <= 5; i++) {
        await prisma.notification.create({
            data: {
                slug: (0, crypto_1.randomUUID)(),
                userId: dbUsers[0].id,
                type: "system",
                message: `Notification ${i}`,
            }
        });
    }
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