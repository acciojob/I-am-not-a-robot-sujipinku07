 document.addEventListener("DOMContentLoaded", () => {
        const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
        let selectedImages = [];
        let repeatedImageIndex = Math.floor(
          Math.random() * imageClasses.length
        );
        let images = [...imageClasses];

        // Repeat one random image
        images.push(imageClasses[repeatedImageIndex]);

        // Shuffle the array of images
        images = images.sort(() => Math.random() - 0.5);

        const main = document.querySelector("main");

        // Create the h3 tag with the prompt
        const h3 = document.createElement("h3");
        h3.id = "h";
        h3.innerText =
          "Please click on the identical tiles to verify that you are not a robot.";
        main.appendChild(h3);

        // Create the flex container for the images
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("flex");
        main.appendChild(imageContainer);

        // Create and append images
        images.forEach((imgClass, index) => {
          const img = document.createElement("img");
          img.classList.add(imgClass);
          img.dataset.index = index;
          img.addEventListener("click", onImageClick);
          imageContainer.appendChild(img);
        });

        // Create reset button (hidden initially)
        const resetButton = document.createElement("button");
        resetButton.id = "reset";
        resetButton.innerText = "Reset";
        resetButton.style.display = "none";
        resetButton.addEventListener("click", reset);
        main.appendChild(resetButton);

        // Create verify button (hidden initially)
        const verifyButton = document.createElement("button");
        verifyButton.id = "verify";
        verifyButton.innerText = "Verify";
        verifyButton.style.display = "none";
        verifyButton.addEventListener("click", verifyImages);
        main.appendChild(verifyButton);

        // Create paragraph for result (hidden initially)
        const resultPara = document.createElement("p");
        resultPara.id = "para";
        main.appendChild(resultPara);

        // Function to handle image click
        function onImageClick(event) {
          const clickedImg = event.target;

          // Check if already selected
          if (clickedImg.classList.contains("selected")) return;

          // Add selected class and store selected image
          clickedImg.classList.add("selected");
          selectedImages.push(clickedImg);

          // Show reset button after one click
          if (selectedImages.length === 1) {
            resetButton.style.display = "block";
          }

          // Show verify button after two images selected
          if (selectedImages.length === 2) {
            verifyButton.style.display = "block";
          }

          // Limit selection to two images
          if (selectedImages.length > 2) {
            selectedImages = selectedImages.slice(1);
            document
              .querySelectorAll("img")
              .forEach((img) => img.classList.remove("selected"));
            selectedImages.forEach((img) => img.classList.add("selected"));
          }
        }

        // Function to reset the state
        function reset() {
          selectedImages = [];
          document
            .querySelectorAll("img")
            .forEach((img) => img.classList.remove("selected"));
          resetButton.style.display = "none";
          verifyButton.style.display = "none";
          resultPara.innerText = "";
        }

        // Function to verify selected images
        function verifyImages() {
          if (selectedImages.length === 2) {
            const [firstImage, secondImage] = selectedImages;
            if (firstImage.className === secondImage.className) {
              resultPara.innerText = "You are a human. Congratulations!";
            } else {
              resultPara.innerText =
                "We can't verify you as a human. You selected the non-identical tiles.";
            }
            verifyButton.style.display = "none";
          }
        }
      });//your code here
