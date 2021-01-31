import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-create-farmer',
  templateUrl: './create-farmer.component.html',
  styleUrls: ['./create-farmer.component.scss']
})
export class CreateFarmerComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() farmer:any;
  id:number;
  farmerName:string;
  surname: string;
  nationalID: string;
  dateOfBirth: Date;
  gender: string;
  description:string;
  district: string;
  ward:number;
  village: string;


  ngOnInit(): void {
    this.id=this.farmer.id;
    this.farmerName=this.farmer.farmerName;
    this.surname = this.farmer.surname;
    this.nationalID = this.farmer.nationalID;
    this.dateOfBirth = this.farmer.dateOfBirth;
    this.gender = this.farmer.gender;
    this.description = this.farmer.description;
    this.district = this.farmer.description;
    this.ward = this.farmer.ward;
  }

  addFarmer(){
    var val = {id:this.id,
              farmerName:this.farmerName,
              surname: this.surname,
              nationalID: this.surname,
              dateOfBirth: this.dateOfBirth,
              gender: this.gender,
              description: this.description,
              district: this.district,
              ward: this.ward
               
              };
    this.service.addFarmer(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateFarmer(){
    var val = {id:this.id,
      farmerName:this.farmerName,
      surname: this.surname,
      nationalID: this.surname,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      description: this.description,
      district: this.district,
      ward: this.ward
       
      };
    this.service.updateFarm(val).subscribe(res=>{
    alert(res.toString());
    });
  }

}
