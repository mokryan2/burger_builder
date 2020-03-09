export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

// This will allow the reducer to run smoother by cleaning out a bit of the code.

// While this was originally placed out in the store folder, putting this in a designated folder allows more usage w/o a strange file path