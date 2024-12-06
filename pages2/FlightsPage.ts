import { Page } from "@playwright/test";
import { datenPriceType } from "../types";

export class FlightsPage{
    page: Page;
    fromCityLocator1: string="//input[@placeholder='Where from?']";
    fromCityLocator2: string="//ul[@class='airportList']";
    toCityLocator1: string="//input[@placeholder='Where to?']";
    toCityLocator2: string="//ul[@class='airportList']";
    departureDateSelectorDivLocator: string="//div[contains(@class, 'homeCalender')]/div";
    datenPriceDivsLocator: string="//div[contains(@class, 'DayPicker-Day') and @aria-disabled='false' and contains(@aria-label, Dec)]";
    datenPriceArray: datenPriceType[]=[];
    searchFlightsButtonLocator: string="//button[@class='sc-dAlyuH cIApyz']";

    constructor(page: Page){
        this.page=page;
    }

    async fillFromCity(fromCityName: string){
        await this.page.locator(this.fromCityLocator1).fill(fromCityName);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.fromCityLocator2).nth(0).click();
    }
    
    async fillToCity(toCityName: string){
        await this.page.locator(this.toCityLocator1).fill(toCityName);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.toCityLocator2).nth(0).click();
    }

    async selectLowestPriceTicketInDec(){
        await this.page.locator(this.departureDateSelectorDivLocator).nth(0).click();
        await this.page.waitForTimeout(1000);
        const datenPriceDivs=await this.page.locator(this.datenPriceDivsLocator).all();
        for(let i=0;i<datenPriceDivs.length;i++){
            let date=await datenPriceDivs[i].locator("//div/div").nth(0).textContent();
            let ticket_price=await datenPriceDivs[i].locator("//div/div/div").textContent();
            if(ticket_price==="-") continue;
            this.datenPriceArray.push({date: Number(date), ticket_price: Number(ticket_price), element: datenPriceDivs[i]});
        }
        let ticketPriceArray=this.datenPriceArray.map(datenPrice=>datenPrice.ticket_price);
        let lowestTicketPrice=Math.min(...ticketPriceArray);
        let lowestTicketPricenNearestDate=this.datenPriceArray.find(datenPrice=>{
            return datenPrice.ticket_price===lowestTicketPrice;
        });
        await lowestTicketPricenNearestDate?.element.click();
        await this.page.waitForTimeout(1000);
    }

    async clickSearchFlightsButton(){
        await this.page.locator(this.searchFlightsButtonLocator).click();
    }
}
