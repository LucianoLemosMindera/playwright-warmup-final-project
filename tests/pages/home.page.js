import { expect } from "@playwright/test";

export class HomePage{

    constructor(page) {
        this.page = page;
        this.pageHeading = page.getByRole('heading', {name: 'Instructions'});
        this.istructionsTileImg = (value) => page.getByTestId('instructions-icon-' + value);
        this.instructionsileTitle = (value) => page.getByTestId('instructions-' + value + '-title');
        this.homeMenuBtn = (value) => page.getByTestId('store-tab-' + value);
    }

    async navigateToHomePage() {
        await this.page.goto('');
        await expect(this.pageHeading).toBeVisible();
    }

    async validateTilesExist(tile){
        await expect(this.istructionsTileImg(tile.name)).toBeVisible();
        await expect(this.instructionsileTitle(tile.name)).toBeVisible();
        await expect(this.instructionsileTitle(tile.name)).toHaveText(tile.instructionTitle);
    }

    async validateMenuOptions(menu){
        await expect(this.homeMenuBtn(menu.name)).toBeVisible();
        await expect(this.homeMenuBtn(menu.name)).toHaveText(menu.text);
    }

}