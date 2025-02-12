import { DateTime } from 'luxon';

const getDatesForNext4Weeks = () => {
    const dates = [];
    let currentDate = DateTime.now();
    for (let i = 0; i < 28; i++) {
        const day = currentDate.toLocaleString({ weekday: 'short' });
        const date = currentDate.toLocaleString({ month: 'short', day: 'numeric' });
        dates.push({ day, date });
        currentDate = currentDate.plus({ days: 1 });
    }
    return dates;
}

export default getDatesForNext4Weeks;