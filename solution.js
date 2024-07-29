// Нужно составить отчет по визитам пользователей из разных городов по каждой странице которую посетил пользователь.
//     В отчет нужно добавлять только записи с conditions.showFlg = true
//
// Результатом решения будет являться массив вида:
//
//     [
//         [pageName (формат kebab-case), дата (формат: дд.мм.гггг), название города],
// //...
// ]
// Исходные данные:
//
// // Визиты пользователей
//     const visits = [
//         { pageName: "first Page", visitDt: 2024-02-10T01:10:00, ip: 192.168.1.140 },
// { pageName: "blog Page Example", visitDt: 2024-02-19T03:24:00, ip: 192.168.0.39 },
// // ...
// ];
// // Массив объектов с масками IP и городами:
// const ipMasks = [
//     { id: 1, reportsDataId: 1, mask: '192.168.0.0', name: 'Москва', conditions: {showFlg: true} },
//     { id: 2, reportsDataId: 2, mask: '192.168.1.0' ,name: 'Санкт-Петербург', conditions: {showFlg: false}},
// // ...
// ];


const convertToKebabCase = (str) => {
    const result = str.toLowerCase().replace(/[\s_]+/g, '-');
    return result
}

const convertDate = (str) => {
    const day = String(str.getDate()).padStart(2, '0');
    const month = String(str.getMonth() + 1).padStart(2, '0'); // Месяцы в JS начинаются с 0
    const year = str.getFullYear();
    return `${day}.${month}.${year}`;
}

const  isIpInMask = (ip, mask) => {
    const ipSegments = ip.split('.').map(Number);
    const maskSegments = mask.split('.').map(Number);

    for (let i = 0; i < ipSegments.length; i++) {
        if ((ipSegments[i] & maskSegments[i]) !== maskSegments[i]) {
            return false;
        }
    }
    return true;
}

const visits = [
    { pageName: "first Page", visitDt: new Date('2024-02-10T01:10:00'), ip: '192.168.1.140' },
    { pageName: "blog Page Example", visitDt: new Date('2024-02-19T03:24:00'), ip: '192.168.0.39' },
]

const ipMasks = [
    { id: 1, reportsDataId: 1, mask: '192.168.0.0', name: 'Москва', conditions: { showFlg: true } },
    { id: 2, reportsDataId: 2, mask: '192.168.1.0', name: 'Санкт-Петербург', conditions: { showFlg: false } },
]

const validIpMasks = ipMasks.filter(mask => mask.conditions.showFlg);

const report = visits.map(visit => {
    const mask = validIpMasks.find(mask => isIpInMask(visit.ip, mask.mask));
    if (mask) {
        return [
            toKebabCase(visit.pageName),
            formatDate(visit.visitDt),
            mask.name
        ];
    }
}).filter(entry => entry !== undefined);