/* ============================================================
   SOLO LAB MOBILE — Shared Sidebar (sidebar.js)
   Drop into any page with:  <script src="sidebar.js"></script>
   Injects the left navigation automatically and highlights the
   active page based on the current URL.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Icons (inline SVG, lucide-style) ---------- */
  var I = {
    phone:  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>',
    dash:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
    cart:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
    bill:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>',
    hist:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
    cust:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    ret:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/><path d="M3 7l9 6 9-6"/><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"/></svg>',
    inv:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" x2="16" y1="13" y2="13"/><line x1="8" x2="16" y1="17" y2="17"/></svg>',
    box:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    truck:  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>',
    supp:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    rep:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 16V9"/><path d="M12 16V5"/><path d="M17 16v-4"/></svg>',
    pay:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>',
    paym:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>',
    staff:  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    set:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
    chev:   '<svg class="sb-chev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
  };

  /* ---------- Navigation groups (matches checkout.html) ---------- */
  var GROUPS = [
    { title: "Main Hub", dot: "#dc2626", items: [
      { href: "index.html",              label: "Dashboard",           icon: I.dash },
      { href: "checkout.html",           label: "POS Billing",         icon: I.cart },
      { href: "billing.html",            label: "Billing",             icon: I.bill },
      { href: "sale-history.html",       label: "Sales History",       icon: I.hist },
      { href: "customers.html",          label: "Customer Management", icon: I.cust },
      { href: "customer-return.html",    label: "Customer Returns",    icon: I.ret  },
      { href: "invoice.html",            label: "Invoices",            icon: I.inv  }
    ]},
    { title: "Stock & Inventory", dot: "#3b82f6", items: [
      { href: "inventory.html",          label: "Inventory Manager",   icon: I.box  },
      { href: "purchase.html",           label: "Purchases & Returns", icon: I.truck},
      { href: "supplier.html",           label: "Supplier Registry",   icon: I.supp }
    ]},
    { title: "Finance & Settings", dot: "#16a34a", items: [
      { href: "reports.html",            label: "Reports",             icon: I.rep  },
      { href: "payments.html",           label: "Payments",            icon: I.pay  },
      { href: "payment-management.html", label: "Payment Management",  icon: I.paym },
      { href: "staff.html",              label: "Staff",               icon: I.staff},
      { href: "setting.html",            label: "Settings",            icon: I.set  }
    ]}
  ];

  /* ---------- Injected CSS (self-contained, prefixed .sb-) ---------- */
  var CSS =
    ".sb-sidebar{position:fixed;left:0;top:0;bottom:0;width:232px;background:#0f172a;color:#cbd5e1;z-index:100;overflow-y:auto;font-family:'Sora',system-ui,sans-serif;}" +
    "body.sb-has-sidebar{padding-left:232px;}" +
    ".sb-sidebar::-webkit-scrollbar{width:4px;}" +
    ".sb-sidebar::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:2px;}" +
    ".sb-logo{padding:20px 18px;display:flex;align-items:center;gap:11px;border-bottom:1px solid rgba(255,255,255,.07);color:inherit;text-decoration:none;}" +
    ".sb-logo-mark{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#dc2626,#7f1d1d);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 4px 14px rgba(220,38,38,.4);flex-shrink:0;}" +
    ".sb-logo-mark svg{width:20px;height:20px;}" +
    ".sb-logo-name{font-weight:800;font-size:15px;color:#fff;letter-spacing:.3px;line-height:1.15;}" +
    ".sb-logo-name small{display:block;font-weight:500;font-size:9.5px;letter-spacing:2.5px;text-transform:uppercase;color:#64748b;margin-top:2px;}" +
    ".sb-nav-group{padding:18px 10px 6px;}" +
    ".sb-nav-group:last-child{padding-bottom:24px;}" +
    ".sb-nav-group-title{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;font-weight:700;padding:0 10px 10px;display:flex;align-items:center;gap:7px;}" +
    ".sb-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}" +
    ".sb-nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:9px;font-size:13px;color:#cbd5e1;cursor:pointer;margin-bottom:2px;font-weight:500;text-decoration:none;transition:background .15s,color .15s;}" +
    ".sb-nav-item svg{width:17px;height:17px;opacity:.85;flex-shrink:0;}" +
    ".sb-nav-item:hover{background:rgba(255,255,255,.06);color:#fff;}" +
    ".sb-nav-item.active{background:#dc2626;color:#fff;font-weight:700;box-shadow:0 4px 12px rgba(220,38,38,.35);}" +
    ".sb-nav-item.active svg{opacity:1;}" +
    ".sb-chev{margin-left:auto;width:14px;height:14px;opacity:.6;}" +
    "@media (max-width:860px){.sb-sidebar{display:none;}body.sb-has-sidebar{padding-left:0;}}";

  /* ---------- Active page detection ---------- */
  function currentPage() {
    var p = (location.pathname.split("/").pop() || "").toLowerCase();
    if (p === "" || p === "/") p = "index.html";
    return p;
  }

  /* ---------- Build & inject ---------- */
  function inject() {
    if (document.querySelector(".sb-sidebar")) return; // already injected

    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    var cur = currentPage();
    var html = '<a class="sb-logo" href="index.html">' +
      '<div class="sb-logo-mark">' + I.phone + '</div>' +
      '<div class="sb-logo-name">SOLO LAB<small>Mobile · Kandy</small></div>' +
      '</a>';

    GROUPS.forEach(function (g) {
      html += '<nav class="sb-nav-group">' +
        '<div class="sb-nav-group-title"><span class="sb-dot" style="background:' + g.dot + '"></span>' + g.title + '</div>';
      g.items.forEach(function (it) {
        var active = it.href.toLowerCase() === cur;
        html += '<a class="sb-nav-item' + (active ? " active" : "") + '" href="' + it.href + '">' +
          it.icon + it.label + (active ? I.chev : "") + '</a>';
      });
      html += '</nav>';
    });

    var aside = document.createElement("aside");
    aside.className = "sb-sidebar";
    aside.innerHTML = html;
    document.body.appendChild(aside);
    document.body.classList.add("sb-has-sidebar");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
