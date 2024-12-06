import {Page} from '@playwright/test'

export class SearchedFlightsPage{
    page: Page;
    bookButtonsLocator: string="//button[text()='Book']";

    constructor(page: Page){
        this.page=page;
    }

    async bookCheapestFlight(){
        const [newPage]=await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.locator(this.bookButtonsLocator).nth(0).click()
        ])
        await this.page.waitForTimeout(10000);
        return newPage;
    }
}