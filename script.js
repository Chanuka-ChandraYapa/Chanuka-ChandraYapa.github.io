let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (lastScrollY < window.scrollY) {
    navbar.classList.add("hidden");
  } else {
    navbar.classList.remove("hidden");
  }

  lastScrollY = window.scrollY;
});

let ballClickCount = 0;

document.addEventListener("DOMContentLoaded", function () {
  const ball = document.querySelector(".ball");
  const shadow = document.querySelector(".shadow");
  const container = document.querySelector(".container");

  let velocity = 0;
  let position = container.clientHeight - ball.clientHeight / 2 - 35;
  const gravity = 0.5;
  const energyLoss = 0.8;
  const groundPosition = container.clientHeight - ball.clientHeight / 2 - 35;
  let animating = false;

  ball.addEventListener("click", function () {
    if (!animating) {
      velocity = -15;
      animating = true;
      ball.style.cursor = "default";
      requestAnimationFrame(animate);
    }
  });

  function animate() {
    velocity += gravity;
    position += velocity;

    if (position > groundPosition) {
      position = groundPosition;

      velocity = -velocity * energyLoss;

      squeezeBall(velocity);
    }

    ball.style.top = position + "px";

    const distanceFromGround = groundPosition - position;
    const shadowScale = Math.max(0.5, 1 - distanceFromGround / 200);
    const shadowOpacity = Math.max(0.1, 0.3 - distanceFromGround / 1000);
    shadow.style.transform = `translateX(175px) scale(${shadowScale}, 1)`;
    shadow.style.opacity = shadowOpacity;

    if (Math.abs(velocity) < 0.5 && Math.abs(position - groundPosition) < 1) {
      ball.style.transform = "scale(1, 1)";
      squeezeFactor = 1.0;
      ball.style.cursor = "pointer";
      ballClickCount++;
      animating = false;
      return;
    }

    requestAnimationFrame(animate);
  }

  let squeezeFactor = 1.0;

  function squeezeBall() {
    ball.style.transform = `scale(${1 + 0.2 * squeezeFactor}, ${
      1 - 0.2 * squeezeFactor
    })`;
    squeezeFactor *= 0.7;
    setTimeout(() => {
      ball.style.transform = "scale(1, 1)";
    }, 100);
  }
});

const navLinks = document.querySelectorAll(".navbar a");
const navTitle = document.querySelector(".navbar h2");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.textContent.toLowerCase();
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
      updateNavTitle(this.textContent);
    }
  });
});

function updateNavTitle(newTitle) {
  navTitle.classList.add("flip-animation");

  setTimeout(() => {
    navTitle.textContent = newTitle;
  }, 150);

  setTimeout(() => {
    navTitle.classList.remove("flip-animation");
  }, 300);
}

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navbarLinks = document.querySelector(".navbar-links");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navbarLinks.classList.toggle("active");
  });

  navbarLinks.addEventListener("click", function () {
    hamburger.classList.remove("active");
    navbarLinks.classList.remove("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".navbar")) {
      hamburger.classList.remove("active");
      navbarLinks.classList.remove("active");
    }
  });

  // Keep existing functionality
  let prevScrollPos = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
      document.querySelector(".navbar").classList.remove("hidden");
    } else {
      document.querySelector(".navbar").classList.add("hidden");
    }
    prevScrollPos = currentScrollPos;
  };

  // Flip animation on hover
  const navbarHeader = document.querySelector(".navbar h2");
  navbarHeader.addEventListener("mouseenter", function () {
    this.classList.add("flip-animation");
    setTimeout(() => {
      this.classList.remove("flip-animation");
    }, 300);
  });
});

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      if (
        navTitle.textContent !==
        section.id.charAt(0).toUpperCase() + section.id.slice(1)
      ) {
        updateNavTitle(
          section.id.charAt(0).toUpperCase() + section.id.slice(1)
        );
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".image-container");
  const backdrop = document.querySelector(".hover-backdrop");

  if (container && backdrop && window.innerWidth > 768) {
    container.addEventListener("mousemove", function (e) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element

      // Calculate skew based on mouse position
      // -15 to 15 degrees range
      const skewX = ((y / rect.height) * 10 - 5).toFixed(1);
      const skewY = ((x / rect.width) * 10 - 5).toFixed(1);

      // Apply the transformation
      backdrop.style.transform = `translate(-50%, -50%) skew(${skewX}deg, ${skewY}deg)`;
    });

    // Reset transform when mouse leaves
    container.addEventListener("mouseleave", function () {
      backdrop.style.transform = "translate(-50%, -50%)";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const heading = document.querySelector(".typing-animation");
  const text = "Hi, I'm Chanuka Lakshan.";

  // Clear any existing content
  heading.innerHTML = "";

  // Create spans for each character
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.textContent = text[i];
    heading.appendChild(span);
  }

  // Get all spans
  const spans = heading.querySelectorAll("span");

  // Animate each span with staggered delays
  spans.forEach((span, index) => {
    // Set a delay based on the index
    const delay = index * 0.07; // 70ms between each character
    span.style.animationDelay = `${delay}s`;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const leftRoles = [
    "Blogger",
    "Backend Engineer",
    "Creator",
    "Full Stack Developer",
  ];
  const rightRoles = [
    "Software Developer",
    "Writer",
    "Frontend Engineer",
    "UI/UX Enthusiast",
  ];

  const roleLeftElement = document.getElementById("roleLeft");
  const roleRightElement = document.getElementById("roleRight");

  let leftIndex = 0;
  let rightIndex = 0;

  // Change roles alternately (first left, then right)
  function changeRoles() {
    // Change left role
    setTimeout(() => {
      flipRole(roleLeftElement, leftRoles, leftIndex);
      leftIndex = (leftIndex + 1) % leftRoles.length;
    }, 0);

    // Change right role after a delay
    setTimeout(() => {
      flipRole(roleRightElement, rightRoles, rightIndex);
      rightIndex = (rightIndex + 1) % rightRoles.length;
    }, 4000);
  }

  // Flip animation for role change
  function flipRole(element, roles, currentIndex) {
    // Flip out current role
    element.classList.add("flip-out");

    // Wait for flip out animation to complete
    setTimeout(() => {
      // Update text
      element.textContent = roles[(currentIndex + 1) % roles.length];

      // Remove flip out class and add flip in
      element.classList.remove("flip-out");
      element.classList.add("flip-in");

      // Clean up after animation completes
      setTimeout(() => {
        element.classList.remove("flip-in");
      }, 600);
    }, 600);
  }

  // Start the cycle
  changeRoles();

  // Set interval to continue changing roles
  setInterval(changeRoles, 8000);
});

// Function to close the modal
function closeConstructModal() {
  document.getElementById("constructionModal").style.display = "none";
}

setTimeout(function () {
  document.getElementById("constructionModal").style.display = "flex";
}, 5000);

// Create animated construction GIF programmatically
const canvas = document.createElement("canvas");
canvas.width = 200;
canvas.height = 150;
const ctx = canvas.getContext("2d");

// Simple construction animation
let frame = 0;
function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = "#ffdd00";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Construction barrier stripes
  const stripeHeight = 20;
  const numStripes = Math.ceil(canvas.height / (stripeHeight * 2));

  for (let i = 0; i < numStripes; i++) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(
      0,
      i * stripeHeight * 2 + Math.sin(frame / 10 + i) * 5,
      canvas.width,
      stripeHeight
    );
  }

  // Construction icon
  ctx.fillStyle = "#ff4400";
  ctx.beginPath();
  ctx.arc(100, 75 + Math.sin(frame / 5) * 3, 30, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "bold 30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("⚠️", 100, 75);

  frame++;

  // Update image source with new frame
  const gif = document.querySelector(".construction-gif");
  gif.src = canvas.toDataURL();

  setTimeout(drawFrame, 50);
}

// Start animation when page loads
window.onload = drawFrame;

function downloadCV() {
  // Create a temporary anchor element
  const link = document.createElement("a");

  // Set the path to your CV file in the assets folder
  // Update 'CV.pdf' to match your actual CV filename
  link.href = "images/Chanuka_Chandra_Yapa_CV.pdf";

  // Set the download attribute with desired filename
  link.download = "Chanuka_Chandra_Yapa_CV.pdf";

  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const projectsData = [
  {
    id: 1,
    title: "Throttle Policy Reset Support for WSO2 API Manager",
    description:
      "Application Owners can reset their application throttle policies for a specific user upon their request and enable further API invocations without waiting for the throttling time period to expire.",
    image: "/images/m-apimanager.png",
    demoUrl:
      "https://medium.com/@chanukachandrayapa/introducing-application-throttle-policy-reset-support-for-wso2-api-manager-75385dce18b2",
    githubUrl: "https://github.com/wso2/api-manager/issues/2455",
  },
  {
    id: 2,
    title: "Mental Bloom",
    description:
      "Comprehensive digital mental health assistance platform designed to provide accessible, personalized, and secure mental health support to users, specifically tailored to the Sri Lankan context. By leveraging a microservices architecture, the platform delivers features like mood tracking, educational resources, support forums, therapist access, and crisis intervention tools.",
    image: "/images/m-bloom.png",
    demoUrl: "https://mental-health-rq0b.onrender.com/",
    githubUrl: "https://github.com/Chanuka-ChandraYapa/mental-health",
  },
  {
    id: 3,
    title: "Advizor",
    description:
      "The Newspaper Advertisement Analyzer is a powerful tool designed to simplify the process of extracting valuable information from newspaper advertisements. It uses state-of-the-art technologies including Optical Character Recognition (OCR), Natural Language Processing (NLP), and data visualization to transform unstructured newspaper ads into structured data for analysis and insights.",
    image: "/images/m-newspaper.png",
    demoUrl: "https://www.youtube.com/watch?v=yQBUdrFqWPE&t=1s",
    githubUrl: "https://github.com/Newspaper-Advertisement-Analyzer/client",
  },
  {
    id: 4,
    title: "B Airways",
    description:
      "This is a detailed description of Project 4. You can include information about the technologies used, challenges faced, and solutions implemented. This text will appear in the modal when someone clicks on the project tile.",
    image: "/images/m-airways.png",
    demoUrl: "https://www.pixelthoughts.co",
    githubUrl:
      "https://github.com/Chanuka-ChandraYapa/AirLine_Reservation_System_Project",
  },
  {
    id: 5,
    title: "IntelliNotes",
    description:
      "IntelliNotes is a Flutter-based notes application that integrates AI assistance to help users manage their notes efficiently. The app allows users to write, view, and store notes, and it also leverages AI-powered responses to summarize, analyze, and offer insightful suggestions based on the content of the notes. By interacting with an AI model (such as Hugging Face's Mistral-7B), IntelliNotes makes your note-taking experience more engaging and productive by providing personalized assistance based on the notes you've written.",
    image: "/images/m-cover.png",
    demoUrl:
      "https://github.com/Chanuka-ChandraYapa/IntelliNotes/releases/tag/v1.0.0-alpha",
    githubUrl: "https://github.com/Chanuka-ChandraYapa/IntelliNotes",
  },
  {
    id: 6,
    title: "BuyGenix",
    description:
      "BuyGenix is a groundbreaking platform designed to redefine the e-commerce experience with the power of AI. By introducing the concept of machine customers, this project aims to enable automated AI agents to shop on behalf of users. These intelligent agents autonomously evaluate products, compare deals, and make data-driven purchasing decisions, mimicking human shopping behavior efficiently and intelligently.",
    image: "/images/m-ai.png",
    demoUrl: "https://www.pixelthoughts.co",
    githubUrl: "https://github.com/Chanuka-ChandraYapa/Machine_Customer",
  },
  {
    id: 7,
    title: "SpaceXplore",
    description:
      "A futuristic Ticket booking system for intergalactic space travel. This project aims to provide a seamless experience for users to book tickets for space travel, explore different planets, and learn about the universe. By leveraging cutting-edge technologies and a user-friendly interface, SpaceXplore offers a unique and engaging experience for space enthusiasts and travelers.",
    image: "/images/space.png",
    demoUrl: "https://youtu.be/ugA05Q1QZcQ?si=2LxR0h1uuneV7Zx7",
    githubUrl: "https://github.com/Chanuka-ChandraYapa/Kode-Blitz_SpaceXplore",
  },
  {
    id: 8,
    title: "MediBox",
    description:
      "Micro-Controller based project which serves patients to get medicine at relevant time and store them safely. Micro Controller used was ESP32. Main functionalities were setting alarms, storing medicine, monitoring Light Intensity, Humidity, and temperature, and controlling it over Wi-Fi",
    image: "/images/medibox.png",
    demoUrl: "https://wokwi.com/projects/359326661538125825",
    githubUrl: "https://github.com/Chanuka-ChandraYapa/Medi-Box",
  },
];

const modalOverlay = document.getElementById("projectModal");
const modalClose = document.querySelector(".modal-close");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalImage = document.querySelector(".modal-image");
const demoLink = document.getElementById("demoLink");
const githubLink = document.getElementById("githubLink");

document.querySelectorAll(".project-tile").forEach((tile, index) => {
  tile.addEventListener("click", function (e) {
    e.preventDefault();
    openProjectModal(index);
  });
});

function openProjectModal(index) {
  const project = projectsData[index];

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalImage.style.backgroundImage = `url('${project.image}')`;
  demoLink.href = project.demoUrl;
  githubLink.href = project.githubUrl;

  modalOverlay.classList.add("active");

  document.body.style.overflow = "hidden";
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

function closeModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeModal();
  }
});

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const modal = document.getElementById("modal2");
const openModalButton = document.getElementById("openModal2");
const closeModalButton = document.getElementById("closeModal2");

