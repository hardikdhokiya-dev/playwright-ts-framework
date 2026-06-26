import { test as baseTest } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";


// Define a TypeScript type contract listing custom page identifiers
type AppFixtures = {

    homePage : HomePage;
    registrationPage : RegistrationPage;

}

// Extend the base Playwright test runner to inject custom Page Objects -- Custom Fixtures
export const test = baseTest.extend<AppFixtures> ({

    //The homePage fixture instantiates the object and handles the base navigation
    homePage : async ( { page }, use ) => {

            const homePage = new HomePage(page);

            // Setup: Navigate to the base URL before passing control to the test
            await homePage.navigate();

            // Hand over the live, positioned homePage instance to the test spec
            await use (homePage);

            // Teardown: Any code written here runs automatically after the test finishes

    },

    // The registrationPage fixture simply injects the class instance when requested
    registrationPage : async ( { page }, use) => {

            const registrationPage = new RegistrationPage(page);
            await use (registrationPage);

    }

});

/**
 * Re-export Playwright's expect so test files
 * import everything from a single fixture module.
 */
export { expect } from "@playwright/test";