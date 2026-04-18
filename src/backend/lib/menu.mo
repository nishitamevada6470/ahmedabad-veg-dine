import List "mo:core/List";
import MenuTypes "../types/menu";

module {
  public type MenuItem = MenuTypes.MenuItem;

  public func seedMenuItems(items : List.List<MenuItem>) : () {
    let seed : [MenuItem] = [
      // Starters
      { id = 1; name = "Dhokla"; description = "Soft and spongy steamed chickpea cake, a Gujarati classic"; price = 8000; category = "Starters"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 2; name = "Khandvi"; description = "Delicate gram flour rolls with coconut and mustard tempering"; price = 9000; category = "Starters"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 3; name = "Pani Puri"; description = "Crispy hollow puris filled with spiced water and tangy chutney"; price = 7000; category = "Starters"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 4; name = "Vada Pav"; description = "Mumbai-style spiced potato fritter in a soft bun"; price = 6000; category = "Starters"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 5; name = "Samosa (2 pcs)"; description = "Crispy pastry filled with spiced potatoes and peas"; price = 5000; category = "Starters"; isVegetarian = true; isAvailable = true; imageUrl = null },
      // Main Course
      { id = 6; name = "Dal Makhani"; description = "Creamy slow-cooked black lentils with butter and cream"; price = 18000; category = "Main Course"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 7; name = "Paneer Butter Masala"; description = "Cottage cheese in rich tomato-based creamy gravy"; price = 22000; category = "Main Course"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 8; name = "Palak Paneer"; description = "Cottage cheese cubes in smooth spinach gravy"; price = 20000; category = "Main Course"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 9; name = "Undhiyu"; description = "Traditional Gujarati mixed vegetable dish, a winter specialty"; price = 25000; category = "Main Course"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 10; name = "Chole Bhature"; description = "Spiced chickpea curry with fried bread — a hearty combo"; price = 17000; category = "Main Course"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 11; name = "Shahi Paneer"; description = "Royal paneer in a rich onion-cashew-cream sauce"; price = 24000; category = "Main Course"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 12; name = "Aloo Gobi"; description = "Dry spiced potatoes and cauliflower with cumin and coriander"; price = 16000; category = "Main Course"; isVegetarian = true; isAvailable = true; imageUrl = null },
      // Breads
      { id = 13; name = "Butter Naan"; description = "Soft leavened bread baked in tandoor, brushed with butter"; price = 5000; category = "Breads"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 14; name = "Garlic Naan"; description = "Tandoor-baked bread topped with garlic and fresh coriander"; price = 6000; category = "Breads"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 15; name = "Missi Roti"; description = "Wholesome bread made with gram flour and spices"; price = 4500; category = "Breads"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 16; name = "Bajra Roti"; description = "Traditional pearl millet flatbread served with ghee"; price = 4000; category = "Breads"; isVegetarian = true; isAvailable = true; imageUrl = null },
      // Rice
      { id = 17; name = "Steamed Basmati Rice"; description = "Fluffy long-grain basmati rice, perfectly cooked"; price = 8000; category = "Rice"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 18; name = "Vegetable Biryani"; description = "Fragrant basmati layered with spiced mixed vegetables"; price = 22000; category = "Rice"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 19; name = "Jeera Rice"; description = "Basmati rice tempered with cumin seeds and ghee"; price = 10000; category = "Rice"; isVegetarian = true; isAvailable = true; imageUrl = null },
      // Thali
      { id = 20; name = "Gujarati Thali"; description = "Complete meal with dal, sabzi, roti, rice, pickle, papad and sweet"; price = 35000; category = "Thali"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 21; name = "Mini Thali"; description = "Smaller portion thali — ideal for a light, satisfying meal"; price = 25000; category = "Thali"; isVegetarian = true; isAvailable = true; imageUrl = null },
      // Desserts
      { id = 22; name = "Gulab Jamun"; description = "Soft milk-solid dumplings soaked in rose-flavored sugar syrup"; price = 8000; category = "Desserts"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 23; name = "Shrikhand"; description = "Thick sweetened yogurt flavored with saffron and cardamom"; price = 9000; category = "Desserts"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 24; name = "Basundi"; description = "Rich reduced milk dessert with nuts and cardamom"; price = 10000; category = "Desserts"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 25; name = "Mohanthal"; description = "Traditional Gujarati gram-flour fudge with ghee and cardamom"; price = 7500; category = "Desserts"; isVegetarian = true; isAvailable = true; imageUrl = null },
      // Beverages
      { id = 26; name = "Masala Chai"; description = "Spiced Indian tea brewed with ginger, cardamom and milk"; price = 3000; category = "Beverages"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 27; name = "Mango Lassi"; description = "Thick blended yogurt drink with sweet Alphonso mango"; price = 6000; category = "Beverages"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 28; name = "Jaljeera"; description = "Refreshing chilled cumin-mint drink with a tangy kick"; price = 5000; category = "Beverages"; isVegetarian = true; isAvailable = true; imageUrl = null },
      { id = 29; name = "Buttermilk (Chaas)"; description = "Thin spiced yogurt drink with cumin and fresh coriander"; price = 4000; category = "Beverages"; isVegetarian = true; isAvailable = true; imageUrl = null },
    ];
    for (item in seed.vals()) {
      items.add(item);
    };
  };

  public func getAllMenuItems(items : List.List<MenuItem>) : [MenuItem] {
    items.toArray();
  };

  public func getMenuItemsByCategory(items : List.List<MenuItem>, category : Text) : [MenuItem] {
    items.filter(func(item) { item.category == category }).toArray();
  };

  public func getVegetarianItems(items : List.List<MenuItem>) : [MenuItem] {
    items.filter(func(item) { item.isVegetarian }).toArray();
  };
};
