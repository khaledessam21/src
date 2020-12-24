import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import  {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    AgmCoreModule.forRoot({
    apiKey:'AIzaSyAiB4OXIbJTj_xfi45o4eZFdD5pPZcgU4o'

    })
  ],
})
export class SignupPageModule {}
