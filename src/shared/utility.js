export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

// Because this is something being used in more than one file, it makes sense to just implement it via a shared file!
export const checkValidation = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== " " && isValid
    };

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    };
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    };

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    };

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    };

    return isValid;
};

// This will allow the reducer to run smoother by cleaning out a bit of the code.

// While this was originally placed out in the store folder, putting this in a designated folder allows more usage w/o a strange file path