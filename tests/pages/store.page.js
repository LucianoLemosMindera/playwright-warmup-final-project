import { MENU } from "../data/menu";

export class StorePage{

    constructor(page) {
        this.page = page;
        this.menuOptionBtn = (menuOption) => page.getByTestId('store-tab-' + menuOption);
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
    * Navigate to Payments page
    */
    async navigateToPaymentPage() {
        await this.menuOptionBtn(MENU.payments.name).click();
    }

    /**
    * Navigate to store HomePage
    */ 
    async openStorePage() {
        await this.page.goto('');
    }
}