// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
// import { urlToNavGroupStrings } from '../../../node_modules/ionic-angular/umd/navigation/url-serializer';
import {URL} from '../../pages/constant'

@Injectable()
export class SocietyApiProvider {
  data = [
    { id: 1,
      name: 'sarika',
      vehicleNo: 'MH12jg12',
      mobileNo: 7723073700,
      type: 'Society member',
      flatNo: 'A101',
      vAddress: 'Eros Meadows',
      image: '../../assets/imgs/profile.png',
      visitor : 
       [{ name:'abc',
        contact:7723073700,
        image: '../../assets/imgs/profile.png',
        },
        {
          name:'abc',
          contact:7723073700,
          image: '../../assets/imgs/profile.png',
        },
        {
          name:'abc',
          contact:7723073700,
          image: '../../assets/imgs/profile.png',
        }
      ]
      
    },
    {
      name: 'priya',
      vehicleNo: 'MP7678f',
      mobileNo: 123456789,
      type: 'Delivery',
      flatNo: 'A102',
      vAddress: 'Persistent',
      image: '../../assets/imgs/profile.png',
      id: 2,
      visitor : 
      [{ name:'bcd',
       contact:123456789,
       image: '../../assets/imgs/profile.png',
       },
       {
         name:'efg',
         contact:123456789,
         image: '../../assets/imgs/profile.png',
       },
       {
         name:'hij',
         contact:123456789,
         image: '../../assets/imgs/profile.png',
       }
     ]
    },
    {
      name: 'Vipul',
      vehicleNo: 'MH14',
      mobileNo: 987654321,
      type: 'Visitor',
      flatNo: 'A103',
      vAddress: 'Baner',
      image: '../../assets/imgs/profile.png',
      id: 4,
      visitor : 
      [{ name:'klm',
       contact:987654321,
       image: '../../assets/imgs/profile.png',
       },
       {
         name:'nop',
         contact:987654321,
         image: '../../assets/imgs/profile.png',
       },
       {
         name:'qrs',
         contact:987654321,
         image: '../../assets/imgs/profile.png',
       }
     ]
    },
    {
      name: 'Ajeet',
      vehicleNo: 'MH14',
      mobileNo: 1231231231,
      type: 'Society member',
      flatNo: 'A104',
      vAddress: 'Anshul Casa',
      image: '../../assets/imgs/profile.png ',
      id: 3,
      visitor : 
      [{ name:'tuv',
       contact:1231231231,
       image: '../../assets/imgs/profile.png',
       },
       {
         name:'wxy',
         contact:1231231231,
         image: '../../assets/imgs/profile.png',
       },
       {
         name:'zab',
         contact:1231231231,
         image: '../../assets/imgs/profile.png',
       }
     ]
    },
    {
      name: 'Sachin',
      vehicleNo: 'MH14',
      mobileNo: 1234567890,
      type: 'Staff Member',
      flatNo: 'A105',
      vAddress: 'Anshul Casa',
      image: '../../assets/imgs/profile.png',
      id: 3,
      visitor : 
      [{ name:'cde',
       contact:1234567890,
       image: '../../assets/imgs/profile.png',
       },
       {
         name:'fgh',
         contact:1234567890,
         image: '../../assets/imgs/profile.png',
       },
       {
         name:'aijkbc',
         contact:1234567890,
         image: '../../assets/imgs/profile.png',
       }
     ]
    }
  
  ];
  societyContacts={
    Manager : {
      name:'Manager',
      contact:1234567890,
      image: '../../assets/imgs/profile.png',
    },
    AssistantManager : {
      name:'AssistantManager',
      contact:1234567890,
      image: '../../assets/imgs/profile.png',
    },
    President:{
      name:'president',
      contact:1234567890,
      image: '../../assets/imgs/profile.png',
    },
    Emergency :{
      name:'Emergency',
      contact:1234567890,
      image: '../../assets/imgs/profile.png',
    }
  }
  
  
  vDetails:any;

  constructor(private httpservice:HttpServiceProvider) {
    // console.log('Hello SocietyApiProvider Provider');
  }
  
  getAllVisitor(){
   let requestUrl =`${URL}apihost/all_vistors`;
    this.httpservice.get_Data(requestUrl, true).subscribe(data => {
      // console.log('...........getAllVisitor..................', data[0].list);
      this.data = data[0].list;
      return this.data;
     });
   
  }

  getOwnerDetails(flatNo){
    // this.httpservice.get_Data('url', true).subscribe(data => {
  
    // });
  let check: any ;
  if(check= this.data.find(element => element.flatNo === flatNo))
   console.log('...........getOwnerDetails..................' ,this.data.find(element => element.flatNo === flatNo));
   return check;
  }
  
  getVisitorByMobile(mobile){
    // this.httpservice.get_Data('url', true).subscribe(data => {
  
    // });
    // console.log('...........mobile..................' ,mobile);
    this.data.forEach(element => {
  
      if(element.mobileNo == mobile){
       
        this.vDetails = element;
        }
    });
    return this.vDetails;
  }
  

  getSocietyContact(){
    this.httpservice.get_Data('url', true).subscribe(data => {
  
    });
    return this.societyContacts;
  }


  addVisitor(visitor){
    this.httpservice.post_Data("requestUrl", visitor, true)
    .subscribe(data => {
    });
    this.data.push(visitor);
    console.log('...........added Visitor..................' ,this.data);
  }
  
  updateVisitorDetails(visitorData){
    this.httpservice.put_Data("requestURL", visitorData,
      false)
      .subscribe(
        data => {
        },
        error => {
          console.log('on error in data server message: ', error);
        },
      );
  }

}