let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function checkDraw() {
  return [...cells].every((cell) => {
    return cell.textContent === "X" || cell.textContent === "O";
  });
}

function computerMove() {
  if (!gameActive) return;

  let availableCells = [...cells].filter((cell) => cell.textContent === "");
  if (availableCells.length > 0) {
    const randomCell =
      availableCells[Math.floor(Math.random() * availableCells.length)];
    randomCell.textContent = "O";
    randomCell.classList.add("O");

    if (checkWin()) {
      alert("O wins!");
      gameActive = false;
    } else if (checkDraw()) {
      alert("Draw!");
      gameActive = false;
    } else {
      currentPlayer = "X";
    }
  }
}

function handleCellClick(event) {
  if (!gameActive) return;

  const cell = event.target;
  if (cell.textContent === "") {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin()) {
      alert(`${currentPlayer} wins!`);
      gameActive = false;
    } else if (checkDraw()) {
      alert("Draw!");
      gameActive = false;
    } else {
      currentPlayer = "O";
      setTimeout(computerMove, 500);
    }
  }
}

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  currentPlayer = "X";
  gameActive = true;
}

const ball = document.querySelector(".ball");
const bubble = document.querySelector(".bubble");

function showBubble() {
  bubble.style.display = "block";
  bubble.style.opacity = "1";
  bubble.style.transform = "translateY(0)";
}

function hideBubble() {
  bubble.style.opacity = "0";
  bubble.style.transform = "translateY(20px)";
  setTimeout(() => {
    bubble.style.display = "none";
  }, 300);
}
function changeColors() {
  document.documentElement.style.setProperty("--primary", "#3cb371");
  document.documentElement.style.setProperty("--secondary", "#a5d6a7");
  document.documentElement.style.setProperty("--background", "#e0f7fa");
  // document.documentElement.style.setProperty('--text-color', '#2c3e50');
}

const moviemodal = document.getElementById("themeModal");

ball.addEventListener("click", function () {
  //   ballClickCount++;
  console.log(ballClickCount);
  if (ballClickCount == 3) {
    showBubble();
  }
  if (ballClickCount == 4) {
    hideBubble();
  }
  if (ballClickCount == 5) {
    // changeColors();
    moviemodal.style.display = "block";
  }
  if (ballClickCount > 10) {
    modal.classList.add("active");
    resetGame();
    ballClickCount = 0;
  }
});

openModalButton.addEventListener("click", () => {
  modal.classList.add("active");
  resetGame();
});

closeModalButton.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("mousemove", function (e) {
    document.querySelectorAll(".card").forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", x + "px");
      card.style.setProperty("--mouse-y", y + "px");
    });
  });
});

// Function to format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to estimate reading time (rough estimate)
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes + " min read";
}

// Function to create article cards
function createArticleCard(article) {
  const card = document.createElement("div");
  card.className = "card";

  // Create image placeholder or use article image if available
  const imageUrl = article.thumbnail || `/api/placeholder/600/400`;

  card.innerHTML = `
        <img src="${imageUrl}" alt="${article.title}" class="card-img">
        <div class="card-content">
            <h2 class="card-title">${article.title}</h2>
            <p class="card-excerpt">${
              article.excerpt || "No excerpt available"
            }</p>
            <div class="card-meta">
                <span class="card-date">${formatDate(article.pubDate)}</span>
                <span class="card-reading-time">${calculateReadingTime(
                  article.description || article.excerpt || article.title
                )}</span>
            </div>
        </div>
        <a href="${
          article.link
        }" target="_blank" class="card-link">Read More</a>
    `;

  return card;
}

