import { Page } from "@playwright/test";
import { datenPriceType } from "../types";

export class FlightsPage{
    page: Page;
    fromCityLocator1: string="//input[@id='fromCity']";
    fromCityLocator2: string="//input[@placeholder='From']";
    fromCityLocator3: string="//li[@role='option']";
    toCityLocator1: string="//input[@id='toCity']";
    toCityLocator2: string="//input[@placeholder='To']";
    toCityLocator3: string="//li[@role='option']";
    datenPriceDivsLocator: string="//div[contains(@class, 'DayPicker-Day') and @aria-disabled='false' and contains(@aria-label, Dec)]";
    datenPriceArray: datenPriceType[]=[];

    constructor(page: Page){
        this.page=page;
    }

    async fillFromCity(fromCityName: string){
        await this.page.locator(this.fromCityLocator1).click();
        await this.page.locator(this.fromCityLocator2).fill(fromCityName);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.fromCityLocator3).nth(0).click();
    }
    
    async fillToCity(toCityName: string){
        await this.page.locator(this.toCityLocator1).click();
        await this.page.locator(this.toCityLocator2).fill(toCityName);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.toCityLocator3).nth(0).click();
    }

    async selectLowestPriceTicketInDec(){
        const datenPriceDivs=await this.page.locator(this.datenPriceDivsLocator).all();
        for(let i=0;i<datenPriceDivs.length;i++){
            const datenPriceParas=await datenPriceDivs[i].locator("/p").all();
            let date=Number(await datenPriceParas[0].textContent());
            let ticket_price=Number(await datenPriceParas[1].textContent());
            this.datenPriceArray.push({date, ticket_price, element: datenPriceDivs[i]});
        }
        let ticketPriceArray=this.datenPriceArray.map(datenPrice=>datenPrice.ticket_price);
        let lowestTicketPrice=Math.min(...ticketPriceArray);
        let lowestTicketPricenNearestDate=this.datenPriceArray.find(datenPrice=>{
            return datenPrice.ticket_price===lowestTicketPrice;
        });
        await lowestTicketPricenNearestDate?.element.click();
    }

    async clickSearch(){
        await this.page.locator("//a[text()='Search']").click();
    }
}