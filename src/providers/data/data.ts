import 'rxjs/add/operator/map';
import { EraiRawsData } from '../../models/erai-raws-data';

export class DataProvider {
  items: EraiRawsData[];
  constructor(public data: EraiRawsData[]) {
    this.items = data;
  }

  filterItems(searchTerm) {

    return this.items.filter((item) => {
      return item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

}
