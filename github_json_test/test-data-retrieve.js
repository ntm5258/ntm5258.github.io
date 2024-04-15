
const retrieveData = async () => {
    const res = await fetch("https://ntm5258.github.io/github_json_test/test.json");
    const data = await res.json();
    return data;
};


const getJson = async () => {

    const payload = await retrieveData();
    const keys = Object.keys(payload).values();

    for (const key of keys) {
        console.log(payload[keys]);
    }




};

getJson();
console.log("works");