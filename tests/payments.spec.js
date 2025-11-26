import { test } from '@playwright/test';
import { CartPage } from './pages/cart.page';
import { CatalogPage } from './pages/catalog.page';
import { PaymentPage } from './pages/payments.page';

test.beforeEach(async ({ page }) => {
    const payment = new PaymentPage(page);
    await payment.openStorePage();
});

test('validate Payment page when cart is empty', async ({ page }) => {
    await test.step('Validate no Payment message when cart is empty', async () => {
      const payment = new PaymentPage(page);
      await payment.navigateToPaymentPage();
      await payment.validateNoPayment();
   });
});

test('Validate elements in Payment page with product added to Cart', async ({ page }) => {
    const payment = new PaymentPage(page);
    const cart = new CartPage(page);
    const catalog = new CatalogPage(page);
    await test.step('Setup scenario', async () => {
      await payment.navigateToCatalogPage();
      await catalog.addRandonProductToCart();
      await payment.navigateToCartPage();
      await cart.goToPayments();
   });
    await test.step('Validate Payment page elements', async () => {
      await payment.navigateToPaymentPage();
      await payment.validatePaymentPageElements();
   });
});