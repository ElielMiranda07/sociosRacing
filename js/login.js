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
