import * as React from "react";
import classnames from "classnames";

import { rewindSvg, forwardSvg } from "./playerButtons";
import { ZypePlayerSkeleton } from "./ZypePlayerSkeleton.component";
import { ZypeVideo } from "./ZypeMedia.types";
import { PwsMediaService } from "../service/pws-media.service";

interface ZypePlayerProps {
    reFetchCurVideo: () => void;
    playNextVideo: () => void;
    video: ZypeVideo | null;
    apiKey: string | null;
    mediaService: PwsMediaService;
}

interface ZypePlayerState {
    isFullScreen: boolean;
    isLoading: boolean;
}

declare global {
    interface Window {
        theoplayer: any;
        THEOplayer: any;
    }
}

export class ZypePlayer extends React.PureComponent<ZypePlayerProps, ZypePlayerState> {
    intervalId!: NodeJS.Timer;
    player: any = null;
    rewindButton: any;
    forwardButton: any;

    private videoPlayerRef: React.RefObject<HTMLDivElement>;

    constructor(props: ZypePlayerProps) {
        super(props);

        this.videoPlayerRef = React.createRef();

        this.state = {
            isFullScreen: false,
            isLoading: true,
        };
    }

    componentDidMount() {
        if (this.props.video && this.props.apiKey) {
            if (!this.props.video.id) {
                this.props.reFetchCurVideo();
            } else {
                this.loadPlayerScript(this.props.video, this.props.apiKey);
            }
        }
    }

    componentDidUpdate(prevProps: ZypePlayerProps) {
        if (
            (
                !prevProps.apiKey
                || !prevProps.video
                || !prevProps.video.id
                || (this.props.video && prevProps.video.id !== this.props.video.id)
                || (this.props.video?.isAudio !== prevProps.video.isAudio)
            )
            && this.props.video
            && this.props.apiKey
        ) {
            if (!this.props.video.id) {
                this.props.reFetchCurVideo();
            } else {
                this.loadPlayerScript(this.props.video, this.props.apiKey);
            }
        }
    }

    loadPlayerScript = async (video: ZypeVideo, apiKey: string) => {
        if (!video.id) {
            return console.error("Couldn't initialize player - id is unavailable");
        }

        // Handle setting player to audio-only mode
        let isAudio = "";

        // that is already set on live videos
        if (typeof video.isAudio === "boolean") {
            if (video.isAudio) {
                isAudio = "&audio=true";
            }
        } else {
            //const res = await this.props.mediaService.getIsAudio(video.id, video.onAir);
            const res = await this.props.mediaService.getIsAudio(video.id);
            if (res && res.isAudio) {
                isAudio = "&audio=true";
            }
        }

        const script = document.createElement("script");
        // script.src = `https://player.zype.com/embed/${video.id}.js`
        //     + `?api_key=${apiKey}&autoplay=${video.autoplay}&controls=true${isAudio}`;
        script.src = `https://player.zype.com/embed/${video.id}.js`
            + `?api_key=${apiKey}&autoplay=false&controls=true${isAudio}`;

        script.async = true;
        document.body.appendChild(script);

        this.getPlayerRef();
    }

    getPlayerRef = () => {
        this.intervalId = setInterval(this.doGetPlayerRef, 500);
    }

    doGetPlayerRef = () => {
        if (window.theoplayer) {
            this.player = window.theoplayer;
            this.initPlayer();
            clearInterval(this.intervalId);
        }
    }

    handlePresentationChange = (mode?: "fullscreen" | "inline") => {
        switch (mode) {
            case "fullscreen":
                this.setState({ isFullScreen: true });
                break;
            case "inline":
                this.setState({ isFullScreen: false });
                break;
        }
    }

    initPlayer = () => {
        this.setState({ isLoading: false });
        this.scrollToVideoPlayer();
        this.player.addEventListener("ended", this.props.playNextVideo);
        this.initAdditionalButtons();

        this.player.addEventListener(
            "presentationmodechange",
            (v: any) => this.handlePresentationChange(v.presentationMode),
        );
    }

    initAdditionalButtons = () => {
        // not sure how reliable that is, so better try-catch
        try {
            // build buttons only on first player load
            if (!this.rewindButton || !this.forwardButton) {
                const Button = window.THEOplayer.videojs.getComponent("Button");

                this.rewindButton = window.THEOplayer.videojs.extend(Button, {
                    constructor() {
                        Button.apply(this, arguments);

                        const tooltipSpan = document.createElement("span");
                        tooltipSpan.className = "theo-button-tooltip vjs-hidden";
                        tooltipSpan.innerText = "-10 sec";

                        function toggleTooltip() {
                            tooltipSpan.classList.toggle("vjs-hidden");
                        }

                        this.el().addEventListener("mouseover", toggleTooltip);
                        this.el().addEventListener("mouseout", toggleTooltip);

                        this.el().appendChild(tooltipSpan);
                        this.el().appendChild(rewindSvg);
                    },
                    handleClick: () => {
                        this.player.currentTime -= 10;
                    },
                    buildCSSClass: () => "vjs-button custom-player-button rewind",
                });

                this.forwardButton = window.THEOplayer.videojs.extend(Button, {
                    constructor() {
                        Button.apply(this, arguments);

                        const tooltipSpan = document.createElement("span");
                        tooltipSpan.className = "theo-button-tooltip vjs-hidden";
                        tooltipSpan.innerText = "+10 sec";

                        function toggleTooltip() {
                            tooltipSpan.classList.toggle("vjs-hidden");
                        }

                        this.el().addEventListener("mouseover", toggleTooltip);
                        this.el().addEventListener("mouseout", toggleTooltip);

                        this.el().appendChild(tooltipSpan);
                        this.el().appendChild(forwardSvg);
                    },
                    handleClick: () => {
                        this.player.currentTime += 10;
                    },
                    buildCSSClass: () => {
                        return "vjs-button custom-player-button forward";
                    },
                });
            }

            window.THEOplayer.videojs.registerComponent("RewindButton", this.rewindButton);
            this.player.ui.getChild("controlBar").addChild("RewindButton", {});
            window.THEOplayer.videojs.registerComponent("ForwardButton", this.forwardButton);
            this.player.ui.getChild("controlBar").addChild("ForwardButton", {});

        } catch (e) {
            console.warn("Error initializing additional player buttons", e);
        }
    }

    scrollToVideoPlayer(): void {
        if (this.videoPlayerRef.current) {
            window.scrollTo({
                left: 0,
                top: this.videoPlayerRef.current.offsetTop,
                behavior: "smooth",
            });
        }
    }

    render() {
        const playerClass = classnames("component-zype-player", {
            "player-fullscreen": this.state.isFullScreen,
        });

        return(
            <div className={playerClass} ref={this.videoPlayerRef}>
                {this.state.isLoading && <ZypePlayerSkeleton />}

                <figure style={{ display: this.state.isLoading ? "none" : "block" }}>
                    <div className="player-container">
                        <div id="zype_player" />
                    </div>
                    {
                        this.props.video && (
                            <figcaption>
                                <div className="title">{this.props.video.title}</div>
                                <p>{this.props.video.description}</p>
                            </figcaption>
                        )
                    }
                </figure>
            </div>
        );
    }
}
