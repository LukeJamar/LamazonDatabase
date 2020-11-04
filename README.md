# Lamazon

## User:
### 1.1) GET /user/:UserId – Gets the user info given the id
curl --location --request GET 'localhost:8080/user/50'

### 1.2) POST/user – Creates a new user
 curl --location --request POST 'localhost:8080/user' --header 'Content-Type: application/json' --data-raw '{"firstName": "Jason","lastName": "Diaz","email": "jd1225@txstate.edu"}'

## Cart:
### 2.1) GET /user/:UserId/cart – Gets the user’s cart (ambiguous here - just return the first cart if user has multiple carts)
curl --location --request GET 'localhost:8080/user/50/cart'

### 2.2) DELETE /user/:UserId/cart – Empties the user’s cart
curl --location --request DELETE 'localhost:8080/user/50/cart'

## Cart Item:
### 3.1) POST/cart/:CartId/cartItem – Add a new item to the cart
curl --location --request POST 'localhost:8080/cart/50/cartItem' --header 'Content-Type: application/json' --data-raw '{"storeItemId":2,"quantity": 10}'

### 3.2) DELETE /cart/:CartId/cartItem/:cartItemId – Remove an item from the cart
curl --location --request DELETE 'localhost:8080/cart/50/cartItem/3'

## Store Item:
### 4.1) GET /StoreItem/:StoreItemID – Get the store item’s details
curl --location --request GET 'localhost:8080/StoreItem/1'

### 4.2) GET /StoreItem?query=abc – Get all items that satisfy the regular expression query
curl --location --request GET 'localhost:8080/StoreItem?query=tou'
