import { EraiRawsDataScraperProvider } from './../../providers/erai-raws-data-scraper/erai-raws-data-scraper';
import { EraiRawsData } from './../../models/erai-raws-data';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild('searchbar') searchbar: Searchbar;
  selectedItem: EraiRawsData;
  items: Array<EraiRawsData>;
  inSearch: boolean = false;
  searchTerm: string = "";

  dataService: DataProvider;
  constructor(public navCtrl: NavController, public navParams: NavParams, public eraiRawsDataScraperProvider: EraiRawsDataScraperProvider) {

    this.selectedItem = navParams.get('item');
    eraiRawsDataScraperProvider.getData(this.selectedItem.Child).subscribe(
      data => {
        this.items = data;
        this.dataService = new DataProvider(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  itemTapped(event, item) {
    if (item.Type != "folder") {
      window.open(item.Href);
      return false;
    }
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