// Function to fetch Medium articles using RSS to JSON converter
async function fetchMediumArticles(username = "@medium") {
  const container = document.getElementById("articlesContainer");
  container.innerHTML = '<div class="loading">Loading articles...</div>';

  try {
    // Use RSS to JSON API to fetch Medium feed
    // Replace 'yourusername' with your actual Medium username
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${username}`
    );
    const data = await response.json();

    if (data.status === "ok") {
      container.innerHTML = "";

      data.items.forEach((article) => {
        // Extract thumbnail image from content if available
        const imgRegex = /<img[^>]+src="([^">]+)"/;
        const match = article.content.match(imgRegex);
        if (match) {
          article.thumbnail = match[1];
        }

        // Extract excerpt
        const div = document.createElement("div");
        div.innerHTML = article.content;
        const text = div.textContent || div.innerText || "";
        article.excerpt = text.substring(0, 150) + "...";

        const card = createArticleCard(article);
        container.appendChild(card);
      });
    } else {
      throw new Error("Could not fetch articles");
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    container.innerHTML = `<div class="error">Error loading articles. Please try again later.</div>`;
  }
}

// Function to handle mouse movement for skew effect
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("mousemove", function (e) {
    document.querySelectorAll(".card").forEach((card) => {
      const rect = card.getBoundingClientRect();

      // Calculate mouse position relative to the card center
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      // Calculate the distance from center (normalize to -1 to 1)
      const rotateY = -((e.clientX - cardCenterX) / (rect.width / 2)) * 10; // Max 10 degrees
      const rotateX = ((e.clientY - cardCenterY) / (rect.height / 2)) * 10; // Max 10 degrees

      // Only apply effect when hovering over the card
      if (
        e.clientX > rect.left &&
        e.clientX < rect.right &&
        e.clientY > rect.top &&
        e.clientY < rect.bottom
      ) {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      } else {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
      }
    });
  });

  // Reset card position when mouse leaves
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mouseleave", function () {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });
  });
});

// Call function when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Replace '@medium' with your Medium username (e.g., '@yourusername')
  fetchMediumArticles("@chanukachandrayapa");

  // You can also provide a custom username through the UI if needed
  // For example, adding a form to let users enter their Medium username
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the span containing the cat image
  const catSpan = document.querySelector(".blog-head span");
  const blogHead = document.querySelector(".blog-head");
  const originalText = blogHead.childNodes[0].textContent; // Store the original "Blogs" text

  // Add click event to the cat image span
  catSpan.addEventListener("click", function () {
    // Check if input is already present
    if (!document.querySelector("#nameInput")) {
      // Create an input element

      const input = document.createElement("input");
      input.type = "text";
      input.id = "nameInput";
      input.placeholder = "Your medium username";
      input.style.marginRight = "10px";
      input.style.padding = "5px";
      input.style.borderRadius = "4px";
      input.style.border = "1px solid #ccc";
      input.style.fontSize = "16px";

      // Insert the input before the text
      blogHead.insertBefore(input, blogHead.firstChild);

      // Focus on the input field
      input.focus();

      // Add event listener for the Enter key
      input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          const userName = input.value.trim();
          if (userName) {
            // Update the heading text
            blogHead.firstChild.textContent = "";
            // blogHead.insertBefore(document.createTextNode(userName + "'s Blogs"), catSpan);

            // Remove the input field
            input.remove();

            // Fetch that user's Medium articles (if applicable)
            fetchMediumArticles(
              "@" + userName.toLowerCase().replace(/\s+/g, "")
            );
          } else {
            // If empty input, revert to original
            input.remove();
            blogHead.insertBefore(
              document.createTextNode(originalText),
              catSpan
            );
          }
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Modal elements
  const moviemodal = document.getElementById("themeModal");
  const openBtn = document.getElementById("openThemeModal");
  const closeBtn = document.querySelector(".movie-close");
  const movieInput = document.getElementById("movieInput");
  const searchBtn = document.getElementById("movie-searchBtn");
  const loading = document.getElementById("movie-loading");
  const error = document.getElementById("movie-error");

  // API Key for OMDb
  const apiKey = "16532318";

  // Open modal when button is clicked
  openBtn.addEventListener("click", () => {
    moviemodal.style.display = "block";
  });

  // Close modal when X is clicked
  closeBtn.addEventListener("click", () => {
    moviemodal.style.display = "none";
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", (e) => {
    if (e.target === moviemodal) {
      moviemodal.style.display = "none";
    }
  });

  // Handle movie search
  searchBtn.addEventListener("click", searchMovie);
  movieInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      searchMovie();
    }
  });

  function searchMovie() {
    const title = movieInput.value.trim();
    if (!title) return;

    // Reset UI
    error.style.display = "none";
    loading.style.display = "block";

    // Fetch movie data from OMDb API
    fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "False") {
          showError(data.Error || "Movie not found");
          return;
        }

        if (data.Poster === "N/A") {
          showError("No poster available for this movie");
          return;
        }

        // Create image element to load the poster
        const posterImg = new Image();
        posterImg.crossOrigin = "Anonymous";
        posterImg.src = data.Poster;
        posterImg.setAttribute("crossOrigin", "");

        posterImg.onload = function () {
          extractDominantColors(posterImg);
        };

        posterImg.onerror = function () {
          showError("Could not load movie poster");
        };
      })
      .catch((err) => {
        showError("Error fetching movie data. Please try again.");
        console.error(err);
      });
  }

  function showError(message) {
    loading.style.display = "none";
    error.textContent = message;
    error.style.display = "block";
  }

  function extractDominantColors(imageElement) {
    // Create a canvas element to draw the image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match the image
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;

    // Draw the image onto the canvas
    ctx.drawImage(imageElement, 0, 0);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;

    // Store colors and their frequency
    const colorMap = {};

    // Sample pixels (skip some pixels for performance on large images)
    const skipFactor = Math.max(
      1,
      Math.floor((canvas.width * canvas.height) / 100000)
    );

    for (let i = 0; i < pixelData.length; i += 4 * skipFactor) {
      const r = pixelData[i];
      const g = pixelData[i + 1];
      const b = pixelData[i + 2];

      // Skip very dark or very light colors
      if (r + g + b < 30 || r + g + b > 720) continue;

      // Quantize color to reduce number of unique colors
      const quantizedR = Math.floor(r / 10) * 10;
      const quantizedG = Math.floor(g / 10) * 10;
      const quantizedB = Math.floor(b / 10) * 10;

      const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;

      if (colorMap[colorKey]) {
        colorMap[colorKey].count++;
      } else {
        colorMap[colorKey] = {
          r: quantizedR,
          g: quantizedG,
          b: quantizedB,
          count: 1,
        };
      }
    }

    // Convert to array and sort by frequency
    const colorArray = Object.values(colorMap);
    colorArray.sort((a, b) => b.count - a.count);

    // Get top 4 colors
    const dominantColors = colorArray.slice(0, 4);

    // Apply theme immediately
    applyTheme(dominantColors);
    const defaultUrl = "https://linkedin.com/in/chanukachandrayapa";
    generateQRCode(defaultUrl);

    // Close modal and show success
    loading.style.display = "none";
    setTimeout(() => {
      moviemodal.style.display = "none";
    }, 1000);
  }

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function applyTheme(colors) {
    if (!colors || colors.length < 4) return;

    // Calculate text color for contrast
    const primary = colors[0];
    const brightness =
      (primary.r * 299 + primary.g * 587 + primary.b * 114) / 1000;
    const textColor = brightness > 128 ? "#222" : "#fff";
    // Check if secondary and accent colors are in the same range
    const colorDistance = (color1, color2) => {
      return Math.sqrt(
        Math.pow(color1.r - color2.r, 2) +
          Math.pow(color1.g - color2.g, 2) +
          Math.pow(color1.b - color2.b, 2)
      );
    };

    const secondary = colors[1];
    const accent = colors[2];

    if (colorDistance(secondary, accent) < 100) {
      // Increase brightness of secondary color
      secondary.r = Math.min(secondary.r + 60, 255);
      secondary.g = Math.min(secondary.g + 60, 255);
      secondary.b = Math.min(secondary.b + 60, 255);
    }

    function adjustColorDifference(color1, color2, minColorDifference) {
      const distance = colorDistance(color1, color2);
      if (distance < minColorDifference) {
        // Adjust accent color to ensure significant difference
        color2.r = (color2.r + 100) % 256;
        color2.g = (color2.g + 100) % 256;
        color2.b = (color2.b + 100) % 256;
      }
    }

    adjustColorDifference(primary, accent, 150);
    adjustColorDifference(primary, secondary, 30);

    // Apply colors to CSS variables
    document.documentElement.style.setProperty(
      "--primary",
      rgbToHex(colors[0].r, colors[0].g, colors[0].b)
    );
    document.documentElement.style.setProperty(
      "--secondary",
      rgbToHex(colors[1].r, colors[1].g, colors[1].b)
    );
    document.documentElement.style.setProperty(
      "--accent",
      rgbToHex(colors[2].r, colors[2].g, colors[2].b)
    );
    document.documentElement.style.setProperty(
      "--background",
      rgbToHex(colors[3].r, colors[3].g, colors[3].b)
    );
    document.documentElement.style.setProperty("--text", textColor);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Sample data - replace with your actual experience and education
  const timelineData = [
    {
      date: "July 2025 - Present",
      title: "Software Engineer",
      location: "IGT1 Lanka | Colombo, Sri Lanka",
      description:
        "Worked on the frontend aspects of the POKA worker platform dedicated to utilizing technology and AI towards the efficiency of workers and factories (Angular)",
      logo: "/images/igt.jpeg",
    },
    {
      date: "Jan 2025- June 2025",
      title: "Teaching Assistant",
      location: "University of Moratuwa | Sri Lanka",
      description:
        'Worked as a Teaching Assistant for the course "Programming Languages" for the 3rd year undergraduates.',
      logo: "/images/uom.png",
    },
    {
      date: "Dec 2023 - May 2024",
      title: "Intern Software Engineer",
      location: "WSO2 LLC | Colombo, Sri Lanka",
      description:
        "Completed a six-month internship with the APIM team of WSO2. Implemented Throttle Policy Reset support feature for WSO2 API Manager.",
      logo: "/images/wso2.png",
    },
    {
      date: "2021-2025",
      title:
        "Undergraduate, B.Sc. Engineering (Hons) (Computer Science & Engineering)",
      location: "University of Moratuwa | Sri Lanka",
      description: "Maintained a CGPA of 3.89. Dean's list in 6 semesters",
      logo: "/images/uom.png",
    },
    {
      date: "2016-2019",
      title: "G.C.E Advanced Level Examination",
      location: "Bandarawela Central College | Bandarawela, Sri Lanka",
      description:
        "Followed Physical Sciences stream and got a Z-Score of 2.3999 ",
      logo: "/images/bmmv.png",
    },
  ];

  const timelineNodesContainer = document.getElementById(
    "timeline-nodes-container"
  );
  const timelineSection = document.getElementById("experience");

  // Function to create timeline nodes
  function createTimelineNodes() {
    timelineData.forEach((item, index) => {
      const node = document.createElement("div");
      node.className = "timeline-node";
      node.setAttribute("data-index", index);

      node.innerHTML = `
              <div class="timeline-date">
                  <div class="timeline-dot"></div>
                  <div class="timeline-date-text">${item.date}</div>
              </div>
              <div class="timeline-content">
                  ${
                    item.logo
                      ? `<div class="timeline-logo-badge"><img src="${item.logo}" alt="Company Logo" class="timeline-logo-img"></div>`
                      : ""
                  }
                  <h3 class="timeline-content-title">${item.title}</h3>
                  <h3 class="timeline-content-location">${item.location}</h3>
                  <p class="timeline-content-description">${
                    item.description
                  }</p>
              </div>
          `;

      timelineNodesContainer.appendChild(node);
    });
  }

  // Generate the timeline nodes
  createTimelineNodes();

  // Function to scroll the timeline section to the top or bottom of the screen
  let isUserScrolling = false;
  let isScrollTimeout;

  function scrollTimelineSection() {
    if (isUserScrolling) return;

    const rect = timelineSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top >= 0 && rect.top <= windowHeight * 0.5) {
      window.scrollTo({
        top: window.scrollY + rect.top,
        behavior: "smooth",
      });
    } else if (rect.top > windowHeight * 0.5 && rect.top <= windowHeight) {
      window.scrollTo({
        top: window.scrollY + rect.top - windowHeight,
        behavior: "smooth",
      });
    }

    if (rect.bottom > windowHeight * 0.5 && rect.bottom <= windowHeight) {
      window.scrollTo({
        top: window.scrollY + rect.top,
        behavior: "smooth",
      });
    }
  }

  // Detect user scrolling
  window.addEventListener("scroll", () => {
    isUserScrolling = true;
    clearTimeout(isScrollTimeout);
    isScrollTimeout = setTimeout(() => {
      isUserScrolling = false;
      scrollTimelineSection();
    }, 100);
  });

  // Add scroll event listener to handle timeline section scroll
  window.addEventListener("scroll", scrollTimelineSection);

  let nodes = document.querySelectorAll(".timeline-node");
  const nodeHeight = 200; // Approximate height of each node including margin
  let currentNodeIndex = 0;
  let isScrollingTimeline = false;
  let isTimelineSectionActive = false;
  let lastScrollTime = 0;
  let startY = 0;
  let scrollTimeout;
  let lastWheelDirection = 0;

  // Initialize timeline and set first node as active
  function initializeTimeline() {
    updateActiveNode(0);
    nodes[0].classList.add("active", "animated");
  }

  // Update the active node with smooth animation
  function updateActiveNode(index) {
    nodes.forEach((node, i) => {
      node.classList.remove("active", "animated");
    });

    setTimeout(() => {
      nodes[index].classList.add("active", "animated");
    }, 50);

    currentNodeIndex = index;

    // Calculate position to scroll to
    // const viewportHeight = timelineSection.clientHeight;
    // const centerOffset = viewportHeight / 2;

    // const scrollPosition = (index * nodeHeight) - centerOffset + (nodeHeight / 2);
    const scrollPosition = index * nodeHeight;
    timelineNodesContainer.style.transform = `translateY(-${scrollPosition}px)`;
    timelineNodesContainer.style.transition = "transform 0.5s ease";
  }

  // Main scroll handler
  function handleScroll(event) {
    const now = Date.now();
    if (now - lastScrollTime < 1000) return; // Throttle scrolling events
    lastScrollTime = now;

    // If we're not in the timeline section, don't intercept scrolling
    if (!isTimelineSectionActive) return;

    // Get scroll direction
    const delta = event.deltaY || startY - event.touches?.[0].clientY || 0;
    const direction = delta > 0 ? 1 : -1;

    // Only process if we have a clear direction
    if (direction === 0) return;

    // Calculate new index
    let newIndex = currentNodeIndex + direction;

    // Check boundaries for allowing page scroll
    if (newIndex < 0) {
      // We're at the first node and trying to scroll up
      // Allow regular page scrolling
      isScrollingTimeline = false;
      return;
    } else if (newIndex >= nodes.length) {
      // We're at the last node and trying to scroll down
      // Allow regular page scrolling
      isScrollingTimeline = false;
      return;
    }

    // We're within timeline boundaries, intercept the scroll
    event.preventDefault();
    isScrollingTimeline = true;

    // Update to new active node
    updateActiveNode(newIndex);

    // Reset scrolling flag after animation
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrollingTimeline = false;
    }, 1000);
  }

  // Wheel event handler
  function handleWheel(event) {
    if (!isTimelineSectionActive) return;

    // Determine if we should intercept this event
    const direction = event.deltaY > 0 ? 1 : -1;

    // If we're at bounds, don't intercept
    if (
      (currentNodeIndex === 0 && direction === -1) ||
      (currentNodeIndex === nodes.length - 1 && direction === 1)
    ) {
      return;
    }

    // Prevent default to stop page scroll
    event.preventDefault();
    handleScroll(event);
  }

  // Touch handlers for mobile
  function handleTouchStart(event) {
    if (!isTimelineSectionActive) return;
    startY = event.touches[0].clientY;
  }

  function handleTouchMove(event) {
    if (!isTimelineSectionActive || isScrollingTimeline) return;

    const currentY = event.touches[0].clientY;
    const difference = startY - currentY;

    // Only handle significant touch movements
    if (Math.abs(difference) > 30) {
      const syntheticEvent = {
        deltaY: difference,
        preventDefault: () => {
          event.preventDefault();
        },
      };
      handleScroll(syntheticEvent);
      startY = currentY;
    }
  }

  // Add click event listener to timeline nodes
  nodes.forEach((node, index) => {
    node.addEventListener("click", () => {
      updateActiveNode(index);
    });
  });

  // Intersection Observer to detect when timeline section is in view
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Disable navbar
          document.querySelector(".navbar").classList.add("hidden");

          // Check if the mouse or touch is within the timeline section
          document.addEventListener("mousemove", (e) => {
            const rect = timelineSection.getBoundingClientRect();
            if (
              e.clientX >= rect.left &&
              e.clientX <= rect.right &&
              e.clientY >= rect.top &&
              e.clientY <= rect.bottom
            ) {
              isTimelineSectionActive = true;
            } else {
              isTimelineSectionActive = false;
            }
          });

          document.addEventListener("touchmove", (e) => {
            const touch = e.touches[0];
            const rect = timelineSection.getBoundingClientRect();
            if (
              touch.clientX >= rect.left &&
              touch.clientX <= rect.right &&
              touch.clientY >= rect.top &&
              touch.clientY <= rect.bottom
            ) {
              isTimelineSectionActive = true;
            } else {
              isTimelineSectionActive = false;
            }
          });
        } else {
          isTimelineSectionActive = false;
          // Enable navbar
          document.querySelector(".navbar").classList.remove("hidden");
        }
      });
    },
    { threshold: 0.2 }
  );

  sectionObserver.observe(timelineSection);

  // Event listeners
  window.addEventListener("wheel", handleWheel, { passive: false });
  timelineSection.addEventListener("touchstart", handleTouchStart, {
    passive: true,
  });
  timelineSection.addEventListener("touchmove", handleTouchMove, {
    passive: false,
  });

  // Initialize the timeline
  initializeTimeline();

  // Public API to add new nodes dynamically
  window.addTimelineNode = function (date, title, description) {
    // Add to data array
    timelineData.push({
      date,
      title,
      description,
      logo: "/images/logo.png", // Default logo, can be customized
    });

    // Create and append new node
    const newIndex = timelineData.length - 1;
    const node = document.createElement("div");
    node.className = "timeline-node";
    node.setAttribute("data-index", newIndex);

    node.innerHTML = `
          <div class="timeline-date">
              <div class="timeline-dot"></div>
              <div class="timeline-date-text">${date}</div>
          </div>
          <div class="timeline-content">
              <div class="timeline-logo-badge"><img src="/images/logo.png" alt="Company Logo" class="timeline-logo-img"></div>
              <h3 class="timeline-content-title">${title}</h3>
              <p class="timeline-content-description">${description}</p>
          </div>
      `;

    timelineNodesContainer.appendChild(node);

    // Update nodes array
    nodes = document.querySelectorAll(".timeline-node");

    return newIndex;
  };
});

// document.addEventListener('DOMContentLoaded', function() {
//   // Get all form elements
//   const form = document.querySelector('.portfolio-contact-form');
//   const inputs = document.querySelectorAll('.portfolio-form-input');
//   const submitBtn = document.querySelector('.portfolio-submit-btn');
//   const notification = document.querySelector('.portfolio-notification');
//   const envelope = document.querySelector('.portfolio-envelope');
//   const envelopeFlap = document.querySelector('.portfolio-envelope-flap');

//   // Function to handle input animations
//   function setupInputAnimations() {
//       inputs.forEach(input => {
//           // Set an initial attribute for styling empty vs filled inputs
//           input.setAttribute('placeholder', ' ');

//           // Add focus animations
//           input.addEventListener('focus', () => {
//               input.parentElement.classList.add('focused');
//           });

//           input.addEventListener('blur', () => {
//               input.parentElement.classList.remove('focused');
//           });

//           // Add interactive animation on input
//           input.addEventListener('input', () => {
//               if (input.value.length > 0) {
//                   const randomDegree = Math.random() * 3 - 1.5;
//                   envelopeFlap.style.transform = `rotateX(${10 + randomDegree}deg)`;
//                   setTimeout(() => {
//                       envelopeFlap.style.transform = '';
//                   }, 300);
//               }
//           });
//       });
//   }

//   // Function to handle form submission
//   function setupFormSubmission() {
//       form.addEventListener('submit', function(e) {
//           e.preventDefault();

//           // Disable form during submission
//           inputs.forEach(input => input.disabled = true);
//           submitBtn.disabled = true;

//           // Animate the envelope
//           envelope.style.animation = 'none';
//           letter.style.animation = 'none';

//           setTimeout(() => {
//               envelope.style.animation = 'envelope-send 1.5s ease-in-out forwards';
//               letter.style.animation = 'letter-send 1s ease-in-out forwards';
//           }, 10);

//           // Show success notification after animation
//           setTimeout(() => {
//               notification.classList.add('show');

//               // Reset the form
//               form.reset();
//               inputs.forEach(input => input.disabled = false);
//               submitBtn.disabled = false;

//               // Reset animations
//               setTimeout(() => {
//                   envelope.style.animation = 'envelope-float 6s ease-in-out infinite';
//                   letter.style.animation = 'letter-bob 7s ease-in-out infinite';
//               }, 1000);

//               // Hide notification after a delay
//               setTimeout(() => {
//                   notification.classList.remove('show');
//               }, 4000);
//           }, 1500);
//       });
//   }

// Function to add interactive envelope animations
function setupEnvelopeInteractions() {
  // Make envelope interactive on hover
  const animationContainer = document.querySelector(
    ".portfolio-animation-container"
  );
  const letter = document.querySelector(".portfolio-paper");

  animationContainer.addEventListener("mouseenter", () => {
    letter.style.transform = "translateY(-25px)";
  });

  animationContainer.addEventListener("mouseleave", () => {
    letter.style.transform = "";
  });

  // Add touch events for mobile
  animationContainer.addEventListener("touchstart", () => {
    letter.style.transform = "translateY(-25px)";
  });

  animationContainer.addEventListener("touchend", () => {
    letter.style.transform = "";
  });
}

// Create dynamic bubbles
function createBubbles() {
  const bubblesContainer = document.querySelector(
    ".portfolio-floating-bubbles"
  );
  const bubbleCount = window.innerWidth < 768 ? 30 : 40;

  // Clear existing bubbles
  while (bubblesContainer.firstChild) {
    bubblesContainer.removeChild(bubblesContainer.firstChild);
  }

  // Create new bubbles
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("portfolio-bubble");

    const size = Math.random() * 30 + 10;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.5 + 0.1;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.top = `${top}%`;
    bubble.style.animationDelay = `${delay}s`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.opacity = opacity;
    bubble.style.background = `rgba(248, 177, 51, ${opacity})`;

    bubblesContainer.appendChild(bubble);
  }
}

//   // Add email send animation
//   function addEnvelopeAnimations() {
//       // Add keyframes dynamically
//       const style = document.createElement('style');
//       style.innerHTML = `
//           @keyframes envelope-send {
//               0% {
//                   transform: translateY(0) scale(1) rotate(0);
//               }
//               30% {
//                   transform: translateY(-30px) scale(1.1) rotate(5deg);
//               }
//               100% {
//                   transform: translateY(-200px) scale(0.5) rotate(15deg);
//                   opacity: 0;
//               }
//           }

//           @keyframes letter-send {
//               0% {
//                   transform: translateY(0);
//               }
//               20% {
//                   transform: translateY(-40px);
//               }
//               100% {
//                   transform: translateY(-40px);
//                   opacity: 0;
//               }
//           }
//       `;
//       document.head.appendChild(style);
//   }

//   // Handle window resize
//   function handleResize() {
//       window.addEventListener('resize', () => {
//           createBubbles();
//       });
//   }

//   // Initialize
//   function init() {
//       setupInputAnimations();
//       setupFormSubmission();
//       setupEnvelopeInteractions();
//       createBubbles();
//       addEnvelopeAnimations();
//       handleResize();
//   }

//   init();
// });

document.addEventListener("DOMContentLoaded", function () {
  // Get all form elements
  const form = document.querySelector(".portfolio-contact-form");
  const emailInput = document.getElementById("portfolio-email");
  const subjectInput = document.getElementById("portfolio-subject");
  const messageInput = document.getElementById("portfolio-message");
  const submitBtn = document.querySelector(".portfolio-submit-btn");
  const notification = document.querySelector(".portfolio-notification");

  // Get all paper and envelope elements
  const paper = document.querySelector(".portfolio-paper");
  const envelope = document.querySelector(".portfolio-envelope");
  const envelopeFlap = document.querySelector(".portfolio-envelope-flap");

  // Get paper text fields
  const paperEmail = document.querySelector(
    ".portfolio-paper-email .portfolio-paper-text"
  );
  const paperSubject = document.querySelector(
    ".portfolio-paper-subject .portfolio-paper-text"
  );
  const paperMessage = document.querySelector(
    ".portfolio-paper-message .portfolio-paper-text"
  );

  // Function to handle input animations and paper mirroring
  function setupInputAnimations() {
    // Email input sync with paper
    emailInput.addEventListener("input", function () {
      mirrorTextToPaper(this.value, paperEmail);
    });

    // Subject input sync with paper
    subjectInput.addEventListener("input", function () {
      mirrorTextToPaper(this.value, paperSubject);
    });

    // Message input sync with paper
    messageInput.addEventListener("input", function () {
      mirrorTextToPaper(this.value, paperMessage);
    });

    // Set placeholder to space for styling
    [emailInput, subjectInput, messageInput].forEach((input) => {
      input.setAttribute("placeholder", " ");
    });
  }

  function mirrorTextToPaper(text, paperElement) {
    // If no text, clear the element
    if (!text) {
      paperElement.textContent = "";
      return;
    }
    if (paperElement === paperEmail) {
      const atIndex = text.indexOf("@");
      if (atIndex !== -1) {
        text = text.substring(0, atIndex);
      }
    }
    // Simply update the text content directly
    paperElement.textContent = text;
  }

  // Function to handle form submission with paper folding and envelope animations
  function setupFormSubmission() {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Disable form during animation
      // [emailInput, subjectInput, messageInput, submitBtn].forEach(el => {
      //     el.disabled = true;
      // });

      // Animation sequence
      animatePaperToEnvelope().then(() => {
        // Show success notification
        notification.classList.add("show");

        // Reset the form
        form.reset();
        [paperEmail, paperSubject, paperMessage].forEach((el) => {
          el.textContent = "";
        });

        // [emailInput, subjectInput, messageInput, submitBtn].forEach(el => {
        //     el.disabled = false;
        // });

        // Reset paper and envelope positions
        setTimeout(() => {
          paper.className = "portfolio-paper";
          envelope.className = "portfolio-envelope";
          notification.classList.remove("show");
        }, 4000);
      });
    });
  }

  // Function to animate the paper folding and envelope sending
  function animatePaperToEnvelope() {
    return new Promise((resolve) => {
      // Start the folding animation
      paper.classList.add("fold-start");

      // Show the envelope
      // envelope.classList.add('open');
      envelope.classList.add("show");

      // After a short delay, complete the paper fold and hide it
      setTimeout(() => {
        paper.classList.add("fold-complete");

        // Close the envelope flap
        setTimeout(() => {
          envelope.classList.add("open");

          // Send the envelope flying
          setTimeout(() => {
            envelope.classList.add("send");

            // Resolve promise after animation completes
            setTimeout(() => {
              resolve();
            }, 1500);
          }, 600);
        }, 500);
      }, 1000);
    });
  }

  // Initialize
  function init() {
    setupInputAnimations();
    setupFormSubmission();
    createBubbles();
    setupEnvelopeInteractions();
  }

  init();
});

