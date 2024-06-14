document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav ul li a");
  const pages = document.querySelectorAll(".page");

  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      const target = link.getAttribute("data-target");
      if (target) {
        event.preventDefault();
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
});

function selectProfile(imageSrc) {
  const selectedProfileDiv = document.getElementById("selected-profile");
  const selectedProfileImg = document.getElementById("selected-profile-img");

  selectedProfileImg.src = imageSrc;
  selectedProfileDiv.style.display = "block";
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

function saveProfilePicture() {
  const selectedProfileImg = document.getElementById("selected-profile-img");
  // Add code here to save the selected profile picture
  alert("Profile picture saved: " + selectedProfileImg.src);
}

// Saving personal information
document.getElementById('save-info-button').addEventListener('click', () => {
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const linkedinProfile = document.getElementById('linkedin-profile').value;
  const email = document.getElementById('email').value;
  const aboutMe = document.getElementById('about-me').value;

  // Add code here to save the personal information
  alert('Personal information saved.');
});

// Changing password
document.getElementById('change-password-button').addEventListener('click', () => {
  const oldPassword = document.getElementById('old-password').value;
  const newPassword = document.getElementById('new-password').value;

  // Add code here to handle password change
  alert('Password changed successfully.');
});

document.getElementById('change-password-button').addEventListener('click', async () => {
  const email = document.getElementById('email').value; // Assumes email is already filled
  const oldPassword = document.getElementById('old-password').value;
  const newPassword = document.getElementById('new-password').value;

  const response = await fetch('/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, oldPassword, newPassword })
  });

  const result = await response.json();
  if (response.ok) {
    alert('Password changed successfully.');
  } else {
    alert('Error: ' + result.error);
  }
});
