const getStoredFavourites = () => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
        return JSON.parse(storedFavourites);
    }

    return [];
}

const toggleFavourite = id => {
    const storedFavourites = getStoredFavourites();
    const exists = storedFavourites.find(houseId => parseInt(houseId) === parseInt(id))
    if (!exists) {
        storedFavourites.push(id);
        localStorage.setItem("favourites", JSON.stringify(storedFavourites));
        return true;
    }
    else {
        // storedFavourites.push(id);
        const updatedFavourites = storedFavourites.filter(houseId => parseInt(houseId) !== parseInt(id))
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
        return false;
    }
    // return false;
}


export { getStoredFavourites, toggleFavourite }