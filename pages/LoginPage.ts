import { Page, Locator, expect} from "@playwright/test";


export class LoginPage{

    private readonly page : Page;
    private readonly txtLoginHeading : Locator;
    private readonly txtEmailAddress : Locator;
    private readonly txtPassword : Locator;
    private readonly btnLogin : Locator;
    private readonly txtErrorMessage : Locator;


    constructor (page : Page){
        this.page = page;
        this.txtLoginHeading = page.getByRole("heading", {name : "Returning Customer"});
        this.txtEmailAddress = page.getByPlaceholder("E-Mail Address");
        this.txtPassword = page.getByPlaceholder("Password");
        this.btnLogin = page.getByRole("button", {name : "Login"});
        this.txtErrorMessage = page.getByText(/Warning: No match/i);
    }

    /**
     * verify Login page loaded
     */
    async verifyLoginPageLoaded() : Promise<void>{
        await expect (this.txtLoginHeading).toBeVisible();
    }

    /**
     * set valid email adress in the email field
     * @param validEmail 
     */
    async setEmailAddress(validEmail : string) : Promise<void>{
        await this.txtEmailAddress.fill(validEmail);
    }

    /**
     * set the valid password in the password field
     * @param validPassword 
     */
    async setPassword (validPassword : string) : Promise<void>{
        await this.txtPassword.fill(validPassword);
    }

    /**
     * click on login button
     */
    async clickLogin() : Promise<void>{
        await this.btnLogin.click();
    }

    /**
     * Performs complete login action
     * @param email 
     * @param password 
     */
    async loginUser(email : string, password : string) : Promise<void> {

        await this.setEmailAddress(email);
        await this.setPassword(password);
        await this.clickLogin();

    }

    /**
     * catch the error message for incorrect login detail
     * @returns 
     */
    async getErrorMessage() : Promise<string> {
        return await this.txtErrorMessage.innerText();
    }




}