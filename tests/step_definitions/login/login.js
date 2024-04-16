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
   this.viewButton = this.page.getByText('View');
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
  await this.searchClientField.fill(text);
}
async clickView(){
  await this.viewButton.first({timeout:20000}).click({force:true});
}
 async ifTextPresent(expectedText){
    const actualText = await this.page.textContent('body');
    if (actualText.includes(expectedText)) {
        console.log(`The text "${expectedText}" is present on the page.`);
    } else {
        throw new Error(`Expected text "${expectedText}" not found on the page.`);
    }
};
}