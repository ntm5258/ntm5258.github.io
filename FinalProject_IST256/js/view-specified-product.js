'use strict';



const json = {
    "modern": [
        {
            "id": 1,
            "title": "Modern Chair",
            "price": 49.99,
            "description": "Introducing our sleek black metal stool: minimalist design, maximum versatility. Crafted from durable metal, it offers reliable support for any task. Its compact size and lightweight construction make it perfect for small spaces or on-the-go use. Add a touch of modern elegance to your home or workspace today!",
            "img_path": "images/modern/black-chair-1.jpeg"
        },
        {
            "id": 2,
            "title": "Modern Comfy Chair",
            "price": 39.99,
            "description": "Introducing our vibrant orange papasan chair: a cozy oasis of comfort and style. Sink into the plush cushion atop its sturdy rattan frame, offering relaxation and support. Its eye-catching orange hue adds a pop of color to any space, inviting you to unwind in unparalleled comfort.",
            "img_path": "images/modern/modern-comfy.jpg"
        },
        {
            "id": 3,
            "title": "Modern Sofa",
            "price": 99.99,
            "description": "\nIntroducing our elegant white couch: timeless sophistication meets modern comfort. Sink into its plush cushions and relax in style. With a sleek design and versatile color, it effortlessly complements any decor. Elevate your living space with this inviting centerpiece of relaxation and luxury.",
            "img_path": "images/modern/modern-sofa.jpg"
        },
        {
            "id": 4,
            "title": "Modern Dining Set",
            "price": 50.99,
            "description": "Introducing our chic white cushion table set: timeless elegance meets modern comfort. Featuring soft white cushions atop sturdy chairs and a matching table, it's perfect for dining or lounging. Elevate your space with this stylish and versatile set, blending seamlessly into any décor scheme.",
            "img_path": "images/modern/modern_dining_set.jpeg"
        }

    ],
    "rustic": [
        {
            "id": 1,
            "title": "Old Fashioned Chair Set",
            "price": 29.99,
            "description": "\nIntroducing our charming old-fashioned metal frame chair set: a nod to vintage elegance. Crafted with sturdy metal frames and classic design, these chairs evoke nostalgia while providing durable seating. Perfect for adding character to your space, indoors or out, with timeless style and reliability.",
            "img_path": "images/rustic/rustic_chairs_1.jpeg"
        },
        {
            "id": 2,
            "title": "Old Fashioned Couch Set",
            "price": 99.99,
            "description": "Introducing our vintage-inspired maroon leather couch set: a luxurious retreat with timeless appeal. Crafted from supple leather, each piece exudes elegance and durability. Sink into plush cushions and enjoy unparalleled comfort. Elevate your space with this sophisticated ensemble, blending classic design with modern comfort.",
            "img_path": "images/rustic/rustic_couch_set.jpg"
        },
        {
            "id": 3,
            "title": "Old Fashioned Chair",
            "price": 19.99,
            "description": "Introducing our retro-inspired orange cushion chair: a vibrant addition to any space. With its classic design and plush orange cushions, this chair brings a pop of color and comfort to your home. Crafted for durability and style, it's a cozy seat with a nostalgic flair.",
            "img_path": "images/rustic/rustic_red_chair.jpeg"
        },
        {
              "id": 4,
              "title": "Old Fashioned Colorful Chair",
              "price": 34.99,
              "description": "\nIntroducing the Classic Comfort Armchair: Sink into timeless relaxation with plush cushions and sturdy support. Vibrant colors and a classic design add charm to any space. Perfect for unwinding in style. Elevate your home with cozy comfort and a pop of color today!",
              "img_path": "images/rustic/comfy_grandma_chair.jpeg"
        }
    ],
    "industrial": [
        {
            "id": 1,
            "title": "Barber Chairs",
            "price": 39.99,
            "description": "Out of use barber chairs",
            "img_path": "images/industrial/barber-chairs.jpeg"
        }
    ]

}







const viewContainer = document.querySelector("#view-container");


/**
 *  Retrieves the json data from chairs.json
 */
const retrieveData = async () => {
    const res = await fetch("./js/chairs.json");
    const data = await res.json();
    return data;
};


function getParametersFromUrl() {

    const url = window.location.href.split("?");

    const paramArray = [];

    let parameters = url[url.length - 1].split("&").values();

    for (let param of parameters) {
        param = param.split("=");
        paramArray.push(param[param.length - 1]);
    }

    return paramArray;


}


const getChair = async (chairInfo) => {

    //const payload = await retrieveData();
    const payload = json;
    const keys = Object.keys(payload).values();

    const style = chairInfo[0];
    const id = parseInt(chairInfo[1]);

    console.log(id);

    if (payload[style]) {

        for (let i = 0; i < payload[style].length; i++) {

            if (payload[style][i]["id"] === id) {

                console.log(payload[style][i]);
                const {id, title, price, description, img_path} = payload[style][i];
                document.title = "View - " + title;
                viewContainer.innerHTML = `<div class="container mt-5 display-pad">
                                                <div class="row">
                                                    <div class="col-sm-4 col-lg-4 line">
                                                        <img src="${img_path}" class="img-fluid" alt="Responsive image">
                                                    </div>
                                                    <div class="col-sm-8 col-lg-8 align-self-start">
                                                        <h1>${title}</h1>
                                                        <h4>$ ${price}</h4>
                                                        <p>${description}</p>                                            
                                                        <div class="mt-5">
                                                            <label for="quantity">Amount: </label>
                                                            <input type="number" id="quantity" name="quantity" min="1" max="4">
                                                            <input type="submit" class="btn btn-dark ml-2" value="Checkout">
                                                        </div>
                                            
                                            
                                                    </div>
                                                </div>
                                            </div>
                `;
                break;
            }
        }
    }
    // const values = chairInfo.values();
    // console.log(values);
    //
    // for (const key of values) {
    //     console.log(key);
    //
    //     if (payload[key]) {
    //
    //         let curr = payload[key].map((object) => {
    //
    //             const {id, title, img_path} = object;
    //             return console.log(object);
    //
    //         }).join("");
    //     }
    // }

};

const chairParams = getParametersFromUrl();

getChair(chairParams);



