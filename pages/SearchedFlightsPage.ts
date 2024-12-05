import {Page} from '@playwright/test'

export class SearchedFlightsPage{
    page: Page;
    popupCloseButtonLocator: string= "//span[text()='GOT IT']";
    viewPricesButtonsLocator: string="//span[text()='VIEW PRICES']";
    bookNowButtonsLocator: string="//button[text()='BOOK NOW']";

    constructor(page: Page){
        this.page=page;
    }

    async bookCheapestFlight(){
        await this.page.waitForSelector(this.popupCloseButtonLocator);
        await this.page.locator(this.popupCloseButtonLocator).click();
        await this.page.locator(this.viewPricesButtonsLocator).nth(0).click();
        const [newPage]=await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.locator(this.bookNowButtonsLocator).nth(0).click()
        ])
        return newPage;
    }
}