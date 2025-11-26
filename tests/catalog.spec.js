import { test } from '@playwright/test';
import { CatalogPage } from './pages/catalog.page';
import { INVENTORY_PRODUCTS } from './data/products';
import { CartPage } from './pages/cart.page';

test.beforeEach(async ({ page }) => {
  await test.step('Navigate to catalog page', async () => {
    const catalog = new CatalogPage(page);
    await catalog.openStorePage();
    await catalog.navigateToCatalogPage();
   });
});

test('validate Catalog page', async ({ page }) => {
    const catalog = new CatalogPage(page);
    const index = await catalog.getRandonIndex();
    await test.step('Validate catalog page elements', async () => {
      await catalog.validateElements(index);
   });
    await test.step('Validate product data in catalog', async () => {
      await catalog.validateProductOnCatalog(index, INVENTORY_PRODUCTS.at(index));
   });
});

test('validate \'Add to cart\' Button enable when product is available', async ({ page }) => {
    const catalog = new CatalogPage(page);
    await test.step('Validate \'Add to cart\' Button', async () => {
      await catalog.validateAddToCartButton(0, true);
   });
});

test('validate \'Add to cart\' Button disable when product is NOT available', async ({ page }) => {
    const catalog = new CatalogPage(page);
    await test.step('Validate \'Add to cart\' Button', async () => {
      await catalog.validateAddToCartButton(6, false);
   });
});