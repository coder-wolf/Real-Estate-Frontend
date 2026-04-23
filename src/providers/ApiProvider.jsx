import { createContext, useState } from "react";
import { getStoredFavourites } from "../utils/offlinestorage";

export const ApiContext = createContext(null);

const ApiProvider = ({ children }) => {
    const [housesData, setHousesData] = useState([]);
    const [favHouses, setFavHouses] = useState([]);
    const [favIds, setFavIds] = useState([]);

    const updateHousesData = () => {
        fetch('listing.json')
            .then(res => res.json())
            .then(data => setHousesData(data));
    }

    const updateFavHouses = () => {
        const storedFavIds = getStoredFavourites();
        if (housesData.length == 0) {
            updateHousesData();
        }
        const filteredFavs = housesData.filter(
            house => storedFavIds.find(id => (id) == (house.id))
        );
        setFavHouses(filteredFavs);
        setFavIds(storedFavIds);
    }

    const apiInfo = {
        housesData,
        updateHousesData,
        favHouses,
        favIds,
        updateFavHouses,
    };

    return (
        <ApiContext.Provider value={apiInfo}>
            {children}
        </ApiContext.Provider>
    );
}

export default ApiProvider;