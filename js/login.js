const firebaseConfig = {
  apiKey: "AIzaSyDCqe24Tu4-BKrxykDwTQvbDVIpoPBD8cY",
  authDomain: "reactss-26771.firebaseapp.com",
  projectId: "reactss-26771",
};

firebase.initializeApp(firebaseConfig);

function login() {
  const dni = document.getElementById("dni").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error");

  if (!dni || !password) {
    errorMsg.textContent = "Complete todos los campos.";
    return;
  }

  // Convertimos DNI a email técnico
  const email = `dni_${dni}@socios.racing`;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      errorMsg.textContent = "DNI o contraseña incorrectos.";
      console.error(error);
    });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch((err) => console.log("Error SW:", err));
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });
}

const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

toggle.addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
});
