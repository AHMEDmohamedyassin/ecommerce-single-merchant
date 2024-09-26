
// returning only the changed inputs value
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



// reformation the date to be as the input fomate
export const formattingDateForUpdate = (date = null) => {
    if(!date)
        return "00-00-0000 00:00"
    let d = new Date(date)
    let day = String(d.getDate()).padStart(2 , '0')
    let month = String(d.getMonth()+ 1).padStart(2 , '0') 
    let year = String(d.getFullYear()).padStart(2 , '0')
    let hours = String(d.getHours()).padStart(2 , '0')
    let minutes = String(d.getMinutes()).padStart(2 , '0')

    return `${day}-${month}-${year} ${hours}:${minutes}`
} 