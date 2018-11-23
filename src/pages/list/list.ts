import { EraiRawsDataScraperProvider } from './../../providers/erai-raws-data-scraper/erai-raws-data-scraper';
import { EraiRawsData } from './../../models/erai-raws-data';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: EraiRawsData;
  icons: string[];
  items: Array<EraiRawsData>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eraiRawsDataScraperProvider: EraiRawsDataScraperProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    eraiRawsDataScraperProvider.getData(this.selectedItem.Child).subscribe(
      data => {
        console.log(data);
        this.items = data;
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
}
