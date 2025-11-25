import { expect } from "@playwright/test";
import { StorePage } from "./store.page";

export class CatalogPage extends StorePage {

    constructor(page) {
        super(page);
        this.pageHeading = page.getByRole('heading', {name: 'Product Catalog'});
        this.catalogItemName = (value) => page.getByTestId('catalog-item-name-' + value);
        this.catalogItemPrice = (value) => page.getByTestId('catalog-item-price-value-' + value);
        this.catalogItemQuantity = (value) => page.getByTestId('catalog-item-quantity-' + value);
        this.addToCartButton = (value) => page.getByTestId('catalog-item-add-button-' + value);
    }

    /************************** Action ***************************/

    /**
    * Add product to Cart
    * @returns {number} index - Index of product added
    */   
    async addRandonProductToCart(){
        const index = await this.getRandonIndex();
        await this.addToCartButton(index).click();
        return index;
    }

    /************************** Assertion ***************************/

    /**
    * Validate if elements in Catalog page are visible
    * @param {number} index - index of item to be validated.
    */   
    async validateElements(index){
        await expect(this.pageHeading).toBeVisible();
        await expect(this.addToCartButton(index)).toBeVisible();
    }

    /**
    * Validate if product load the right value for name, price and  available quantity
    * @param {number} index - index of product to be validate.
    * @param {product} product - Product to be validated.
    */   
    async validateProductOnCatalog(index, product){
        await expect(this.catalogItemName(index)).toHaveText(product.name);
        await expect(this.catalogItemPrice(index)).toHaveText(product.value);
        await expect(this.catalogItemQuantity(index)).toContainText(product.quantity);
    }

    /**
    * Validate if product load the right value for name, price and at Cart page
    * @param {product} product - Product to be validated.
    */   
    async validateProductAtCartPage(product){
        await this.cart.validateCartPageProduct(product)
    }

    /**
    * validate if button 'Add to Cart' is enable or disabled and its text
    * @param {number} index - index of product to be validate.
    * @param {boolean} isAvailable - indicates if button should be enabled.
    */   
    async validateAddToCartButton(index, isAvailable){
        if (isAvailable){
            await expect(this.addToCartButton(index)).toHaveText("Add to Cart");
            await expect(this.addToCartButton(index)).toBeEnabled;
        }
        else{
            await expect(this.addToCartButton(index)).toHaveText("Out of Stock");
            await expect(this.addToCartButton(index)).toBeDisabled; 
        }
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