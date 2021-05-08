export const BackendURL = "https://pos-backen.herokuapp.com"
export const createCols = (object) => Object
    .keys(object)
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