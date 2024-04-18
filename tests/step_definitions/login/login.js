const { chromium, expect } = require("@playwright/test");
exports.LoginPage = 
class LoginPage{
 constructor(page) {
   this.page = page;
     this.usernameField =  this.page.locator('#username');
   this.passwordField = this.page.locator('#password');
   this.loginButton = this.page.locator('input[type="submit"]');
   this.organizationTitleLocator = this.page.locator(".title-orgnization-info");
   this.addNewClientField = this.page.locator('#txtclientName');
   this.saveButton = this.page.locator('#btnSave');
   this.confirm = this.page.getByText('OK');
   this.searchClientField = this.page.locator('#searchParameters');
   this.viewButton = this.page.locator('button[value="View"]');
   this.table = this.page.locator('.jsgrid-grid-header');
   this.addProg = this.page.locator('#newProgramName');
}

  async gotoLoginPage() {
   
    await this.page.goto("https://safetyhub-stg.playershealth.com/");
  }

  async login(username, password) {

    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }
  async validateText(text){
    await expect(this.page.getByText(text).toBeVisible()); 
}
async verifyLogin() {
  await expect(this.organizationTitleLocator).toHaveText("Program Portals / All Clients");
}
async addNewClient(text){
  await this.addNewClientField.fill(text);
  await this.saveButton.click();
  await this.confirm.click();
}

async searchClient(text){
  this.page.waitForTimeout(20000);
  await this.searchClientField.fill(text);
  await this.table.click();
}
async clickView(){
  this.page.waitForTimeout(20000);
  // await this.viewButton.nth(0).click({force:true});
  // this.page.waitForTimeout(20000);
}
 async ifTextPresent(expectedText){
    const actualText = await this.page.textContent('body');
    if (actualText.includes(expectedText)) {
        console.log(`The text "${expectedText}" is present on the page.`);
    } else {
        throw new Error(`Expected text "${expectedText}" not found on the page.`);
    }
};
async addProgram(text){
//   const newPage = await this.page.waitForEvent('popup');
//   await this.viewButton.nth(0).click({force:true});
//   const page1 = await newPage;
//  // const newPage = await this.page.waitForEvent('popup');
//   newPage.waitForTimeout(20000);
//    console.log('Switched to new tab:', page1.url());
//    newPage.waitForTimeout(90000);
//    await page1.waitForLoadState('domcontentloaded');
//    await this.addProg.click();
//   await this.addProg.fill(text);

const page1Promise = this.page.waitForEvent('popup');
  await this.page.getByRole('row', { name: 'Add new Client Client' }).getByRole('button').nth(1).click();
  const page1 = await page1Promise;
  page1.waitForTimeout(60000);
  await page1.getByPlaceholder('+ Add Program').click();
  await page1.getByPlaceholder('+ Add Program').fill('This is new Prog');
  await page1.getByPlaceholder('Search').click();
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.getByRole('button', { name: 'OK' }).click();
  await page1.getByRole('button', { name: 'Edit' }).click();
  await page1.getByLabel('Headline').click();
  await page1.getByLabel('Headline').fill('Headine');
  await page1.getByLabel('Headline').press('Tab');
  await page1.getByLabel('Certificate Initials').fill('AAAA');
  await page1.getByLabel('Certificate Initials').press('Tab');
  await page1.getByLabel('GL Policy Locator').fill('VVVV');
  await page1.getByLabel('GL Policy Locator').press('Tab');
  await page1.getByLabel('A&H Policy Locator').fill('AAAAAA');
  await page1.getByLabel('A&H Policy Locator').press('Tab');
  await page1.getByLabel('Covered Sport').fill('CCCCC');
  await page1.getByLabel('Covered Sport').press('Tab');
  await page1.getByLabel('Producer').fill('mt john');
  await page1.getByLabel('Producer').press('Tab');
  await page1.getByLabel('Contact Email').fill('ssss@qa.com');
  await page1.getByLabel('Contact Email').press('Tab');
  await page1.getByLabel('Minimum Number Of Participants').fill('882');
  await page1.getByLabel('Minimum Number Of Participants').press('Tab');
  await page1.locator('#stockPhoto-button').press('Tab');
  await page1.getByLabel('GL Coverage Cover Text').fill('TTTT');
  await page1.getByLabel('GL Coverage Cover Text').press('Tab');
  await page1.getByLabel('Accidental Coverage Cover Text').fill('HHHH');
  await page1.getByLabel('Accidental Coverage Cover Text').press('Tab');
  await page1.getByLabel('Claims Link').fill('HHHHJJKK');
  await page1.getByLabel('Claims Link').press('Tab');
  await page1.getByRole('button', { name: 'Save Changes' }).click();
  await page1.waitForTimeout(40000);
  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('button', { name: 'Landing Page' }).click();
  const page2 = await page2Promise;
  await page.getByRole('button', { name: 'Log Out' }).click();
  await expect(page.getByText('Password', { exact: true })).toBeVisible();
}
}