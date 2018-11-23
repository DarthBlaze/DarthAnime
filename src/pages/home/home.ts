import { EraiRawsDataScraperProvider } from "./../../providers/erai-raws-data-scraper/erai-raws-data-scraper";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { EraiRawsData } from "../../models/erai-raws-data";
import { ListPage } from "../list/list";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  items: Array<EraiRawsData>;
  constructor(
    public navCtrl: NavController,
    public eraiRawsDataScraperProvider: EraiRawsDataScraperProvider
  ) {
    eraiRawsDataScraperProvider.getData("").subscribe(
      data => {
        console.log(data);
        this.items = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  tap(item: EraiRawsData) {
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
