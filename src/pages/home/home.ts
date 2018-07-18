import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail';
import { Data } from '../../providers/data';

// declare let ace: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data) {

    this.dataService.getData().then((todos) => {

      if (todos) {
        this.items = todos;
      }

      // if (ace.platform == "Android") {
      //   // Handle the app being resumed by a widget click:
      //   // ace.addEventListener("android.intentchanged", checkForWidgetActivation);
        
      //     ace.android.appWidget.clear();
          
      //     for (var i = 0; i < 10; i++) {
      //       ace.android.appWidget.add("Item with index " + i);
      //     }
      // }

    });

  }

  ionViewDidLoad() {

  }

  addItem() {

    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {

      if (item) {
        this.saveItem(item);
      }

    });

    addModal.present();

  }

  saveItem(item) {
    this.items.push(item);
    this.dataService.save(this.items);
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}