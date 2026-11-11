// sidebar.js — SOLO LAB MOBILE POS
(function () {
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

  function renderSidebar() {
    // Prevent duplicate sidebars if this script is included more than once.
    if (!document.body || document.getElementById('sololab-sidebar')) {
      return;
    }

    const currentPage =
      window.location.pathname.split('/').pop() || 'index.html';

    const style = document.createElement('style');
    style.textContent = `
      body {
        margin: 0;
      }

      #sololab-sidebar {
        box-sizing: border-box;
        position: fixed;
        inset: 0 auto 0 0;
        width: 240px;
        height: 100vh;
        overflow-y: auto;
        padding: 20px 0;
        background: #1f2937;
        color: #fff;
        z-index: 999;
      }

      #sololab-sidebar .sololab-brand {
        padding: 0 20px 20px;
      }

      #sololab-sidebar h2 {
        margin: 0 0 5px;
        font-size: 18px;
      }

      #sololab-sidebar p {
        margin: 0;
        color: #9ca3af;
        font-size: 12px;
      }

      #sololab-sidebar nav a {
        display: block;
        padding: 12px 20px;
        color: #d1d5db;
        font-size: 15px;
        text-decoration: none;
      }

      #sololab-sidebar nav a:hover,
      #sololab-sidebar nav a:focus-visible {
        background: #374151;
      }

      #sololab-sidebar nav a[aria-current="page"] {
        background: #dc2626;
        color: #fff;
      }

      #sololab-sidebar .sololab-logout {
        margin-top: 30px;
        padding: 20px;
        border-top: 1px solid #374151;
      }

      #sololab-sidebar .sololab-logout a {
        display: block;
        padding: 10px 20px;
        border-radius: 6px;
        background: #374151;
        color: #d1d5db;
        font-size: 14px;
        text-align: center;
        text-decoration: none;
      }

      #sololab-content {
        box-sizing: border-box;
        min-height: 100vh;
        margin-left: 240px;
        background: #f3f4f6;
      }

      @media (max-width: 640px) {
        #sololab-sidebar {
          position: relative;
          width: 100%;
          height: auto;
          padding: 16px 0;
        }

        #sololab-sidebar nav {
          display: flex;
          flex-wrap: wrap;
        }

        #sololab-sidebar nav a {
          flex: 1 1 150px;
        }

        #sololab-sidebar .sololab-logout {
          margin-top: 16px;
        }

        #sololab-content {
          margin-left: 0;
        }
      }
    `;
    document.head.appendChild(style);

    const sidebar = document.createElement('aside');
    sidebar.id = 'sololab-sidebar';
    sidebar.setAttribute('aria-label', 'Main navigation');
    sidebar.innerHTML = `
      <div class="sololab-brand">
        <h2>SOLO LAB</h2>
        <p>Mobile &amp; Accessories</p>
      </div>
      <nav aria-label="Pages">
        ${pages
          .map((page) => {
            const isActive = currentPage === page.url;
            return `
              <a href="${page.url}"${isActive ? ' aria-current="page"' : ''}>
                ${page.name}
              </a>
            `;
          })
          .join('')}
      </nav>
      <div class="sololab-logout">
        <a href="login.html">🚪 Logout</a>
      </div>
    `;

    const content = document.createElement('div');
    content.id = 'sololab-content';

    // Move the page's existing body content into the content area.
    const existingNodes = Array.from(document.body.childNodes);
    existingNodes.forEach((node) => content.appendChild(node));

    document.body.append(sidebar, content);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSidebar, { once: true });
  } else {
    renderSidebar();
  }
})();
