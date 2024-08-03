import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

const testUser = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@email.com",
  password: "P4ssword@",
};
const NewTestUser = {
  firstName: "test_firstname",
  lastName: "test_lastname",
  email: `test${Math.floor(Math.random() * 90000) + 10000}@test.com`,
  password: "P4ssword@",
};

test.beforeAll(() => {
  // insert test user into database
});

test.afterAll(() => {
  // clear database
});
test.describe("User Authentication", () => {
  test("should allow the user to sign in", async ({ page }) => {
    await page.goto(UI_URL);

    // get the sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[name=email]").fill(testUser.email);
    await page.locator("[name=password]").fill(testUser.password);

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Sign in Successful")).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
  });

  test("should allow user to register", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("link", { name: "Create an account here" }).click();
    await expect(
      page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();

    await page.locator("[name=firstName]").fill(NewTestUser.firstName);
    await page.locator("[name=lastName]").fill(NewTestUser.lastName);
    await page.locator("[name=email]").fill(NewTestUser.email);
    await page.locator("[name=password]").fill(NewTestUser.password);
    await page.locator("[name=confirmPassword]").fill(NewTestUser.password);

    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Registration Successful!")).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
  });
});
