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

export function withinRange(date, lower, upper) {
    var dateObj = new Date(date);
    
    if(lower && lower > dateObj) return false;
    if(upper && upper < dateObj) return false;

    return true;
}

export function sortMenuItems(mixedItems) {
    var modifiedMenuItems = [];

    for(var i = mixedItems.length - 1; i >= 0; i--) {
        if(mixedItems[i].item_type === 'item') {
            mixedItems[i].addons = [];
            modifiedMenuItems.push(mixedItems[i]);
            mixedItems.splice(i, 1);
        }
    }

    mixedItems.forEach(addon => {
        for(var i = 0; i < modifiedMenuItems.length; i++) {
            if(modifiedMenuItems[i].item_name === addon.item_name) {
                modifiedMenuItems[i].addons.push(addon);
            }
        }
    })
    return modifiedMenuItems;
}

export function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}