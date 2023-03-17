function savePublicKeyAndPrivateKey() {
  // Get plaintext and public key inputs
  const privateKey = document.getElementById("private-key").value.trim();
  const publicKey = document.getElementById("public-key").value.trim();

  // Validate inputs

  // Create request body
  const body = JSON.stringify({ publicKey, privateKey });

  // Send POST request to API endpoint
  fetch("http://localhost:3000/v1/api/save?name=v", {
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
      alert("Done");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while Saving");
    });
}

function savePublicKey() {
  // Get plaintext and public key inputs
  const publicKey = document.getElementById("public-key").value.trim();

  // Validate inputs

  // Create request body
  const body = JSON.stringify({ publicKey });

  // Send POST request to API endpoint
  fetch("http://localhost:3000/v1/api/save?name=p", {
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
      alert("Done");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while Saving");
    });
}
