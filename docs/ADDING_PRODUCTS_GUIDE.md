# How to Add New Products to Your CSV

## Step-by-Step Guide

### Method 1: Using Google Sheets (Recommended)

1. **Open the CSV file**
   - Go to [Google Sheets](https://sheets.google.com)
   - Click "File" → "Import" → "Upload"
   - Select your `products.csv` file

2. **Add a new product row**
   - Click on the last row with data
   - Press Enter to create a new row
   - Fill in all the required fields

3. **Download and replace**
   - Click "File" → "Download" → "Comma-separated values (.csv)"
   - Replace your `public/products.csv` file
   - Deploy your site

### Method 2: Using Excel

1. **Open the CSV**
   - Open `products.csv` in Excel
   - Be careful to maintain CSV format

2. **Add new row**
   - Go to the last row
   - Add your product data
   - Use pipe symbols `|` for multiple values

3. **Save correctly**
   - Click "Save As"
   - Choose "CSV (Comma delimited) (*.csv)"
   - Replace the original file

## Required Fields (Must Fill)

### Essential Information
- **id**: Unique identifier (use lowercase with hyphens)
  - Example: `canon-rf-50mm` or `rode-podcaster-pro`
- **name**: Product display name
  - Example: `"Canon RF 50mm f/1.2L"`
- **description**: Detailed description
  - Example: `"Professional portrait lens with ultra-wide f/1.2 aperture"`
- **category**: Main category
  - Options: `Photography`, `Music`, `Adventure`, `Tech`
- **weeklyPrice**: Price in rupees (numbers only)
  - Example: `2500`
- **available**: Availability status
  - Use: `true` or `false`

## Example: Adding a New Camera Lens

```csv
canon-rf-50mm,"Canon RF 50mm f/1.2L","Professional portrait lens with ultra-wide f/1.2 aperture for stunning bokeh",Photography,Lenses,Canon,"RF 50mm f/1.2L USM",new,pro,2000,6000,0,percentage,18,percentage,https://images.unsplash.com/photo-1606983340077-41943a2c3d20,"https://images.unsplash.com/photo-1502920917128-1aa500764cbd",piece,1,"f/1.2 aperture|Weather sealed|USM autofocus|Professional quality","Lens|Front cap|Rear cap|Lens hood|UV filter","canon|lens|portrait|50mm|professional|bokeh","8x11cm, 950g",3500,350,1,14,"pickup|delivery","Compatible RF camera required|Advanced photography knowledge helpful",true
```

## Tips for Each Field

### Images
- **Primary Image**: Main product photo URL
- **Additional Images**: Extra photos separated by `|`
- Use high-quality images from Unsplash or your own hosted images

### Multiple Values (Use | separator)
- **Features**: `"4K recording|Weather sealed|Fast autofocus"`
- **Included**: `"Camera|Battery|Charger|Strap|Manual"`
- **Tags**: `"canon|professional|photography|dslr"`
- **Delivery Options**: `"pickup|delivery|express"`

### Pricing Strategy
- **Weekly Price**: Your main rental price
- **Monthly Price**: Usually 3-4x weekly price
- **Discount**: Promotional discount (0 if none)
- **Security Deposit**: Usually 2-3x weekly price for expensive items

### Categories & Subcategories

**Photography**:
- Digital Cameras, Lenses, Lighting Equipment, Tripods, Accessories

**Music**:
- Microphones, Audio Equipment, Instruments, Recording Gear

**Adventure**:
- Backpacks, Camping Gear, Hiking Equipment, Outdoor Gear

**Tech**:
- Drones, Laptops, Computers, Gadgets, Electronics

## Common Mistakes to Avoid

1. **Don't use commas in text fields** - Use quotes around text that might contain commas
2. **Keep IDs unique** - Each product needs a different ID
3. **Use correct boolean values** - Only `true` or `false` for available field
4. **Number fields** - Don't include currency symbols in price fields
5. **Image URLs** - Make sure URLs are accessible and high-quality

## Testing Your Changes

After adding products:
1. Save your CSV file
2. Replace the `public/products.csv` file
3. Reload your website
4. Check that new products appear correctly
5. Test the search function with your new product tags

## Quick Copy Template

For quick additions, copy this template and modify:

```csv
new-product-id,"Product Name","Product description here",Category,Subcategory,Brand,Model,like-new,explorer,1000,3000,0,percentage,18,percentage,https://images.unsplash.com/photo-example,"",piece,1,"Feature 1|Feature 2|Feature 3","Item 1|Item 2|Item 3","tag1|tag2|tag3","10x5x3cm, 200g",500,50,1,14,"pickup|delivery","Basic knowledge helpful",true
```

Just replace each field with your product information and you're ready to go!