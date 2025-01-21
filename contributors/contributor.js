const REPO_OWNER = "Ojas-Arora";
const REPO_NAME = "SCD-Profile-Score";
const GITHUB_TOKEN = ""; // Optional: Add your GitHub personal access token to avoid rate limits

async function fetchContributors() {
  const contributorsContainer = document.getElementById("contributors");
  const canvas = document.createElement("canvas"); // Create a hidden canvas for certificate generation
  const ctx = canvas.getContext("2d");

  try {
    // Fetch contributors from the GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`,
      {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
      }
    );

    if (!response.ok) throw new Error("Failed to fetch contributors");
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to fetch contributors: ${errorDetails}`);
    }

    const contributors = await response.json();

    contributors.forEach((contributor) => {
      // Create a card for each contributor
      const card = document.createElement("div");
      card.className = "contributor-card";

      // Profile image
      const img = document.createElement("img");
      img.src = contributor.avatar_url;
      img.alt = contributor.login;

      // GitHub username
      const name = document.createElement("h3");
      name.textContent = contributor.login;

      // GitHub profile link
      const githubLink = document.createElement("a");
      githubLink.href = contributor.html_url;
      githubLink.target = "_blank";
      githubLink.textContent = "GitHub Profile";

      // Generate Certificate Button
      const button = document.createElement("button");
      button.textContent = "Certificate";
      button.addEventListener("click", () => {
        generateCertificate(contributor.login, contributor.avatar_url);
      });

      // Append elements to card
      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(githubLink);
      card.appendChild(button);

      // Append card to container
      contributorsContainer.appendChild(card);
    });
    
    // Function to generate a certificate
    function generateCertificate(username, avatarUrl) {
      // Set canvas size
      canvas.width = 1600;
      canvas.height = 1000;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#f7e8a1");
      gradient.addColorStop(1, "#f2c94c");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decorative border
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 20;
      ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

      // Certificate title
      ctx.fillStyle = "#5a4637";
      ctx.font = "bold 80px Georgia";
      ctx.textAlign = "center";
      ctx.fillText("Certificate of Contribution", canvas.width / 2, 150);

      // Decorative underline
      ctx.strokeStyle = "#5a4637";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 400, 180);
      ctx.lineTo(canvas.width / 2 + 400, 180);
      ctx.stroke();

      // Add user's GitHub image
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = avatarUrl;
      image.onload = () => {
        const imageSize = 200;
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 300, imageSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(
          image,
          canvas.width / 2 - imageSize / 2,
          200,
          imageSize,
          imageSize
        );
        ctx.restore();

        // GitHub username under the image
        ctx.font = "bold 50px Arial";
        ctx.fillStyle = "#5a4637";
        ctx.fillText(username, canvas.width / 2, 500);

        // Certificate content
        ctx.font = "35px Arial";
        const content = `This certificate is proudly presented to ${username} for their valuable 
        contribution to SCD-PROFILE-SCORE (AJIVIKA) in Social Winter of Code (SWoC) 
        from January 1, 2025 to March 1, 2025.`;
        const contentLines = content.split("\n");
        contentLines.forEach((line, index) => {
          ctx.fillText(line.trim(), canvas.width / 2, 600 + index * 40);
        });

        // Signature with decorative underline
        ctx.font = "italic 30px Georgia";
        ctx.fillText("Ojas Arora", canvas.width / 1.5, 850);
        ctx.strokeStyle = "#5a4637";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 1.5 - 150, 860);
        ctx.lineTo(canvas.width / 1.5 + 150, 860);
        ctx.stroke();

        // Generated date
        const date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
        ctx.font = "25px Arial";
        ctx.fillText(`Generated on: ${date}`, canvas.width / 5, 900);

        // Open the certificate in a new tab and display the certificate image
        const certWindow = window.open("", "_blank");
        certWindow.document.write(`
          <html>
            <head>
              <title>Certificate of Contribution</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  text-align: center;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
                h1 {
                  color: #5a4637;
                }
                img {
                  border: 10px solid #d4af37;
                  border-radius: 12px;
                  margin-top: 20px;
                  max-width: 100%;
                  height: auto;
                }
                .download-btn {
                  margin-top: 30px;
                  padding: 15px 30px;
                  background-color: #f2c94c;
                  color: white;
                  font-size: 18px;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                }
                .download-btn:hover {
                  background-color: #d4af37;
                }
              </style>
            </head>
            <body>
              <h1>Certificate of Contribution</h1>
              <img src="${canvas.toDataURL('image/png')}" alt="Certificate" />
              <br />
              <button class="download-btn" onclick="downloadCertificate()">Download Certificate</button>
              <script>
                function downloadCertificate() {
                  const link = document.createElement('a');
                  link.download = '${username}_certificate.png';
                  link.href = "${canvas.toDataURL('image/png')}";
                  link.click();
                }
              </script>
            </body>
          </html>
        `);
      };
    }
  } catch (error) {
    console.error("Error fetching contributors:", error);

    // Show error message on the page
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Failed to load contributors. Please try again.";
    contributorsContainer.appendChild(errorMessage);
    contributorsContainer.innerHTML = "<p style='color: red; font-weight:bold;'>Failed to load contributors. Please check your internet connection or try again later.</p>";
  }
}

// Fetch and render contributors on page load
fetchContributors();