(function () {
  emailjs.init({
    // publicKey: 'wb42Fz4qy6x1_cuZT',
  });
})();

// Get form elements
const contactForm = document.querySelector(".portfolio-contact-form");
const emailInput = document.getElementById("portfolio-email");
const subjectInput = document.getElementById("portfolio-subject");
const messageInput = document.getElementById("portfolio-message");
const submitButton = document.querySelector(".portfolio-submit-btn");
const paperEmail = document.querySelector(
  ".portfolio-paper-email .portfolio-paper-text"
);
const paperSubject = document.querySelector(
  ".portfolio-paper-subject .portfolio-paper-text"
);
const paperMessage = document.querySelector(
  ".portfolio-paper-message .portfolio-paper-text"
);
const paper = document.querySelector(".portfolio-paper");
const envelope = document.querySelector(".portfolio-envelope");

// Add form submission event handler
contactForm.addEventListener("submit", function (event) {
  // Prevent the default form submission
  event.preventDefault();

  // Disable the submit button and change text to show processing
  submitButton.disabled = true;
  //   [emailInput, subjectInput, messageInput].forEach(el => {
  //     el.disabled = true;
  // });
  const originalButtonText = submitButton.querySelector(
    ".portfolio-btn-text"
  ).textContent;
  submitButton.querySelector(".portfolio-btn-text").textContent = "Sending...";

  // Create a loading animation on the button
  submitButton.classList.add("portfolio-btn-loading");

  // Prepare template parameters (these should match your EmailJS template)
  const templateParams = {
    email: emailInput.value,
    subject: subjectInput.value,
    message: messageInput.value,
  };

  // Send the email using EmailJS
  // Replace "your_service_id" and "your_template_id" with your actual EmailJS service and template IDs
  emailjs
    .send("service_ktwn828", "template_hpztomb", templateParams)
    .then(
      function (response) {
        // Show success message
        showNotification("success", "Your message has been sent successfully!");

        // Reset the form
        contactForm.reset();
        [paperEmail, paperSubject, paperMessage].forEach((el) => {
          el.textContent = "";
        });

        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        // Show error message
        showNotification(
          "error",
          "Failed to send message. Please try again later."
        );

        console.log("FAILED...", error);
      }
    )
    .finally(function () {
      // Re-enable the submit button and restore original text
      submitButton.disabled = false;
      submitButton.querySelector(".portfolio-btn-text").textContent =
        originalButtonText;
      submitButton.classList.remove("portfolio-btn-loading");

      //   [paperEmail, paperSubject, paperMessage].forEach(el => {
      //     el.textContent = '';
      // });

      // [emailInput, subjectInput, messageInput, submitButton].forEach(el => {
      //     el.disabled = false;
      // });

      setTimeout(() => {
        paper.className = "portfolio-paper";
        envelope.className = "portfolio-envelope";
      }, 4000);
    });
});

// Function to show notifications
function showNotification(type, message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `portfolio-notification portfolio-notification-${type}`;

  // Create notification content
  const notificationContent = document.createElement("div");
  notificationContent.className = "portfolio-notification-content";
  notificationContent.textContent = message;

  // Add icon based on type
  const icon = document.createElement("span");
  icon.className = "portfolio-notification-icon";
  if (type === "success") {
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>`;
  } else {
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>`;
  }

  // Assemble notification
  notification.appendChild(icon);
  notification.appendChild(notificationContent);

  // Add close button
  const closeBtn = document.createElement("button");
  closeBtn.className = "portfolio-notification-close";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", function () {
    notification.classList.add("portfolio-notification-hiding");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });
  notification.appendChild(closeBtn);

  // Add notification to the document
  document.body.appendChild(notification);

  // Set timeout to auto-remove notification
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.classList.add("portfolio-notification-hiding");
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

document.addEventListener("DOMContentLoaded", function () {
  // Set current year for copyright
  document.getElementById("year").textContent = new Date().getFullYear();

  // Default LinkedIn profile URL
  const defaultUrl = "https://linkedin.com/in/chanukachandrayapa";
  const qrInput = document.getElementById("qrInput");
  const qrControls = document.querySelector(".qr-controls");
  // qrInput.value = defaultUrl;

  // Generate QR code on page load with default URL
  generateQRCode(defaultUrl);

  // Generate QR code when button is clicked
  document.getElementById("generateQR").addEventListener("click", function () {
    qrControls.classList.add("input-active");
    setTimeout(() => {
      qrInput.focus();
    }, 400); // Focus after animation completes
  });
  qrInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const url = qrInput.value.trim();
      if (url) {
        generateQRCode(url);

        // Reset to button state
        qrControls.classList.remove("input-active");

        // Add animation effect to QR code
        const qrCode = document.getElementById("qrCode");
        qrCode.style.animation = "none";
        void qrCode.offsetWidth; // Trigger reflow
        qrCode.style.animation = "floatIn 0.8s ease forwards";
      }
    }
  });
});

