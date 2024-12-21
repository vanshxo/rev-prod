import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithPopup, 
    GoogleAuthProvider, 
    setPersistence, 
    browserSessionPersistence, 
    signOut ,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  import { app } from "./firebaseConfig.js";
  
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();


const forms = document.querySelector(".forms"),
  pwShowHide = document.querySelectorAll(".eye-icon"),
  links = document.querySelectorAll(".link");
// Add click event listener to each eye icon for toggling password visibility
pwShowHide.forEach(eyeIcon => {
  eyeIcon.addEventListener("click", () => {
    let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach(password => {
      if (password.type === "password") { // If password is hidden
        password.type = "text"; // Show password
        eyeIcon.classList.replace("bx-hide", "bx-show"); // Change icon to show state
        return;
      }
      password.type = "password"; // Hide password
      eyeIcon.classList.replace("bx-show", "bx-hide"); // Change icon to hide state
    });

  });
});

// // Add click event listener to each link to toggle between forms
// links.forEach(link => {
//   link.addEventListener("click", e => {
//     e.preventDefault(); // Prevent default link behavior
//     forms.classList.toggle("show-signup");
//   });
// });

const register_btn=document.getElementById("register")
const login_google=document.getElementById("login-google")

login_google.addEventListener("click", () => {

    setPersistence(auth, browserSessionPersistence)
    .then(() => signInWithPopup(auth, provider))
    .then((result) => {
      const user = result.user;
      console.log("User signed in: ", user);
      
      alert(`Welcome, ${user.displayName}!`);
      setTimeout(()=>{
        window.location.href = "index.html";
      },2000)
      
      
    })
    .catch((error) => {
      console.error("Error during login: ", error);
      alert("Login Error: " + error.message);
    });

});





  

  document.getElementById("signupForm").addEventListener("submit", (event) => {
    event.preventDefault(); 
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    // Validate passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    if (password.length < 6) {
      alert("Password should be at least 6 characters.");
      return;
    }
  
    // Create a new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(`Signup successful! Welcome, ${user.email}`);
        window.location.href = "index.html";
        
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("This email is already registered. Please log in instead.");
        } else {
          console.error("Signup Error: ", error.message);
          alert(error.message);
        }
      });
  });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User signed in: ", user);
      register_btn.textContent="REGISTERED!!!"
        
    } else {
      console.log("No user signed in.");
      
    }
  });