import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {

    private readonly page : Page;
    private readonly txtFirstName : Locator;
    private readonly txtLastName : Locator;
    private readonly txtAddress1 : Locator;
    private readonly txtCity : Locator;
    private readonly txtPostCode : Locator;
    private readonly drpCountry : Locator;
    private readonly drpState : Locator;
    private readonly btnContinueBillingAddress : Locator;
    private readonly drpExistingAddress : Locator;
    private readonly btnContinueDeliveryAddress : Locator;
    private readonly txtDeliveryMethod: Locator;
    private readonly btnContinueShippingAddress: Locator;
    private readonly checkboxTerms: Locator;
    private readonly btnContinuePaymentMethod: Locator;
    private readonly btnConfirmOrder: Locator;
    private readonly labelOrderConfirmationMessage : Locator;
    


    constructor ( page : Page ){

        this.page = page;
        this.txtFirstName = page.getByPlaceholder ("First Name");
        this.txtLastName = page.getByPlaceholder ("Last Name");
        this.txtAddress1 = page.getByPlaceholder ("Address 1");
        this.txtCity = page.getByPlaceholder ("City");
        this.txtPostCode = page.getByPlaceholder ("Post Code");
        this.drpCountry = page.getByRole("combobox" , { name : "* Country"});
        this.drpState = page.getByRole("combobox" , { name : "* Region / State"});
        this.btnContinueBillingAddress = page.locator("#button-payment-address");
        this.drpExistingAddress = page.locator("#shipping-existing");
        this.btnContinueDeliveryAddress = page.locator("#button-shipping-address");
        this.txtDeliveryMethod = page.locator('textarea[name="comment"]');
        this.btnContinueShippingAddress = page.locator('#button-shipping-method');
        this.checkboxTerms = page.locator ('input [name = "agree"]');
        this.btnContinuePaymentMethod = page.locator('#button-payment-method');
        this.btnConfirmOrder = page.getByRole("button" , {name : "Confirm Order"});
        this.labelOrderConfirmationMessage = page.getByTitle(/Your order has been placed!/i);

    }




}
