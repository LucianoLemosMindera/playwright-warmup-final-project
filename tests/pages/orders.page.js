import { expect } from "@playwright/test";
import { StorePage } from "./store.page";

export class OrderPage extends StorePage {

    constructor(page) {
        super(page);
        this.pageHeading = page.getByRole('heading', {name: 'Purchase Orders'});
        this.ordersEmptyMesssage = page.getByTestId('orders-empty-message');
        this.orderDate = (value) => page.getByTestId('order-date-' + value);
        this.orderPaymentMethod = (value) => page.getByTestId('order-payment-' + value);
        this.orderItemName = (order, item) => page.getByTestId('order-item-name-' + order + '-' + item);
        this.orderItemTotal = (order, item) => page.getByTestId('order-item-total-' + order + '-' + item);
        this.orderTotalValue = (value) => page.getByTestId('order-total-' + value);

    }
    
    /************************** Assertions ***************************/
    
    /** 
    * Validate Order page presentation when cart is empty
    */   
    async validateNoOrderMessage(){
        await expect(this.ordersEmptyMesssage).toBeVisible();
    }

    /**
    * Validate the existence of elements at Order page with products added to cart
    */   
    async validateOrderPageElements(){
        await expect(this.pageHeading).toBeVisible();
        await expect(this.orderDate(0)).toBeVisible();
        await expect(this.orderPaymentMethod(0)).toBeVisible();
        await expect(this.orderItemName(0, 0)).toBeVisible();
        await expect(this.orderItemTotal(0, 0)).toBeVisible();
        await expect(this.orderTotalValue(0)).toBeVisible();
    }

    /**
    * Validate order data
    * @param {Product} product - Product to be validated.
    * @param {String} paymentMethod - Product to be validated.
    */   
    async validateOrder(product, paymentMethod){
        const currentDateTime = new Date().toLocaleString();
        const quantity = 1;
        await expect(this.pageHeading).toBeVisible();
        await expect(this.orderDate(0)).toContainText(currentDateTime);
        await expect(this.orderPaymentMethod(0)).toContainText(paymentMethod);
        await expect(this.orderItemName(0, 0)).toContainText(product.name);
        await expect(this.orderItemTotal(0, 0)).toContainText(product.value);
        await expect(this.orderTotalValue(0)).toContainText((product.value * quantity).toString());
    }
}