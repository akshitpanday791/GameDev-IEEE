import React from 'react';
import Background from "./assets/images/vinayak-chetti-main-file.jpg";

export const HomeScreen = () => {
    return (
        <div>
            <h1>HomeScreen</h1>
            <div className="app__itemsContainer">
                <Item
                    backgroundImg={Background}
                />
            </div>
        </div>
    )
}

export default HomeScreen;
