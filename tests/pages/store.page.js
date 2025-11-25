import { MENU } from "../data/menu";
//import { CartPage } from "./cart.page";
//import { CatalogPage } from "./catalog.page";
//import { InventoryPage } from "./inventory.page";

export class StorePage{

    constructor(page) {
        this.page = page;
        this.menuOptionBtn = (menuOption) => page.getByTestId('store-tab-' + menuOption);
        //this.inventory = new InventoryPage(page);
        //this.cart = new CartPage(page);
        //this.catalog = new CatalogPage(page)
    }

    /************************** Action ***************************/

    /**
    * Navigate to Home page
    */
    async navigateToHomePage() {
        await this.menuOptionBtn(MENU.home.name).click();
    }

    /**
    * Navigate to Inventory page
    */
    async navigateToInventoryPage() {
        await this.menuOptionBtn(MENU.inventory.name).click();
    }

    /**
    * Navigate to Catalog page
    */
    async navigateToCatalogPage() {
        await this.menuOptionBtn(MENU.catalog.name).click();
    }

    /**
    * Navigate to Cart page
    */
    async navigateToCartPage() {
        await this.menuOptionBtn(MENU.cart.name).click();
    }

    /**
    * Navigate to store HomePage
    */ 
    async openStorePage() {
        await this.page.goto('');
    }


}