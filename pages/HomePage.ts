import { Page, Locator } from "@playwright/test";

export class HomePage{

    private readonly page : Page;
    private readonly logo : Locator;
    private readonly lnkMyAccount : Locator;
    private readonly lnkRegister : Locator;
    private readonly lnkLogin : Locator;
    private readonly txtSearchBox : Locator;
    private readonly btnSearch : Locator;


    constructor (page : Page){

        this.page = page;
        this.logo = page.locator("#logo");
        this.lnkMyAccount = page.getByRole("link", { name: /My Account/ });
        this.lnkRegister = page.getByRole("link", {name : "Register"});
        this.lnkLogin = page.getByRole("link", { name: 'Login' });
        this.txtSearchBox = page.getByRole("textbox" , {name : "Search"});
        this.btnSearch = page.locator("button:has(i.fa-search)");
        
    }

    async isLogoVisible() : Promise<boolean> {
        return await this.logo.isVisible();
    }

     // Click on My Account
    async clickMyAccount(): Promise<void> {
        await this.lnkMyAccount.click();
    }

    // Enter product name in search box
    async enterProductName(pName: string): Promise<void> {
        await this.txtSearchBox.fill(pName); // Note: fill() clears the input automatically
    }

    // Click on search icon
    async clickSearch(): Promise<void> {
        await this.btnSearch.click();
    }


}