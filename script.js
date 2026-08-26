/* ==========================================================================
   BAXTER & GREENE — MARKET DELI & CAFE INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initLiveHours();
  initMenuFilters();
  initModals();
  initMobileNav();
  initScrollAnimations();
});

/* ==========================================================================
   1. LIVE OPENING HOURS
   ========================================================================== */
function initLiveHours() {
  const dot = document.getElementById("liveStatusDot");
  const text = document.getElementById("liveStatusText");

  if (!dot || !text) return;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const isSunday = now.getDay() === 0;
  const openHour = isSunday ? 10 : 8;
  const closeHour = 17;
  const closeMinute = 30;

  const currentTotalMin = currentHour * 60 + currentMinute;
  const openTotalMin = openHour * 60;
  const closeTotalMin = closeHour * 60 + closeMinute;

  if (currentTotalMin >= openTotalMin && currentTotalMin < closeTotalMin) {
    dot.style.backgroundColor = "#4cd964";
    dot.style.boxShadow = "0 0 8px #4cd964";
    text.innerHTML = `<strong>Open Now</strong> · Closes 5:30 PM`;
  } else {
    dot.style.backgroundColor = "#ff3b30";
    dot.style.boxShadow = "0 0 8px #ff3b30";
    text.innerHTML = `<strong>Closed Now</strong> · Opens Tomorrow ${openHour}:00 AM`;
  }
}

/* ==========================================================================
   2. MENU CATEGORY FILTERING & MODAL DATA (100% UNIQUE IMAGES)
   ========================================================================== */

const menuItemsData = {
  "full-irish": {
    title: "Full Irish 5-Item Cooked Breakfast",
    price: "€5.95",
    category: "Breakfast Special",
    image: "images/breakfast.png",
    description: "Dublin's legendary value cooked breakfast. Select any 5 cooked items (Irish pork sausages, crispy bacon rashers, free-range fried eggs, grilled tomato, traditional black pudding, crispy hash browns, button mushrooms) served with homemade brown soda bread or toast, and hot tea or coffee.",
    ingredients: ["Irish Pork Sausages", "Crispy Bacon Rashers", "Free-Range Eggs", "Grilled Tomato", "Black Pudding", "Homemade Brown Soda Bread"],
    dietary: ["Cooked Fresh", "Under €6 Special", "Includes Hot Beverage"]
  },
  "coconut-cap": {
    title: "Signature Coconut Cappuccino",
    price: "€3.95",
    category: "Specialty Coffee",
    image: "images/cappuccino.png",
    description: "Our signature craft espresso beverage. Rich double-shot espresso pulled over micro-foamed steamed organic coconut milk, dusted with toasted coconut flakes.",
    ingredients: ["Artisan Espresso Beans", "Organic Coconut Milk", "Toasted Coconut Flakes"],
    dietary: ["Dairy Free Option", "House Favorite"]
  },
  "lasagne": {
    title: "Traditional Homemade Beef Lasagne",
    price: "€8.50",
    category: "Hot Market Deli",
    image: "images/lasagne.png",
    description: "Slow-cooked 100% Irish beef ragù layered between egg pasta sheets, rich nutmeg béchamel sauce, topped with melted Irish Cheddar & Mozzarella. Served with crisp garlic sourdough.",
    ingredients: ["100% Irish Beef", "Egg Pasta", "Nutmeg Béchamel", "Irish Cheddar", "Garlic Bread"],
    dietary: ["Comfort Food Classic", "Hot Deli Special"]
  },
  "scones": {
    title: "Freshly Baked Irish Fruit Scones",
    price: "€2.95",
    category: "Artisan Bakery",
    image: "images/scones.png",
    description: "Baked every morning in our top-floor kitchen. Tender, warm fruit scones filled with sweet raisins, served with thick clotted cream, Kerrygold butter, and strawberry jam.",
    ingredients: ["Irish Buttermilk", "Sultanas", "Kerrygold Butter", "Clotted Cream", "Jam"],
    dietary: ["Vegetarian", "Morning Bake"]
  },
  "brown-bread": {
    title: "Traditional Irish Brown Soda Bread",
    price: "€3.50",
    category: "Bakery Loaf",
    image: "images/soda_bread.png",
    description: "Praised by local guides as one of Dublin's finest brown breads. Made using coarse wholemeal wheat flour, fresh buttermilk, and salt. Deep, nutty flavor with a golden crust.",
    ingredients: ["Coarse Irish Wholemeal", "Wheat Flour", "Fresh Buttermilk", "Kerrygold Butter"],
    dietary: ["House Recipe", "No Preservatives"]
  },
  "salads": {
    title: "Gourmet Market Salad Plate",
    price: "€7.90",
    category: "Fresh Deli Salads",
    image: "images/salads.png",
    description: "A vibrant selection of chef-prepared fresh market deli salads. Choose a combination of Roasted Sweet Potato & Feta, Quinoa, Coleslaw, or Pesto Pasta.",
    ingredients: ["Roasted Vegetables", "Greek Feta", "Quinoa", "Organic Greens", "House Vinaigrette"],
    dietary: ["Vegetarian", "Gluten-Free Options", "Fresh Daily"]
  }
};

