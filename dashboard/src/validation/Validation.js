

export const ValidateInputChanges = (watch , defaultValues) => {
    const watchedValues = watch();
    const changedValues = Object.keys(watchedValues).reduce((acc, key) => {
        if (watchedValues[key] !== defaultValues[key]) {
            acc[key] = watchedValues[key];
        }
        return acc;
    }, {});

    return changedValues
}