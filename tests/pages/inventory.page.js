import { expect } from "@playwright/test";
import { StorePage } from "./store.page";
import { CatalogPage } from "./catalog.page";


export class InventoryPage extends StorePage {

    constructor(page) {
        super(page);
        this.catalog = new CatalogPage(page);
        this.pageHeading = page.getByRole('heading', {name: 'Inventory Management'});
        this.productNameInput = page.getByTestId('inventory-input-name');
        this.productPriceInput = page.getByTestId('inventory-input-price');
        this.productQuantityInput = page.getByTestId('inventory-input-quantity');
        this.addProductButton = page.getByTestId('inventory-submit-button');
        this.productTile = (value) => page.getByTestId('inventory-product-' + value);
        this.productTileName = (value) => page.getByTestId('inventory-product-name-' + value);
        this.productTilePrice = (value) => page.getByTestId('inventory-product-price-value-' + value);
        this.productTileQuantity = (value) => page.getByTestId('inventory-product-quantity-' + value);
        this.productTileDecreaseButton = (value) => page.getByTestId('inventory-product-decrease-' + value);
        this.productTileIncreaseButton = (value) => page.getByTestId('inventory-product-increase-' + value);
    }

    /************************** Actions ***************************/

    /**
    * Add a new product to inventory
    * @param {string} name - Product name.
    * @param {string} price - Product price.
    * @param {string} quantity - Product quantity.
    */
    async addProductToInventory(name, price, quantity){
        await this.productNameInput.fill(name);
        await this.productPriceInput.fill(price);
        await this.productQuantityInput.fill(quantity);
        await this.addProductButton.click();
    }

    /**
    * Increase the available quantity from a given product
    * @param {string} index - Product index.
    */
    async increaseProductQuantityBy1(index){
        await this.productTileIncreaseButton(index).click();
    }

    /**
    * Decrease the available quantity from a given product
    * @param {string} index - Product index.
    */
    async decreaseProductQuantityBy1(index){
        await this.productTileDecreaseButton(index).click();
    }

    /************************** Assertions ***************************/

    /**
    * Validate presence of elements in Inventory page
    */
    async validatePageElements(){
        const lastProductIndex = await this.getLastProductIndex();
        await expect(this.pageHeading).toBeVisible();
        await expect(this.productNameInput).toBeVisible();
        await expect(this.productPriceInput).toBeVisible();
        await expect(this.productQuantityInput).toBeVisible();
        await expect(this.addProductButton).toBeVisible();
        await expect(this.productTile(lastProductIndex)).toBeVisible();
        await expect(this.productTileName(lastProductIndex)).toBeVisible();
        await expect(this.productTilePrice(lastProductIndex)).toBeVisible();
        await expect(this.productTileQuantity(lastProductIndex)).toBeVisible();
        await expect(this.productTileDecreaseButton(lastProductIndex)).toBeVisible();
        await expect(this.productTileIncreaseButton(lastProductIndex)).toBeVisible();
    }

    /**
    * Validate the available quantity from a given product
    * @param {string} index - Product index.
    * @param {string} newQuantity - Product quantity to be assert against.
    */
    async validateProductQuantity(index, newQuantity){
        await expect(
            this.productTileQuantity(index))
            .toContainText(newQuantity);
    }

    /**
    * Validate a product just added to inventory by validating the last product listed
    * @param {string} name - Product name.
    * @param {string} price - Product price.
    * @param {string} quantity - Product quantity.
    */
    async validateProductAddedToInventory(name, price, quantity){
        const lastProductIndex = await this.getLastProductIndex();
        await expect(this.productTileName(lastProductIndex)).toContainText(name);
        await expect(this.productTilePrice(lastProductIndex)).toContainText(price);
        await expect(this.productTileQuantity(lastProductIndex)).toContainText(quantity);
    }

    /**
    * Validate if the product just added to inventory is also being presented at Catalog page
    * @param {Product} product - Product to be verified.
    */
    async validateProductIsPresentInCatalog(product){
        const lastProductIndex = await this.getLastProductIndex();
        this.catalog.validateProductOnCatalog(lastProductIndex, product)
    }

    /************************** Utilities ***************************/

    /**
    * Return quantity of product from a given index.
    * @param {number} index - Product Index.
    */
    async getQuantity(index){
        return await this.productTileQuantity(index).textContent();
    }

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