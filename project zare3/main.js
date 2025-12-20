
   //  Controle =>  (Side Menu)
        const openMenuBtn = document.getElementById('openMenuBtn');
        const closeMenuBtn = document.getElementById('closeMenuBtn');
        const sideMenu = document.getElementById('sideMenu');
        const menuOverlay = document.getElementById('menuOverlay');

        // function to open menu
        function openMenu() {
            sideMenu.classList.add('open');
            menuOverlay.classList.add('active');

            document.body.style.overflow = 'hidden';
        }

        // function to close menu
        function closeMenu() {
            sideMenu.classList.remove('open');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        openMenuBtn.addEventListener('click', openMenu);

        closeMenuBtn.addEventListener('click', closeMenu);

        menuOverlay.addEventListener('click', closeMenu);
        
        const sideMenuLinks = document.querySelectorAll('.side-menu-nav a');
        sideMenuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });







//======================= Dark mood =======================================================================================//

const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const icon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === "dark") {
        icon.classList.replace("fa-moon", "fa-sun");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
    }
} else {
    body.classList.add("light");
    icon.classList.add("fa-sun"); 
}

themeToggle.addEventListener("click", () => {
    if (body.classList.contains("light")) {
        body.classList.replace("light", "dark");
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.replace("dark", "light");
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light");
    }
});



//=================================== alert الاشتراك =====================================================//

function openPayment() {
  Swal.fire({
    title: 'اختر طرق الدفع',
    html: `
      <div style="text-align:right; font-family:Cairo; line-height:2;">
        <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
          <input type="radio" name="payment" value="vodafone">
          <i class="fa-solid fa-mobile-screen-button" style="color:#2e7d32;"></i>
          فودافون كاش
        </label>

        <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
          <input type="radio" name="payment" value="instapay">
          <i class="fa-solid fa-building-columns" style="color:#2e7d32;"></i>
          إنستاباي
        </label>

        <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
          <input type="radio" name="payment" value="card">
          <i class="fa-solid fa-credit-card" style="color:#2e7d32;"></i>
          كارت بنكي
        </label>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'تم',
    cancelButtonText: 'إلغاء',
    confirmButtonColor: '#2e7d32',
    cancelButtonColor: '#ff0000', /* اللون الأحمر للإلغاء */
    background: '#f9fdf9',

    preConfirm: () => {
      const selected = document.querySelector('input[name="payment"]:checked');
      if (!selected) {
        Swal.showValidationMessage('⚠️ من فضلك اختر طرق الدفع');
        return false;
      }
      return selected.value;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      let methodText = '';

      if (result.value === 'vodafone') methodText = 'فودافون كاش';
      if (result.value === 'instapay') methodText = 'إنستاباي';
      if (result.value === 'card') methodText = 'الكارت البنكي';

      Swal.fire({
        icon: 'success',
        title: 'تم اختيار طرق الدفع',
        text: `تم اختيار ${methodText} 🌿 وسيتم التواصل معك لإتمام الدفع`,
        confirmButtonText: 'تم',
        confirmButtonColor: '#2e7d32'
      });
    }
  });
}
