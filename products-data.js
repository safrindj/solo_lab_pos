// ==========================================
// SOLO LAB MOBILE — PRODUCT DATA
// Organized: Categories → Subcategories → Products
// ==========================================

// ------------------------------
// 1. CATEGORIES
// ------------------------------
const productCategories = [
  { id: 'phones', name: 'Mobile Phones', icon: '📱' },
  { id: 'accessories', name: 'Accessories', icon: '🔌' },
  { id: 'repair', name: 'Repair Services', icon: '🔧' },
  { id: 'spareparts', name: 'Spare Parts', icon: '🔩' }
];

// ------------------------------
// 2. SUBCATEGORIES
// ------------------------------
const productSubcategories = [
  // Phones
  { id: 'iphone', categoryId: 'phones', name: 'iPhone' },
  { id: 'samsung', categoryId: 'phones', name: 'Samsung' },
  { id: 'android', categoryId: 'phones', name: 'Other Android' },

  // Accessories
  { id: 'chargers', categoryId: 'accessories', name: 'Chargers & Cables' },
  { id: 'cases', categoryId: 'accessories', name: 'Cases & Covers' },
  { id: 'screen', categoryId: 'accessories', name: 'Screen Protectors' },
  { id: 'earphones', categoryId: 'accessories', name: 'Earphones & Headsets' },
  { id: 'powerbank', categoryId: 'accessories', name: 'Power Banks' },

  // Repair Services
  { id: 'screen-repair', categoryId: 'repair', name: 'Screen Repair' },
  { id: 'battery-repair', categoryId: 'repair', name: 'Battery Replacement' },
  { id: 'other-repair', categoryId: 'repair', name: 'Other Repairs' },

  // Spare Parts
  { id: 'batteries', categoryId: 'spareparts', name: 'Phone Batteries' }
];

