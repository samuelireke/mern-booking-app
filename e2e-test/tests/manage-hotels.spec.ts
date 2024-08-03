import path from "path";
import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

const validUser = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@email.com",
  password: "P4ssword@",
};

const validHotelInput = {
  name: "Test Hotel",
  city: "Test City",
  country: "Test Country",
  description: "Test Hotel Description",
  pricePerNight: "100",
  starRating: "4",
  type: "Budget",
  facilities: ["Free WiFi", "Parking", "Spa", "Fitness Center"],
  adultCount: "2",
  childCount: "4",
  imageFiles: ["hotel1.jpg", "hotel2.jpg", "room1.jpg", "room2.jpg"],
};

test.beforeEach(async ({ page }) => {
  //Sign in with valid user
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill(validUser.email);
  await page.locator("[name=password]").fill(validUser.password);

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);
  await page.locator('[name="name"]').fill(validHotelInput.name);
  await page.locator('[name="city"]').fill(validHotelInput.city);
  await page.locator('[name="country"]').fill(validHotelInput.country);
  await page.locator('[name="description"]').fill(validHotelInput.description);
  await page
    .locator('[name="pricePerNight"]')
    .fill(validHotelInput.pricePerNight);

  await page.getByLabel(`Rate ${validHotelInput.starRating} stars`).click();

  await page.getByText(validHotelInput.type).click();

  // select all facilities
  for (const facility of validHotelInput.facilities) {
    await page.getByLabel(facility).check();
    await page.waitForTimeout(100); // adding small delay between checks
  }
  await page.locator('[name="adultCount"]').fill(validHotelInput.adultCount);
  await page.locator('[name="childCount"]').fill(validHotelInput.childCount);

  // upload images
  await page.setInputFiles(
    "[name=imageFiles]",
    validHotelInput.imageFiles.map((filename) =>
      path.join(__dirname, "files", filename)
    )
  );

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Saved")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  //assert hotel name
  await expect(
    page.getByText(validHotelInput.name, { exact: true })
  ).toBeVisible();
  //assert hotel description
  await expect(
    page.getByText(validHotelInput.description, { exact: true })
  ).toBeVisible();
  //assert hotel city and country
  await expect(page.getByText(validHotelInput.city)).toBeVisible();
  await expect(page.getByText(validHotelInput.country)).toBeVisible();
  //assert hotel price per night
  await expect(
    page.getByText(`£${validHotelInput.pricePerNight} per night`, {
      exact: true,
    })
  ).toBeVisible();
  //assert hotel star rating
  await expect(
    page.getByText(`${validHotelInput.starRating} Star Rating`, { exact: true })
  ).toBeVisible();
  //assert Links
  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should redirect user to add hotel page when Add Hotel Link in My Hotels page is clicked", async ({
  page,
}) => {
  await page.goto(`${UI_URL}/my-hotels`);

  // click add hotel link
  await page.getByRole("link", { name: "Add Hotel" }).click();

  // assert Add Hotel title, Name and City input field and Save button are all visible
  await expect(page.getByText("Add Hotel")).toBeVisible();
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("City")).toBeVisible();
  await expect(page.getByRole("button", { name: "Save" })).toBeVisible();
});
