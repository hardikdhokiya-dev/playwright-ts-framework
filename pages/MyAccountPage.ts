import { Page, Locator, expect } from "@playwright/test";
import { LogoutPage } from "./LogoutPage";


export class MyAccount{


    private readonly page : Page;
    private readonly titleMyAccount : Locator;
    private readonly linkLogout : Locator;


    constructor (page : Page){

        this.page = page;
        this.titleMyAccount = page.getByTitle("My Account");
        this.linkLogout = page.getByRole("list").filter({hasText : "Logout"});

    }

    /**
     * verifies that the My Account page is displayed.
     */
    async verifyMyAccountPageLoaded() : Promise<void> {
        await expect(this.titleMyAccount).toBeVisible();
    }


    /**
     * clicks the Logout link.
     * @returns 
     */
    async clickLogout() : Promise<LogoutPage>  {

        await this.linkLogout.click();
        return new LogoutPage(this.page);

    }

}