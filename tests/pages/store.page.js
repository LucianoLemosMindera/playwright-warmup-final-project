export class StorePage{

    constructor(page) {
        this.page = page;
        this.menuOptionBtn = (menuOption) => page.getByTestId('store-tab-' + menuOption);
    }

    async navigateToPage(menuOption) {
        try{
            if (!expect(this.menuOptionBtn(menuOption)).toBeVisible());
                await this.page.goto('');
        }
        catch{
            await this.page.goto('');
        }

        await this.menuOptionBtn(menuOption).click();
    }
}