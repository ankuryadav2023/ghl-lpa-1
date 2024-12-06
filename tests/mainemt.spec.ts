import {test, expect, Page} from "@playwright/test";
import { FlightsPage } from "../pages3/FlightsPage";
import { SearchedFlightsPage } from "../pages3/SearchedFlightsPage";
import { FlightDetailsPage } from "../pages3/FlightDetailsPage";

test.describe("makemytrip.com Flight Booking Automation", async ()=>{
    let page: Page;
    let fromCityName: string="Jaipur";
    let toCityName: string="Delhi";

    test.beforeEach(async ({browser})=>{
        page=await browser.newPage();
        await page.goto("https://www.easemytrip.com/?utm_campaign=788997081&utm_source=g_c&utm_medium=cpc&utm_term=e_easemytrip&adgroupid=39319940377&gad_source=1&gbraid=0AAAAADo_0-i2b-rmCwTS7fpcWR_bC8VFX");
    });

    test("Book Flight with Lowest Ticket Price and Nearest Date", async ()=>{
        let flightsPageObj=new FlightsPage(page);
        await flightsPageObj.fillFromCity(fromCityName);
        await flightsPageObj.fillToCity(toCityName);
        await flightsPageObj.selectLowestPriceTicketInDec();
        await flightsPageObj.clickSearchFlightsButton();
        let searchFlightsPageObj=new SearchedFlightsPage(page);
        await searchFlightsPageObj.bookCheapestFlight();
        let flightDetailsPageObj=new FlightDetailsPage(page);
        await flightDetailsPageObj.validateFair();
    });
});