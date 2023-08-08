const webdriver = require('selenium-webdriver');
const { Builder, By, Key, until } = webdriver;

(async function register() {
  // Initialize the WebDriver (Chrome in this case)
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Open the website
    await driver.get('http://www.localhost:3000/uploadpage');

    // Find the invoice input and click
    console.log("Finding Invoice Input")
    const invoiceInput = await driver.findElement(By.name('invoice'));
    const invoiceFilePath = "C:/Users/ruanx/Desktop/SUTD_y1/Term5/Elements Of Software/website/myapp/myapp/public/images/invoice.jpg"
    await invoiceInput.sendKeys('invoiceFilePath');

    const loginButton = await driver.findElement(By.name('submitButton'));
    await loginButton.click();

    try{
    // Wait for the first search result to appear and get its title
    const welcomeHeader = await driver.findElement(By.name('header'));
    const title = await welcomeHeader.getText();
    console.log('Title:', title);
    }
    catch{
      console.log("Test failed.");
    }
  } finally {
    // Close the browser
    await driver.quit();
  }
})();
