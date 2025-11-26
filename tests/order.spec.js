import test from "@playwright/test";
import { OrderPage } from "./pages/orders.page";
import { PaymentPage } from "./pages/payments.page";
import { CartPage } from "./pages/cart.page";
import { CatalogPage } from "./pages/catalog.page";

test.beforeEach(async ({ page }) => {
    const order = new OrderPage(page);
    await order.openStorePage();
});

test('validate Order page when cart is empty', async ({ page }) => {
    await test.step('Validate \'no Order\' message when cart is empty', async () => {
      const order = new OrderPage(page);
      await order.navigateToOrderPage();
      await order.validateNoOrderMessage();
   });
});

test('Validate elements in Order page with product added to Cart', async ({ page }) => {
    const order = new OrderPage(page)
    const payment = new PaymentPage(page);
    const cart = new CartPage(page);
    const catalog = new CatalogPage(page);
    const paymentMethod = await payment.getRandonPaymentMethod();
    await test.step('Setup scenario', async () => {
      await order.navigateToCatalogPage();
      await catalog.addRandonProductToCart();
      await order.navigateToCartPage();
      await cart.goToPayments();
      await payment.chosePaymentMethod(paymentMethod);
      await payment.confirmPayment();
   });
    await test.step('Validate Order page elements', async () => {
      await order.validateOrderPageElements();
   });
});