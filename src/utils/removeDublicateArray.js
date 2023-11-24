function removeDuplicates(arr) {
    return arr?.filter((item,
        index) => arr.indexOf(item) === index);
}

export default removeDuplicates;