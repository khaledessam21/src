import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapModalPage } from './map-modal';
import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [
    MapModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MapModalPage),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAiB4OXIbJTj_xfi45o4eZFdD5pPZcgU4o'})
  ],
})
export class MapModalPageModule {}
