const getPrevUrl = (d) => {
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let strD = `${d.getFullYear()}/${month < 10 ? '0' + month : month}/${
        day < 10 ? '0' + day : day
    }`;
    let url = `https://www.cbr-xml-daily.ru/archive/${strD}/daily_json.js`;
    return url;
};

let tenDaysData = [];

for (let i = 1; i < 11; i++) {
    let d = new Date();
    d.setDate(d.getDate() - i);
    url = getPrevUrl(d);
    tenDaysData.push(url);
}

console.log(tenDaysData);
