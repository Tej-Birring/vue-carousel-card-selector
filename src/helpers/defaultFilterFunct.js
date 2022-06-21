export default (dataItems, filterString) => {
    return dataItems.filter((dataItem) => {
        // amalgamate all enumerable obj property values
        const valsArray = Object.values(dataItem);
        let haystack = "";
        valsArray.forEach((val) => {
            if (Array.isArray(val)) {
                haystack += val.join(", ");
            }
            else {
                haystack += ` ${val}`;
            }
        })
        haystack = haystack.toLowerCase();
        // if filterString not found, return empty
        const needle = filterString.toLowerCase();
        return (haystack.includes(needle));
    })
}