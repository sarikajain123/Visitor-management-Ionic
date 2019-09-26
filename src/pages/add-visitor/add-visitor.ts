import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SocietyApiProvider } from '../../providers/society-api/society-api';
import { HomePage } from '../home/home';
// import { SMS } from '@ionic-native/sms';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ActionSheetController, ModalController } from 'ionic-angular';
import {URL} from '../constant'


declare let navigator: any;
declare var Camera: any;
declare let sms: any;


@IonicPage()
@Component({
  selector: 'page-add-visitor',
  templateUrl: 'add-visitor.html',
})
export class AddVisitorPage {

  displayPic: any = '../../assets/imgs/profile.png';
  options = ['SocietyMember', 'Visitor', 'Staff', 'Courier', 'Delivery', 'Cab'];

  profileImage: any = '../../assets/imgs/profile.png';
  private win: any = window;
  uploadimg: any;
  otp: number;
  mobile: number;

  constructor(private httpservice: HttpServiceProvider, public nav: NavController,
    public navParams: NavParams, private SocietyApiProvider: SocietyApiProvider,
    private actionSheetController: ActionSheetController,
    private modelController: ModalController,
  ) {
    // this.sendMsg();
  }

  actionSheet() {
    let actSheet = this.actionSheetController.create({
      title: 'Open medel',
      buttons: [
        {
          text: 'Gallery',
          handler: () => {
            this.cameraTakePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.cameraTakePicture(Camera.PictureSourceType.CAMERA);
          }
        }
      ]
    });
    actSheet.present();
  }
  openModel() {
    let model = this.modelController.create('ModelPage');
    model.present()
  }



  sendOtp() {
    // this.sms.send('7723073700', 'Hello world!!!!!!!!!!!!!!!!!sendOtp worked Ionic');
    this.otp = Math.floor(Math.random() * 899999 + 100000)
    console.log('......sendOtp called.......otp.............\n', this.otp);
  }

  addVisitor(visitorForm, imgBlob) {
    console.log('....inside addVisitor...');

    let requestUrl = `${URL}/apihost/add_visitor`;

    const formData: FormData = new FormData();
    if (imgBlob) {
      formData.append('image', imgBlob, 'postCall');
    }
    if (visitorForm.name) {
      formData.append('name', visitorForm.name);
    }
    if (visitorForm.vehicleNo) {
      formData.append('vehicle_number', visitorForm.vehicleNo);
    }
    if (visitorForm.mobileNo) {
      formData.append('phone', visitorForm.mobileNo);
    }
    if (visitorForm.vAddress) {
      formData.append('coming_from', visitorForm.vAddress);
    }
    if (visitorForm.email) {
      formData.append('email_id', visitorForm.email);
    }
    if (visitorForm.vtype) {
      formData.append('representing', visitorForm.vtype);
    }
    if (visitorForm.flatNo) {
      formData.append('additional_info', visitorForm.flatNo);
    }
    // if(visitorForm.number_of_persons){
    //   formData.append('number_of_persons', visitorForm.number_of_persons,);
    // }

    // formData.append('to_meet_personID', '1');

    this.httpservice.post_Data(requestUrl, formData, true)
      .subscribe(data => {
        console.log('\n.. add visitor. called.......', data);
      });
  }

  Submit(visitorForm) {
    if (visitorForm.validateOtp === this.otp) {
      console.log('\n.. OTP varified.......', visitorForm.validateOtp);
      alert('Mobile No Verified..');
      this.getImageFileObject(visitorForm);
      this.nav.setRoot(HomePage);
    }
    else {
      alert('Provided OTP is incorrect... Please check and verify your Mobile Number');
    }

  }

  resetForm(visitorForm) {
    if (visitorForm != null) {
      this.displayPic = '../../assets/imgs/profile.png';
      visitorForm.reset();
    }

  }


  fileChange(event: EventTarget) {

    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;
    this.uploadimg = files[0];
    console.log('........', this.uploadimg);
  }


  cameraTakePicture(sourceType) {
    navigator.camera.getPicture((imageData) => {
      this.displayPic = this.win.Ionic.WebView.convertFileSrc(imageData);
      this.profileImage = imageData;
      console.log('....cameraTakePicture........', this.profileImage);
    }, onFail, {
        quality: 50,
        allowEdit: true,
        correctOrientation: true,
        sourceType: sourceType,
        // mediaType: Camera.MediaType.PICTURE,
        saveToPhotoAlbum: true,
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.JPEG,
        // destinationType: Camera.DestinationType.DATA_URL
      });
    function onFail(message) {
      alert('Failed because: ' + message);
    }
  }

  getImageFileObject(visitorForm) {

    const self = this;
    if (!this.profileImage.startsWith('file')) {
      this.profileImage = 'file://' + this.profileImage;
    }
    window['resolveLocalFileSystemURL'](this.profileImage, function (fileEntry) {
      fileEntry.file(function (file) {
        const reader = new FileReader();
        reader.onloadend = function (e) {
          const imgBlob = new Blob([this.result], { type: 'image/jpeg' });
          self.profileImage = imgBlob;
          console.log('..Inside..TakePicture........', self.profileImage);
          console.log('...blob created.. ', self.profileImage);
          console.log("\nblob size:" + imgBlob.size);
          self.addVisitor(visitorForm, imgBlob);
        };
        reader.readAsArrayBuffer(file);

      });
    }, function (error) {
      console.error('Error while creating Blob..', error);
    });
  }

  // https://github.com/cordova-sms/cordova-sms-plugin
  sendMsg() {
    this.sendOtp();
    var number = this.mobile;  /* iOS: ensure number is actually a string */
    var message = 'Verifying Your Mobile Number... Your Otp is ' + this.otp;
    console.log(":::number=" + this.mobile + " , message= " + message);

    //CONFIGURATION
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        // intent: 'INTENT'  // send SMS with the native android SMS messaging
        intent: '' // send SMS without opening any other app
      }
    };

    var success = function () { alert('Message sent successfully'); };
    var error = function (e) { alert('Message Failed:' + e); };
    sms.send(number, message, options, success, error);
  }
}




