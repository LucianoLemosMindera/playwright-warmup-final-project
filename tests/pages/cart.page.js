import { expect } from "@playwright/test";
import { StorePage } from "./store.page";

export class CartPage extends StorePage {

    constructor(page) {
        super(page);
        //this.catalog = new CatalogPage(page);
        this.pageHeading = page.getByRole('heading', {name: 'Your Cart'});
        this.emptyCartMesssage = page.getByTestId('cart-empty-message');
        this.cartItemName = (value) => page.getByTestId('cart-item-name-' + value);
        this.cartItemQuantity = (value) => page.getByTestId('cart-item-quantity-' + value);
        this.cartItemValue = (value) => page.getByTestId('cart-item-price-value-' + value);
        this.cartItemTotal = (value) => page.getByTestId('cart-item-total-' + value);
        this.cartTotalValue = page.getByTestId('cart-total-value');
        this.goToPaymentButton = page.getByTestId('cart-go-to-payment');
    }

    /************************** Action ***************************/
    
    /** 
    * Click on 'Go to Payments' button
    */   
    async goToPayments(){
        await this.goToPaymentButton.click();
    }

    /************************** Assertion ***************************/

    /** 
    * Validate page presentation when cart is empty
    */   
    async validateEmptyCart(){
        await expect(this.emptyCartMesssage).toBeVisible();
    }

    /**
    * Validate the existence of elements at Cart page
    */   
    async validateCartPageElements(){
        await expect(this.cartItemName(0)).toBeVisible();
        await expect(this.cartItemQuantity(0)).toBeVisible();
        await expect(this.cartItemValue(0)).toBeVisible();
        await expect(this.cartItemTotal(0)).toBeVisible();
        await expect(this.cartTotalValue).toBeVisible();
        await expect(this.goToPaymentButton).toBeVisible();
    }

    /**
    * Validate product data on cart
    * @param {Product} product - Product to be validated.
    */   
    async validateProductInCart(product){
        const quantity = 1;
        await expect(this.cartItemName(0)).toHaveText(product.name);
        await expect(this.cartItemQuantity(0)).toHaveText(quantity.toString());
        await expect(this.cartItemValue(0)).toHaveText(product.value)
        await expect(this.cartItemTotal(0)).toContainText((product.value * quantity).toString());
    }

    /************************** Utilities ***************************/

    /**
    * Return the index of the last product listed.
    */
    async getLastProductIndex() {
        return await this.page.getByRole('listitem').count() -1;
    }

    /**
    * Return a valid random index from listed products
    */
    async getRandonIndex(){
        const lastProductIndex = await this.getLastProductIndex();
        return Math.floor(Math.random() * lastProductIndex);
    }
}