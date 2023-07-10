import * as React from "react";

import { ZypeConfigTab } from "./ZypeMedia.types";

interface NavBarProps {
    setActiveTab: (idx: number) => void;
    onSearch: (query: string) => void;
    tabs: ZypeConfigTab[] | null;
    activeTab: number;
}

interface NavBarState {
    query: string;
}

export class ZypeNavBar extends React.Component<NavBarProps, NavBarState> {
    constructor(props: NavBarProps) {
        super(props);

        this.state = { query: "" };
    }

    onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({ query: e.currentTarget.value });
    }

    onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onSearch(this.state.query);
    }

    render() {
        return (
            <div className="component-zype-nav-bar">
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        value={this.state.query}
                        onChange={this.onChange}
                        placeholder="Search videos..."
                    />
                    <input type="submit" value="Search" />
                </form>

                <div className="tab-headers-container">
                    { this.props.tabs && this.props.tabs.map((tab, idx) => (
                        <div
                            onClick={() => this.props.setActiveTab(idx)}
                            className={`zype-tab-header ${this.props.activeTab === idx ? "active" : ""}`}
                            key={tab.title}
                        >
                            {tab.title}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
