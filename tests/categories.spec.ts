import {test, Page, expect} from "@playwright/test";

test.describe("Categories", async ()=>{
    let page:Page;
    let categories=["Phones", "Laptops", "Monitors"];

    test.beforeAll(async ({browser})=>{
        page=await browser.newPage();
        await page.goto("https://www.demoblaze.com/");
    });

    test("Number of Categories", async ()=>{
       const categoriesArray=await page.locator("//a[@class='list-group-item']").all();
       expect(categoriesArray).toHaveLength(4);
    });

    test("Name of Categories", async ()=>{
        const categoriesArray=await page.locator("//a[@class='list-group-item']").all();
        let temp=true;
        for(let i=1; i<4;i++){
            let categoryText=await categoriesArray[i].textContent();
            console.log(categoryText);
            if(categoryText!==categories[i-1]){
                temp=false;
                break;
            }
        }
        expect(temp).toBeTruthy();
    })
});