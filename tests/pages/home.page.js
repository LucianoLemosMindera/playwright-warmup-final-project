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

    async navigateToHomePage() {
            await this.navigateToPage(MENU.home.name);
        }

    async validateTilesExist(tile){
        await expect(this.istructionsTileImg(tile.name)).toBeVisible();
        await expect(this.instructionsileTitle(tile.name)).toBeVisible();
        await expect(this.instructionsileTitle(tile.name)).toHaveText(tile.instructionTitle);
    }

    async validateMenuOptions(menu){
        await expect(this.menuOptionBtn(menu.name)).toBeVisible();
        await expect(this.menuOptionBtn(menu.name)).toHaveText(menu.text);
    }

}