/* ********** Menu ********** */
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;

    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/* ********** Envio del formulario ********** */
const d = document;

const $form = d.querySelector(".contact__form");
const $inputs = d.querySelectorAll(".form__input[required]");

console.log($inputs);

$inputs.forEach((input) => {
  const $span = d.createElement("span");
  $span.id = input.name;
  $span.textContent = input.title;
  $span.classList.add("contact__form", "form__input", "form--none");
  input.insertAdjacentElement("afterend", $span);
});

d.addEventListener("keyup", (e) => {
  if (e.target.matches(".form__input[required]")) {
    let $input = e.target,
      pattern = $input.pattern || $input.dataset.pattern;

    // console.log($input, pattern);

    if (pattern && $input.value !== "") {
      // console.log("El input tiene patron");

      let regex = new RegExp(pattern);
      return !regex.exec($input.value)
        ? d.getElementById($input.name).classList.add("is-active")
        : d.getElementById($input.name).classList.remove("is-active");
    }

    if (!pattern) {
      // console.log("El input no tiene patron");
      return $input.value === ""
        ? d.getElementById($input.name).classList.add("is-active")
        : d.getElementById($input.name).classList.remove("is-active");
    }
  }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
d.addEventListener("submit", (e) => {
  e.preventDefault();
  // alert("Enviando formulario");

  const $loader = d.querySelector(".form__loader");
  const $response = d.querySelector(".form__reponse");

  $loader.classList.remove("form--none");

  fetch("https://formsubmit.co/ajax/danyel2706@gmail.com", {
    method: "POST",
    body: new FormData(e.target),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      $loader.classList.add("form--none");
      $response.classList.remove("form--none");
      // $response.innerHTML = "<p>${json.message}</p>";
      $response.innerHTML = "<p>El mensaje ha sido enviado</p>";
      $form.reset();
    })
    .catch((err) => {
      console.log(err);
      let message =
        err.statusText ||
        "Ocurrió un error al enviar el mensaje, intenta nuevamente";
      $response.innerHTML = "<p>Error${err.status}:${message}</p>";
    })
    .finally(() =>
      setTimeout(() => {
        $response.classList.add("form--none");
        $response.innerHTML = "";
      }, 3000)
    );
});
