import { expect } from "@playwright/test";
import { StorePage } from "./store.page";
import { MENU } from "../data/menu";

export class HomePage extends StorePage {

    constructor(page) {
        super(page);
        this.pageHeading = page.getByRole('heading', {name: 'Instructions'});
        this.istructionsTileImg = (value) => page.getByTestId('instructions-icon-' + value);
        this.instructionsileTitle = (value) => page.getByTestId('instructions-' + value + '-title');
    }

    /**
    * Navigate to Home page
    */
    async navigateToHomePage() {
            await this.navigateToPage(MENU.home.name);
        }

    /**
    * Validate the existence of image, title and text from a given tile
    * @param {string} tile - Tile to be validate.
    */   
    async validateTilesExist(tile){
        await expect(this.istructionsTileImg(tile.name)).toBeVisible();
        await expect(this.instructionsileTitle(tile.name)).toBeVisible();
        await expect(this.instructionsileTitle(tile.name)).toHaveText(tile.instructionTitle);
    }
}