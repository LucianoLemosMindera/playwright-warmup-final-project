## About The Project
This project is the final delivery from [Luciano Lemos](https://github.com/LucianoLemosMindera) for the Test Automation Warm-up With Playwright and ir delivers automated test for the Store Page inside this [Playground app](https://playground-drab-six.vercel.app/store)

### Built With

* [Javascript](https://nodejs.org/en)
* [Playwright](https://playwright.dev/)

## Getting Started

### Prerequisites

Here is a list things you need to run this project.

* Node - Choose the LTS version from [https://nodejs.org/](https://nodejs.org/). Run the installer and keep all default options.
* Git - Download the intaller from [https://git-scm.com/downloads](https://git-scm.com/downloads) and run it keeping the default settings.
After Isntalling it you can run
  ```sh
  git config --global user.name "Your Name"
  git config --global user.email "your-email@example.com"
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git https://github.com/LucianoLemosMindera/playwright-warmup-final-project.git
   ```

### Running test

* To run All tests
   ```sh
   npx playwright test
   ```
* To run specific test
   ```sh
   npx playwright test [file-name.spec.ts]
   ```
* To run on UI mode
   ```sh
   npx playwright test --ui
   ```
You can learn more about run Playwright tests in [https://playwright.dev/docs/running-tests#command-line](https://playwright.dev/docs/running-tests#command-line)


## Project structure

- /test
  - /data
    - `homePageTile.js` - Instructions locate at Home page
    - `menu.js` - List of option to navigate inside the Store
    - `paymentMethods.js` - List of available payment methods
    - `products.js` - Contais a list of Products already in the Store inventory and a product to be added
  - /pages
    - `cart.page.js` - PageObject containg alements mapping and actions for Cart page
    - `catalog.page.js` - PageObject containg alements mapping and actions for Catalog page
    - `home.page.js` - PageObject containg alements mapping and actions for Home page
    - `inventory.page.js` -PageObject containg alements mapping and actions for Inventory page
    - `order.page.js` - PageObject containg alements mapping and actions for Orders page
    - `payments.page.js` - PageObject containg alements mapping and actions for Payments page
    - `store.page.js` - PageObject containg alements mapping and actions for navigation between pages
  - `cart.spec.js` - Class that holds tests for Cart page
  - `catalog.spec.js` - Class that holds tests for Catalog page
  - `home.spec.js` - Class that holds tests for Home page
  - `inventory.spec.js` - Class that holds tests for Inventory page
  - `order.spec.js` - Class that holds tests for Orders page
  - `payments.spec.js` - Class that holds tests for Payments page
  - `store.spec.js` -  Class that holds tests that requires actions in multiple pages
