export const BackendURL = "https://pos-backen.herokuapp.com"
const RemovedCols = [
    "deletedby",
    "deletedat",
    // "received",
    // "change",
    // "discountpercent",
    "isdeleted",
    "issynced"
]
export const createCols = (object) => Object
    .keys(object)
    .filter(key => (!RemovedCols.includes(key.toLowerCase())))
    .map(key => ({
        key,
        dataIndex: key,
        title: key.toLocaleUpperCase(),
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0,
    }))
export const searchInObject = (text, allData) => {
    let data = allData.filter((data) => {
        return Object.values(data)
            .join("")
            .toLowerCase()
            .includes(text.toLowerCase());
    });
    return data;
};
export default BackendURL