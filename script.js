document.addEventListener("DOMContentLoaded", () => {
  const dogContainer = document.getElementById("dog-container");

  fetch("Dog.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        console.error("Fetched data is not an array:", data);
        dogContainer.innerHTML =
          "<p>Error: Data is not in the expected format.</p>";
        return;
      }
      data.forEach((dog) => {
        const card = document.createElement("div");
        card.classList.add("dog-card");

        let colors = Array.isArray(dog.color)
          ? dog.color.join(", ")
          : dog.color;
        let temperament = Array.isArray(dog.temperament)
          ? dog.temperament.join(", ")
          : "N/A";
        let knownAllergies = Array.isArray(dog.known_allergies)
          ? dog.known_allergies.join(", ")
          : "N/A";
        let behavioralNotes = Array.isArray(dog.behavioral_notes)
          ? `<ul>${dog.behavioral_notes
              .map((note) => `<li>${note}</li>`)
              .join("")}</ul>`
          : "<p>N/A</p>";

        let vaccinationInfo = "N/A";
        if (dog.vaccination_records && dog.vaccination_records.length > 0) {
          vaccinationInfo = "<ul>";
          dog.vaccination_records.forEach((vaccine) => {
            vaccinationInfo += `<li>${vaccine.vaccine_name} (Administered: ${
              vaccine.date_administered
            }, Next Due: ${vaccine.next_due_date || "N/A"})</li>`;
          });
          vaccinationInfo += "</ul>";
        }

        card.innerHTML = `
          <img src="${dog.image_url}" alt="Image of ${dog.breed}">
          <div class="dog-info">
            <h1>${dog.breed}</h1>

            <p><strong class="label">Size:</strong> ${dog.size}</p>
           
            <p><strong class="label">Color(s):</strong> ${colors}</p>
            <p><strong class="label">Description:</strong> ${
              dog.description || "N/A"
            }</p>
            <p><strong class="label">Temperament:</strong> ${temperament}</p>
            <p><strong class="label">Allergies:</strong> ${knownAllergies}</p>
            <div><strong class="label">Behavioral Notes:</strong> ${behavioralNotes}</div>
          </div>
        `;
        dogContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching or parsing Dog.json:", error);
      dogContainer.innerHTML = `<p>Could not load dog data. Error: ${error.message}</p>`;
    });
});
