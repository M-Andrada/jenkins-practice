import { test, expect } from "@playwright/test";

test("SEP Practice", async ({ page }) => {
  // login:
  const code = Buffer.from(
    `${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`
  ).toString("base64");
  await page.setExtraHTTPHeaders({ Authorization: `Basic ${code}` });

 // await page.waitForTimeout(2000);
  await page.goto(process.env.SEP_QA_URL);
  await page.waitForTimeout(3000);

  await expect(page).toHaveURL(process.env.SEP_QA_URL);
  expect(page.url()).toBe(process.env.SEP_QA_URL);

  await expect(page).toHaveTitle("Checkout | Cydeo");
  expect(await page.title()).toBe("Checkout | Cydeo");

  // start application:
  let firstNameInput = page.locator("//input[@formcontrolname='firstName']");
  await expect(firstNameInput).toBeVisible();
  expect(await firstNameInput.isVisible()).toBeTruthy();
  await expect(firstNameInput).toBeEnabled();
  expect(await firstNameInput.isEnabled()).toBeTruthy();
  await firstNameInput.fill("Muhtar");

  let lastNameInput = page.locator("//input[@formcontrolname='lastName']");
  await lastNameInput.fill("Mahmut");

  let emailInput = page.locator("//input[@formcontrolname='email']");
  await emailInput.fill("muhtarmahmut@email.com");

  let phoneInput = page.locator("//input[@formcontrolname='phoneNumber']");
  await phoneInput.fill("5555555555");

  let howDidYouHearDropDown = page.locator(
    "//mat-label[text()='How did you hear about us?']"
  );
  await howDidYouHearDropDown.click();

  await page.click("//span[text()='Email']");

  let nextBttn = page.locator("//button[@type='submit']");
  await expect(nextBttn).toBeEnabled();
  await nextBttn.click();

  // payment plan:
  let upfrontPaymentPlan = page.locator(
    "(//mat-expansion-panel-header[@role='button'])[1]"
  );
  await upfrontPaymentPlan.click();

  let nextButton2 = page.locator("//button[text()='Next']");
  await expect(nextButton2).toBeEnabled();
  await nextButton2.click();

  // Review:
  let paymentFrame = page.frameLocator(
    "//iframe[@title='Secure payment input frame']"
  );

  await page.waitForTimeout(3000);
  let cardNumInput = paymentFrame.locator("//input[@name='number']");
  await cardNumInput.fill(process.env.CARD_NUMBER);

  let expiryDateInput = paymentFrame.locator("//input[@name='expiry']");
  await expiryDateInput.fill(process.env.EXPIRATION_DATE);

  let cvcInput = paymentFrame.locator("//input[@name='cvc']");
  await cvcInput.fill(process.env.CVC);

  let dropDownIframe = paymentFrame.locator(
    "//select[@id='Field-countryInput']"
  );
  await dropDownIframe.click();

  await dropDownIframe.selectOption({ label: "United States" });

  let zipCode = paymentFrame.locator("//input[@name='postalCode']");
  await expect(zipCode).toBeVisible();
  await zipCode.fill(process.env.ZIP_CODE);

 // await page.waitForTimeout(3000);
  //let zipCodeInput = paymentFrame.locator("//input[@name='postalCode']");
  //await zipCodeInput.fill("12345");
  // await page.waitForTimeout(4000);

  let termsAndConditionsCheckBox = page.locator(
    "//input[@type='checkbox' and @id='defaultCheck2']"
  );
  await termsAndConditionsCheckBox.check();
  await expect(termsAndConditionsCheckBox).toBeChecked();

  let payBttn = page.locator(
    "//button[span[@class='mdc-button__label' and text()='Pay']]"
  );
  await expect(payBttn).toBeEnabled();
  await payBttn.click();

  //await page.waitForTimeout(3000);
});
