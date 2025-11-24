import { expect } from "@playwright/test";
import { MENU } from "../data/menu";
import { INVENTORY_PRODUCTS } from "../data/products";
import { StorePage } from "./store.page";


export class InventoryPage extends StorePage {

    constructor(page) {
        super(page);
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

    async navigateToInventoryPage() {
        await this.navigateToPage(MENU.inventory.name);
    }

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

    async addProductToInventory(name, price, quantity){
        await this.productNameInput.fill(name);
        await this.productPriceInput.fill(price);
        await this.productQuantityInput.fill(quantity);
        await this.addProductButton.click();
    }

    async validateProductAddedToInventory(name, price, quantity){
        const lastProductIndex = await this.getLastProductIndex();
        await expect(this.productTileName(lastProductIndex)).toContainText(name);
        await expect(this.productTilePrice(lastProductIndex)).toContainText(price);
        await expect(this.productTileQuantity(lastProductIndex)).toContainText(quantity);
    }

    async getLastProductIndex() {
        return await this.page.getByRole('listitem').count() -1;
    }
}