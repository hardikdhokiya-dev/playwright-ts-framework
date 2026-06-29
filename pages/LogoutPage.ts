import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage {

    private readonly page : Page;
    private readonly titleAccountLogout : Locator;
    private readonly btnContinue : Locator;
    
    constructor ( page : Page ){

        this.page = page;
        this.titleAccountLogout = page.getByTitle("Account Logout");
        this.btnContinue = page.getByRole("link", {name : "Continue"});
    
    }


    /**
     * verify Account Logout page loaded
     */
    async verifyAccountLogoutPageLoaded() : Promise<void> {
        await expect(this.titleAccountLogout).toBeVisible();
    }

    /**
     * click on continue button
     */
    async clickContinue() : Promise<HomePage> {

        await this.btnContinue.click();
        return new HomePage(this.page);
    }

}