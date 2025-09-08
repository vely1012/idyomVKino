import { type JSX } from "react"

import './Tab.css'

export interface TabProps {
    tabContent: JSX.Element
    tabName: string
    counter?: number
}

export default function Tab({ tabContent, tabName, counter }: TabProps) {
    counter = counter || Math.floor(Math.random() * 100000);
    
    // uniqe id for checkbox
    // must vary across ALL Tab elements
    // same id's leads to collapse/expand button malfunctioning
    const toggleId = `toggle${counter}${Math.floor(Date.now() % 10000)}`;
    
    return (
        <div className="tab">
            <div className="tab__heading">
                <span className="tab__heading-marker"></span>
                <h2 className="tab__title">{tabName}</h2>
                <input type="checkbox" id={toggleId} className="tab__content-toggle" />
                <label htmlFor={toggleId} className="tab__toggle-arrow" />
            </div>
            <div className="tab__content">
                {tabContent}
            </div>
        </div>
    )
}