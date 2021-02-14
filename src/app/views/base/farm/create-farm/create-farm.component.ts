import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-create-farm',
  templateUrl: './create-farm.component.html',
  styleUrls: ['./create-farm.component.scss']
})
export class CreateFarmComponent implements OnInit {

  
  constructor(private service:SharedService) { }

  @Input() farm:any;
  id:number;
  name:string;
  description:string;
  plotNumber: string; 
  ownerId:string;
  size: string;


  ngOnInit(): void {
    this.id=this.farm.id;
    this.name=this.farm.name;
    this.description = this.farm.description;
    this.plotNumber = this.farm.plotNumber;
    this.ownerId = this.farm.ownerId;
    this.size = this.farm.size;
  }

  addFarm(){
    var val = {id:this.id,
              name:this.name,
              description: this.description,
              plotNumber: this.plotNumber,
              ownerId: this.farm.ownerId,
              size: this.farm.size,
               
              };
    this.service.addFarms(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateFarmer(){
    var val = {id:this.id,
      name:this.name,
      description: this.description,
      plotNumber: this.plotNumber,
      ownerId: this.farm.ownerId,
      size: this.farm.size,
       
      };
    this.service.updateFarm(val).subscribe(res=>{
    alert(res.toString());
    });
  }

}
