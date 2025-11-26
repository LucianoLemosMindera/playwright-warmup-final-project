import { expect } from "@playwright/test";
import { StorePage } from "./store.page";
import { PAYMENT_METHODS } from "../data/paymentMethods";

export class PaymentPage extends StorePage {

    constructor(page) {
        super(page);
        this.pageHeading = page.getByRole('heading', {name: 'Payment'});
        this.paymentEmptyMesssage = page.getByTestId('payment-empty-message');
        this.paymentItemName = (value) => page.getByTestId('payment-item-name-' + value);
        this.paymentItemQuantity = (value) => page.getByTestId('payment-item-quantity-' + value);
        this.paymentItemValue = (value) => page.getByTestId('payment-item-price-value-' + value);
        this.paymentItemTotal = (value) => page.getByTestId('payment-item-total-value-' + value);
        this.paymentTotalValue = page.getByTestId('payment-total-value');
        this.paymentMethodOption = (value) => page.getByRole('radio', {name: value});
        this.confirmPaymentButton = page.getByTestId('payment-confirm-button');
    }

    /************************** Action ***************************/

    /** 
    * Select a payment method
    * @param {String} paymentMethod - Payment method to select.
    */   
    async chosePaymentMethod(paymentMethod){
        await this.paymentMethodOption(paymentMethod).check();
    }
    
    /** 
    * Click on 'Confirm Payment' button
    */   
    async confirmPayment(){
        await this.confirmPaymentButton.click();
    }
    
    /************************** Assertions ***************************/
    
    /** 
    * Validate Payment page presentation when cart is empty
    */   
    async validateNoPayment(){
        await expect(this.paymentEmptyMesssage).toBeVisible();
    }

    /**
    * Validate the existence of elements at Payment page with products added to cart
    */   
    async validatePaymentPageElements(){
        await expect(this.pageHeading).toBeVisible();
        await expect(this.paymentItemName(0)).toBeVisible();
        await expect(this.paymentItemQuantity(0)).toBeVisible();
        await expect(this.paymentItemValue(0)).toBeVisible();
        await expect(this.paymentItemTotal(0)).toBeVisible();
        await expect(this.paymentTotalValue).toBeVisible();
        for(const paymentMethod of PAYMENT_METHODS){
            await expect(this.paymentMethodOption(paymentMethod)).toBeVisible();;
        }
        await expect(this.confirmPaymentButton).toBeVisible();
    }

    /**
    * Validate product data on payment page
    * @param {Product} product - Product to be validated.
    */   
    async validateProductAtPaymentPage(product){
        const quantity = 1;
        await expect(this.paymentItemName(0)).toHaveText(product.name);
        await expect(this.paymentItemQuantity(0)).toHaveText(quantity.toString());
        await expect(this.paymentItemValue(0)).toHaveText(product.value)
        await expect(this.paymentItemTotal(0)).toContainText((product.value * quantity).toString());
    }


    /************************** Utilities ***************************/

    /** 
    * Select a payment method
    * @returns {String} paymentMethod - Valid payment method.
    */   
    async getRandonPaymentMethod(paymentMethod){
        return await PAYMENT_METHODS[Math.floor(Math.random()*PAYMENT_METHODS.length)];
    }
}