/* =========================================================
   auth-guard.js — SOLO LAB MOBILE role/permission guard
   Include on every protected page AFTER setting (optional)
   window.PAGE_PERMISSION = '<key>'. If not set, auto-detected
   from the page filename.
   Permission keys: billing, customers, sales_history,
   purchase_return, inventory, reports, staff,
   payment_management, customer_return
   ========================================================= */
(function(){
  "use strict";

  var ALL_PERMS = [
    "billing","customers","sales_history","purchase_return","inventory",
    "reports","staff","payment_management","customer_return"
  ];

  var HREF_MAP = {
    "billing.html":"billing","checkout.html":"billing","pos.html":"billing",
    "customers.html":"customers","customer.html":"customers",
    "sale-history.html":"sales_history","sales-history.html":"sales_history","sales.html":"sales_history",
    "purchase.html":"purchase_return","purchase-return.html":"purchase_return","purchases.html":"purchase_return",
    "return.html":"purchase_return","returns.html":"customer_return",
    "inventory.html":"inventory","products.html":"inventory","product.html":"inventory",
    "report.html":"reports","reports.html":"reports",
    "staff.html":"staff",
    "payment.html":"payment_management","payments.html":"payment_management","payment-management.html":"payment_management",
    "customer-return.html":"customer_return","customer-returns.html":"customer_return"
  };

  function readJSON(key, fallback){
    try { var v = JSON.parse(localStorage.getItem(key)||"null"); return v == null ? fallback : v; }
    catch(e){ return fallback; }
  }

  /* ---------- Resolve current user ---------- */
  var currentUser = readJSON("currentUser", null);
  if(!currentUser && localStorage.getItem("posLoggedIn") === "true"){
    currentUser = { username:"admin", role:"Admin" };
    try{ localStorage.setItem("currentUser", JSON.stringify(currentUser)); }catch(e){}
  }
  if(!currentUser){
    window.location.replace("login.html");
    return;
  }

  /* ---------- Resolve permissions ---------- */
  var perms;
  if(currentUser.role === "Admin"){
    perms = ALL_PERMS.slice();
  } else {
    var staffList = readJSON("shopStaff", []);
    var me = null;
    if(Array.isArray(staffList)){
      for(var i=0;i<staffList.length;i++){
        if(String(staffList[i].username).toLowerCase() === String(currentUser.username).toLowerCase()){ me = staffList[i]; break; }
      }
    }
    if(me){
      currentUser.role = me.role || currentUser.role;
      if(me.active === false){
        // inactive account — force logout
        try{ localStorage.removeItem("currentUser"); localStorage.removeItem("posLoggedIn"); }catch(e){}
        window.location.replace("login.html");
        return;
      }
      perms = Array.isArray(me.permissions) && me.permissions.length ? me.permissions.slice() : ["billing"];
    } else {
      perms = ["billing"]; // safe fallback for unknown users
    }
  }
  currentUser.permissions = perms;
  try{ localStorage.setItem("currentUser", JSON.stringify(currentUser)); }catch(e){}

  window.currentUser = currentUser;
  window.hasPermission = function(p){
    if(currentUser.role === "Admin") return true;
    return perms.indexOf(p) > -1;
  };

  /* ---------- Determine this page's required permission ---------- */
  function detectPagePerm(){
    if(window.PAGE_PERMISSION) return window.PAGE_PERMISSION;
    var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    return HREF_MAP[file] || null; // null = public (dashboard etc.)
  }
  var pagePerm = detectPagePerm();

  /* ---------- Block disallowed page ---------- */
  if(pagePerm && !window.hasPermission(pagePerm)){
    // Inject style + overlay
    var style = document.createElement("style");
    style.textContent =
      "html,body{margin:0;padding:0;height:100%;overflow:hidden !important}" +
      "body > *:not(#noPermissionOverlay){display:none !important}" +
      "#noPermissionOverlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;" +
      "background:#f3f4f6;z-index:99999;font-family:Arial,sans-serif;padding:20px}" +
      ".np-card{background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:40px 32px;max-width:420px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,.08)}" +
      ".np-icon{font-size:48px;margin-bottom:14px}" +
      ".np-title{font-size:20px;font-weight:800;color:#111827;margin-bottom:8px}" +
      ".np-msg{font-size:14px;color:#6b7280;line-height:1.6;margin-bottom:22px}" +
      ".np-btn{display:inline-block;padding:11px 22px;background:#dc2626;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:700}" +
      ".np-btn:hover{background:#b91c1c}";
    document.head.appendChild(style);

    function showOverlay(){
      if(!document.body){ setTimeout(showOverlay, 30); return; }
      var overlay = document.createElement("div");
      overlay.id = "noPermissionOverlay";
      overlay.innerHTML =
        '<div class="np-card">' +
          '<div class="np-icon">🔒</div>' +
          '<div class="np-title">Access Denied</div>' +
          '<div class="np-msg">Your account does not have permission to view this page.<br>Please contact your admin to request access.</div>' +
          '<a class="np-btn" href="index.html">← Back to Dashboard</a>' +
        '</div>';
      document.body.appendChild(overlay);
    }
    showOverlay();
    return; // do not enable sidebar filtering
  }

  /* ---------- Hide disallowed sidebar links (async injected sidebar) ---------- */
  function permForHref(href){
    if(!href) return null;
    var file = href.split("#")[0].split("?")[0].split("/").pop().toLowerCase();
    return HREF_MAP[file] || null;
  }
  function filterSidebar(){
    try{
      var links = document.querySelectorAll(".sidebar a[href], nav a[href], aside a[href]");
      for(var i=0;i<links.length;i++){
        var a = links[i];
        var href = a.getAttribute("href") || "";
        if(!href || href.charAt(0)==="#" || href.indexOf("javascript:")===0) continue;
        var p = permForHref(href);
        if(p && !window.hasPermission(p)){ a.style.display = "none"; }
      }
    }catch(e){}
  }
  if(typeof MutationObserver !== "undefined"){
    new MutationObserver(filterSidebar).observe(document.documentElement, {childList:true, subtree:true});
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", filterSidebar);
  } else {
    filterSidebar();
  }
  setTimeout(filterSidebar, 600);
  setTimeout(filterSidebar, 1500);
})();
