export const updateObject = (oldObject, updatedProperties) => {
    return{
        ...oldObject,
        ...updatedProperties
    };
};

// This will allow the reducer to run smoother by cleaning out a bit of the code.