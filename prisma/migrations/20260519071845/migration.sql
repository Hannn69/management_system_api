/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AssetModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Manufacturer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `StatusLabel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `AssetModel_name_key` ON `AssetModel`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Company_name_key` ON `Company`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Department_name_key` ON `Department`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Location_name_key` ON `Location`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Manufacturer_name_key` ON `Manufacturer`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `StatusLabel_name_key` ON `StatusLabel`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_name_key` ON `Supplier`(`name`);
