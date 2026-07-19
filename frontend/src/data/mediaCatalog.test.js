import { describe, expect, it } from "vitest";
import { AMBIENT_SOUNDS, getBackgroundVideo, LOFI_TRACKS } from "./mediaCatalog";

describe("mediaCatalog", () => {
    it("maps each visual state to one local video", () => {
        expect(getBackgroundVideo({ theme: "light", rain: false })).toContain("video/Day-sunny.mp4");
        expect(getBackgroundVideo({ theme: "light", rain: true })).toContain("video/Day-rainny.mp4");
        expect(getBackgroundVideo({ theme: "dark", rain: false })).toContain("video/Night-clear.mp4");
        expect(getBackgroundVideo({ theme: "dark", rain: true })).toContain("video/Night-rainny.mp4");
    });

    it("contains the supplied lofi and ambience files", () => {
        expect(LOFI_TRACKS).toHaveLength(10);
        expect(LOFI_TRACKS[0]).toMatchObject({ caption: "Chill 1", src: expect.stringContaining("lofi/chill1.mp3") });
        expect(AMBIENT_SOUNDS).toHaveLength(15);
        expect(AMBIENT_SOUNDS.find((sound) => sound.id === "rain-city")).toMatchObject({
            caption: "Rain City",
            src: expect.stringContaining("musics/rain_city.mp3"),
        });
    });
});
