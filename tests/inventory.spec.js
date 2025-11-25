import { test } from '@playwright/test';
import { InventoryPage } from './pages/inventory.page';
import { PRODUCT_TO_ADD } from './data/products';
import { CatalogPage } from './pages/catalog.page';

test.beforeEach(async ({ page }) => {
  await test.step('Navigate to inventory page', async () => {
    const inventory = new InventoryPage(page);
    await inventory.openStorePage();
    await inventory.navigateToInventoryPage();
   });
});

test('Validate Inventory page elements', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await test.step('Validate presence of elements in inventory page', async () => {
    await inventory.validatePageElements();
  });
});

test('Add product to inventory successfully', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const catalog = new CatalogPage(page)
  const product = PRODUCT_TO_ADD.pokeball;
  var lastProductIndex = 0;
  await test.step('Fill new product fields and save new product', async () => {
    await inventory.addProductToInventory(product.name, product.value, product.quantity);
    lastProductIndex = await inventory.getLastProductIndex();
  });
  await test.step('Validate if new product was added to inventory', async () => {
    await inventory.validateProductAddedToInventory(product.name, product.value, product.quantity);
  });
  await test.step('Validate new product was show in Catalog page', async () => {
    await inventory.navigateToCatalogPage();
    await catalog.validateProductOnCatalog(lastProductIndex, product);
  });
});

test('Increase product quantity by 1', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const index = await inventory.getRandonIndex();
  const originalQuantity = Number(await inventory.getQuantity(index));
  const quantityIncreased = (originalQuantity + 1).toString();
  await test.step('Increase product quantity', async () => {
    await inventory.increaseProductQuantityBy1(index);
  });
  await test.step('Validate quantity after increase by 1', async () => {
    await inventory.validateProductQuantity(index, quantityIncreased);
  });
});

test('Decrease product quantity by 1', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const index = await inventory.getRandonIndex();
  const originalQuantity = Number(await inventory.getQuantity(index));
  const quantityIncreased = (originalQuantity - 1).toString();
  await test.step('Decrease product quantity', async () => {
    await inventory.decreaseProductQuantityBy1(index);
  });
  await test.step('Validate quantity after decrease by 1', async () => {
    await inventory.validateProductQuantity(index, quantityIncreased);
  });
});