// Function to generate QR code
function generateQRCode(data) {
  // Clear previous QR code
  document.getElementById("qrCode").innerHTML = "";

  // Create new QR code
  new QRCode(document.getElementById("qrCode"), {
    text: data,
    width: 150,
    height: 150,
    colorDark: getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim(),
    colorLight: getComputedStyle(document.documentElement)
      .getPropertyValue("--secondary")
      .trim(),
    correctLevel: QRCode.CorrectLevel.H,
  });
  const qrCode = document.getElementById("qrCode");
  qrCode.style.animation = "none";
  void qrCode.offsetWidth; // Trigger reflow
  qrCode.style.animation = "floatIn 0.8s ease forwards";
}

// ============================================
// NEW COOL FEATURES
// ============================================

// 1. Console Easter Egg Messages
console.log(
  "%c🎉 Welcome to Chanuka's Portfolio! 🎉",
  "color: #f8b133; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
);
console.log(
  "%cDid you know? You can unlock hidden features by:",
  "color: #21252b; font-size: 14px;"
);
console.log(
  "%c• Clicking the ball 10+ times unlocks Tic-Tac-Toe",
  "color: #666; font-size: 12px;"
);
console.log(
  "%c• Check out the movie theme changer!",
  "color: #666; font-size: 12px;"
);
console.log(
  "%cBuilt with ❤️ by Chanuka Lakshan",
  "color: #f8b133; font-size: 12px; font-style: italic;"
);

// 2. Scroll Progress Indicator
function createScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.id = "scroll-progress";
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    z-index: 10000;
    transition: width 0.1s ease-out;
    box-shadow: 0 2px 4px rgba(248, 177, 51, 0.3);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

