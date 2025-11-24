import { test } from '@playwright/test';
import { InventoryPage } from './pages/inventory.page';
import { PRODUCT_TO_ADD } from './data/products';

test.beforeEach(async ({ page }) => {
  await test.step('Navigate to inventory page', async () => {
    const inventory = new InventoryPage(page);
    await inventory.navigateToInventoryPage();
   });
});

test('validate Inventory page elements', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await test.step('validate presence of elements in inventory page', async () => {
    await inventory.validatePageElements();
  });
});

test('Add product to inventory successfully', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const product = PRODUCT_TO_ADD.pokeball;
  await test.step('Fill new product fields and save new product', async () => {
    await inventory.addProductToInventory(product.name, product.value, product.quantity);
  });
  await test.step('validate new product added to inventory', async () => {
    await inventory.validateProductAddedToInventory(product.name, product.value, product.quantity);
  });
});