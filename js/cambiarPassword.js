const firebaseConfig = {
  apiKey: "AIzaSyDCqe24Tu4-BKrxykDwTQvbDVIpoPBD8cY",
  authDomain: "reactss-26771.firebaseapp.com",
  projectId: "reactss-26771",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

async function cambiarPassword() {
  const nueva = document.getElementById("nuevaPassword").value;
  const confirmar = document.getElementById("confirmarPassword").value;

  if (nueva.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres");
    return;
  }

  if (nueva !== confirmar) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const user = firebase.auth().currentUser;

  if (!user) {
    alert("Sesión expirada");
    return;
  }

  try {
    await user.updatePassword(nueva);

    await db.collection("socios").doc(user.uid).update({
      primerLogin: false,
    });

    alert("Contraseña actualizada");
    window.location.href = "dashboard.html";
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      alert("Por seguridad, volvé a iniciar sesión");
    } else if (error.code === "auth/weak-password") {
      alert("Contraseña demasiado débil");
    } else {
      alert("Error al cambiar la contraseña");
    }
  }
}
