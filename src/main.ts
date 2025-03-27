import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./template/ListTemplate";

const initApp = (): void => {
  const fullList: FullList = FullList.instance;
  const listTemplate: ListTemplate = ListTemplate.instance;

  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();
    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = input.value;
    if (!newEntryText.trim()) return;
    const id: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;
    const newListItem = new ListItem(id.toString(), newEntryText);
    fullList.addItem(newListItem);
    listTemplate.render(fullList);
  });
  const clearItemsButton = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;
  clearItemsButton.addEventListener("click", () => {
    fullList.clearList();
    listTemplate.clear();
  });
  fullList.load();
  listTemplate.render(fullList);
};
document.addEventListener("DOMContentLoaded", initApp);
