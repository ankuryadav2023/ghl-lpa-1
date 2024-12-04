import {test, Page, expect} from "@playwright/test";

test.describe("Laptops", async ()=>{
    let page:Page;
    let laptops=["Sony vaio i5", "Sony vaio i7", "MacBook air", "Dell i7 8gb", "2017 Dell 15.6 Inch", "MacBook Pro"];

    test.beforeAll(async ({browser})=>{
        page=await browser.newPage();
        await page.goto("https://www.demoblaze.com/");
        await page.locator("//a[text()='Laptops']").click();
    });

    test("Number of Laptops", async ()=>{
       const laptopsArray=await page.locator("//a[@class='hrefch']").all();
       expect(laptopsArray).toHaveLength(6);
    });

    test("Name of Laptops", async ()=>{
        const laptopsArray=await page.locator("//a[@class='hrefch']").all();
        let temp=true;
        for(let i=0; i<6;i++){
            let laptopName=await laptopsArray[i].textContent();
            console.log(laptopName);
            if(laptopName!==laptops[i]){
                temp=false;
                break;
            }
        }
        expect(temp).toBeTruthy();
    })
});