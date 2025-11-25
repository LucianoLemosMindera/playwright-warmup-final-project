import { test } from '@playwright/test';
import { HomePage } from "./pages/home.page";
import { TILE } from './data/homePageTile';

test('has all tiles', async ({ page }) => {
  const home = new HomePage(page);
  await home.openStorePage();
  await home.navigateToHomePage();
  for(const menuOption of TILE){
    await home.validateTilesExist(menuOption);
  }
});