// 3. Click Ripple Effect
function createClickRipple() {
  document.addEventListener("click", (e) => {
    // Don't create ripple on interactive elements
    if (
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "A" ||
      e.target.tagName === "INPUT" ||
      e.target.closest("button") ||
      e.target.closest("a")
    ) {
      return;
    }

    const ripple = document.createElement("div");
    const size = 100;
    const x = e.clientX - size / 2;
    const y = e.clientY - size / 2;

    ripple.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: var(--primary);
      opacity: 0.3;
      pointer-events: none;
      z-index: 9998;
      transform: scale(0);
    `;
    document.body.appendChild(ripple);

    ripple.animate(
      [
        { transform: "scale(0)", opacity: 0.3 },
        { transform: "scale(4)", opacity: 0 },
      ],
      {
        duration: 600,
        easing: "ease-out",
      }
    ).onfinish = () => {
      document.body.removeChild(ripple);
    };
  });
}

// 4. Keyboard Shortcuts Helper
function initKeyboardShortcuts() {
  const shortcuts = {
    KeyH: () => scrollToSection("about"),
    KeyE: () => scrollToSection("experience"),
    KeyP: () => scrollToSection("projects"),
    KeyB: () => scrollToSection("blogs"),
    KeyC: () => scrollToSection("contact me"),
    KeyT: () => document.getElementById("openThemeModal")?.click(),
  };

  document.addEventListener("keydown", (e) => {
    // Don't trigger if typing in input
    if (
      e.target.tagName === "INPUT" ||
      e.target.tagName === "TEXTAREA" ||
      e.target.isContentEditable
    ) {
      return;
    }

    // Show help with ?
    if (e.key === "?") {
      showKeyboardShortcuts();
      return;
    }

    // Execute shortcut
    if (shortcuts[e.code]) {
      shortcuts[e.code]();
    }
  });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function showKeyboardShortcuts() {
  const modal = document.createElement("div");
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10002;
    animation: fadeIn 0.3s ease;
  `;

  const content = document.createElement("div");
  content.style.cssText = `
    background: var(--accent);
    color: var(--secondary);
    padding: 2rem;
    border-radius: 20px;
    max-width: 500px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  `;
  content.innerHTML = `
    <h2 style="color: var(--primary); margin-top: 0;">⌨️ Keyboard Shortcuts</h2>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div><kbd style="background: var(--primary); color: var(--accent); padding: 0.3rem 0.6rem; border-radius: 4px;">H</kbd> - Home/About</div>
      <div><kbd style="background: var(--primary); color: var(--accent); padding: 0.3rem 0.6rem; border-radius: 4px;">E</kbd> - Experience</div>
      <div><kbd style="background: var(--primary); color: var(--accent); padding: 0.3rem 0.6rem; border-radius: 4px;">P</kbd> - Projects</div>
      <div><kbd style="background: var(--primary); color: var(--accent); padding: 0.3rem 0.6rem; border-radius: 4px;">B</kbd> - Blogs</div>
      <div><kbd style="background: var(--primary); color: var(--accent); padding: 0.3rem 0.6rem; border-radius: 4px;">C</kbd> - Contact</div>
      <div><kbd style="background: var(--primary); color: var(--accent); padding: 0.3rem 0.6rem; border-radius: 4px;">T</kbd> - Theme Changer</div>
      <div><kbd style="background: var(--primary); color: var(--accent); padding: 0.3rem 0.6rem; border-radius: 4px;">?</kbd> - Show this help</div>
    </div>
    <button id="close-shortcuts" style="margin-top: 1.5rem; padding: 0.5rem 1.5rem; background: var(--primary); color: var(--accent); border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Close</button>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  const closeBtn = content.querySelector("#close-shortcuts");
  const closeModal = () => {
    modal.style.animation = "fadeOut 0.3s ease forwards";
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// Initialize all new features
document.addEventListener("DOMContentLoaded", function () {
  createScrollProgress();
  createClickRipple();
  initKeyboardShortcuts();
  initTechGlobe();
});

// ============================================
// TECH STACK 3D GLOBE GRAPH
// ============================================

function initTechGlobe() {
  const canvas = document.getElementById("tech-globe-canvas");
  if (!canvas) return;

  // Update background colors based on theme
  function updateBackgroundColors() {
    const container = document.getElementById("tech-globe-container");
    if (!container) return;

    const style = getComputedStyle(document.documentElement);
    const primaryColor = style.getPropertyValue("--primary").trim();
    const accentColor = style.getPropertyValue("--accent").trim();

    // Convert hex to RGB
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    }

    const primaryRgb = hexToRgb(primaryColor);
    const accentRgb = hexToRgb(accentColor);

    if (primaryRgb && accentRgb) {
      // Create dark galaxy background using theme colors
      container.style.background = `
        radial-gradient(ellipse at top, rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.1) 0%, transparent 50%),
        radial-gradient(ellipse at bottom left, rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.3) 0%, transparent 50%),
        linear-gradient(135deg, ${accentColor} 0%, rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.8) 50%, ${accentColor} 100%)
      `;
      container.style.backgroundColor = accentColor;
    }
  }

  // Update background colors initially and on theme change
  updateBackgroundColors();

  // Watch for theme changes
  const observer = new MutationObserver(() => {
    updateBackgroundColors();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style", "class"],
  });

  // Tech stack data with categories and connections
  const techData = {
    nodes: [
      // Programming
      {
        id: "Python",
        category: "programming",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
      {
        id: "Java",
        category: "programming",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
      {
        id: "C/C++",
        category: "programming",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
      {
        id: "Arduino",
        category: "programming",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
      {
        id: "JavaScript",
        category: "programming",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
      // Web/Mobile
      {
        id: "HTML/CSS",
        category: "web",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
      { id: "React", category: "web", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 },
      { id: "Angular", category: "web", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 },
      { id: "Express", category: "web", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 },
      { id: "Node", category: "web", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 },
      { id: "Flask", category: "web", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 },
      { id: "Axios", category: "web", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 },
      {
        id: "Spring Boot",
        category: "web",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
      { id: "Flutter", category: "web", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 },
      { id: "Kotlin", category: "web", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 },
      // Databases
      {
        id: "MySQL",
        category: "database",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
      {
        id: "MongoDB",
        category: "database",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
      {
        id: "SQLite",
        category: "database",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
      // Tools
      { id: "Jira", category: "tools", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 },
      { id: "Figma", category: "tools", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 },
      {
        id: "VS Code",
        category: "tools",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
      {
        id: "IntelliJ",
        category: "tools",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
      // Version Control
      { id: "Git", category: "version", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 },
      {
        id: "GitHub",
        category: "version",
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      },
    ],
    links: [
      // Programming connections
      { source: "Python", target: "Flask" },
      { source: "Python", target: "JavaScript" },
      { source: "Java", target: "Spring Boot" },
      { source: "Java", target: "Kotlin" },
      { source: "C/C++", target: "Arduino" },
      { source: "JavaScript", target: "Node" },
      { source: "JavaScript", target: "React" },
      { source: "JavaScript", target: "Angular" },
      { source: "JavaScript", target: "Express" },
      { source: "JavaScript", target: "Axios" },
      // Web connections
      { source: "React", target: "HTML/CSS" },
      { source: "Angular", target: "HTML/CSS" },
      { source: "Node", target: "Express" },
      { source: "Flutter", target: "Kotlin" },
      // Database connections
      { source: "Node", target: "MySQL" },
      { source: "Node", target: "MongoDB" },
      { source: "Flask", target: "SQLite" },
      { source: "Spring Boot", target: "MySQL" },
      // Tool connections
      { source: "VS Code", target: "JavaScript" },
      { source: "VS Code", target: "Python" },
      { source: "IntelliJ", target: "Java" },
      { source: "IntelliJ", target: "Kotlin" },
      { source: "Figma", target: "HTML/CSS" },
      { source: "Figma", target: "React" },
      // Version control connections
      { source: "Git", target: "GitHub" },
      { source: "Git", target: "VS Code" },
      { source: "Git", target: "IntelliJ" },
    ],
  };

  // Three.js setup
  const scene = new THREE.Scene();
  scene.background = null; // Transparent to show galaxy background
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0); // Fully transparent

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Camera position
  camera.position.z = 15;
  camera.position.y = 2;
  camera.lookAt(0, 0, 0);

  // Physics constants
  const DAMPING = 0.88;
  const SPRING_LENGTH = 2.5;
  const SPRING_STRENGTH = 0.08;
  const REPULSION_STRENGTH = 0.8;
  const REPULSION_DISTANCE = 2.5;
  const CENTER_FORCE = 0.03;
  const SPHERE_RADIUS = 8;
  const MAX_VELOCITY = 0.5;

  // Initialize node positions on a perfect sphere using Fibonacci sphere algorithm
  const nodeCount = techData.nodes.length;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

  techData.nodes.forEach((node, i) => {
    // Fibonacci sphere distribution for even spacing
    const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // radius at y
    const theta = goldenAngle * i; // golden angle increment

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    // Scale to sphere radius
    node.x = x * SPHERE_RADIUS;
    node.y = y * SPHERE_RADIUS;
    node.z = z * SPHERE_RADIUS;

    // Initialize velocities to zero
    node.vx = 0;
    node.vy = 0;
    node.vz = 0;
  });

  // Flag to track if physics should be active (only after first drag)
  let physicsActive = false;
  let physicsEnabled = true; // User control for physics
  let autoRotationEnabled = true; // User control for auto rotation
  let rotationSpeed = 0.5; // Rotation speed multiplier

  // Get theme colors from CSS
  function getThemeColor(variable) {
    const style = getComputedStyle(document.documentElement);
    const color = style.getPropertyValue(variable).trim();
    return parseInt(color.replace("#", "0x"));
  }

  // Brighten color function
  function brightenColor(color, amount = 1.5) {
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;

    const newR = Math.min(255, Math.floor(r * amount));
    const newG = Math.min(255, Math.floor(g * amount));
    const newB = Math.min(255, Math.floor(b * amount));

    return (newR << 16) | (newG << 8) | newB;
  }

  function getCategoryColor(category) {
    // Always read fresh from CSS variables
    const primary = getThemeColor("--primary");

    // Brighten colors for better visibility on dark background
    // All categories use primary color with different brightness levels
    const brightnessMap = {
      programming: 1.3,
      web: 1.2,
      database: 1.3,
      tools: 1.2,
      version: 1.3,
    };
    const brightness = brightnessMap[category] || 1.2;
    return brightenColor(primary, brightness);
  }

  // Logo mapping for technologies with brand colors
  const logoMap = {
    Python: { icon: "python", color: "3776AB" },
    Java: { icon: "java", color: "ED8B00" },
    "C/C++": { icon: "cplusplus", color: "00599C" },
    Arduino: { icon: "arduino", color: "00979D" },
    JavaScript: { icon: "javascript", color: "F7DF1E" },
    "HTML/CSS": { icon: "html5", color: "E34F26" },
    React: { icon: "react", color: "61DAFB" },
    Angular: { icon: "angular", color: "DD0031" },
    Express: { icon: "express", color: "000000" },
    Node: { icon: "nodedotjs", color: "339933" },
    Flask: { icon: "flask", color: "000000" },
    Axios: { icon: "axios", color: "5A29E4" },
    "Spring Boot": { icon: "spring", color: "6DB33F" },
    Flutter: { icon: "flutter", color: "02569B" },
    Kotlin: { icon: "kotlin", color: "7F52FF" },
    MySQL: { icon: "mysql", color: "4479A1" },
    MongoDB: { icon: "mongodb", color: "47A248" },
    SQLite: { icon: "sqlite", color: "003B57" },
    Jira: { icon: "jira", color: "0052CC" },
    Figma: { icon: "figma", color: "F24E1E" },
    "VS Code": { icon: "visualstudiocode", color: "007ACC" },
    IntelliJ: { icon: "intellijidea", color: "000000" },
    Git: { icon: "git", color: "F05032" },
    GitHub: { icon: "github", color: "181717" },
  };

  // Create node meshes with logos
  const nodeMeshes = [];
  const nodeMap = new Map();
  const nodeGroup = new THREE.Group();
  const textureLoader = new THREE.TextureLoader();

  // Function to create a node with logo texture
  function createNodeWithLogo(node) {
    const geometry = new THREE.SphereGeometry(0.3, 32, 32);
    const logoInfo = logoMap[node.id];

    // Default color from theme
    const defaultColor = getCategoryColor(node.category);

    if (logoInfo) {
      // Create material with base color (will be updated when texture loads)
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(defaultColor),
        emissive: new THREE.Color(defaultColor),
        emissiveIntensity: 0.2,
        // Use a subtle background color for better logo visibility
        transparent: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(node.x, node.y, node.z);
      mesh.userData = {
        node: node,
        category: node.category,
        material: material,
      };

      const nodeData = { mesh: mesh, node: node };

      // Create a canvas with logo and colored background
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");

      // Fill with brand color background
      ctx.fillStyle = `#${logoInfo.color}`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load logo image and composite it
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.onload = () => {
        // Draw white logo on colored background
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(logoImg, 0, 0, canvas.width, canvas.height);

        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        material.map = texture;
        material.needsUpdate = true;
        mesh.userData.texture = texture;
      };

      logoImg.onerror = () => {
        // If logo fails to load, use default color (already set)
        material.map = null;
        material.needsUpdate = true;
      };

      // Load logo from Simple Icons (white version to show on colored background)
      logoImg.src = `https://cdn.simpleicons.org/${logoInfo.icon}/ffffff`;

      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);
      nodeMap.set(node.id, nodeData);

      return nodeData;
    } else {
      // Fallback to colored sphere if no logo mapping
      const material = new THREE.MeshPhongMaterial({ color: defaultColor });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(node.x, node.y, node.z);
      mesh.userData = {
        node: node,
        category: node.category,
        material: material,
      };

      const nodeData = { mesh: mesh, node: node };
      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);
      nodeMap.set(node.id, nodeData);

      return nodeData;
    }
  }

  // Create all nodes
  techData.nodes.forEach((node) => {
    createNodeWithLogo(node);
  });

  scene.add(nodeGroup);

  // Create text sprites for labels - dynamically use theme colors
  const createTextSprite = (text) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 768;
    canvas.height = 192;

    // Create texture first
    const texture = new THREE.CanvasTexture(canvas);

    const updateTextColor = () => {
      // Get fresh color from CSS variable
      const style = getComputedStyle(document.documentElement);
      const colorValue = style.getPropertyValue("--primary").trim();

      // Clear and redraw
      context.clearRect(0, 0, canvas.width, canvas.height);

      // No shadows
      context.shadowColor = "transparent";
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;

      // Use the color directly from CSS (it's already in hex format)
      context.fillStyle = colorValue;
      context.font = "bold 56px Montserrat, Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      // Force texture update
      texture.needsUpdate = true;
    };

    // Initial draw
    updateTextColor();

    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(3.6, 0.9, 1);
    // Store both the update function and reference to canvas/texture
    sprite.userData.updateColor = updateTextColor;
    sprite.userData.texture = texture;
    sprite.userData.canvas = canvas;
    return sprite;
  };

  const labelGroup = new THREE.Group();
  techData.nodes.forEach((node) => {
    const sprite = createTextSprite(node.id);
    const nodeData = nodeMap.get(node.id);
    if (nodeData) {
      sprite.position.copy(nodeData.mesh.position);
      sprite.position.multiplyScalar(1.4);
      // Preserve updateColor function when setting node data
      sprite.userData.node = node;
      labelGroup.add(sprite);
    }
  });
  scene.add(labelGroup);

  // Create edges
  const edgeGroup = new THREE.Group();
  techData.links.forEach((link) => {
    const source = nodeMap.get(link.source);
    const target = nodeMap.get(link.target);
    if (source && target) {
      const geometry = new THREE.BufferGeometry();
      const baseEdgeColor = getThemeColor("--primary");
      const edgeColor = brightenColor(baseEdgeColor, 1.4);
      const material = new THREE.LineBasicMaterial({
        color: edgeColor,
        opacity: 0.6,
        transparent: true,
      });
      const line = new THREE.Line(geometry, material);
      line.userData = {
        source: source.node,
        target: target.node,
        material: material,
      };
      edgeGroup.add(line);
    }
  });
  scene.add(edgeGroup);

  // Tech information data - mapped to actual projects from projectsData
  const techInfo = {
    Python: {
      description:
        "Versatile programming language used for web development, data science, and automation.",
      category: "Programming Language",
      experience: 85,
      projects: [
        {
          name: "Advizor",
          description:
            projectsData[2]?.description ||
            "Newspaper Advertisement Analyzer using OCR and NLP",
          projectId: 3,
        },
        {
          name: "BuyGenix",
          description:
            projectsData[5]?.description ||
            "AI-powered e-commerce platform with machine customers",
          projectId: 6,
        },
      ],
    },
    Java: {
      description:
        "Object-oriented programming language for enterprise applications and Android development.",
      category: "Programming Language",
      experience: 80,
      projects: [
        {
          name: "WSO2 API Manager",
          description:
            projectsData[0]?.description ||
            "Throttle Policy Reset Support feature",
          projectId: 1,
        },
        {
          name: "B Airways",
          description:
            projectsData[3]?.description || "Airline Reservation System",
          projectId: 4,
        },
      ],
    },
    "C/C++": {
      description:
        "System-level programming languages for performance-critical applications.",
      category: "Programming Language",
      experience: 70,
      projects: [
        {
          name: "MediBox",
          description:
            projectsData[7]?.description ||
            "ESP32-based medicine management system",
          projectId: 8,
        },
      ],
    },
    Arduino: {
      description:
        "Open-source electronics platform for building interactive projects.",
      category: "Programming Language",
      experience: 75,
      projects: [
        {
          name: "MediBox",
          description:
            projectsData[7]?.description ||
            "Micro-controller based medicine storage and monitoring system",
          projectId: 8,
        },
      ],
    },
    JavaScript: {
      description:
        "Core language for web development, enabling interactive and dynamic web experiences.",
      category: "Programming Language",
      experience: 90,
      projects: [
        {
          name: "Mental Bloom",
          description:
            projectsData[1]?.description ||
            "Digital mental health assistance platform",
          projectId: 2,
        },
        {
          name: "Advizor",
          description:
            projectsData[2]?.description || "Newspaper Advertisement Analyzer",
          projectId: 3,
        },
        {
          name: "SpaceXplore",
          description:
            projectsData[6]?.description ||
            "Intergalactic space travel ticket booking system",
          projectId: 7,
        },
      ],
    },
    React: {
      description:
        "Popular JavaScript library for building user interfaces and single-page applications.",
      category: "Frontend Framework",
      experience: 88,
      projects: [
        {
          name: "Mental Bloom",
          description:
            projectsData[1]?.description ||
            "Comprehensive mental health platform frontend",
          projectId: 2,
        },
        {
          name: "Advizor",
          description:
            projectsData[2]?.description ||
            "Newspaper ad analyzer with data visualization",
          projectId: 3,
        },
        {
          name: "SpaceXplore",
          description:
            projectsData[6]?.description || "Space travel booking interface",
          projectId: 7,
        },
      ],
    },
    Angular: {
      description:
        "TypeScript-based framework for building scalable web applications.",
      category: "Frontend Framework",
      experience: 75,
      projects: [],
    },
    Express: {
      description: "Fast, unopinionated web framework for Node.js.",
      category: "Web Framework",
      experience: 85,
      projects: [
        {
          name: "Mental Bloom",
          description:
            projectsData[1]?.description ||
            "Microservices backend with Express",
          projectId: 2,
        },
      ],
    },
    Node: {
      description: "JavaScript runtime for building server-side applications.",
      category: "Backend Runtime",
      experience: 85,
      projects: [
        {
          name: "Mental Bloom",
          description:
            projectsData[1]?.description ||
            "Microservices architecture backend",
          projectId: 2,
        },
        {
          name: "SpaceXplore",
          description:
            projectsData[6]?.description ||
            "Backend services for space travel booking",
          projectId: 7,
        },
      ],
    },
    Flask: {
      description:
        "Lightweight Python web framework for building APIs and web applications.",
      category: "Web Framework",
      experience: 80,
      projects: [
        {
          name: "Advizor",
          description:
            projectsData[2]?.description || "OCR and NLP processing backend",
          projectId: 3,
        },
      ],
    },
    "Spring Boot": {
      description: "Java framework for building production-ready applications.",
      category: "Web Framework",
      experience: 78,
      projects: [
        {
          name: "WSO2 API Manager",
          description:
            projectsData[0]?.description ||
            "Enterprise API management platform",
          projectId: 1,
        },
        {
          name: "B Airways",
          description:
            projectsData[3]?.description ||
            "Airline reservation system backend",
          projectId: 4,
        },
      ],
    },
    Flutter: {
      description: "UI toolkit for building natively compiled applications.",
      category: "Web Framework",
      experience: 80,
      projects: [
        {
          name: "IntelliNotes",
          description:
            projectsData[4]?.description ||
            "AI-powered notes application with Flutter",
          projectId: 5,
        },
      ],
    },
    Kotlin: {
      description:
        "Modern programming language for Android and server-side development.",
      category: "Web Framework",
      experience: 75,
      projects: [
        {
          name: "IntelliNotes",
          description: projectsData[4]?.description || "Mobile app development",
          projectId: 5,
        },
      ],
    },
    MySQL: {
      description:
        "Relational database management system for structured data storage.",
      category: "Database",
      experience: 82,
      projects: [
        {
          name: "Mental Bloom",
          description:
            projectsData[1]?.description ||
            "User data and therapy session storage",
          projectId: 2,
        },
        {
          name: "B Airways",
          description:
            projectsData[3]?.description ||
            "Flight and reservation data management",
          projectId: 4,
        },
      ],
    },
    MongoDB: {
      description: "NoSQL database for flexible, document-based data storage.",
      category: "Database",
      experience: 75,
      projects: [
        {
          name: "Mental Bloom",
          description:
            projectsData[1]?.description ||
            "Document storage for user profiles and content",
          projectId: 2,
        },
      ],
    },
    SQLite: {
      description: "Lightweight, file-based SQL database engine.",
      category: "Database",
      experience: 70,
      projects: [],
    },
    Git: {
      description:
        "Version control system for tracking code changes and collaboration.",
      category: "Version Control",
      experience: 90,
      projects: projectsData.map((p, idx) => ({
        name: p.title,
        description: `Version controlled with Git`,
        projectId: idx + 1,
      })),
    },
    GitHub: {
      description:
        "Platform for hosting and collaborating on Git repositories.",
      category: "Version Control",
      experience: 88,
      projects: projectsData.map((p, idx) => ({
        name: p.title,
        description: `Hosted on GitHub`,
        projectId: idx + 1,
      })),
    },
    Figma: {
      description: "Design tool for creating user interfaces and prototypes.",
      category: "Design Tool",
      experience: 80,
      projects: [
        {
          name: "Mental Bloom",
          description: "UI/UX design and prototyping",
          projectId: 2,
        },
        {
          name: "SpaceXplore",
          description: "Interface design for space travel booking",
          projectId: 7,
        },
      ],
    },
    "VS Code": {
      description: "Popular code editor with extensive extension support.",
      category: "Development Tool",
      experience: 92,
      projects: projectsData.map((p, idx) => ({
        name: p.title,
        description: `Developed using VS Code`,
        projectId: idx + 1,
      })),
    },
    IntelliJ: {
      description: "Integrated development environment for Java and Kotlin.",
      category: "Development Tool",
      experience: 85,
      projects: [
        {
          name: "WSO2 API Manager",
          description: "Java development with IntelliJ IDEA",
          projectId: 1,
        },
        {
          name: "B Airways",
          description: "Spring Boot development",
          projectId: 4,
        },
      ],
    },
    Jira: {
      description: "Project management and issue tracking tool.",
      category: "Tools",
      experience: 80,
      projects: [
        {
          name: "WSO2 API Manager",
          description: "Issue tracking and project management",
          projectId: 1,
        },
      ],
    },
    Axios: {
      description: "Promise-based HTTP client for making API requests.",
      category: "Web Framework",
      experience: 85,
      projects: [
        {
          name: "Mental Bloom",
          description: "API communication in frontend",
          projectId: 2,
        },
        {
          name: "SpaceXplore",
          description: "HTTP requests for booking system",
          projectId: 7,
        },
      ],
    },
    "HTML/CSS": {
      description: "Markup and styling languages for web development.",
      category: "Web Framework",
      experience: 90,
      projects: projectsData
        .filter((p) => [2, 3, 7].includes(p.id))
        .map((p) => ({
          name: p.title,
          description: "Frontend structure and styling",
          projectId: p.id,
        })),
    },
  };

  // Mouse controls
  let isDragging = false;
  let isRotating = false;
  let selectedNode = null;
  let selectedMesh = null;
  let mouse = new THREE.Vector2();
  let raycaster = new THREE.Raycaster();
  let previousMousePosition = { x: 0, y: 0 };
  let dragPlane = new THREE.Plane();
  let dragStartPosition = new THREE.Vector3();
  let mouseDownTime = 0;
  let mouseDownPosition = { x: 0, y: 0 };
  let isAnimatingCamera = false;
  let focusedNode = null;

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", onMouseUp);
  canvas.addEventListener("wheel", onWheel);
  canvas.addEventListener("click", onCanvasClick);

  function onMouseDown(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Store mouse down time and position to detect clicks vs drags
    mouseDownTime = Date.now();
    mouseDownPosition = { x: event.clientX, y: event.clientY };

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(nodeMeshes);

    if (intersects.length > 0) {
      isDragging = true;
      selectedMesh = intersects[0].object;
      selectedNode = selectedMesh.userData.node;
      selectedNode.fixed = true;
      selectedNode.vx = 0;
      selectedNode.vy = 0;
      selectedNode.vz = 0;

      // Activate physics on first drag
      if (!physicsActive) {
        physicsActive = true;
      }

      // Store initial position
      dragStartPosition.set(selectedNode.x, selectedNode.y, selectedNode.z);

      // Create a plane perpendicular to camera view for dragging
      const nodePosition = new THREE.Vector3(
        selectedNode.x,
        selectedNode.y,
        selectedNode.z
      );
      const cameraDirection = new THREE.Vector3();
      camera.getWorldDirection(cameraDirection);
      dragPlane.setFromNormalAndCoplanarPoint(cameraDirection, nodePosition);

      // Highlight selected node
      selectedMesh.material.emissive = new THREE.Color(0x444444);
      canvas.style.cursor = "grabbing";
    } else {
      isRotating = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    }
  }

  function onMouseMove(event) {
    if (isDragging && selectedNode && selectedMesh) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Update drag plane to current node position
      const currentPosition = new THREE.Vector3(
        selectedNode.x,
        selectedNode.y,
        selectedNode.z
      );
      const cameraDirection = new THREE.Vector3();
      camera.getWorldDirection(cameraDirection);
      dragPlane.setFromNormalAndCoplanarPoint(cameraDirection, currentPosition);

      // Intersect ray with plane
      const worldPosition = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(dragPlane, worldPosition)) {
        // Calculate movement delta
        const delta = new THREE.Vector3().subVectors(
          worldPosition,
          dragStartPosition
        );

        // Update node position
        selectedNode.x = dragStartPosition.x + delta.x;
        selectedNode.y = dragStartPosition.y + delta.y;
        selectedNode.z = dragStartPosition.z + delta.z;

        // Update drag start for next frame
        dragStartPosition.set(selectedNode.x, selectedNode.y, selectedNode.z);
      }

      // Keep node within reasonable bounds
      const distance = Math.sqrt(
        selectedNode.x * selectedNode.x +
          selectedNode.y * selectedNode.y +
          selectedNode.z * selectedNode.z
      );
      if (distance > SPHERE_RADIUS * 1.5) {
        const scale = (SPHERE_RADIUS * 1.5) / distance;
        selectedNode.x *= scale;
        selectedNode.y *= scale;
        selectedNode.z *= scale;
        dragStartPosition.set(selectedNode.x, selectedNode.y, selectedNode.z);
      }
    } else if (isRotating && !isDragging) {
      const deltaX = event.clientX - previousMousePosition.x;
      const deltaY = event.clientY - previousMousePosition.y;
      if (Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0) {
        const manualRotationSpeed = 0.005;
        const rotationAxis = new THREE.Vector3(-deltaY, deltaX, 0).normalize();
        const angle =
          manualRotationSpeed * Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        nodeGroup.rotateOnAxis(rotationAxis, angle);
        labelGroup.rotateOnAxis(rotationAxis, angle);
        edgeGroup.rotateOnAxis(rotationAxis, angle);
      }
      previousMousePosition = { x: event.clientX, y: event.clientY };
    }
  }

  function onMouseUp(event) {
    if (selectedNode && selectedMesh) {
      selectedNode.fixed = false;
      // Add a small velocity to help stabilization
      const stabilizationForce = 0.1;
      selectedNode.vx = (Math.random() - 0.5) * stabilizationForce;
      selectedNode.vy = (Math.random() - 0.5) * stabilizationForce;
      selectedNode.vz = (Math.random() - 0.5) * stabilizationForce;

      // Reset emissive
      selectedMesh.material.emissive = new THREE.Color(0x000000);
      selectedMesh = null;
      selectedNode = null;
    }
    isDragging = false;
    isRotating = false;
    canvas.style.cursor = "grab";

    // Reset previous mouse position to prevent jump on next drag
    previousMousePosition = { x: 0, y: 0 };
  }

  // Handle click (distinguish from drag)
  function onCanvasClick(event) {
    // Only treat as click if it was quick and didn't move much
    const clickDuration = Date.now() - mouseDownTime;
    const rect = canvas.getBoundingClientRect();
    const mouseMove = Math.sqrt(
      Math.pow(event.clientX - mouseDownPosition.x, 2) +
        Math.pow(event.clientY - mouseDownPosition.y, 2)
    );

    // If it was a quick click (less than 200ms) and didn't move much (less than 5px)
    if (clickDuration < 200 && mouseMove < 5 && !isAnimatingCamera) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const clickedNode = clickedMesh.userData.node;
        focusOnNode(clickedNode, clickedMesh);
      } else {
        // Clicked on background - close info panel and resume auto rotation
        closeTechInfo();
      }
    }
  }

  function onWheel(event) {
    if (isAnimatingCamera) return; // Prevent zoom during camera animation
    event.preventDefault();
    const zoomSpeed = 0.1;
    camera.position.multiplyScalar(1 + event.deltaY * zoomSpeed * 0.01);
    camera.position.clampLength(5, 25);
  }

  // Focus camera on a node
  function focusOnNode(node, mesh) {
    if (isAnimatingCamera) return;

    isAnimatingCamera = true;
    focusedNode = node;

    // Stop auto rotation when focusing on a node
    autoRotationEnabled = false;
    const toggleRotation = document.getElementById("toggle-rotation");
    if (toggleRotation) {
      toggleRotation.checked = false;
    }

    // Blur/unfocus other nodes
    blurOtherNodes(node.id, mesh);

    // Get node position in world space (account for node group rotation)
    const nodeLocalPosition = new THREE.Vector3(node.x, node.y, node.z);
    const nodeWorldPosition = new THREE.Vector3();
    nodeWorldPosition.copy(nodeLocalPosition);
    nodeWorldPosition.applyMatrix4(nodeGroup.matrixWorld);

    // Calculate target camera position
    // Position camera to the left and in front of the node
    // The node should appear on the left side of the screen
    // Calculate offset in world space (left = negative X, forward = positive Z, up = positive Y)
    const worldOffset = new THREE.Vector3(-2.5, 0.8, 1.8).normalize();
    const distance = 4.5; // Distance from node

    // Apply the offset in world space
    const targetCameraPosition = nodeWorldPosition
      .clone()
      .add(worldOffset.multiplyScalar(distance));

    // Store initial camera position
    const startPosition = camera.position.clone();

    // Animation parameters
    const duration = 1000; // 1 second
    const startTime = Date.now();

    function animateCamera() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease in out)
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      // Interpolate camera position
      camera.position.lerpVectors(startPosition, targetCameraPosition, ease);

      // Update node world position for lookAt (account for rotation)
      const currentNodeWorldPos = new THREE.Vector3(node.x, node.y, node.z);
      currentNodeWorldPos.applyMatrix4(nodeGroup.matrixWorld);
      camera.lookAt(currentNodeWorldPos);

      if (progress < 1) {
        requestAnimationFrame(animateCamera);
      } else {
        isAnimatingCamera = false;
      }
    }

    animateCamera();

    // Show info panel
    showTechInfo(node.id);
  }

  // Blur/unfocus other nodes when one is focused
  function blurOtherNodes(focusedNodeId, focusedMesh) {
    const blurOpacity = 0.3; // Reduced opacity for blurred nodes
    const blurScale = 0.7; // Scale down blurred nodes
    const focusScale = 1.2; // Scale up focused node
    const focusEmissive = 0.4; // Emissive intensity for focused node
    const originalLabelScale = { x: 3.6, y: 0.9, z: 1 }; // Original label scale

    techData.nodes.forEach((node) => {
      const nodeData = nodeMap.get(node.id);
      if (nodeData && nodeData.mesh) {
        const material = nodeData.mesh.userData.material;
        const label = labelGroup.children.find(
          (s) => s.userData && s.userData.node && s.userData.node.id === node.id
        );

        if (node.id === focusedNodeId) {
          // Highlight focused node
          material.opacity = 1.0;
          material.transparent = true;
          if (material.emissive) {
            material.emissiveIntensity = focusEmissive;
          }
          nodeData.mesh.scale.set(focusScale, focusScale, focusScale);

          // Show label for focused node - scale proportionally
          if (label) {
            label.material.opacity = 1.0;
            label.scale.set(
              originalLabelScale.x * 1.2,
              originalLabelScale.y * 1.2,
              originalLabelScale.z
            );
          }
        } else {
          // Blur other nodes
          material.opacity = blurOpacity;
          material.transparent = true;
          if (material.emissive) {
            material.emissiveIntensity = 0.1;
          }
          nodeData.mesh.scale.set(blurScale, blurScale, blurScale);

          // Hide or dim labels for other nodes - scale proportionally
          if (label) {
            label.material.opacity = blurOpacity * 0.6;
            label.scale.set(
              originalLabelScale.x * 0.6,
              originalLabelScale.y * 0.6,
              originalLabelScale.z
            );
          }
        }
      }
    });

    // Also blur edges
    edgeGroup.children.forEach((line) => {
      if (line.userData.material) {
        const isConnectedToFocused =
          line.userData.source.id === focusedNodeId ||
          line.userData.target.id === focusedNodeId;

        if (isConnectedToFocused) {
          // Keep edges connected to focused node more visible
          line.userData.material.opacity = 0.5;
        } else {
          // Blur other edges
          line.userData.material.opacity = 0.15;
        }
      }
    });
  }

  // Reset all nodes to normal state
  function resetNodesBlur() {
    const originalLabelScale = { x: 3.6, y: 0.9, z: 1 }; // Original label scale

    techData.nodes.forEach((node) => {
      const nodeData = nodeMap.get(node.id);
      if (nodeData && nodeData.mesh) {
        const material = nodeData.mesh.userData.material;
        material.opacity = 1.0;
        material.transparent = false;
        if (material.emissive) {
          material.emissiveIntensity = 0.2;
        }
        nodeData.mesh.scale.set(1, 1, 1);

        // Reset labels to original scale
        const label = labelGroup.children.find(
          (s) => s.userData && s.userData.node && s.userData.node.id === node.id
        );
        if (label) {
          label.material.opacity = 1.0;
          label.scale.set(
            originalLabelScale.x,
            originalLabelScale.y,
            originalLabelScale.z
          );
        }
      }
    });

    // Reset edges
    edgeGroup.children.forEach((line) => {
      if (line.userData.material) {
        line.userData.material.opacity = 0.6;
      }
    });
  }

  // Show tech info panel
  function showTechInfo(techId) {
    const infoPanel = document.getElementById("tech-info-panel");
    const infoContent = document.getElementById("tech-info-content");

    if (!infoPanel || !infoContent) return;

    const info = techInfo[techId];
    if (!info) {
      // Default info if not found
      infoContent.innerHTML = `
        <h2>${techId}</h2>
        <span class="tech-category">Technology</span>
        <p class="tech-description">Click on any technology node to see detailed information about projects and experience.</p>
      `;
    } else {
      // Build projects HTML
      let projectsHTML = "";
      if (info.projects && info.projects.length > 0) {
        projectsHTML = `
          <div class="projects-section">
            <h3>Projects</h3>
            ${info.projects
              .map((project) => {
                const projectData = project.projectId
                  ? projectsData[project.projectId - 1]
                  : null;
                return `
              <div class="project-item" ${
                project.projectId
                  ? `data-project-id="${project.projectId}"`
                  : ""
              }>
                <h4>${project.name}</h4>
                <p>${project.description}</p>
                ${
                  projectData
                    ? `
                  <div class="project-links" style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
                    ${
                      projectData.demoUrl
                        ? `<a href="${projectData.demoUrl}" target="_blank" style="color: var(--primary); text-decoration: none; font-size: 0.85rem;">Demo →</a>`
                        : ""
                    }
                    ${
                      projectData.githubUrl
                        ? `<a href="${projectData.githubUrl}" target="_blank" style="color: var(--primary); text-decoration: none; font-size: 0.85rem;">GitHub →</a>`
                        : ""
                    }
                  </div>
                `
                    : ""
                }
              </div>
            `;
              })
              .join("")}
          </div>
        `;
      }

      // Build experience level HTML
      const experienceHTML = `
        <div class="experience-level">
          <h3>Experience Level</h3>
          <div class="experience-bar">
            <div class="experience-fill" style="width: ${info.experience}%"></div>
          </div>
          <p style="margin-top: 0.5rem; color: var(--secondary);">${info.experience}%</p>
        </div>
      `;

      infoContent.innerHTML = `
        <h2>${techId}</h2>
        <span class="tech-category">${info.category}</span>
        <p class="tech-description">${info.description}</p>
        ${projectsHTML}
        ${experienceHTML}
      `;
    }

    // Show panel
    infoPanel.classList.add("active");
  }

  // Close info panel
  function closeTechInfo() {
    const infoPanel = document.getElementById("tech-info-panel");
    if (infoPanel) {
      infoPanel.classList.remove("active");
    }

    // Reset nodes blur
    resetNodesBlur();

    // Reset camera to original position
    if (focusedNode) {
      resetCamera();
      focusedNode = null;
    }

    // Resume auto rotation by default
    autoRotationEnabled = true;
    const toggleRotation = document.getElementById("toggle-rotation");
    if (toggleRotation) {
      toggleRotation.checked = true;
    }
  }

  // Reset camera to original position
  function resetCamera() {
    if (isAnimatingCamera) return;

    isAnimatingCamera = true;
    const startPosition = camera.position.clone();
    const targetPosition = new THREE.Vector3(0, 2, 15);

    const duration = 1000;
    const startTime = Date.now();

    function animateCamera() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      camera.position.lerpVectors(startPosition, targetPosition, ease);
      camera.lookAt(0, 0, 0);

      if (progress < 1) {
        requestAnimationFrame(animateCamera);
      } else {
        isAnimatingCamera = false;
      }
    }

    animateCamera();
  }

  // Setup close button
  const closeInfoBtn = document.getElementById("close-info-panel");
  if (closeInfoBtn) {
    closeInfoBtn.addEventListener("click", closeTechInfo);
  }

  // Physics simulation
  function updatePhysics() {
    // Spring forces between connected nodes
    techData.links.forEach((link) => {
      const source = nodeMap.get(link.source);
      const target = nodeMap.get(link.target);
      if (!source || !target) return;

      const sourceNode = source.node;
      const targetNode = target.node;

      const dx = targetNode.x - sourceNode.x;
      const dy = targetNode.y - sourceNode.y;
      const dz = targetNode.z - sourceNode.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance > 0) {
        const force = (distance - SPRING_LENGTH) * SPRING_STRENGTH;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        const fz = (dz / distance) * force;

        if (!sourceNode.fixed) {
          sourceNode.vx += fx;
          sourceNode.vy += fy;
          sourceNode.vz += fz;
        }
        if (!targetNode.fixed) {
          targetNode.vx -= fx;
          targetNode.vy -= fy;
          targetNode.vz -= fz;
        }
      }
    });

    // Repulsion between all nodes
    for (let i = 0; i < techData.nodes.length; i++) {
      for (let j = i + 1; j < techData.nodes.length; j++) {
        const nodeA = techData.nodes[i];
        const nodeB = techData.nodes[j];

        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const dz = nodeB.z - nodeA.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance > 0 && distance < REPULSION_DISTANCE) {
          const force =
            ((REPULSION_DISTANCE - distance) / REPULSION_DISTANCE) *
            REPULSION_STRENGTH;
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          const fz = (dz / distance) * force;

          if (!nodeA.fixed) {
            nodeA.vx -= fx;
            nodeA.vy -= fy;
            nodeA.vz -= fz;
          }
          if (!nodeB.fixed) {
            nodeB.vx += fx;
            nodeB.vy += fy;
            nodeB.vz += fz;
          }
        }
      }
    }

    // Center force (pull nodes toward center)
    techData.nodes.forEach((node) => {
      if (node.fixed) return;

      const distance = Math.sqrt(
        node.x * node.x + node.y * node.y + node.z * node.z
      );
      if (distance > SPHERE_RADIUS) {
        const force = (distance - SPHERE_RADIUS) * CENTER_FORCE;
        node.vx -= (node.x / distance) * force;
        node.vy -= (node.y / distance) * force;
        node.vz -= (node.z / distance) * force;
      }
    });

    // Update positions
    techData.nodes.forEach((node) => {
      if (node.fixed) return;

      // Apply damping
      node.vx *= DAMPING;
      node.vy *= DAMPING;
      node.vz *= DAMPING;

      // Limit velocity
      const velocity = Math.sqrt(
        node.vx * node.vx + node.vy * node.vy + node.vz * node.vz
      );
      if (velocity > MAX_VELOCITY) {
        const scale = MAX_VELOCITY / velocity;
        node.vx *= scale;
        node.vy *= scale;
        node.vz *= scale;
      }

      // Update position
      node.x += node.vx;
      node.y += node.vy;
      node.z += node.vz;

      // Stop very small movements (stabilization)
      if (
        Math.abs(node.vx) < 0.001 &&
        Math.abs(node.vy) < 0.001 &&
        Math.abs(node.vz) < 0.001
      ) {
        node.vx = 0;
        node.vy = 0;
        node.vz = 0;
      }
    });
  }

  // Update colors from theme
  let lastColorUpdate = 0;
  const COLOR_UPDATE_INTERVAL = 100; // Update colors every 100ms

  function updateColorsFromTheme() {
    const now = Date.now();
    if (now - lastColorUpdate < COLOR_UPDATE_INTERVAL) return;
    lastColorUpdate = now;

    // Update node colors
    techData.nodes.forEach((node) => {
      const nodeData = nodeMap.get(node.id);
      if (nodeData && nodeData.mesh) {
        const newColor = getCategoryColor(node.category);
        const material = nodeData.mesh.userData.material;
        if (material) {
          // Update base color
          material.color.setHex(newColor);
          // Update emissive if it exists
          if (material.emissive) {
            material.emissive.setHex(newColor);
          }
        }
      }
    });

    // Update edge colors
    const baseEdgeColor = getThemeColor("--primary");
    const edgeColor = brightenColor(baseEdgeColor, 1.4);
    edgeGroup.children.forEach((line) => {
      if (line.userData.material) {
        line.userData.material.color.setHex(edgeColor);
      }
    });

    // Update text sprite colors
    labelGroup.children.forEach((sprite) => {
      if (sprite.userData && sprite.userData.updateColor) {
        sprite.userData.updateColor();
        // Force texture update
        if (sprite.userData.texture) {
          sprite.userData.texture.needsUpdate = true;
        }
      }
    });
  }

  // Update visual positions
  function updateVisuals() {
    // Update colors from theme
    updateColorsFromTheme();

    techData.nodes.forEach((node) => {
      const nodeData = nodeMap.get(node.id);
      if (nodeData) {
        nodeData.mesh.position.set(node.x, node.y, node.z);
        const label = labelGroup.children.find(
          (s) => s.userData && s.userData.node && s.userData.node.id === node.id
        );
        if (label) {
          label.position.copy(nodeData.mesh.position);
          label.position.multiplyScalar(1.3);
          // Always update lookAt to face camera (prevents slanted appearance)
          label.lookAt(camera.position);
        }
      }
    });

    // Update edges
    techData.links.forEach((link, index) => {
      const line = edgeGroup.children[index];
      if (line) {
        const source = nodeMap.get(link.source);
        const target = nodeMap.get(link.target);
        if (source && target) {
          const positions = new Float32Array([
            source.node.x,
            source.node.y,
            source.node.z,
            target.node.x,
            target.node.y,
            target.node.z,
          ]);
          line.geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
          );
          line.geometry.attributes.position.needsUpdate = true;
        }
      }
    });
  }

  // Auto rotation
  function updateAutoRotation() {
    if (
      autoRotationEnabled &&
      !isDragging &&
      !isRotating &&
      !isAnimatingCamera
    ) {
      const rotationAxis = new THREE.Vector3(0, 1, 0.2).normalize();
      const angle = 0.002 * rotationSpeed;
      nodeGroup.rotateOnAxis(rotationAxis, angle);
      labelGroup.rotateOnAxis(rotationAxis, angle);
      edgeGroup.rotateOnAxis(rotationAxis, angle);
    }
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Auto rotation
    updateAutoRotation();

    // Only run physics if it's been activated (after first drag) and enabled
    if (physicsActive && physicsEnabled && !isDragging) {
      updatePhysics();
    }
    updateVisuals();

    renderer.render(scene, camera);
  }

  // Setup controls UI
  const controlsToggle = document.getElementById("globe-controls-toggle");
  const controlsPanel = document.getElementById("globe-controls-panel");
  const togglePhysics = document.getElementById("toggle-physics");
  const toggleRotation = document.getElementById("toggle-rotation");
  const rotationSpeedSlider = document.getElementById("rotation-speed");
  const rotationSpeedValue = document.getElementById("rotation-speed-value");

  if (controlsToggle && controlsPanel) {
    controlsToggle.addEventListener("click", () => {
      controlsPanel.classList.toggle("active");
    });

    // Close panel when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !controlsPanel.contains(e.target) &&
        !controlsToggle.contains(e.target)
      ) {
        controlsPanel.classList.remove("active");
      }
    });
  }

  if (togglePhysics) {
    togglePhysics.addEventListener("change", (e) => {
      physicsEnabled = e.target.checked;
    });
  }

  if (toggleRotation) {
    toggleRotation.addEventListener("change", (e) => {
      autoRotationEnabled = e.target.checked;
    });
  }

  if (rotationSpeedSlider && rotationSpeedValue) {
    rotationSpeedSlider.addEventListener("input", (e) => {
      rotationSpeed = parseFloat(e.target.value);
      rotationSpeedValue.textContent = rotationSpeed.toFixed(1);
    });
  }

  // Handle resize
  function handleResize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener("resize", handleResize);

  // Start animation
  animate();
}
