const{test, expect} = require('@playwright/test');

test('browser context test case', async ({browser})=>{

    //context comes into picture when we need to inject some cookies/ plugin in the running browser
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://learn-automation.in/");
console.log(await page.title());
page.locator()

});

test('page playwright test case', async ({browser, page})=>{
    // const context = await browser.newContext();
    // const page = await context.newPage();
   await page.goto("https://google.com");  
   console.log(await page.title());
   await expect(page).toHaveTitle('Google');
    })

    test.only('players health login', async({page})=>{
        await page.goto("https://safetyhub-stg.playershealth.com/");  
        console.log(await page.title());
        await page.locator('#username').fill('kailash.pathak@3pillarglobal.com');
        await page.locator('#password').fill('Test@12345');
        await page.locator('input[type="submit"]').click();
        await page.waitForLoadState('networkidle');


    })

