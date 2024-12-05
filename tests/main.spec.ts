import {test, expect, Page} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { FlightsPage } from "../pages/FlightsPage";
import { SearchedFlightsPage } from "../pages/SearchedFlightsPage";

test.describe("makemytrip.com Flight Booking Automation", async ()=>{
    let page: Page;
    let fromCityName: string="Jaipur";
    let toCityName: string="Delhi";

    test.beforeEach(async ({browser})=>{
        page=await browser.newPage();
        await page.goto("https://www.makemytrip.com");
        await page.locator("//span[@class='commonModal__close']").click();
    });

    test("Book Flight with Lowest Ticket Price and Nearest Date", async ()=>{
        let homePageObj=new HomePage(page);
        await homePageObj.clickFlights();
        let flightsPageObj=new FlightsPage(page);
        await flightsPageObj.fillFromCity(fromCityName);
        await flightsPageObj.fillToCity(toCityName);
        await flightsPageObj.selectLowestPriceTicketInDec();
        await flightsPageObj.clickSearch();
        let searchFlightsPageObj=new SearchedFlightsPage(page);
        const videoPath = await page.video()?.path();
        console.log(videoPath)
        page=await searchFlightsPageObj.bookCheapestFlight();
    });
});