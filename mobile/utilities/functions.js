
export function format12Hours(time) {
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export function formatDate(date) {
    var month = date.getMonth()+1;
    var day = date.getDate();
    day = day < 10 ? '0'+day : day;
    var year = date.getFullYear();
    var strTime = month + '/' + day + '/' + year;
    return strTime;
}