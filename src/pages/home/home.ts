import { EraiRawsDataScraperProvider } from "./../../providers/erai-raws-data-scraper/erai-raws-data-scraper";
import { Component, ViewChild } from "@angular/core";
import { NavController, Searchbar } from "ionic-angular";
import { EraiRawsData } from "../../models/erai-raws-data";
import { ListPage } from "../list/list";
import { DataProvider } from "../../providers/data/data";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  @ViewChild('searchbar') searchbar:Searchbar;
  items: Array<EraiRawsData>;
  inSearch: boolean = false;
  searchTerm: string = "";
  dataService: DataProvider;
  
  constructor(
    public navCtrl: NavController,
    public eraiRawsDataScraperProvider: EraiRawsDataScraperProvider
  ) {
    eraiRawsDataScraperProvider.getData("").subscribe(
      data => {        
        this.items = data;
        this.dataService = new DataProvider(data);
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

  toggleSearch() {
    this.inSearch = !this.inSearch;
    this.searchTerm = "";
    if(this.inSearch){
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 300);
    }
  }

  setFilteredItems() {
    this.items = this.dataService.filterItems(this.searchTerm);
  }
}
