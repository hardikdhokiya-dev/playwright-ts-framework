import { Page, Locator, expect } from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage";


export class ShoppingCart{

    private readonly page : Page;
    private readonly headingShoppingCart: Locator;
    private readonly lblOutOfStock : Locator;
    private readonly btnCheckout : Locator;



    constructor ( page : Page) {

        this.page = page;
        this.headingShoppingCart = page.getByRole("heading", { name: "Shopping Cart"});
        this.lblOutOfStock = page.getByText(/Products marked with \*\*\* are not available in the desired quantity or not in stock!/i);
        this.btnCheckout = page.getByRole ("button" , { name : "Checkout"});

    }


    /**
     * Returns the value corresponding to the provided summary label from the cart summary table.
     *
     * Examples:
     * - Sub-Total:
     * - Eco Tax (-2.00):
     * - VAT (20%):
     * - Total:
     *
     * @param label Summary label displayed in the totals table.
     */
    private summaryValue(label: string): Locator {
        return this.page.locator("tr", { hasText: label }).locator("td").nth(1);
    }

    /**
     * Verifies that the Shopping Cart page has loaded successfully.
     */
    async verifyShoppingCartPageLoaded(): Promise<void> {
        await expect(this.headingShoppingCart).toBeVisible();
    }

    /**
     * Verifies that the out-of-stock warning message is displayed.
     */
    async verifyOutOfStockMessage(): Promise<void> {
        await expect(this.lblOutOfStock).toBeVisible();
    }


    /**
     * Checks whether any product in the cart is out of stock.
     *
     * @returns True if an out-of-stock warning is displayed; otherwise false.
     */
    async isOutOfStock(): Promise<boolean> {
        return await this.lblOutOfStock.isVisible();
    }

    /**
     * Returns the Sub-Total amount displayed in the shopping cart.
     */
    async getSubTotal(): Promise<string> {
        return (await this.summaryValue("Sub-Total:").textContent())?.trim() ?? "";
    }

    /**
     * Returns the Eco Tax amount displayed in the shopping cart.
     */
    async getEcoTax(): Promise<string> {
        return (await this.summaryValue("Eco Tax (-2.00):").textContent())?.trim() ?? "";
    }

    /**
     * Returns the VAT amount displayed in the shopping cart.
     */
    async getVat(): Promise<string> {
        return (await this.summaryValue("VAT (20%):").textContent())?.trim() ?? "";
    }

    /**
     * Returns the Total amount displayed in the shopping cart.
     */
    async getTotalPrice(): Promise<string> {
        return (await this.summaryValue("Total:").textContent())?.trim() ?? "";
    }

    /**
     * Clicks the Checkout button and navigates to the Checkout page.
     * Throws an error if one or more products are out of stock.
     *
     * @returns CheckoutPage instance.
     */
    async proceedToCheckout(): Promise<CheckoutPage> {

        if (await this.isOutOfStock()) {
            throw new Error(
                "Unable to proceed to checkout because one or more products are out of stock."
            );
        }

        await this.btnCheckout.click();

        return new CheckoutPage(this.page);
    }

}