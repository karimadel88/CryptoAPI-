# CryptoAPI-
The CryptoAPI project will support multiple encryption and decryption algorithms

Usage
To use this API, you can make requests to the following endpoints:

/v1/api/api-docs: Swagger documentation for the API.
/v1/api/rsa: Endpoint for RSA encryption and decryption.
/v1/api/aes: Endpoint for AES encryption and decryption.
/v1/api/sha: Endpoint for SHA hashing.
/v1/api/save: Endpoint to save data into a file with a timestamp.
To make a POST request to the /v1/api/save endpoint, you can include a JSON object with the data you want to save in the request body. You can also include a query parameter name with the value "p" or "pp" to specify whether you want to save the data in a public file or a public and private file, respectively.
