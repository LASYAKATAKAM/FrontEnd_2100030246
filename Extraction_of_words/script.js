document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("fileInput");
    const paragraph = document.getElementById("paragraph");

    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const content = event.target.result;
            const words = content.split(/\s+/);

            paragraph.innerHTML = ""; 

            words.forEach(function(word) {
                if (word.length > 8) {
                    const span = document.createElement("span");
                    span.textContent = word + " ";
                    span.classList.add("highlight");
                    paragraph.appendChild(span);
                } else {
                    paragraph.appendChild(document.createTextNode(word + " "));
                }
            });
        };

        reader.readAsText(file);
    });
});
