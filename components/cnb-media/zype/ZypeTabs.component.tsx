import * as React from "react";

import { ZypeTabSkeleton } from "./ZypeTabsSkeleton.component";
import { ZypeConfigTab, ZypeVideo } from "./ZypeMedia.types";
import { PwsMediaService } from "../service/pws-media.service";
import { ZypeNavBar } from "./ZypeNavBar.component";
import { ZypeTab } from "./ZypeTab.component";

interface ZypeTabsProps {
    setCurrentVideo: (video: ZypeVideo, nextVideo: ZypeVideo | null) => void;
    setActiveTab: (idx: number) => void;
    mediaService: PwsMediaService;
    tabs: ZypeConfigTab[] | null;
    loadingTabs: boolean;
    activeTab: number;
}

interface ZypeTabsState {
    loadingSearchResults: boolean;
    searchTab: ZypeConfigTab;
    searchTabActive: boolean;
}

const searchTabConfig: ZypeConfigTab = {
    categories: {},
    hasLive: false,
    title: "Search results",
    slug: "search",
    resume: null,
};

export class ZypeTabs extends React.Component<ZypeTabsProps, ZypeTabsState> {
    constructor(props: ZypeTabsProps) {
        super(props);

        this.state = {
            loadingSearchResults: true,
            searchTab: searchTabConfig,
            searchTabActive: false,
        };
    }

    setActiveTab = (idx: number) => {
        if (this.state.searchTabActive) {
            this.setState({ searchTabActive: false }, () => this.props.setActiveTab(idx));
        } else {
            this.props.setActiveTab(idx);
        }
    }

    onSearch = async (query: string) => {
        if (!query) {
            return console.info("Can't search with empty query param");
        }

        searchTabConfig.title = `Search results for "${query}":`;

        this.setState(
            {
                searchTabActive: true,
                loadingSearchResults: true,
                searchTab: searchTabConfig,
            },
            () => this.doSearch(query),
        );
    }

    doSearch = async (query: string) => {
        const res = await this.props.mediaService.getVideos(null, { query });

        if (res) {
            this.setState({
                searchTab: { ...searchTabConfig, ...res },
                loadingSearchResults: false,
            });
        } else {
            console.warn("Search failed!");
            this.setState({ searchTabActive: false, loadingSearchResults: false });
        }
    }

    render() {
        return (
            <div className="component-zype-tabs">
                <ZypeNavBar
                    activeTab={this.state.searchTabActive ? -1 : this.props.activeTab}
                    setActiveTab={this.setActiveTab}
                    onSearch={this.onSearch}
                    tabs={this.props.tabs}
                />
                <div className="tabs-container">
                    {this.props.tabs && this.props.tabs.map((tab, idx) => (
                        <ZypeTab
                            isActiveTab={!this.state.searchTabActive && this.props.activeTab === idx}
                            setCurrentVideo={this.props.setCurrentVideo}
                            mediaService={this.props.mediaService}
                            key={tab.title}
                            tab={tab}
                        />
                    ))}

                    {/* Search */}
                    {
                        this.state.searchTabActive && this.state.loadingSearchResults
                        ? <ZypeTabSkeleton />
                        : (
                            <ZypeTab
                                isActiveTab={this.state.searchTabActive}
                                setCurrentVideo={this.props.setCurrentVideo}
                                mediaService={this.props.mediaService}
                                tab={this.state.searchTab}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}
