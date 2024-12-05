import {Page} from '@playwright/test'

export class HomePage{
    page: Page;
    flightsLocator: string= "//a[@href='https://www.makemytrip.com/flights/']";

    constructor(page: Page){
        this.page=page;
    }

    async clickFlights(){
        await this.page.locator(this.flightsLocator).click();
    }
}