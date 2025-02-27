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
    "Trainer",
  ];
  const rightRoles = [
    "Software Developer",
    "Writer",
    "Frontend Engineer",
    "Mentor",
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
            document.getElementById('constructionModal').style.display = 'none';
        }

setTimeout(function() {
            document.getElementById('constructionModal').style.display = 'flex';
        }, 5000);

        // Create animated construction GIF programmatically
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');
        
        // Simple construction animation
        let frame = 0;
        function drawFrame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Background
            ctx.fillStyle = '#ffdd00';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Construction barrier stripes
            const stripeHeight = 20;
            const numStripes = Math.ceil(canvas.height / (stripeHeight * 2));
            
            for(let i = 0; i < numStripes; i++) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, i * stripeHeight * 2 + Math.sin(frame/10 + i) * 5, canvas.width, stripeHeight);
            }
            
            // Construction icon
            ctx.fillStyle = '#ff4400';
            ctx.beginPath();
            ctx.arc(100, 75 + Math.sin(frame/5) * 3, 30, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = 'white';
            ctx.font = 'bold 30px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('⚠️', 100, 75);
            
            frame++;
            
            // Update image source with new frame
            const gif = document.querySelector('.construction-gif');
            gif.src = canvas.toDataURL();
            
            setTimeout(drawFrame, 50);
        }
        
        // Start animation when page loads
        window.onload = drawFrame;

const projectsData = [
  {
    id: 1,
    title: "Throttle Policy Reset Support for WSO2 API Manager",
    description:
      "Application Owners can reset their application throttle policies for a specific user upon their request and enable further API invocations without waiting for the throttling time period to expire.",
    image: "/images/m-apimanager.png",
    demoUrl: "https://medium.com/@chanukachandrayapa/introducing-application-throttle-policy-reset-support-for-wso2-api-manager-75385dce18b2",
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
    githubUrl: "https://github.com/Chanuka-ChandraYapa/AirLine_Reservation_System_Project",
  },
  {
    id: 5,
    title: "IntelliNotes",
    description:
      "IntelliNotes is a Flutter-based notes application that integrates AI assistance to help users manage their notes efficiently. The app allows users to write, view, and store notes, and it also leverages AI-powered responses to summarize, analyze, and offer insightful suggestions based on the content of the notes. By interacting with an AI model (such as Hugging Face's Mistral-7B), IntelliNotes makes your note-taking experience more engaging and productive by providing personalized assistance based on the notes you've written.",
    image: "/images/m-cover.png",
    demoUrl: "https://github.com/Chanuka-ChandraYapa/IntelliNotes/releases/tag/v1.0.0-alpha",
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

const moviemodal = document.getElementById('themeModal');

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
    moviemodal.style.display = 'block';
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

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('mousemove', function(e) {
        document.querySelectorAll('.card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });
});

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to estimate reading time (rough estimate)
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes + ' min read';
}

// Function to create article cards
function createArticleCard(article) {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Create image placeholder or use article image if available
    const imageUrl = article.thumbnail || `/api/placeholder/600/400`;
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${article.title}" class="card-img">
        <div class="card-content">
            <h2 class="card-title">${article.title}</h2>
            <p class="card-excerpt">${article.excerpt || 'No excerpt available'}</p>
            <div class="card-meta">
                <span class="card-date">${formatDate(article.pubDate)}</span>
                <span class="card-reading-time">${calculateReadingTime(article.description || article.excerpt || article.title)}</span>
            </div>
        </div>
        <a href="${article.link}" target="_blank" class="card-link">Read More</a>
    `;
    
    return card;
}

// Function to fetch Medium articles using RSS to JSON converter
async function fetchMediumArticles(username = '@medium') {
    const container = document.getElementById('articlesContainer');
    container.innerHTML = '<div class="loading">Loading articles...</div>';
    
    try {
        // Use RSS to JSON API to fetch Medium feed
        // Replace 'yourusername' with your actual Medium username
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${username}`);
        const data = await response.json();
        
        if (data.status === 'ok') {
            container.innerHTML = '';
            
            data.items.forEach(article => {
                // Extract thumbnail image from content if available
                const imgRegex = /<img[^>]+src="([^">]+)"/;
                const match = article.content.match(imgRegex);
                if (match) {
                    article.thumbnail = match[1];
                }
                
                // Extract excerpt
                const div = document.createElement('div');
                div.innerHTML = article.content;
                const text = div.textContent || div.innerText || '';
                article.excerpt = text.substring(0, 150) + '...';
                
                const card = createArticleCard(article);
                container.appendChild(card);
            });
        } else {
            throw new Error('Could not fetch articles');
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
        container.innerHTML = `<div class="error">Error loading articles. Please try again later.</div>`;
    }
}

// Function to handle mouse movement for skew effect
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('mousemove', function(e) {
        document.querySelectorAll('.card').forEach(card => {
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
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
    });
    
    // Reset card position when mouse leaves
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});

