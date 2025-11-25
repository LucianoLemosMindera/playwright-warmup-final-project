import { test } from '@playwright/test';
import { CartPage } from './pages/cart.page';
import { CatalogPage } from './pages/catalog.page';

test.beforeEach(async ({ page }) => {
    const cart = new CartPage(page);
    await cart.openStorePage();
});

test('validate Cart page when cart is empty', async ({ page }) => {
    const cart = new CartPage(page);
    await test.step('Naviagte to cart page', async () => {
      await cart.navigateToCartPage();
   });
    await test.step('Validate empty cart message', async () => {
      await cart.validateEmptyCart();
   });
});

test('validate Cart page when cart has products', async ({ page }) => {
    const cart = new CartPage(page);
    const catalog = new CatalogPage(page);
    await test.step('Setup scenario', async () => {
      await cart.navigateToCatalogPage();
      await catalog.addRandonProductToCart();
   });
    await test.step('Validate cart page elements with Products', async () => {
      await cart.navigateToCartPage();
      await cart.validateCartPageElements();
   });
});

test('Go to Payments from Cart page', async ({ page }) => {
    const cart = new CartPage(page);
    const catalog = new CatalogPage(page);
    await test.step('Setup scenario', async () => {
      await cart.navigateToCatalogPage();
      await catalog.addRandonProductToCart();
   });
    await test.step('Click on \'Go to Payment\' button', async () => {
      await cart.navigateToCartPage();
      await cart.goToPayments();
   });
});