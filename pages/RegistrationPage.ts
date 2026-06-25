import { Page , Locator} from "@playwright/test";

/**
 * Shifts Failures from Runtime to Compile-Time
 * Decouples Test Data Setup from Method Execution
 * Improves Maintenance and Readability
 */
export interface RegistrationData{

        firstName : string;
        lastName : string;
        email : string;
        telephone : string;
        password : string;
        confirmPassword : string;
        newsletterSubscribe : "Yes" | "No"; // Enforced exact string literals matching the UI
        privacyPolicy : boolean;

}


export class RegistrationPage {

        private readonly page : Page ;
        private readonly formHeading : Locator;
        private readonly txtFirstName: Locator;
        private readonly txtLastName : Locator;
        private readonly txtEmail : Locator;
        private readonly txtTelephone : Locator;
        private readonly txtPassword : Locator;
        private readonly txtConfirmPassword : Locator;
        private readonly chkdPolicy : Locator;
        private readonly btnContinue : Locator;
        private readonly msgConfirmation : Locator;

 
    constructor (page : Page){

        this.page = page;
        //initalize locators
        this.formHeading = page.getByRole("heading", {name : "Register Account"});
        this.txtFirstName = page.getByPlaceholder("First Name");
        this.txtLastName = page.getByPlaceholder("Last Name");
        this.txtEmail = page.getByPlaceholder("E-Mail");
        this.txtTelephone = page.getByPlaceholder("Telephone");
        this.txtPassword = page.getByPlaceholder("Password", {exact : true}); // exact matching to avoid locator collisions
        this.txtConfirmPassword = page.getByPlaceholder("Password Confirm");
        this.chkdPolicy = page.getByRole("checkbox");
        this.btnContinue = page.getByRole("button", {name : "Continue"});
        this.msgConfirmation = page.getByRole("heading", {name : "Your Account Has Been Created!"});

    }

    
    /**
     * Verify the form Heading is visible
     * @returns 
     */

    async isHeadingVisible() : Promise<boolean>{
        return await this.formHeading.isVisible();
    }


    /**
     * enter the first name
     * @param fName 
     */
    async enterFirstName(fName : string) : Promise <void> {
        await this.txtFirstName.fill(fName);
    }

    /**
     * enter the last name
     * @param lName 
     */
    async enterlastName(lName : string) : Promise <void> {
        await this.txtLastName.fill(lName);
    }

    /**
     * enter email
     * @param eMail
     */
    async enterEmail(eMail : string) : Promise <void> {
        await this.txtEmail.fill(eMail);
    }

    /**
     * enter telephone number
     * @param phoneNumber 
     */
    async enterTelephone(phoneNumber : string) : Promise <void> {
        await this.txtTelephone.fill(phoneNumber);
    }

    /**
     * enter password
     * @param password 
     */
    async enterPassword(password : string) : Promise <void> {
        await this.txtPassword.fill(password);
    }

    /**
     * enter confirm password
     * @param confirmPassword 
     */
    async enterConfirmPassword(confirmPassword : string) : Promise <void> {
        await this.txtConfirmPassword.fill(confirmPassword);
    }

    /**
     * Click on radio button - Newsletter
     * @param value - "Yes" or "No" (case sensitive match for UI text)
     */
    async clickRadioButton(value: "Yes" | "No") : Promise <void> {
        await this.page.getByRole("radio", { name: value, exact: true }).click();
}

    /**
     * check the privacy policy
     * @param condition 
     */
    async checkPolicy(condition : boolean) : Promise<void>{
        await this.chkdPolicy.setChecked(condition);
    }

    /**
     * click on continue button
     */
    async clickContinueButton() : Promise<void>{
        await this.btnContinue.click();
    }

    /**
     * get the confirmation message
     * @returns 
     */
    async getConfirmationMessage() : Promise<string> {
        return await this.msgConfirmation.textContent() ?? '';
    }

    /**
     * Object Parameter Pattern
     * This is an Object Parameter Pattern where I pass a structured data object (similar to a DTO) to improve readability, maintainability, and scalability of test methods.
     * @param data - Object containing registration data
     */
    async fillRegiserUserDetail( data : RegistrationData){

        await this.enterFirstName(data.firstName);
        await this.enterlastName(data.lastName);
        await this.enterEmail(data.email);
        await this.enterTelephone(data.telephone);
        await this.enterPassword(data.password);
        await this.enterConfirmPassword(data.confirmPassword);

        await this.clickRadioButton(data.newsletterSubscribe);
        await this.checkPolicy(data.privacyPolicy);

    }


}