import { expect, test } from "@playwright/test";

test("loads the initial scene from local media without a Render request", async ({ page }) => {
    const remoteRequests = [];
    page.on("request", (request) => {
        if (request.url().includes("onrender.com")) remoteRequests.push(request.url());
    });

    await page.goto("/");

    await expect(page.locator("video")).toHaveCount(1);
    await expect(page.locator("video")).toHaveAttribute("src", /\/video\/Day-sunny\.mp4$/);
    expect(remoteRequests).toEqual([]);
});