function initMenuFilters() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const menuCards = document.querySelectorAll(".menu-card");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      menuCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Item Details Handler
  document.querySelectorAll(".view-details-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const itemKey = e.target.getAttribute("data-item");
      const itemData = menuItemsData[itemKey];

      if (!itemData) return;

      const modalContent = document.getElementById("modalContent");
      if (modalContent) {
        modalContent.innerHTML = `
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${itemData.image}" alt="${itemData.title}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 14px; margin-bottom: 16px;">
            <span style="font-size: 0.8rem; font-weight: 700; color: #d49e42; background: #fef7ea; padding: 4px 14px; border-radius: 999px; border: 1px solid rgba(212,158,66,0.3);">${itemData.category}</span>
            <h2 style="font-family: var(--font-serif); font-size: 1.7rem; color: #1b3b2b; margin-top: 10px;">${itemData.title}</h2>
            <p style="font-size: 1.3rem; font-weight: 700; color: #1b3b2b; margin-block: 6px;">${itemData.price}</p>
          </div>
          <p style="font-size: 0.95rem; color: #5e6862; line-height: 1.6; margin-bottom: 20px;">${itemData.description}</p>
          
          <h4 style="font-size: 0.85rem; text-transform: uppercase; color: #1b3b2b; margin-bottom: 8px; font-weight: 700;">Key Ingredients:</h4>
          <ul style="padding-left: 20px; font-size: 0.9rem; color: #5e6862; margin-bottom: 20px;">
            ${itemData.ingredients.map(ing => `<li>${ing}</li>`).join("")}
          </ul>

          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
            ${itemData.dietary.map(d => `<span style="font-size: 0.75rem; background: #faf8f5; border: 1px solid #1b3b2b; color: #1b3b2b; padding: 4px 10px; border-radius: 6px;">${d}</span>`).join("")}
          </div>

          <button class="btn btn-gold btn-block" onclick="openTakeawayWithItem('${itemData.title}')">Order Item For Pickup ➔</button>
        `;

        const modal = document.getElementById("itemModal");
        if (modal) modal.classList.add("active");
      }
    });
  });
}

window.openTakeawayWithItem = function(itemTitle) {
  const itemModal = document.getElementById("itemModal");
  if (itemModal) itemModal.classList.remove("active");

  const orderNotes = document.getElementById("orderNotes");
  if (orderNotes) orderNotes.value = `Order Request: 1x ${itemTitle}`;

  const takeawayModal = document.getElementById("takeawayModal");
  if (takeawayModal) takeawayModal.classList.add("active");
};

/* ==========================================================================
   3. MODAL HANDLERS
   ========================================================================== */
function initModals() {
  const openTakeawayBtn = document.getElementById("openTakeawayBtn");
  const takeawayModal = document.getElementById("takeawayModal");
  const takeawayCloseBtn = document.getElementById("takeawayCloseBtn");

  const itemModal = document.getElementById("itemModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  if (openTakeawayBtn && takeawayModal) {
    openTakeawayBtn.addEventListener("click", () => {
      takeawayModal.classList.add("active");
    });
  }

  if (takeawayCloseBtn && takeawayModal) {
    takeawayCloseBtn.addEventListener("click", () => {
      takeawayModal.classList.remove("active");
    });
  }

  if (modalCloseBtn && itemModal) {
    modalCloseBtn.addEventListener("click", () => {
      itemModal.classList.remove("active");
    });
  }

  [itemModal, takeawayModal].forEach(modal => {
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
      });
    }
  });

  const takeawayForm = document.getElementById("takeawayForm");
  if (takeawayForm) {
    takeawayForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("custName").value;
      const refNum = "BG-" + Math.floor(1000 + Math.random() * 9000);

      alert(`Thank you, ${name}! Your pickup request (Ref: ${refNum}) has been submitted.\n\nOur team at Dunnes Stores Henry Street (Top Floor) looks forward to serving you!`);
      takeawayModal.classList.remove("active");
      takeawayForm.reset();
    });
  }
}

/* ==========================================================================
   4. FULL-SCREEN MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById("mobileToggle");
  const closeBtn = document.getElementById("mobileCloseBtn");
  const nav = document.getElementById("navLinks");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeBtn && nav) {
    closeBtn.addEventListener("click", () => {
      nav.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  document.querySelectorAll("#navLinks .nav-item").forEach(link => {
    link.addEventListener("click", () => {
      if (nav) {
        nav.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });
}

/* ==========================================================================
   5. SCROLL & FOOTER YEAR
   ========================================================================== */
function initScrollAnimations() {
  const header = document.getElementById("mainHeader");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  const yearSpan = document.getElementById("yearSpan");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}
