import { configureStore } from "@reduxjs/toolkit";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";
import generalReducer from "~/components/Redux/generalSlice";
import HomeBackground from "./HomeBackground";

vi.mock("~/assets", () => ({
    images: { scenes_background_chillVipe: "/scene-preview.png" },
}));

vi.mock("~/components/layout/components/VideoComponent", () => ({
    default: ({ srcVideo, onError, onLoadStart, onReady }) => (
        <video data-testid="background-video" src={srcVideo} onError={onError} onLoadStart={onLoadStart} onCanPlay={onReady} />
    ),
}));

vi.mock("~/components/layout/components/Loading", () => ({
    default: () => <div role="status">Loading background</div>,
}));

const renderBackground = () => {
    const store = configureStore({ reducer: { general: generalReducer } });
    return render(
        <Provider store={store}>
            <HomeBackground />
        </Provider>,
    );
};

afterEach(cleanup);

describe("HomeBackground", () => {
    it("shows a loading screen before the local video becomes playable", () => {
        renderBackground();

        expect(screen.getByRole("status")).toBeVisible();
        expect(screen.queryByAltText("Chill Vibes scene")).not.toBeInTheDocument();
        expect(screen.getByTestId("background-video")).toHaveAttribute("src", expect.stringContaining("video/Day-sunny.mp4"));
    });

    it("keeps the preview available after a media failure", () => {
        renderBackground();
        const video = screen.getByTestId("background-video");

        fireEvent.loadStart(video);
        fireEvent.error(video);

        expect(screen.getByAltText("Chill Vibes scene")).toBeVisible();
    });

    it("reveals the video after its first playable frame", () => {
        renderBackground();

        fireEvent.canPlay(screen.getByTestId("background-video"));

        expect(screen.queryByRole("status")).not.toBeInTheDocument();
        expect(screen.getByTestId("background-video").parentElement).toHaveAttribute("aria-busy", "false");
    });
});
