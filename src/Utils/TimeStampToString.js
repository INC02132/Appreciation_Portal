export const TimeStampToDateString = (timestamp) => {
    var time = Number(timestamp);
    console.log(time)
    let date = "";
    if (!isNaN(time))
        date = new Date(time).toISOString().substring(0, 10);
    return date;
};