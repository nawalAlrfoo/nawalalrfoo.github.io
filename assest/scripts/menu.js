/* =========================
   Mobile Menu
========================= */
const menuBtn = document.querySelector('.menu-btn');
const nav     = document.getElementById('siteNav');
const overlay = document.getElementById('overlay');

function openMenu(){
  nav.classList.add('open');
  overlay.hidden = false;
  menuBtn.setAttribute('aria-expanded','true');
  document.body.style.overflow = 'hidden';
}

function closeMenu(){
  nav.classList.remove('open');
  overlay.hidden = true;
  menuBtn.setAttribute('aria-expanded','false');
  document.body.style.overflow = '';
}

menuBtn?.addEventListener('click', () => {
  nav.classList.contains('open') ? closeMenu() : openMenu();
});

overlay?.addEventListener('click', closeMenu);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
});

nav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

/* =========================
   EmailJS Contact Form
========================= */
document.addEventListener("DOMContentLoaded", function(){

  // Initialize EmailJS
  emailjs.init("4TL6XDLiwaI_U6Cza"); 

  const form = document.getElementById("contact-form");
const btn = document.getElementById("submit-btn");
const messageBox = document.getElementById("form-message");
const btnText = btn.querySelector(".btn-text");

form.addEventListener("submit", function(e){
  e.preventDefault();

  btn.classList.add("loading");
  btnText.textContent = "Sending...";
  messageBox.textContent = "";

  emailjs.sendForm("service_7xqpa4g", "template_mcebsl8", this)
    .then(function(){
      btn.classList.remove("loading");
      btnText.textContent = "Send Message";
      messageBox.textContent = "Message sent successfully ✨";
      messageBox.className = "form-message success";
      form.reset();
    }, function(){
      btn.classList.remove("loading");
      btnText.textContent = "Send Message";
      messageBox.textContent = "Something went wrong. Try again.";
      messageBox.className = "form-message error";
    });
});

});