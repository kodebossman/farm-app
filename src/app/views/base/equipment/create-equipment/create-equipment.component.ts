import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-create-equipment',
  templateUrl: './create-equipment.component.html',
  styleUrls: ['./create-equipment.component.scss']
})
export class CreateEquipmentComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() equipment:any;
  id:number;
  equipmentName:string;
  identificationNumber: string;
  description: string;
  category: Date;
  quantity: number;
  equipmentValue:string;
  equipmentCapacity: string;
  manufacturer:string;
  farmerId: number;


  ngOnInit(): void {
    this.id=this.equipment.id;
    this.equipmentName=this.equipment.equipmentName;
    this.identificationNumber = this.equipment.identificationNumber;
    this.description = this.equipment.description;
    this.category = this.equipment.category;
    this.quantity = this.equipment.quantity;
    this.equipmentValue = this.equipment.equipmentValue;
    this.manufacturer = this.equipment.manufacturer;
    this.farmerId = this.equipment.farmerId;
  }

  addEquipment(){
    var val = {id:this.id,
      equipmentName:this.equipmentName,
      identificationNumber: this.identificationNumber,
      description: this.description,
      category: this.category,
      quantity: this.quantity,
      equipmentValue: this.equipmentValue,
      manufacturer: this.manufacturer,
      farmerId: this.farmerId,       
              };
    this.service.addFarmer(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateEquipment(){
    var val = {id:this.id,
      equipmentName:this.equipmentName,
      identificationNumber: this.identificationNumber,
      description: this.description,
      category: this.category,
      quantity: this.quantity,
      equipmentValue: this.equipmentValue,
      manufacturer: this.manufacturer,
      farmerId: this.farmerId,
       
      };
    this.service.updateFarm(val).subscribe(res=>{
    alert(res.toString());
    });
  }

}