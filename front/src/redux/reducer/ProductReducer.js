const initial = {
    status : "n",   // n : normal ,  l : loading , s : success , f : fail
    selected_image : null ,
    selected_size : null ,
    selected_color : null ,

    id: null,
    slug: null,
    serial: null,
    title: null,
    description: null,
    price: 0,
    old_price: 0,
    quantity: 0,
    ratting: 0,
    views: 0,
    reviews: 0,
    paid_quantity: 0,
    publish_date: null,
    created_at: null,
    updated_at: null,
    json: {},
    category:[]
} 


export const ProductReducer = (state = initial , action) => {
    switch (action.type){
        case "Product_Status":
            return {
                ...state,
                status: action.data
            }
        case "Product_Data" : 
            return {
                ...state ,
                status : "n",
                ...action.data
            }
        case "Product_Reset":
            return {
                ...initial ,
                ...action.data
            };
        default: 
            return state;
    }
}

/*
"state": "success",
    "status": 200,
    "success": true,
    "msg": "good request",
    "response": {
        "id": 1,
        "slug": "iste-dolor-dolore-in-ad-sit-accusamus-und-877-ex-neque-excepturi-v",
        "serial": "12345",
        "title": "Ad sit accusamus und",
        "description": "Ex neque excepturi v",
        "price": 877,
        "old_price": 327,
        "quantity": 436,
        "ratting": 0,
        "views": 33,
        "reviews": 0,
        "paid_quantity": 4,
        "publish_date": "2024-03-28 12:00:00",
        "created_at": "2024-09-28T15:51:56.000000Z",
        "updated_at": "2024-10-01T15:12:28.000000Z",
        "json": {
            "description": "Provident consequat",
            "restore": "Rem rem eius qui con",
            "size": [
                "XL",
                "SM"
            ],
            "colors": [
                "Red",
                "GREEN"
            ],
            "images": {
                "1727538716_979874.png": "RED",
                "1727538717_373029.png": "GREEN"
            }
        },
        "category": [
            {
                "id": 1,
                "slug": "category 1",
                "title": "category 1",
                "description": null,
                "created_at": null,
                "updated_at": null,
                "pivot": {
                    "product_id": 1,
                    "category_id": 1
                }
            },
            {
                "id": 2,
                "slug": "category2",
                "title": "category2",
                "description": null,
                "created_at": null,
                "updated_at": null,
                "pivot": {
                    "product_id": 1,
                    "category_id": 2
                }
            }
        ]
    }
        */