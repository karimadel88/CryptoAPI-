function reset() {
  plaintext.value = "";
  ciphertext.value = "";
  document.getElementById("public-key").value = "";
  document.getElementById("private-key").value = "";
}

async function generate() {
  const public_key = document.getElementById("public-key");
  const private_key = document.getElementById("private-key");

  try {
    const response = await fetch(
      "http://localhost:3000/v1/api/rsa/public_private_key",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    public_key.value = data.publicKey;
    private_key.value = data.privateKey;
  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred while genereting the public key");
  }
}

function encryptPlainText() {
  // Get plaintext and public key inputs
  const plaintext = document.getElementById("plaintext").value.trim();
  const ciphertext = document.getElementById("ciphertext");
  const publicKey = document.getElementById("public-key").value.trim();

  // Validate inputs
  console.log(publicKey);
  if (!plaintext || !publicKey) {
    alert("Please enter a plaintext and a key");
    return;
  }

  // Create request body
  const body = JSON.stringify({ plaintext: plaintext, publicKey: publicKey });

  // Send POST request to API endpoint
  fetch("http://localhost:3000/v1/api/rsa/encrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      ciphertext.value = data.CipherText;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while encrypting the plaintext");
    });
}

async function decryptCipherText() {
  // Get plaintext and public key inputs
  const plaintext = document.getElementById("plaintext");
  const ciphertext = document.getElementById("ciphertext").value.trim();
  const key = document.getElementById("private-key").value.trim();

  // Validate inputs
  if (!ciphertext || !key) {
    alert("Please enter a ciphertext and a key");
    return;
  }

  // Create request body
  const body = JSON.stringify({ cipherText: ciphertext, privateKey: key });

  try {
    // Send POST request to API endpoint
    const response = await fetch("http://localhost:3000/v1/api/rsa/decrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    plaintext.value = data.plaintext;
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while decrypting the ciphertext");
  }
}
