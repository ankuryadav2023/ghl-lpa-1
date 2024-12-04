import {test, Page, expect} from '@playwright/test';

test.describe("Login",async ()=>{
    let page:Page;
    let incorrectUsername="lpa0000";
    let correctUsername="lpa2";
    let incorrectPassword="lpa0000";
    let correctPassword="lpa";
    let alertMessage="";

    test.beforeAll(async ({browser})=>{
        page=await browser.newPage();
        page.on("dialog", async (alert) => {
            const text = alert.message();
            alertMessage=text;
            await alert.accept();
        });
        await page.goto("https://www.demoblaze.com/");
    });

    test("Incorrect Username and Incorrect Password",async ()=>{
        await page.locator("//a[@id='login2']").click();
        await page.locator("//input[@id='loginusername']").fill(incorrectUsername);
        await page.locator("//input[@id='loginpassword']").fill(incorrectPassword);
        await page.locator("//button[text()='Log in']").click();
        await page.waitForTimeout(3000);
        expect(alertMessage).toEqual("User does not exist.");
    });

    test("Incorrect Username and Correct Password",async ()=>{
        await page.locator("//a[@id='login2']").click();
        await page.locator("//input[@id='loginusername']").fill(incorrectUsername);
        await page.locator("//input[@id='loginpassword']").fill(correctPassword);
        await page.locator("//button[text()='Log in']").click();
        await page.waitForTimeout(3000);
        expect(alertMessage).toEqual("User does not exist.");
    });

    test("Correct Username and Incorrect Password",async ()=>{
        await page.locator("//a[@id='login2']").click();
        await page.locator("//input[@id='loginusername']").fill(correctUsername);
        await page.locator("//input[@id='loginpassword']").fill(incorrectPassword);
        await page.locator("//button[text()='Log in']").click();
        await page.waitForTimeout(3000);
        expect(alertMessage).toEqual("Wrong password.");
    });

    test("Correct Username and Correct Password",async ()=>{
        await page.locator("//a[@id='login2']").click();
        await page.locator("//input[@id='loginusername']").fill(correctUsername);
        await page.locator("//input[@id='loginpassword']").fill(correctPassword);
        await page.locator("//button[text()='Log in']").click();
        await page.waitForTimeout(3000);
        const welcomeMessage=await page.locator("//a[@id='nameofuser']").textContent();
        expect(welcomeMessage).toEqual(`Welcome ${correctUsername}`);
    });

    test.afterAll(async ()=>{
        page.close();
    })
})