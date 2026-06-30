import { Page, Locator, expect } from "@playwright/test";
import { BillingAddressData } from "../interfaces/BillingAddressData";

export class CheckoutPage {


        private readonly page: Page;

        // Billing Address
        private readonly txtFirstName: Locator;
        private readonly txtLastName: Locator;
        private readonly txtAddress1: Locator;
        private readonly txtCity: Locator;
        private readonly txtPostCode: Locator;
        private readonly drpCountry: Locator;
        private readonly drpState: Locator;
        private readonly btnContinueBillingAddress: Locator;

        // Delivery Details
        private readonly drpExistingAddress: Locator;
        private readonly btnContinueDeliveryAddress: Locator;

        // Delivery Method
        private readonly txtDeliveryMethod: Locator;
        private readonly btnContinueShippingMethod: Locator;

        // Payment Method
        private readonly checkboxTerms: Locator;
        private readonly btnContinuePaymentMethod: Locator;

        // Confirm Order
        private readonly btnConfirmOrder: Locator;
        private readonly labelOrderConfirmationMessage: Locator;
    


    constructor ( page : Page ){

        this.page = page;

        // Billing Address
        this.txtFirstName = page.getByPlaceholder("First Name");
        this.txtLastName = page.getByPlaceholder("Last Name");
        this.txtAddress1 = page.getByPlaceholder("Address 1");
        this.txtCity = page.getByPlaceholder("City");
        this.txtPostCode = page.getByPlaceholder("Post Code");

        this.drpCountry = page.getByRole("combobox", {name: "* Country"});
        this.drpState = page.getByRole("combobox", {name: "* Region / State"});
        this.btnContinueBillingAddress = page.locator("#button-payment-address");

        // Delivery Address
        this.drpExistingAddress = page.locator("#shipping-existing");
        this.btnContinueDeliveryAddress = page.locator("#button-shipping-address");

        // Delivery Method
        this.txtDeliveryMethod = page.locator("textarea[name='comment']");
        this.btnContinueShippingMethod = page.locator("#button-shipping-method");

        // Payment Method
        this.checkboxTerms = page.locator("input[name='agree']");
        this.btnContinuePaymentMethod = page.locator("#button-payment-method");

        // Confirm Order
        this.btnConfirmOrder = page.getByRole("button", { name: "Confirm Order" });
        this.labelOrderConfirmationMessage = page.getByTitle(/Your order has been placed!/i);

    }

    /**
     * Verifies that the Checkout page is displayed.
     */
    async verifyCheckoutPageLoaded(): Promise<void> {
        await expect(this.btnConfirmOrder).toBeVisible();
    }

    /**
     * Sets the customer's first name.
     */
    async setFirstName(firstName: string): Promise<void> {
        await this.txtFirstName.fill(firstName);
    }

    /**
     * Sets the customer's last name.
     */
    async setLastName(lastName: string): Promise<void> {
        await this.txtLastName.fill(lastName);
    }

    /**
     * Sets Address Line 1.
     */
    async setAddress1(address: string): Promise<void> {
        await this.txtAddress1.fill(address);
    }

    /**
     * Sets the city.
     */
    async setCity(city: string): Promise<void> {
        await this.txtCity.fill(city);
    }

    /**
     * Sets the postal code.
     */
    async setPostalCode(postalCode: string): Promise<void> {
        await this.txtPostCode.fill(postalCode);
    }

    /**
     * Selects the country.
     */
    async selectCountry(country: string): Promise<void> {
        await this.drpCountry.selectOption({ label: country });
    }

    /**
     * Selects the state or region.
     */
    async selectState(state: string): Promise<void> {
        await this.drpState.selectOption({ label: state });
    }

    /**
     * Clicks Continue on the Billing Address section.
     */
    async clickContinueBillingAddress(): Promise<void> {
        await this.btnContinueBillingAddress.click();
    }

    /**
     * Selects an existing delivery address.
     */
    async selectExistingAddress(address: string): Promise<void> {
        await this.drpExistingAddress.selectOption({ label: address });
    }

    /**
     * Clicks Continue on the Delivery Address section.
     */
    async clickContinueDeliveryAddress(): Promise<void> {
        await this.btnContinueDeliveryAddress.click();
    }

    /**
     * Adds an optional delivery comment.
     */
    async setDeliveryMethod(comment: string): Promise<void> {
        await this.txtDeliveryMethod.fill(comment);
    }

    /**
     * Clicks Continue on the Shipping Method section.
     */
    async clickContinueShippingMethod(): Promise<void> {
        await this.btnContinueShippingMethod.click();
    }

    /**
     * Accepts the Terms and Conditions.
     */
    async acceptTerms(): Promise<void> {
        await this.checkboxTerms.check();
    }

    /**
     * Clicks Continue on the Payment Method section.
     */
    async clickContinuePaymentMethod(): Promise<void> {
        await this.btnContinuePaymentMethod.click();
    }


    /**
     * Clicks the Confirm Order button.
     *
     * @returns OrderSuccessPage instance.
     */
    async clickConfirmOrder(): Promise<void>{
        await this.btnConfirmOrder.click();

    }

    /**
     * Completes the Billing Address section.
     *
     * @param data Billing address details.
     */
    async fillBillingAddress(data: BillingAddressData): Promise<void> {

        await this.setFirstName(data.firstName);
        await this.setLastName(data.lastName);
        await this.setAddress1(data.address1);
        await this.setCity(data.city);
        await this.setPostalCode(data.postalCode);
        await this.selectCountry(data.country);
        await this.selectState(data.state);

        await this.clickContinueBillingAddress();
    }

    /**
     * Completes the Payment Method section and places the order.
     *
     * @returns OrderSuccessPage instance.
     */
    async placeOrder(): Promise<void> {

        await this.acceptTerms();
        await this.clickContinuePaymentMethod();

        return await this.clickConfirmOrder();
    }


    /**
     * Verifies that the order has been placed successfully.
     */
    async verifyOrderConfirmationPageLoaded(): Promise<void> {
        await expect(this.labelOrderConfirmationMessage).toBeVisible();
    }




}
