import { test, expect } from "../fixtures/test-fixture";
import { DataGeneratorUtility } from "../utils/DataGeneratorUtility";
import { TestDataFactory } from "../utils/TestDataFactory";
import { RegistrationData } from "../interfaces/RegistrationData";

/**
 * Test case : Account Registrarion
 * 
 * Tags : @master @sanity @regression
 * 
 * Stpes :
 * 1 - Navigate to application URL
 * 2 - Go to 'My Account' and click 'Register'
 * 3 - Fill the registration detials with random data
 * 4 - Click the No radio button for Subscribe Newsletter
 * 5 - Check the Privacy Policy checkbox
 * 6 - Validate the confirmation message
 */


test ("User registration test using custom fixtures ", {tag : ["@sanity", "@regression", "@master"]}, async ({homePage, registrationPage}) =>  {

        //navigate to the homepage and then click on Register
        await homePage.verifyHomePageLoaded();
        await homePage.clickMyAccount();
        await homePage.clickRegister();

        await registrationPage.fillRegiserUserDetail(TestDataFactory.getRegistrationData());
        await registrationPage.clickContinueButton();

        const confirmationMessage = await registrationPage.getConfirmationMessage();
        expect (confirmationMessage).toContain("Your Account Has Been Created!")

}); 