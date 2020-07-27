import React, { useState, useEffect } from 'react';
import { StyleRoot } from 'radium';
import './App.css';
import Disclaimer from "./components/Disclaimer/Disclaimer";
import HomePageGrid from './components/HomePageGrid';
import FactCards from "./components/FactCards";

function App() {
    const [isView, setIsView] = useState("Thruster");

    if (process.env.NODE_ENV !== 'production') {
        console.log("Development Mode");
    } else {
        console.log("Production Mode");
    }

    return (
        <React.Fragment>
            <div id="outer-container">
                <Disclaimer />
                <StyleRoot>
                    <div id="page-wrap">
                        <HomePageGrid
                            viewId={isView}
                            onChange={(e) => {setIsView(e)}}
                        />
                    </div>
                </StyleRoot>
            </div>
            <FactCards/>

        </React.Fragment>
    )

}

export default App;
