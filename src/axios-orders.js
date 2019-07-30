import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-burger-238f6.firebaseio.com/"
});

export default instance;

// We're going to export the URL for the firebase database from this file to try and keep the code more legible.
// Like components, all we need to do is add a proper route into the components to acquire said data from the database.