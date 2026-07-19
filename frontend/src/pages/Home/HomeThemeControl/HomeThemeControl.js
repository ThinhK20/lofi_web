import { memo, useEffect, useRef, useState } from "react";
import { images } from "~/assets";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongId } from "~/components/Redux/generalSlice";
import { LOFI_TRACKS } from "~/data/mediaCatalog";
import styles from "./HomeThemeControl.module.scss";

const cx = classNames.bind(styles);

function HomeThemeControl() {
    const [playing, setPlaying] = useState(false);
    const dispatch = useDispatch();
    const { currentSongId, mutedAudio, audioVolume } = useSelector((state) => state.general);
    const audios = useRef([]);
    const currentTrack = LOFI_TRACKS[currentSongId] ?? LOFI_TRACKS[0];

    useEffect(() => {
        audios.current = LOFI_TRACKS.map(({ src }) => {
            const audio = new Audio(src);
            audio.loop = true;
            return audio;
        });

        return () => {
            audios.current.forEach((audio) => {
                audio.pause();
                audio.src = "";
            });
        };
    }, []);

    useEffect(() => {
        audios.current.forEach((audio, index) => {
            if (index === currentSongId && playing) {
                audio.play().catch(() => setPlaying(false));
            } else {
                audio.pause();
            }
        });
    }, [currentSongId, playing]);

    useEffect(() => {
        audios.current.forEach((audio) => {
            audio.muted = mutedAudio;
        });
    }, [mutedAudio]);

    useEffect(() => {
        audios.current.forEach((audio) => {
            audio.volume = audioVolume;
        });
    }, [audioVolume]);

    const moveSong = (offset) => {
        const nextSong = (currentSongId + offset + LOFI_TRACKS.length) % LOFI_TRACKS.length;
        dispatch(setCurrentSongId(nextSong));
    };

    return (
        <>
            <h1 className={cx("current-song-name__text")}>Song name: {currentTrack.caption}</h1>
            <div className={cx("music-player-control")}>
                <button type="button" className={cx("music-btn")} onClick={() => moveSong(-1)} aria-label="Previous song">
                    <img src={images.prev} alt="" />
                </button>
                <button
                    type="button"
                    className={cx("music-btn")}
                    onClick={() => setPlaying((value) => !value)}
                    aria-label={playing ? "Pause song" : "Play song"}
                >
                    <img src={playing ? images.pause : images.play} alt="" />
                </button>
                <button type="button" className={cx("music-btn")} onClick={() => moveSong(1)} aria-label="Next song">
                    <img src={images.next} alt="" />
                </button>
            </div>
        </>
    );
}

export default memo(HomeThemeControl);
