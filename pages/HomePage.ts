import { Page, Locator, expect } from "@playwright/test";
import { TestConfig } from "../config/TestConfig";

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
        this.lnkMyAccount = page.getByTitle("My Account");
        this.lnkRegister = page.getByRole("link", {name : "Register"});
        this.lnkLogin = page.getByRole("link", { name: 'Login' });
        this.txtSearchBox = page.getByRole("textbox" , {name : "Search"});
        this.btnSearch = page.locator("button:has(i.fa-search)");
        
    }

    async navigate() {
        await this.page.goto(TestConfig.BASE_URL);
    }

    async verifyHomePageLoaded(): Promise<void> {
        await expect(this.logo).toBeVisible();
    }

    // Click on My Account
    async clickMyAccount(): Promise<void> {
        await this.lnkMyAccount.click();
    }

    // Click on Register
    async clickRegister() : Promise<void> {
        await this.lnkRegister.click();
    }

    // Click on Login
    async clickLogin() : Promise<void> {
        await this.lnkLogin.click();
    }

    
    /**
     * Enter product name in search box
     * @param pName 
     */

    async setProductName(pName: string): Promise<void> {
        await this.txtSearchBox.fill(pName); // Note: fill() clears the input automatically
    }

    // Click on search icon
    async clickSearch(): Promise<void> {
        await this.btnSearch.click();
    }


}