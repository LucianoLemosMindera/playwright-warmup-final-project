import { test, expect } from '@playwright/test';
import { HomePage } from "./pages/home.page";
import { MENU, TILE } from './data/menu';

test.beforeEach(async ({ page }) => {
  const home = new HomePage(page);
  await home.navigateToHomePage();
});

test('has all tiles', async ({ page }) => {
  const home = new HomePage(page);
  for(const menuOption of TILE){
    await home.validateTilesExist(menuOption);
  }

});

test('validate menu', async ({ page }) => {
  const home = new HomePage(page);
  for(const menuOption of MENU){
    await home.validateMenuOptions(menuOption);
  }
});