// ------------------------------
// 3. PRODUCTS
// ------------------------------
const allProducts = [
  // iPhone
  { id: 1, categoryId: 'phones', subcategoryId: 'iphone', name: 'iPhone 16 Pro Max - 256GB', costPrice: 315000, sellingPrice: 349000, stock: 8, sku: 'IP16PM-256' },
  { id: 2, categoryId: 'phones', subcategoryId: 'iphone', name: 'iPhone 16 Pro - 128GB', costPrice: 265000, sellingPrice: 289000, stock: 12, sku: 'IP16P-128' },
  { id: 3, categoryId: 'phones', subcategoryId: 'iphone', name: 'iPhone 15 Pro - 256GB', costPrice: 235000, sellingPrice: 259000, stock: 6, sku: 'IP15P-256' },
  { id: 4, categoryId: 'phones', subcategoryId: 'iphone', name: 'iPhone 15 - 128GB', costPrice: 155000, sellingPrice: 169000, stock: 15, sku: 'IP15-128' },

  // Samsung
  { id: 5, categoryId: 'phones', subcategoryId: 'samsung', name: 'Samsung Galaxy S24 Ultra - 256GB', costPrice: 275000, sellingPrice: 299000, stock: 5, sku: 'SMS24U-256' },
  { id: 6, categoryId: 'phones', subcategoryId: 'samsung', name: 'Samsung Galaxy S24+ - 256GB', costPrice: 195000, sellingPrice: 215000, stock: 9, sku: 'SMS24P-256' },
  { id: 7, categoryId: 'phones', subcategoryId: 'samsung', name: 'Samsung Galaxy A55', costPrice: 72000, sellingPrice: 79900, stock: 20, sku: 'SMA55' },

  // Other Android
  { id: 8, categoryId: 'phones', subcategoryId: 'android', name: 'Xiaomi 14', costPrice: 135000, sellingPrice: 149000, stock: 7, sku: 'XM14' },
  { id: 9, categoryId: 'phones', subcategoryId: 'android', name: 'OnePlus 12', costPrice: 155000, sellingPrice: 169000, stock: 6, sku: 'OP12' },

  // Chargers and cables
  { id: 10, categoryId: 'accessories', subcategoryId: 'chargers', name: 'Apple 20W USB-C Adapter', costPrice: 4200, sellingPrice: 5500, stock: 50, sku: 'CHG-AP20W' },
  { id: 11, categoryId: 'accessories', subcategoryId: 'chargers', name: 'Samsung 45W Super Fast Charger', costPrice: 5800, sellingPrice: 7500, stock: 35, sku: 'CHG-SAM45W' },
  { id: 12, categoryId: 'accessories', subcategoryId: 'chargers', name: 'Type-C Cable - 1m', costPrice: 600, sellingPrice: 900, stock: 100, sku: 'CABLE-TC1' },
  { id: 13, categoryId: 'accessories', subcategoryId: 'chargers', name: 'Lightning Cable - 1m', costPrice: 800, sellingPrice: 1200, stock: 80, sku: 'CABLE-LTG1' },

  // Cases
  { id: 14, categoryId: 'accessories', subcategoryId: 'cases', name: 'iPhone 16 Pro Max Silicone Case', costPrice: 1800, sellingPrice: 2500, stock: 30, sku: 'CASE-IP16PM' },
  { id: 15, categoryId: 'accessories', subcategoryId: 'cases', name: 'Samsung S24 Ultra Clear Case', costPrice: 1500, sellingPrice: 2000, stock: 25, sku: 'CASE-SAM24U' },

  // Screen protectors
  { id: 16, categoryId: 'accessories', subcategoryId: 'screen', name: 'Tempered Glass - iPhone 16 Pro Max', costPrice: 150, sellingPrice: 300, stock: 150, sku: 'GLASS-IP16PM' },
  { id: 17, categoryId: 'accessories', subcategoryId: 'screen', name: 'Tempered Glass - Universal', costPrice: 100, sellingPrice: 200, stock: 200, sku: 'GLASS-UNI' },

  // Earphones
  { id: 18, categoryId: 'accessories', subcategoryId: 'earphones', name: 'AirPods Pro 2nd Gen', costPrice: 42000, sellingPrice: 52000, stock: 12, sku: 'EAR-APP2' },
  { id: 19, categoryId: 'accessories', subcategoryId: 'earphones', name: 'Type-C Earphones', costPrice: 800, sellingPrice: 1200, stock: 60, sku: 'EAR-TC' },

  // Power banks
  { id: 20, categoryId: 'accessories', subcategoryId: 'powerbank', name: 'Power Bank 10000mAh', costPrice: 3800, sellingPrice: 4900, stock: 22, sku: 'PB-10K' },
  { id: 21, categoryId: 'accessories', subcategoryId: 'powerbank', name: 'Power Bank 20000mAh', costPrice: 6500, sellingPrice: 8500, stock: 18, sku: 'PB-20K' },

  // Repair services
  { id: 22, categoryId: 'repair', subcategoryId: 'screen-repair', name: 'Screen Replacement - iPhone 15', costPrice: 18000, sellingPrice: 25000, stock: 999, sku: 'RPR-SCR-IP15' },
  { id: 23, categoryId: 'repair', subcategoryId: 'battery-repair', name: 'Battery Replacement - iPhone 15', costPrice: 8500, sellingPrice: 12000, stock: 999, sku: 'RPR-BAT-IP15' }
];

// ------------------------------
// HELPER FUNCTIONS
// ------------------------------

function getSubcategories(categoryId) {
  return productSubcategories.filter(
    subcategory => subcategory.categoryId === categoryId
  );
}

function getProductsByCategory(categoryId) {
  return allProducts.filter(product => product.categoryId === categoryId);
}

function getProductsBySubcategory(subcategoryId) {
  return allProducts.filter(
    product => product.subcategoryId === subcategoryId
  );
}

function getCategoryName(categoryId) {
  const category = productCategories.find(item => item.id === categoryId);
  return category ? category.name : 'Unknown';
}

function getSubcategoryName(subcategoryId) {
  const subcategory = productSubcategories.find(
    item => item.id === subcategoryId
  );
  return subcategory ? subcategory.name : 'Unknown';
}

// One shared API for browser and CommonJS consumers.
const productCatalog = {
  productCategories,
  productSubcategories,
  allProducts,
  getSubcategories,
  getProductsByCategory,
  getProductsBySubcategory,
  getCategoryName,
  getSubcategoryName
};

// Expose the API as browser globals.
if (typeof window !== 'undefined') {
  Object.assign(window, productCatalog);
}

// Export the API when running in Node.js with CommonJS.
if (typeof module === 'object' && module !== null && module.exports) {
  module.exports = productCatalog;
}
