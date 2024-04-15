
const retrieveData = async () => {
    const res = await fetch("https://api.jsonbin.io/v3/qs/661d681dacd3cb34a838faa8");
    const data = await res.json();
    return data;
};


const getJson = async () => {

    const payload = await retrieveData();
    const keys = Object.keys(payload).values();

    for (const key of keys) {
        console.log(payload[keys]);
    }


fetch("https://api.jsonbin.io/v3/qs/661d681dacd3cb34a838faa8").then(res => res.json().then(j => console.log(j.record)));

};

getJson();
console.log("works");
