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

  const estados = {
    al_dia: "Al día",
    vencida: "Vencida",
  };

  const estadoTexto = estados[data.estadoCuota] || data.estadoCuota;

  const [anio, mes, dia] = data.vencimientoCuota.split("-");

  const fechaFormateada = `${dia}/${mes}/${anio}`;

  // Cargar datos
  document.getElementById("saludo").innerText = `Hola, ${data.nombre}`;

  document.getElementById("estadoCuota").innerText =
    `Estado de cuota: ${estadoTexto}`;

  document.getElementById("vencimiento").innerText =
    `Vencimiento: ${fechaFormateada}`;
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

async function pagarCuota() {
  const user = firebase.auth().currentUser;

  if (!user) {
    alert("Usuario no autenticado");
    return;
  }

  try {
    const res = await fetch(
      "https://us-central1-reactss-26771.cloudfunctions.net/crearPreferencia",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
        }),
      },
    );

    if (!res.ok) {
      console.error("HTTP ERROR:", res.status);
      alert("Error en el servidor");
      return;
    }

    const data = await res.json();

    console.log("RESPUESTA BACKEND:", data); // 👈 CLAVE

    if (!data.init_point) {
      alert("Error al generar el pago");
      return;
    }

    window.location.href = data.init_point;
  } catch (error) {
    console.error("ERROR EN FETCH:", error);
    alert("Error de conexión con el servidor");
  }
}
