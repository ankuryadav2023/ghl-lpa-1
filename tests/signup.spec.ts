import {test, Page, expect} from '@playwright/test';

test.describe("SignUp",async ()=>{
    let page:Page;
    let alreadyExistingUsername="lpa0";
    let newUsername="lpa4";
    let password="lpa";
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

    test("Already Existing Username",async ()=>{
        await page.locator("//a[@id='signin2']").click();
        await page.locator("//input[@id='sign-username']").fill(alreadyExistingUsername);
        await page.locator("//input[@id='sign-password']").fill(password);
        await page.locator("//button[text()='Sign up']").click();
        await page.waitForTimeout(3000);
        expect(alertMessage).toEqual("This user already exist.");
    });

    test("New Username",async ()=>{
        await page.locator("//a[@id='signin2']").click();
        await page.locator("//input[@id='sign-username']").fill(newUsername);
        await page.locator("//input[@id='sign-password']").fill(password);
        await page.locator("//button[text()='Sign up']").click();
        await page.waitForTimeout(3000);
        expect(alertMessage).toEqual("Sign up successful.");
    });

    test.afterAll(async ()=>{
        page.close();
    })
})