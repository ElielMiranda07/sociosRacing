const db = firebase.firestore();

firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const doc = await db.collection("socios").doc(user.uid).get();

  if (!doc.exists) {
    alert("No existe información del socio");
    return;
  }

  const data = doc.data();

  // 👉 FORZAR CAMBIO DE CONTRASEÑA
  if (data.primerLogin === true) {
    window.location.href = "cambiarPassword.html";
    return;
  }

  // 👉 Cargar datos normales
  document.getElementById("nombreSocio").innerText = data.nombre;
  document.getElementById("estadoCuota").innerText = data.estadoCuota;
});

function cargarDatos(uid) {
  db.collection("socios")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();

        document.getElementById("saludo").textContent =
          `Hola, ${data.nombre} ${data.apellido}`;

        document.getElementById("estadoCuota").textContent =
          `Estado de cuota: ${data.estadoCuota}`;

        document.getElementById("vencimiento").textContent =
          `Vencimiento: ${data.vencimiento}`;
      }
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "login.html";
    });
}
