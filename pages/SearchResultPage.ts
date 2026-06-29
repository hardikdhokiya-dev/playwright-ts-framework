import { Page, Locator, expect } from "@playwright/test";


export class SearchResultPage {

    private readonly page : Page;
    private readonly txtProductNotFound : Locator;

    constructor ( page : Page){

        this.page = page;
        this.txtProductNotFound = page.getByText(/There is no product that matches the search criteria./i);
    }

    /**
     * verifies that the "no product found" message is displayed on the UI.
     * used when search returns zero results for the given product.
     */
    async verifyProductNotFoundMessage() : Promise<void> {
       await expect (this.txtProductNotFound).toBeVisible();
    }

    /**
     * selects a product from the search results based on exact product name match.
     * clicks on the product link to navigate to the product details page.
     * @param productName 
     */
    async selectProduct (productName : string) : Promise<void> {

        await this.page.getByRole("link", { name : productName, exact: true}).click()
    }

}