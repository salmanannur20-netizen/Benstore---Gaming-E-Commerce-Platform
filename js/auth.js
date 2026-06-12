/**
 * Benstore — Auth System (Simulation)
 */

const Auth = {
  STORAGE_KEY: "benstore_user",

  getUser() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  login(email, password) {
    // Simulation only
    if (email && password) {
      const user = {
        id: Date.now(),
        name: email.split("@")[0],
        email: email,
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  },

  register(name, email, password) {
    if (name && email && password) {
      const user = {
        id: Date.now(),
        name: name,
        email: email,
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.href = resolveAssetPath("index.html");
  },

  updateUI() {
    const user = this.getUser();
    const userGreeting = document.getElementById("userGreeting");
    const userDropdown = document.getElementById("userDropdown");
    const loginLink = document.getElementById("loginLink");

    if (user) {
      if (userGreeting) userGreeting.textContent = `Hi, ${user.name}`;
      if (loginLink) loginLink.style.display = "none";
      if (userDropdown) {
        userDropdown.innerHTML = `
                    <a href="#"><i class="fas fa-user-circle"></i> Profile</a>
                    <a href="#"><i class="fas fa-box"></i> My Orders</a>
                    <hr>
                    <a href="#" onclick="Auth.logout(); return false;"><i class="fas fa-sign-out-alt"></i> Logout</a>
                `;
      }
    } else {
      if (userGreeting) userGreeting.textContent = "";
      if (userDropdown) {
        userDropdown.innerHTML = `
                    <a href="${resolveAssetPath("pages/login.html")}"><i class="fas fa-sign-in-alt"></i> Login</a>
                    <a href="${resolveAssetPath("pages/register.html")}"><i class="fas fa-user-plus"></i> Register</a>
                `;
      }
    }
  },

  init() {
    this.updateUI();

    // User icon toggle dropdown
    const userIcon = document.getElementById("userIcon");
    const userDropdown = document.getElementById("userDropdown");

    if (userIcon && userDropdown) {
      userIcon.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        userDropdown.classList.toggle("active");
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", () => {
        userDropdown.classList.remove("active");
      });

      userDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  },
};

// Handle forms if we are on auth pages
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (Auth.login(email, password)) {
        showToast("Login successful!", "success");
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1000);
      } else {
        showToast("Invalid credentials", "error");
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        showToast("Passwords do not match", "error");
        return;
      }

      if (Auth.register(name, email, password)) {
        showToast("Registration successful!", "success");
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1000);
      }
    });
  }
});
