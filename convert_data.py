import json

with open('c:/Development/notebook/extracted_products.json', 'r') as f:
    data = json.load(f)

# Helper function to generate clean product objects
def build_products():
    products = []
    titles = [
        "Pastel Ribbon & Heart Journal",
        "Aesthetic Daily Focus Planner",
        "Kawaii Pastel Gel Pen Set",
        "Gold Heart Wire Clip Organizers",
        "Pastel Gradient Washi Tape Collection",
        "Cute Ribbon Charm Bookmark Set",
        "Soft Cover Bullet Journal (A5)",
        "Pastel Mild Highlighters Pack"
    ]
    categories = ['Notebooks', 'Planner & Diaries', 'Pens & Writing', 'Office Accessories', 'Art Supplies', 'Office Accessories', 'Notebooks', 'Pens & Writing']
    prices = [399, 299, 249, 179, 199, 149, 349, 219]
    original_prices = [499, 399, 320, 240, 299, 199, 449, 280]

    for idx, item in enumerate(data):
        images = item.get('images', [])
        if not images:
            continue
        p_id = f"insta-prod-{idx+1}"
        title = titles[idx % len(titles)] + f" (Vol. {idx+1})"
        cat = categories[idx % len(categories)]
        price = prices[idx % len(prices)]
        orig_price = original_prices[idx % len(original_prices)]
        
        products.append({
            "id": p_id,
            "name": title,
            "category": cat,
            "price": price,
            "originalPrice": orig_price,
            "rating": 4.9,
            "reviewsCount": 120 + idx * 15,
            "image": images[0],
            "images": images,
            "badge": "Instagram Exclusive" if idx % 2 == 0 else "Best Seller",
            "isBestSeller": idx % 2 == 0,
            "isNew": idx % 3 == 0,
            "description": f"Curated aesthetic product directly from our Instagram collection. Features {len(images)} high-quality preview shots.",
            "specs": [
                {"label": "Collection", "value": "Instagram Pastel Goods"},
                {"label": "Images Included", "value": f"{len(images)} Carousel Views"},
                {"label": "Quality", "value": "Premium High-Grade Finish"}
            ]
        })
    return products

prods = build_products()
with open('c:/Development/notebook/unified_products.json', 'w') as f:
    json.dump(prods, f, indent=2)

print(f"Generated {len(prods)} products for all 3 apps.")
