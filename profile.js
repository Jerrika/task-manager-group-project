document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav ul li a");
  const pages = document.querySelectorAll(".page");

  // Function to handle navigation link clicks
  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      const target = link.getAttribute("data-target");
      if (target) {
        event.preventDefault();
        // Hide all pages except the target
        pages.forEach(page => {
          page.style.display = (page.id === target) ? "block" : "none";
        });
      }
    });
  });

  // Display the profile picture page by default
  pages.forEach(page => {
    page.style.display = (page.id === "profile-picture") ? "block" : "none";
  });

  // Load profile pictures from JSON
  loadProfilePictures();
});

function loadProfilePictures() {
  const providedPicturesDiv = document.getElementById('provided-pictures');
  const avatarData = [
    {
      "id": 1,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Jasmine"
    },
    {
      "id": 2,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Princess"
    },
    {
      "id": 3,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Lilly"
    },
    {
      "id": 4,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Tinkerbell"
    },
    {
      "id": 5,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Charlie"
    },
    {
      "id": 6,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Bella"
    },
    {
      "id": 7,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Pepper"
    },
    {
      "id": 8,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Lily"
    },
    {
      "id": 9,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Mittens"
    },
    {
      "id": 10,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Chloe"
    },
    {
      "id": 11,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Bailey"
    },
    {
      "id": 12,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Sasha"
    },
    {
      "id": 13,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Milo"
    },
    {
      "id": 14,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Gracie"
    },
    {
      "id": 15,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Tigger"
    },
    {
      "id": 16,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Sadie"
    },
    {
      "id": 17,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Smokey"
    },
    {
      "id": 18,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Mimi"
    },
    {
      "id": 19,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Oscar"
    },
    {
      "id": 20,
      "url": "https://api.dicebear.com/9.x/big-smile/svg?seed=Peanut"
    }
  ];

  avatarData.forEach(avatar => {
    const img = document.createElement('img');
    img.src = avatar.url;
    img.alt = `Picture ${avatar.id}`;
    img.className = 'profile-pic';
    img.onclick = () => selectProfile(avatar.url);
    providedPicturesDiv.appendChild(img);
  });
}

function selectProfile(imageSrc) {
  const selectedProfileDiv = document.getElementById("selected-profile");
  const selectedProfileImg = document.getElementById("selected-profile-img");

  selectedProfileImg.src = imageSrc;
  selectedProfileDiv.style.display = "block"; // Ensure the profile section is visible
}

function displayUploadedPicture(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      selectProfile(e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

async function saveProfilePicture() {
  const selectedProfileImg = document.getElementById("selected-profile-img").src;
  const email = document.getElementById("email").value;

  const response = await fetch('http://localhost:3000/save-profile-picture', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ profilePicture: selectedProfileImg, email })
  });

  const result = await response.json();
  if (response.ok) {
    alert('Profile picture saved successfully.');
  } else {
    alert('Error: ' + result.error);
  }
}

// Saving personal information
document.getElementById('save-info-button').addEventListener('click', async () => {
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const linkedinProfile = document.getElementById('linkedin-profile').value;
  const email = document.getElementById('email').value;
  const aboutMe = document.getElementById('about-me').value;

  const response = await fetch('http://localhost:3000/save-personal-info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ firstName, lastName, linkedinProfile, email, aboutMe })
  });

  const result = await response.json();
  if (response.ok) {
    alert('Personal information saved successfully.');
  } else {
    alert('Error: ' + result.error);
  }
});
