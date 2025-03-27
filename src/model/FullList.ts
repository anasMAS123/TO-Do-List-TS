import ListItem from "./ListItem";

export interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList {
  //singleton : this class can have only one objeact(we have only one list)
  //to apply this approach you need to make the constructor private
  //then instantiate object inside the class with keyword static to access it by the class name
  static instance: FullList = new FullList();
  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    //check if there is saved itemList in localStorage
    const storedList: string | null = localStorage.getItem("myList");
    if (typeof storedList !== "string") return;
    //if found in localStorage , Parse them
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);
    //create ListItem Object from each object that was in the local storage
    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      //add the item to the List
      FullList.instance.addItem(newListItem);
    });
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }
  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }
  removeItem(id: string): void {
    console.log(id);
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
