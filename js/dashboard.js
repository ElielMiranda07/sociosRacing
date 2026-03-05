const firebaseConfig = {
  apiKey: "AIzaSyDCqe24Tu4-BKrxykDwTQvbDVIpoPBD8cY",
  authDomain: "reactss-26771.firebaseapp.com",
  projectId: "reactss-26771",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const doc = await db.collection("socios").doc(user.uid).get();

  if (!doc.exists) {
    alert("No existe información del socio");
    return;
  }

  const data = doc.data();

  if (data.primerLogin === true) {
    window.location.href = "cambiarPassword.html";
    return;
  }

  // Cargar datos
  document.getElementById("saludo").innerText =
    `Hola, ${data.nombre} ${data.apellido}`;

  document.getElementById("estadoCuota").innerText =
    `Estado de cuota: ${data.estadoCuota}`;

  document.getElementById("vencimiento").innerText =
    `Vencimiento: ${data.vencimiento}`;
});

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "index.html";
    });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });
}
