import {test, expect, Page} from "@playwright/test";
import { FlightsPage } from "../pages2/FlightsPage";
import { SearchedFlightsPage } from "../pages2/SearchedFlightsPage";

test.describe("makemytrip.com Flight Booking Automation", async ()=>{
    let page: Page;
    let fromCityName: string="Jaipur";
    let toCityName: string="Delhi";

    test.beforeEach(async ({browser})=>{
        page=await browser.newPage();
        await page.goto("https://www.cleartrip.com");
        await page.locator("//div[@class='pb-1 px-1 flex flex-middle nmx-1']").click();
    });

    test("Book Flight with Lowest Ticket Price and Nearest Date", async ()=>{
        let flightsPageObj=new FlightsPage(page);
        await flightsPageObj.fillFromCity(fromCityName);
        await flightsPageObj.fillToCity(toCityName);
        await flightsPageObj.selectLowestPriceTicketInDec();
        await flightsPageObj.clickSearchFlightsButton();
        let searchFlightsPageObj=new SearchedFlightsPage(page);
        page=await searchFlightsPageObj.bookCheapestFlight();
        console.log(page.url());
    });
});