import FullList from "../model/FullList";

export interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  static instance: ListTemplate = new ListTemplate();
  ul: HTMLUListElement;
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }
  clear(): void {
    this.ul.innerHTML = ``;
  }

  render(fullList: FullList): void {
    this.clear(); //very important
    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const checked = document.createElement("input") as HTMLInputElement;
      checked.type = "checkbox";
      checked.id = item.id;
      checked.checked = item.checked;
      li.append(checked);

      checked.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.innerText = item.item;
      li.append(label);

      const btn = document.createElement("button") as HTMLButtonElement;
      btn.classList.add("button");
      btn.textContent = "X";
      li.append(btn);
      btn.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });
      this.ul.append(li);
    });
  }
}
