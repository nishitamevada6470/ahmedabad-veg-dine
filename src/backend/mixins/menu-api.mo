import List "mo:core/List";
import MenuLib "../lib/menu";
import MenuTypes "../types/menu";

mixin (menuItems : List.List<MenuTypes.MenuItem>) {

  public query func getAllMenuItems() : async [MenuTypes.MenuItem] {
    MenuLib.getAllMenuItems(menuItems);
  };

  public query func getMenuItemsByCategory(category : Text) : async [MenuTypes.MenuItem] {
    MenuLib.getMenuItemsByCategory(menuItems, category);
  };

  public query func getVegetarianItems() : async [MenuTypes.MenuItem] {
    MenuLib.getVegetarianItems(menuItems);
  };
};
