function timeToWords(h, m) {
    let hours = h, minutes = Math.round(m / 5) * 5;
    let textHours, textMinutes, separator = "И";
    switch (minutes) {
        case 60:
            hours++;
            case 0:
            separator = "";
            textMinutes = "ЧАСА";
            break;
        case 30:
            textMinutes = "ПОЛОВИНА";
            break;
        case 35:
            hours++;
            separator = "БЕЗ";
            case 25:
            textMinutes = "ДВАДЕСЕТ И ПЕТ";
            break;
        case 40:
            hours++;
            separator = "БЕЗ";
            case 20:
            textMinutes = "ДВАДЕСЕТ";
            break;
        case 45:
            hours++;
            separator = "БЕЗ";
            case 15:
            textMinutes = "ПЕТНАДЕСЕТ";
            break;
        case 50:
            hours++;
            separator = "БЕЗ";
            case 10:
            textMinutes = "ДЕСЕТ";
            break;
        case 55:
            hours++;
            separator = "БЕЗ";
            case 5:
            textMinutes = "ПЕТ";
            break;
    }
    switch(hours) {
        case 0:
        case 12:
        case 24:
            textHours = "ДВАНАДЕСЕТ";
            break;
        case 1:
        case 13:
            textHours = "ЕДИН";
            break;
        case 2:
        case 14:
            textHours = "ДВА";
            break;
        case 3:
        case 15:
            textHours = "ТРИ";
            break;
        case 4:
        case 16:
            textHours = "ЧЕТИРИ";
            break;
        case 5:
        case 17:
            textHours = "ПЕТ";
            break;
        case 6:
        case 18:
            textHours = "ШЕСТ";
            break;
        case 7:
        case 19:
            textHours = "СЕДЕМ";
            break;
        case 8:
        case 20:
            textHours = "ОСЕМ";
            break;
        case 9:
        case 21:
            textHours = "ДЕВЕТ";
            break;
        case 10:
        case 22:
            textHours = "ДЕСЕТ";
            break;
        case 11:
        case 23:
            textHours = "ЕДИНАДЕСЕТ";
            break;
    }
    // return `${textHours} ${textMinutes}`;
    return {string: `${textHours} ${separator} ${textMinutes}`, h: textHours, sep: separator, m: textMinutes};
}

function dateToWords(date) {
    timeToWords(date.getHours(), date.getMinutes());
}


module.exports = { timeToWords, dateToWords }
