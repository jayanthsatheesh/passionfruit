# Spreadsheet-Based Product Management

Your PassionFruit site now uses a simple CSV spreadsheet for product management - no complex admin panels needed!

## How It Works

1. **Edit the CSV File**: All product data is stored in `public/products.csv`
2. **Deploy Changes**: Simply upload the updated CSV file to see changes live
3. **Easy Management**: Use Excel, Google Sheets, or any spreadsheet editor

## CSV File Structure

The `products.csv` file contains all your product information with these columns:

### Required Fields (Must Have Values)
- `id` - Unique product identifier (use lowercase with hyphens)
- `name` - Product display name
- `description` - Detailed product description
- `category` - Main category (Photography, Music, Adventure, Tech)
- `weeklyPrice` - Weekly rental price in rupees (numbers only)
- `available` - true/false for availability

### Optional Fields
- `subcategory` - Product subcategory
- `brand` - Product brand (Canon, Sony, etc.)
- `model` - Specific model number/name
- `condition` - new, like-new, good, fair
- `experienceLevel` - explorer, aspiring, pro
- `monthlyPrice` - Monthly rental price
- `discount` - Discount amount
- `discountType` - percentage or fixed
- `tax` - Tax amount (default: 18 for GST)
- `taxType` - percentage or fixed
- `primaryImage` - Main product image URL
- `additionalImages` - Extra image URLs (separate with |)
- `unitOfMeasurement` - piece, set, kit, pair, package
- `stockQuantity` - Number available for rent
- `features` - Key features (separate with |)
- `included` - What's included in rental (separate with |)
- `tags` - Search tags (separate with |)
- `dimensions` - Size and weight (e.g., "24x12x7cm, 650g")
- `securityDeposit` - Security deposit amount
- `insurance` - Insurance fee
- `minimumRentalDays` - Minimum rental period
- `maximumRentalDays` - Maximum rental period
- `deliveryOptions` - Available delivery methods (separate with |)
- `restrictions` - Any usage restrictions (separate with |)

## Editing Products

### Using Google Sheets (Recommended)
1. Upload `products.csv` to Google Sheets
2. Edit your products in the spreadsheet
3. Download as CSV
4. Replace the `public/products.csv` file
5. Deploy your site

### Using Excel
1. Open `products.csv` in Excel
2. Make your changes
3. Save as CSV (Comma delimited)
4. Replace the original file
5. Deploy your site

### Using Any Text Editor
1. Open `products.csv` in any text editor
2. Follow the CSV format carefully
3. Use commas to separate fields
4. Use quotes around text that contains commas
5. Save and deploy

## Tips for Managing Your Products

### Adding New Products
1. Copy an existing row
2. Change the `id` to something unique
3. Update all the product details
4. Set `available` to `true`

### Using Multiple Values (Lists)
For fields like features, included items, tags, and images, separate multiple values with the pipe symbol `|`:
```
features: "24MP sensor|4K video|Weather sealed"
included: "Camera body|Battery|Charger|Strap"
tags: "sony|mirrorless|professional|4k"
```

### Image URLs
- Use high-quality image URLs from services like Unsplash
- Primary image shows on product cards
- Additional images can be viewed on product detail pages
- Format: `https://images.unsplash.com/photo-1234567890`

### Pricing Strategy
- Set competitive weekly prices
- Monthly prices typically 3-4x weekly price
- Use discounts for promotional periods
- Consider security deposits for expensive items

### Categories
Current supported categories:
- **Photography**: Cameras, Lenses, Lighting, Accessories
- **Music**: Microphones, Audio Equipment, Instruments
- **Adventure**: Camping Gear, Hiking Equipment, Outdoor Gear  
- **Tech**: Drones, Computers, Gadgets, Electronics

## Example Product Row

```csv
dji-mini-3,"DJI Mini 3","Ultra-lightweight drone with 4K camera perfect for travel",Tech,Drones,DJI,"Mini 3",new,explorer,1800,5400,15,percentage,18,percentage,https://images.unsplash.com/photo-1473968512647-3e447244af8f,"https://images.unsplash.com/photo-1578662996442-48f60103fc96",piece,2,"4K HDR video|38-min flight time|Ultra-lightweight","Drone|Controller|3 batteries|Charging hub","dji|drone|4k|travel|lightweight","24x15x6cm, 249g",3000,300,1,7,"pickup|delivery","Drone license required|Weather dependent",true
```

## Deployment

After editing your CSV:
1. Replace `public/products.csv` with your updated file
2. Deploy your static site
3. Changes will be live immediately

Your site will automatically load products from the CSV file, making it easy to manage your rental inventory without any complex admin systems!