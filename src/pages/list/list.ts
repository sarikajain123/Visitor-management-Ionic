import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl } from '../../../node_modules/@angular/forms';
import { FlatDetailsPage } from '../flat-details/flat-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  searchTerm: string = '';
  searchControl: FormControl;
  // items: Array<{title: string, visitor: any, icon: string}>;
  items: Array<{flatNo: string}>;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.selectedItem = navParams.get('item');
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
    this.initializeItems();
  }

  

  itemTapped(event, item) {
    console.log(item.flatNo, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.....',item.flatNo.trim());
    // That's right, we're pushing to ourselves!
    this.navCtrl.setRoot(FlatDetailsPage, {
      item: item.flatNo.trim()
    });
  
  }
  initializeItems() {
    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        flatNo:  'A10'+ i,
        // note: 'This is item #' + i,
        // icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.flatNo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
   }
 
   };

