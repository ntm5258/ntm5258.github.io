
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
              "price": 19.99,
              "description": "Introducing the Classic Comfort Armchair: Sink into timeless relaxation with plush cushions and sturdy support. Vibrant colors and a classic design add charm to any space. Perfect for unwinding in style. Elevate your home with cozy comfort and a pop of color today!",
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





// product display area
const productDisplayDiv = document.querySelector("#productDisplayDiv");

// checkboxes
const modernCheckBox = document.querySelector("#modern-checked");
const rusticCheckBox = document.querySelector("#rustic-checked");
const industrialCheckBox = document.querySelector("#industrial-checked");


// search update button
const updateButton = document.querySelector("#update-search");

/**
 *
 * @chairType title - title of card / name of chair
 * @chairType img - link to image file
 * @returns {string} - returns boostrap card outline
 */
function createProductCard(title, price, img, style, id) {

    return `
        <div class="col-sm-12 col-lg-4 mt-2">
            <div class="card explode-small">
                <div class="h-75">
                    <img class="card-img-top h-100" src=${img} alt="Card image cap">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">$ ${price}</p>
                    <a href="view.html?style=${style}&id=${id}" class="stretched-link"></a>
                </div>
            </div>
        </div>
    `;


}

/**
 *  Retrieves the json data from chairs.json
 */
const retrieveData = async () => {
    const res = await fetch("./js/chairs.json");
    const data = await res.json();
    return data;
};


/**
 * Creates a boostrap card based on json data
 * @chairType chairType - Used to choose specific type/types of chairs
*/
const makeListing = async (chairType) => {

    //const payload = await retrieveData();
    const payload = json;
    const keys = Object.keys(payload).values();

    /*
        Checks if "chairType" has been set and is an array.
        If so, display the specified chair types to the productDisplayDiv
    */
    if (Array.isArray(chairType)) {
        
        const values = chairType.values();
        for (const key of values) {

            if (payload[key]) {

                let curr = payload[key].map((object) => {

                    const {id, title, price, img_path} = object;
                    return createProductCard(title, price, img_path, key, id);

                }).join("");
                productDisplayDiv.innerHTML += curr;
            }
        }
    }
    /*
        If "chairType" was not set, this else statement displays ever chair that exists in chairs.json
     */
    else {

        for (const key of keys) {


            let curr = payload[key].map((object) => {

                const { id, title, price, img_path } = object;
                return createProductCard(title, price, img_path, key, id);

            }).join("");
            productDisplayDiv.innerHTML += curr;
        }
    }
};

// by default show all items
makeListing();


updateButton.addEventListener("click", () => {

    const chair_type_array = [];

    productDisplayDiv.innerHTML = null;

    if (modernCheckBox.checked) {
        chair_type_array.push("modern");
    }
    if (rusticCheckBox.checked) {
        chair_type_array.push("rustic");
    }
    if (industrialCheckBox.checked) {
        chair_type_array.push("industrial");
    }

    makeListing(chair_type_array);


});











