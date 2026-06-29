import { Page, Locator, expect } from "@playwright/test";
import { ShoppingCart  } from "./ShoppingCartPage";



export class ProductDetailPage {

    private readonly page: Page;
    private readonly btnAddToCart: Locator;
    private readonly txtQuantity: Locator;
    private readonly alertMessage: Locator;
    private readonly btnCartInfo: Locator;
    private readonly linkViewCart: Locator;

    constructor(page: Page) {

        this.page = page;

        this.btnAddToCart = page.getByRole("button", { name: "Add to Cart" });
        this.txtQuantity = page.getByRole("textbox", { name: "Qty" });
        this.alertMessage = page.getByText(/Success: You have added/i);
        this.btnCartInfo = page.locator("#cart-total");
        this.linkViewCart = page.getByRole("link", { name: /View Cart/i });
    }

    /**
     * Verifies that the Product Details page has loaded successfully
     * by checking the visibility of the "Add to Cart" button.
     */
    async verifyProductDetailPageLoaded(): Promise<void> {
        await expect(this.btnAddToCart).toBeVisible();
    }

    /**
     * Updates the product quantity before adding it to the shopping cart.
     *
     * @param quantity - Desired quantity of the product
     */
    async setQuantity(quantity: number): Promise<void> {
        await this.txtQuantity.fill(quantity.toString());
    }

    /**
     * Clicks the "Add to Cart" button.
     */
    async clickAddToCart(): Promise<void> {
        await this.btnAddToCart.click();
    }

    /**
     * Verifies that the product has been successfully added to the shopping cart.
     */
    async verifySuccessMessage(): Promise<void> {
        await expect(this.alertMessage).toContainText("Success: You have added");
    }

    /**
     * Opens the shopping cart dropdown from the page header.
     */
    async clickCartInfo(): Promise<void> {
        await this.btnCartInfo.click();
    }

    /**
     * Navigates to the Shopping Cart page from the cart dropdown.
     *
     * @returns ShoppingCartPage instance
     */
    async clickViewCart(): Promise<ShoppingCart> {
        await this.linkViewCart.click();
        return new ShoppingCart(this.page);
    }

    /**
     * Opens the shopping cart from the header and navigates
     * to the Shopping Cart page.
     *
     * @returns ShoppingCartPage instance
     */
    async navigateToShoppingCart(): Promise<ShoppingCart> {
        await this.clickCartInfo();
        return await this.clickViewCart();
    }

    /**
     * Adds the specified quantity of the current product to the shopping cart.
     *
     * Business flow:
     * - Update quantity
     * - Click "Add to Cart"
     * - Verify success message
     *
     * @param quantity - Quantity of the product to add
     */
    async addProductToCart(quantity: number): Promise<void> {
        await this.setQuantity(quantity);
        await this.clickAddToCart();
        await this.verifySuccessMessage();
    }
}