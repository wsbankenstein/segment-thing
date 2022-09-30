function timeToWords(date) {
    let hours = date.getHours(), minutes = Math.round(date.getMinutes() / 5) * 5;
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

function letterToSegments(letter, display) {
    let s = display.segments;
    // s.map(a => a.set(false));
    switch(letter) {
        case "А":
            for(let i of [0, 1, 2, 3, 6, 9, 8, 11]) s[i].set(true);
            break;
        case "Б":
            for(let i of [0, 1, 6, 9, 2, 3, 11, 4, 5]) s[i].set(true);
            break;
        case "В":
            for(let i of [0, 6, 9, 7, 4, 5, 11, 2, 3]) s[i].set(true);
            break;
        case "Г":
            for(let i of [0, 1, 6, 9]) s[i].set(true);
            break;
        case "Д":
            for(let i of [0, 1, 6, 9, 4, 15, 8]) s[i].set(true);
            break;
        case "Е":
            for(let i of [0, 1, 2, 4, 5, 6, 9]) s[i].set(true);
            break;
        case "Ж":
            for(let i of [6, 9, 7, 10, 8, 11, 2, 3]) s[i].set(true);
            break;
        case "З":
            for(let i of [0, 1, 8, 3, 2, 11, 5, 4]) s[i].set(true);
            break;
        case "И":
            for(let i of [6, 9, 14, 13, 8, 11]) s[i].set(true);
            break;
        case "Й":
            for(let i of [10, 15, 11, 1]) s[i].set(true);
            break;
        case "К":
            for(let i of [6, 9, 2, 13, 3, 11]) s[i].set(true);
            break;
        case "Л":
            for(let i of [14, 13, 8, 11]) s[i].set(true);
            break;
        case "М":
            for(let i of [7, 8, 9, 11, 12, 13]) s[i].set(true);
            break;
        case "Н":
            for(let i of [6, 9, 2, 3, 8, 11]) s[i].set(true);
            break;
        case "О":
            for(let i of [0, 1, 6, 9, 4, 5, 8, 11]) s[i].set(true);
            break;
        case "П":
            for(let i of [6, 9, 0, 1, 8, 11]) s[i].set(true);
            break;
        case "Р":
            for(let i of [6, 9, 0, 1, 8, 3, 2]) s[i].set(true);
            break;
        case "С":
            for(let i of [0, 1, 6, 9, 4, 5]) s[i].set(true);
            break;
        case "Т":
            for(let i of [0, 1, 7, 10]) s[i].set(true);
            break;
        case "У":
            for(let i of [6, 2, 3, 8, 11, 5, 4]) s[i].set(true);
            break;
        case "Ф":
            for(let i of [13, 12, 14, 15, 7, 2, 3, 10]) s[i].set(true);
            break;
        case "Х":
            for(let i of [7, 10, 14, 13]) s[i].set(true);
            break;
        case "Ц":
            for(let i of [6, 7, 2, 3, 11]) s[i].set(true);
            break;
        case "Ч":
            for(let i of [6, 2, 3, 8, 11]) s[i].set(true);
            break;
        case "Ш":
            for(let i of [6, 9, 4, 5, 7, 10, 8, 11]) s[i].set(true);
            break;
        case "Щ":
            for(let i of [6, 7, 8, 2, 3, 11]) s[i].set(true);
            break;
        case "Ъ":
            for(let i of [0, 7, 10, 5, 11]) s[i].set(true);
            break;
        // не ми пука за ь
        case "Ю":
            for(let i of [6, 9, 2, 3, 7, 10, 1, 8, 11, 5]) s[i].set(true);
            break;
        case "Я":
            for(let i of [7, 1, 8, 11, 3, 14, 10]) s[i].set(true);
            break;
        case " ":
            case "":
            break;
        case "-":
            for(let i of [2, 3]) s[i].set(true);
            break;
    }
}

function textToSegments(string, displayArray, centered) {
    if (displayArray.length < string.length) return console.error("String too long for display array");
    if (centered) {
        if (string.length == displayArray.length) textToSegments(string, displayArray, false);
        else {
            let d = Math.floor((displayArray.length - string.length) / 2);
            for (let i = Math.floor(string.length / 2); i <= string.length; i++) {
                letterToSegments(string[i], displayArray[d + i]);
                letterToSegments(string[string.length - i], displayArray[d + string.length - i]);
            }
        }
    } else {
        for (let i in string) {
            letterToSegments(string[i], displayArray[i]);
        }
    }
}
