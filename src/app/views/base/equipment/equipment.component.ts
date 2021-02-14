import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private service:SharedService,private modalService: BsModalService) { }
  //opening modal form 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.addClick();
  }

  equipmentList:any=[];
  bigSize:boolean = false;

  modalTitle:string;
  activateAddEditEquipmentComp:boolean=false;
  equipment:any;

  equipmentIdFilter:string="";
  equipmentNameFilter:string="";
  equipmentListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshFarmerList();
  }

  addClick(){
    this.equipment={
      id:0,
      equipmentName:"",
      identificationNumber:"",
      description: "",
      category: "",
      quantity: "",
      equipmentValue:"",
      equipmentCapacity: "",
      manufacturer:0,
      farmerId: ""

    }
    this.modalTitle="Add Equipment";
    this.activateAddEditEquipmentComp=true;
    console.log("clicked by user");
    this.bigSize=true;

  }


  editClick(editedEquipment){
    this.equipment=editedEquipment;
    this.modalTitle="Edit Equipment";
    this.activateAddEditEquipmentComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure you want to delete this equipment??')){
      this.service.deleteFarmer(item.id).subscribe(data=>{
        this.refreshFarmerList();
      })
    }
  }

  closeClick(){
    this.activateAddEditEquipmentComp=false;
    this.refreshFarmerList();
  }


  refreshFarmerList(){
    this.service.getEquipment().subscribe(data=>{
      this.equipmentList=data;
      this.equipmentListWithoutFilter=data;
    });
  }

  filterFn(){
    var equipmentIdFilter = this.equipmentIdFilter;
    var equipmentNameFilter = this.equipmentNameFilter;

    this.equipmentNameFilter = this.equipmentListWithoutFilter.filter(function (foundEquipment){
        return foundEquipment.id.toString().toLowerCase().includes(
          equipmentIdFilter.toString().trim().toLowerCase()
        )&&
        foundEquipment.equipmentName.toString().toLowerCase().includes(
          equipmentNameFilter.toString().trim().toLowerCase()
        )
    });
  }

  sortResult(prop,asc){
    this.equipmentList = this.equipmentListWithoutFilter.sort(function(a,b){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}