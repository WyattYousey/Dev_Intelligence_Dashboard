export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
}

export const formatSize = (size) => {
    return `${(size / 1024).toFixed(2)} MB`;
}