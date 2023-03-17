function hasshedFun() {
  // Get plaintext and public key inputs
  const plaintext = document.getElementById("plaintext").value.trim();
  const hashed = document.getElementById("ciphertext");

  // Validate inputs
  if (!plaintext) {
    alert("Please enter a Text");
    return;
  }

  // Create request body
  const body = JSON.stringify({ text: plaintext });

  // Send POST request to API endpoint
  fetch("http://localhost:3000/v1/api/sha/hash", {
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
      hashed.value = data.HashText;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while Hashing the text");
    });
}

function reset() {
  plaintext.value = "";
  ciphertext.value = "";
}

function compareFun() {
  // Get plaintext and public key inputs
  const plaintext = document.getElementById("plaintext").value.trim();
  const hashed = document.getElementById("ciphertext").value.trim();

  // Validate inputs
  if (!plaintext || !hashed) {
    alert("Hashed not equal text");
    return;
  }

  // Create request body
  const body = JSON.stringify({ originalText: plaintext, hashText: hashed });

  // Send POST request to API endpoint
  fetch("http://localhost:3000/v1/api/sha/hashcompare", {
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
      if (data.IsHashed === "True") alert("Hashed equal text");
      else alert("Hashed not equal text");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while Hashing the text");
    });
}
