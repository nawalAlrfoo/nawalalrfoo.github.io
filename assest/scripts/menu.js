

  
  document.querySelectorAll('section:not(.hero) h2').forEach(title => {
    const section = title.parentElement;
    const content = section.querySelector('.section-content');
    content.style.display = 'none'; // مخفي افتراضياً
    title.addEventListener('click', () => {
      const isOpen = section.classList.toggle('is-open');
      content.style.display = isOpen ? 'flex' : 'none';
    });
  });


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

document.addEventListener('DOMContentLoaded', () => {
    const projectTitles = document.querySelectorAll('.projects dt');

    projectTitles.forEach(title => {
        title.addEventListener('click', () => {
            const description = title.nextElementSibling;
            
            // إضافة كلاس النشاط لتغيير شكل السهم
            title.classList.toggle('active');

            // إظهار أو إخفاء المحتوى
            if (description.style.display === "block") {
                description.style.display = "none";
            } else {
                description.style.display = "block";
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {

  // كل السكاشن القابلة للطي (ما عدا الهيرو)
  const collapsibleSections = document.querySelectorAll('section:not(.hero)');

  collapsibleSections.forEach(section => {

    const header = section.querySelector('h2, .contact-header');
    if (!header) return;

    header.style.cursor = 'pointer';

    header.addEventListener('click', () => {
      // هذا السطر يجعل السكشن يفتح أو يغلق عند كل ضغطة
      section.classList.toggle('is-open');
    });

  });

});

document.addEventListener('DOMContentLoaded', () => {

  // كل السكاشن القابلة للطي (عدا الهيرو)
  const collapsibleSections = document.querySelectorAll('section:not(.hero)');

  collapsibleSections.forEach(section => {

    const header = section.querySelector('h2, .contact-header');
    if (!header) return;

    header.style.cursor = 'pointer';

    header.addEventListener('click', () => {
      // فتح أو غلق السكشن
      section.classList.toggle('is-open');
    });

  });

});
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

  

    function updateToggleUI(isDark) {
        themeToggle.innerHTML = isDark 
            ? '<i class="fa-solid fa-sun"></i>' 
            : '<i class="fa-solid fa-moon"></i>';
        
        themeToggle.style.transform = isDark ? "scale(1.1) rotate(360deg)" : "scale(1.1) rotate(0deg)";
        
        setTimeout(() => {
            themeToggle.style.transform = "scale(1)";
        }, 400);
    }

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark');
        updateToggleUI(true);
    } else {
        updateToggleUI(false);
    }

    themeToggle.addEventListener('click', () => {
        const isDarkNow = body.classList.toggle('dark');
        localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
        updateToggleUI(isDarkNow);
        console.log("is Dark Now ! ", isDarkNow); 
    });
});