const dayjs = require('dayjs');

const formatDate = (timestamp) => {
    return dayjs(timestamp).format('DD-MM-YYYY || HH:mm:ss');
};

module.exports = {
    formatDate
};