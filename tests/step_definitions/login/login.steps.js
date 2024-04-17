const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium, expect } = require("@playwright/test");
const {LoginPage}  = require('./login');


let browser;
let page;
let loginPage;
//const loginPage = new LoginPage(page);
 

Given('I navigate to playersHealth application', async () => {
 browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
   loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
});

When('I login with {string} and {string}', {timeout:20000},async function (username, password) {
  await loginPage.login(username, password);
});

Then('I should see home page', {timeout:20000},async()=>{
  await loginPage.verifyLogin();
})
When('I create new client having name {string}', async (text)=>{
await loginPage.addNewClient(text);
})
When('I search for client having name {string}', async (text)=>{
  await loginPage.searchClient(text);
})
When('I click on view button', async()=>{
  await loginPage.clickView();
})
Then('I should see text {string}', {timeout:25000},async (text)=>{
  await loginPage.ifTextPresent(text);
})
When('I add program having name {string}',async (text)=>{
  await loginPage.addProgram(text)
})