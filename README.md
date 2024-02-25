## Description

  Problem Statement: Design a Grocery Booking API:
    Roles:
    - Admin
    - User

## Design API endpoints

  1. Admin Responsibilities:
    - Add new grocery items to the system
    - View existing grocery items
    - Remove grocery items from the system
    - Update details (e.g., name, price) of existing grocery items
    - Manage inventory levels of grocery items

  2. User Responsibilities:
    - View the list of available grocery items
    - Ability to book multiple grocery items in a single order

## Tech Stack

  1.  NestJS
  2.  MongoDB (Cloud instance will be active till 9th March, 2024)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Running the app using Docker

```bash
  docker run --name grocery-api -p 3000:3000 -d prodocker21/qp-assessment:latest
```

## Repo Description

An assesment for the position NodeJS Developer (App.ID 29440050) in Questionpro.

## Stay in touch

- Author - Dibyendu Swar
- LinkedIn - [https://www.linkedin.com/in/dibyendu-swar/]

## How to use

The APIs can be acessed by following predefined user credentials :

- Admin User  
{
    "email": "admin@gmail.com",
    "password": "123456"
}

- End User  
{
    "email": "user@gmail.com",
    "password": "123456"
}

## Postman Collection

```bash
  https://api.postman.com/collections/21914986-85b45a6a-601f-475e-bcf6-036ace6c202c?access_key=PMAT-01HQFMKVPHYB2C543WF45KV4DX
```

## List of End Points

1.  localhost:3000/auth/login [POST]

  ```bash
    curl --location 'localhost:3000/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "admin@gmail.com",
        "password": "123456"
    }'
  ```

Note. /be is like backend and only accessible with Admin roles

2.  localhost:3000/be/products/ [POST]

  ```bash
    curl --location 'localhost:3000/be/products/' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token>' \
    --data '{
        "name": "Colgate Maxfresh with Cooling Crystals Toothpaste  (300 g, Pack of 2)",
        "brand": "Colgate",
        "make": "ColgatePalmolive",
        "model": "Maxfresh with Cooling Crystals",
        "unitQuantity": 1,
        "usedFor": ["Tooth Hygiene","Tooth Cleaning"],
        "minOrderQuantity": 4,
        "maxOrderQuantity": 15
    }'
  ```

3.  localhost:3000/be/products/ [PUT]

  ```bash
    curl --location --request PUT 'localhost:3000/be/products/' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token>' \
    --data '{
        "id": "65d9b160f7dced688aaa8536", 
        "name": "EMAMI Healthy & Tasty Ultra Lite Refined Soyabean Oil Pouch (Soyabean Tel)  (1 L)",
        "brand": "EMAMI1",
        "make": "EMAMI",
        "model": "Healthy & Tasty Ultra Lite Refined",
        "unitQuantity": 2,
        "usedFor": ["Cooking"],
        "minOrderQuantity": 3,
        "maxOrderQuantity": 11,
        "other": 1
    }'
  ```

4.  localhost:3000/be/products/ [DELETE]

  ```bash
    curl --location --request DELETE 'localhost:3000/be/products/' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token>' \
    --data '{
        "id": "65d9b160f7dced688aaa8536"
    }'
  ```

5.  localhost:3000/be/products/inventory [POST]

  ```bash
    curl --location 'localhost:3000/be/products/inventory' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token>' \
    --data '{
        "productID" : "65dab43ac38cd3196c18dd26",
        "batchNo": "CL-5054-20452",
        "stockQty": 1000,
        "expiry": "MAR-25",
        "isActive": true,
        "priceListing": 78,
        "priceListingDisc": 15
    }'
  ```

6.  localhost:3000/be/products/inventory [PUT]

  ```bash
      curl --location --request PUT 'localhost:3000/be/products/inventory' \
      --header 'Content-Type: application/json' \
      --header 'Authorization: Bearer <token>' \
      --data '{
          "productID" : "65d9b160f7dced688aaa8536",
          "id" : "65d9db0bf8550c5a356cf05c",
          "batchNo": "CV565020",
          "stockQty": 700,
          "expiry": "MAR-25",
          "isActive": true,
          "priceListing": 659,
          "priceListingDisc": 25
      }'
  ```

7.  localhost:3000/be/products/inventory/attach [PATCH]

  ```bash
     curl --location --request PATCH 'localhost:3000/be/products/inventory/attach' \
      --header 'Content-Type: application/json' \
      --header 'Authorization: Bearer <token>' \
      --data '{
          "productId" : "65dab43ac38cd3196c18dd26",
          "inventoryBatch" : "CL-5054-20452"
      }'
  ```

8.  localhost:3000/products/inventory [DELETE]

  ```bash
    curl --location --request DELETE 'localhost:3000/products/inventory' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token>' \
    --data '{
        "productID" : "65d9b160f7dced688aaa8536",    
        "batchNo": "CV565020"
    }'
  ```

9.  localhost:3000/auth/login [POST]

  ```bash
    curl --location 'localhost:3000/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "user@gmail.com",
        "password": "123456"
    }'
  ```

10.  localhost:3000/listing/products [GET]

  ```bash
  curl --location 'localhost:3000/listing/products'
  ```

11.  localhost:3000/orders/addToCart [POST]

  ```bash
  curl --location 'localhost:3000/orders/addToCart' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <token>' \
  --data '{
      "productID": "65dab43ac38cd3196c18dd26",
      "orderQty": 5
  }'
  ```

12.  localhost:3000/orders/checkout [POST]

  ```bash
  curl --location --request POST 'localhost:3000/orders/checkout' \
  --header 'Authorization: Bearer <token>'
  ```

13.  localhost:3000/orders/list [GET]

  ```bash
  curl --location 'localhost:3000/orders/list' \
  --header 'Authorization: Bearer <token>'
  ```

## MongoDB Collections

1.  users:
    Sample Data:
    
    ```bash
      {
          "_id" : ObjectId("65d9f1c7a217ced69a1f7633"),
          "name" : "Admin",
          "email" : "admin@gmail.com",
          "password" : "$2b$10$yJaH84gQVtn0VCrpO8kuHeSwJJNC.gUtknIeh7xx6hqZGnvsmFx1W",
          "isActive" : true,
          "isDeleted" : false,
          "roles" : [
              "Admin"
          ]
      }
    ```

2.  products:
    Sample Data:

    ```bash
    {
        "_id" : ObjectId("65dab43ac38cd3196c18dd26"),
        "name" : "Colgate Maxfresh with Cooling Crystals Toothpaste  (300 g, Pack of 2)",
        "brand" : "Colgate",
        "make" : "ColgatePalmolive",
        "model" : "Maxfresh with Cooling Crystals",
        "unitQuantity" : NumberInt(1),
        "minOrderQuantity" : NumberInt(4),
        "maxOrderQuantity" : NumberInt(15),
        "usedFor" : [
            "Tooth Hygiene",
            "Tooth Cleaning"
        ],
        "isActive" : true,
        "isDeleted" : false,
        "createdAt" : ISODate("2024-02-25T03:24:51.112+0000"),
        "updatedAt" : ISODate("2024-02-25T03:24:51.112+0000"),
        "inventoryBatch" : "CL-5054-20452",
        "__v" : NumberInt(0),
        "inventories" : [
            {
                "batchNo" : "CL-5054-20452",
                "stockQty" : NumberInt(970),
                "expiry" : "MAR-25",
                "createdAt" : ISODate("2024-02-25T03:24:51.103+0000"),
                "updatedAt" : ISODate("2024-02-25T03:24:51.103+0000"),
                "isDeleted" : false,
                "isActive" : true,
                "priceListing" : NumberInt(78),
                "priceListingDisc" : NumberInt(15),
                "priceListingEffective" : 66.3,
                "_id" : ObjectId("65dab477c38cd3196c18dd29")
            },
            {
                "batchNo" : "CL-5054-20453",
                "stockQty" : NumberInt(2000),
                "expiry" : "MAR-25",
                "createdAt" : ISODate("2024-02-25T03:24:51.103+0000"),
                "updatedAt" : ISODate("2024-02-25T03:24:51.103+0000"),
                "isDeleted" : false,
                "isActive" : true,
                "priceListing" : NumberInt(78),
                "priceListingDisc" : NumberInt(15),
                "priceListingEffective" : 66.3,
                "_id" : ObjectId("65dab477c38cd3196c18dd29")
            }
        ]
    }
    ```

3.  carts:
    Sample Data:

    ```bash
    {
        "_id" : ObjectId("65dae3ac35da3e64fe44e0b8"),
        "userID" : ObjectId("65d9f1c7a217ced69a1f7634"),
        "productID" : ObjectId("65dab43ac38cd3196c18dd26"),
        "inventoryBatch" : "CL-5054-20452",
        "orderQty" : NumberInt(5),
        "orderTotalValue" : NumberInt(390),
        "orderTotalDisc" : 58.5,
        "orderTotalFinalValue" : 331.5,
        "productSnapshot" : [
            {
                "_id" : ObjectId("65dab43ac38cd3196c18dd26"),
                "name" : "Colgate Maxfresh with Cooling Crystals Toothpaste  (300 g, Pack of 2)",
                "brand" : "Colgate",
                "make" : "ColgatePalmolive",
                "model" : "Maxfresh with Cooling Crystals",
                "unitQuantity" : NumberInt(1),
                "minOrderQuantity" : NumberInt(4),
                "maxOrderQuantity" : NumberInt(15),
                "usedFor" : [
                    "Tooth Hygiene",
                    "Tooth Cleaning"
                ],
                "isActive" : true,
                "isDeleted" : false,
                "createdAt" : ISODate("2024-02-25T03:24:51.112+0000"),
                "updatedAt" : ISODate("2024-02-25T03:24:51.112+0000"),
                "inventoryBatch" : "CL-5054-20452",
                "__v" : NumberInt(0),
                "inventories" : [
                    {
                        "batchNo" : "CL-5054-20452",
                        "stockQty" : NumberInt(970),
                        "expiry" : "MAR-25",
                        "createdAt" : ISODate("2024-02-25T03:24:51.103+0000"),
                        "updatedAt" : ISODate("2024-02-25T03:24:51.103+0000"),
                        "isDeleted" : false,
                        "isActive" : true,
                        "priceListing" : NumberInt(78),
                        "priceListingDisc" : NumberInt(15),
                        "priceListingEffective" : 66.3,
                        "_id" : ObjectId("65dab477c38cd3196c18dd29")
                    }
                ]
            }
        ],
        "createdAt" : ISODate("2024-02-25T06:29:21.666+0000"),
        "updatedAt" : ISODate("2024-02-25T06:29:21.666+0000"),
        "__v" : NumberInt(0)
    }
    ```

4.  orders:
    Sample Data:

    ```bash
    {
      "_id" : ObjectId("65dadce1feaadb0a67fa7d20"),
      "userID" : ObjectId("65d9f1c7a217ced69a1f7634"),
      "orderTotalValue" : NumberInt(780),
      "orderTotalDisc" : NumberInt(390),
      "orderTotalFinalValue" : NumberInt(390),
      "cart" : [
          {
              "userID" : ObjectId("65d9f1c7a217ced69a1f7634"),
              "productID" : ObjectId("65dab43ac38cd3196c18dd26"),
              "inventoryBatch" : "CL-5054-20452",
              "orderQty" : NumberInt(5),
              "orderTotalValue" : NumberInt(390),
              "orderTotalDisc" : 331.5,
              "orderTotalFinalValue" : 58.5,
              "productSnapshot" : [
                  {
                      "_id" : ObjectId("65dab43ac38cd3196c18dd26"),
                      "name" : "Colgate Maxfresh with Cooling Crystals Toothpaste  (300 g, Pack of 2)",
                      "brand" : "Colgate",
                      "make" : "ColgatePalmolive",
                      "model" : "Maxfresh with Cooling Crystals",
                      "unitQuantity" : NumberInt(1),
                      "minOrderQuantity" : NumberInt(4),
                      "maxOrderQuantity" : NumberInt(15),
                      "usedFor" : [
                          "Tooth Hygiene",
                          "Tooth Cleaning"
                      ],
                      "isActive" : true,
                      "isDeleted" : false,
                      "createdAt" : ISODate("2024-02-25T03:24:51.112+0000"),
                      "updatedAt" : ISODate("2024-02-25T03:24:51.112+0000"),
                      "inventoryBatch" : "CL-5054-20452",
                      "__v" : NumberInt(0),
                      "inventories" : [
                          {
                              "batchNo" : "CL-5054-20452",
                              "stockQty" : NumberInt(1000),
                              "expiry" : "MAR-25",
                              "createdAt" : ISODate("2024-02-25T03:24:51.103+0000"),
                              "updatedAt" : ISODate("2024-02-25T03:24:51.103+0000"),
                              "isDeleted" : false,
                              "isActive" : true,
                              "priceListing" : NumberInt(78),
                              "priceListingDisc" : NumberInt(15),
                              "priceListingEffective" : 66.3,
                              "_id" : ObjectId("65dab477c38cd3196c18dd29")
                          }
                      ]
                  }
              ],
              "createdAt" : ISODate("2024-02-25T04:48:54.384+0000"),
              "updatedAt" : ISODate("2024-02-25T04:48:54.384+0000"),
              "_id" : ObjectId("65dac6b833e894a2e14393d0")
          },
          {
              "userID" : ObjectId("65d9f1c7a217ced69a1f7634"),
              "productID" : ObjectId("65dab43ac38cd3196c18dd26"),
              "inventoryBatch" : "CL-5054-20452",
              "orderQty" : NumberInt(5),
              "orderTotalValue" : NumberInt(390),
              "orderTotalDisc" : 58.5,
              "orderTotalFinalValue" : 331.5,
              "productSnapshot" : [
                  {
                      "_id" : ObjectId("65dab43ac38cd3196c18dd26"),
                      "name" : "Colgate Maxfresh with Cooling Crystals Toothpaste  (300 g, Pack of 2)",
                      "brand" : "Colgate",
                      "make" : "ColgatePalmolive",
                      "model" : "Maxfresh with Cooling Crystals",
                      "unitQuantity" : NumberInt(1),
                      "minOrderQuantity" : NumberInt(4),
                      "maxOrderQuantity" : NumberInt(15),
                      "usedFor" : [
                          "Tooth Hygiene",
                          "Tooth Cleaning"
                      ],
                      "isActive" : true,
                      "isDeleted" : false,
                      "createdAt" : ISODate("2024-02-25T03:24:51.112+0000"),
                      "updatedAt" : ISODate("2024-02-25T03:24:51.112+0000"),
                      "inventoryBatch" : "CL-5054-20452",
                      "__v" : NumberInt(0),
                      "inventories" : [
                          {
                              "batchNo" : "CL-5054-20452",
                              "stockQty" : NumberInt(1000),
                              "expiry" : "MAR-25",
                              "createdAt" : ISODate("2024-02-25T03:24:51.103+0000"),
                              "updatedAt" : ISODate("2024-02-25T03:24:51.103+0000"),
                              "isDeleted" : false,
                              "isActive" : true,
                              "priceListing" : NumberInt(78),
                              "priceListingDisc" : NumberInt(15),
                              "priceListingEffective" : 66.3,
                              "_id" : ObjectId("65dab477c38cd3196c18dd29")
                          }
                      ]
                  }
              ],
              "createdAt" : ISODate("2024-02-25T04:50:12.731+0000"),
              "updatedAt" : ISODate("2024-02-25T04:50:12.731+0000"),
              "_id" : ObjectId("65dac70a3c3c0eace9d5137e")
          }
      ],
      "createdAt" : ISODate("2024-02-25T06:23:26.620+0000"),
      "updatedAt" : ISODate("2024-02-25T06:23:26.620+0000"),
      "status" : "Placed",
      "__v" : NumberInt(0)
  }
    
  ```