// sidebar.js — SOLO LAB MOBILE POS
(function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  const pages = [
    { name: '📊 Dashboard', url: 'index.html' },
    { name: '🛒 Billing / POS', url: 'billing.html' },
    { name: '📦 Products', url: 'inventory.html' },
    { name: '👥 Customers', url: 'customers.html' },
    { name: '💰 Payment Management', url: 'payment-management.html' },
    { name: '📜 Sale History', url: 'sales-history.html' },
    { name: '👤 Staff Management', url: 'staff.html' },
    { name: '⚙️ Settings', url: 'payment.html' },
  ];

  const navHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 240px; height: 100vh; background: #1f2937; padding: 20px 0; overflow-y: auto; z-index: 999;">
      <div style="padding: 0 20px 20px;">
        <h2 style="color: white; font-size: 18px; margin: 0 0 5px;">SOLO LAB</h2>
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">Mobile & Accessories</p>
      </div>
      <nav>
        ${pages.map(page => {
          const isActive = currentPage === page.url ? 'background:#dc2626; color:white;' : 'color:#d1d5db;';
          return `<a href="${page.url}" style="display:block; padding:12px 20px; text-decoration:none; font-size:15px; ${isActive} hover:background:#374151;">${page.name}</a>`;
        }).join('')}
      </nav>
      <div style="padding: 20px; margin-top: 30px; border-top: 1px solid #374151;">
        <a href="login.html" style="display:block; padding:10px 20px; background:#374151; color:#d1d5db; text-decoration:none; border-radius:6px; text-align:center; font-size:14px;">🚪 Logout</a>
      </div>
    </div>
    <div style="margin-left: 240px; min-height: 100vh; background: #f3f4f6;">
  `;

  document.write(navHTML);
  document.addEventListener('DOMContentLoaded', function() {
    document.body.insertAdjacentHTML('beforeend', '</div>');
  });
})();