// Call function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Replace '@medium' with your Medium username (e.g., '@yourusername')
    fetchMediumArticles('@chanukachandrayapa');
    
    // You can also provide a custom username through the UI if needed
    // For example, adding a form to let users enter their Medium username
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the span containing the cat image
    const catSpan = document.querySelector('.blog-head span');
    const blogHead = document.querySelector('.blog-head');
    const originalText = blogHead.childNodes[0].textContent; // Store the original "Blogs" text
    
    // Add click event to the cat image span
    catSpan.addEventListener('click', function() {

        // Check if input is already present
        if (!document.querySelector('#nameInput')) {
            // Create an input element

            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'nameInput';
            input.placeholder = 'Your medium username';
            input.style.marginRight = '10px';
            input.style.padding = '5px';
            input.style.borderRadius = '4px';
            input.style.border = '1px solid #ccc';
            input.style.fontSize = '16px';
            
            // Insert the input before the text
            blogHead.insertBefore(input, blogHead.firstChild);
            
            // Focus on the input field
            input.focus();
            
            // Add event listener for the Enter key
            input.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    const userName = input.value.trim();
                    if (userName) {
                        // Update the heading text
                        blogHead.firstChild.textContent = '';
                        // blogHead.insertBefore(document.createTextNode(userName + "'s Blogs"), catSpan);
                        
                        // Remove the input field
                        input.remove();
                        
                        // Fetch that user's Medium articles (if applicable)
                        fetchMediumArticles('@' + userName.toLowerCase().replace(/\s+/g, ''));
                    } else {
                        // If empty input, revert to original
                        input.remove();
                        blogHead.insertBefore(document.createTextNode(originalText), catSpan);
                    }
                }
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
  // Modal elements
  const moviemodal = document.getElementById('themeModal');
  const openBtn = document.getElementById('openThemeModal');
  const closeBtn = document.querySelector('.movie-close');
  const movieInput = document.getElementById('movieInput');
  const searchBtn = document.getElementById('movie-searchBtn');
  const loading = document.getElementById('movie-loading');
  const error = document.getElementById('movie-error');

  // API Key for OMDb
  const apiKey = '16532318';

  // Open modal when button is clicked
  openBtn.addEventListener('click', () => {
    moviemodal.style.display = 'block';
  });

  // Close modal when X is clicked
  closeBtn.addEventListener('click', () => {
    moviemodal.style.display = 'none';
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      moviemodal.style.display = 'none';
    }
  });

  // Handle movie search
  searchBtn.addEventListener('click', searchMovie);
  movieInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchMovie();
      moviemodal.style.display = 'none';
    }
  });

  function searchMovie() {
    const title = movieInput.value.trim();
    if (!title) return;

    // Reset UI
    error.style.display = 'none';
    loading.style.display = 'block';

    // Fetch movie data from OMDb API
    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'False') {
          showError(data.Error || 'Movie not found');
          return;
        }

        if (data.Poster === 'N/A') {
          showError('No poster available for this movie');
          return;
        }

        // Create image element to load the poster
        const posterImg = new Image();
        posterImg.crossOrigin = 'Anonymous';
        posterImg.src = data.Poster;
        posterImg.setAttribute('crossOrigin', '');
        
        posterImg.onload = function() {
          extractDominantColors(posterImg);
        };

        posterImg.onerror = function() {
          showError('Could not load movie poster');
        };
      })
      .catch(err => {
        showError('Error fetching movie data. Please try again.');
        console.error(err);
      });
  }

  function showError(message) {
    loading.style.display = 'none';
    error.textContent = message;
    error.style.display = 'block';
  }

  function extractDominantColors(imageElement) {
    // Create a canvas element to draw the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
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
    const skipFactor = Math.max(1, Math.floor((canvas.width * canvas.height) / 100000));
    
    for (let i = 0; i < pixelData.length; i += 4 * skipFactor) {
      const r = pixelData[i];
      const g = pixelData[i + 1];
      const b = pixelData[i + 2];
      
      // Skip very dark or very light colors
      if ((r + g + b) < 30 || (r + g + b) > 720) continue;
      
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
          count: 1
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
    
    // Close modal and show success
    loading.style.display = 'none';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 1000);
  }

  function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function applyTheme(colors) {
    if (!colors || colors.length < 4) return;
    
    // Calculate text color for contrast
    const primary = colors[0];
    const brightness = (primary.r * 299 + primary.g * 587 + primary.b * 114) / 1000;
    const textColor = brightness > 128 ? '#222' : '#fff';
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
    adjustColorDifference(primary,secondary, 30);
    
    // Apply colors to CSS variables
    document.documentElement.style.setProperty('--primary', rgbToHex(colors[0].r, colors[0].g, colors[0].b));
    document.documentElement.style.setProperty('--secondary', rgbToHex(colors[1].r, colors[1].g, colors[1].b));
    document.documentElement.style.setProperty('--accent', rgbToHex(colors[2].r, colors[2].g, colors[2].b));
    document.documentElement.style.setProperty('--background', rgbToHex(colors[3].r, colors[3].g, colors[3].b));
    document.documentElement.style.setProperty('--text', textColor);
  }
});

