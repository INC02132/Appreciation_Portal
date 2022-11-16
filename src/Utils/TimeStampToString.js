export const TimeStampToDateString = (timestamp) => {
    var time = Number(timestamp);
    let date = "";
    if (!isNaN(time))
        date = new Date(time).toISOString().substring(0, 10);
    return date;
};