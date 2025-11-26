import { test } from '@playwright/test';
import { CartPage } from './pages/cart.page';
import { CatalogPage } from './pages/catalog.page';
import { StorePage } from './pages/store.page';
import { INVENTORY_PRODUCTS } from './data/products';
import { PaymentPage } from './pages/payments.page';
import { PAYMENT_METHODS } from './data/paymentMethods';

test.beforeEach(async ({ page }) => {
    const store = new StorePage(page);
    await store.openStorePage();
});

test('E2E store journey and validate product data through it', async ({ page }) => {
    const store = new StorePage(page);
    const cart = new CartPage(page);
    const catalog = new CatalogPage(page);
    const payment = new PaymentPage(page);
    const paymentMethod = await payment.getRandonPaymentMethod();
    var index = 0;
    await test.step('Add product from catalog to cart', async () => {
      await store.navigateToCatalogPage();
      index = await catalog.addRandonProductToCart();
    });
    await test.step('Validate product added to cart', async () => {
      await store.navigateToCartPage();
      await cart.validateProductInCart(INVENTORY_PRODUCTS.at(index));
    });
    await test.step('Click on \'Go to Payment\' button and Validate product listed', async () => {
      await cart.goToPayments();
      await payment.validateProductAtPaymentPage(INVENTORY_PRODUCTS.at(index));
    });
    await test.step('Click on \'Confirm Payment\' button and Validate order', async () => {
      await payment.chosePaymentMethod(paymentMethod);
      await payment.confirmPayment();
    });
});