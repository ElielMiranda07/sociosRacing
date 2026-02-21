function cambiarPassword() {
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

  user
    .updatePassword(nueva)
    .then(async () => {
      await db.collection("socios").doc(user.uid).update({
        primerLogin: false,
      });

      alert("Contraseña actualizada");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}
