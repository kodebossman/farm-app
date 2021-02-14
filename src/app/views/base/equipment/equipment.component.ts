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
    this.modalTitle="Add Farmer";
    this.activateAddEditEComp=true;
    console.log("clicked by user");
    this.bigSize=true;

  }


  editClick(editedFarmer){
    this.farmer=editedFarmer;
    this.modalTitle="Edit Farmer";
    this.activateAddEditFarmerComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure you want to delete this farmer??')){
      this.service.deleteFarmer(item.id).subscribe(data=>{
        this.refreshFarmerList();
      })
    }
  }

  closeClick(){
    this.activateAddEditFarmerComp=false;
    this.refreshFarmerList();
  }


  refreshFarmerList(){
    this.service.getFarmersList().subscribe(data=>{
      this.farmersList=data;
      this.farmerListWithoutFilter=data;
    });
  }

  filterFn(){
    var farmerIdFilter = this.farmerIdFilter;
    var farmerNameFilter = this.farmerNameFilter;

    this.farmerNameFilter = this.farmerListWithoutFilter.filter(function (foundFarmer){
        return foundFarmer.id.toString().toLowerCase().includes(
          farmerIdFilter.toString().trim().toLowerCase()
        )&&
        foundFarmer.farmerName.toString().toLowerCase().includes(
          farmerNameFilter.toString().trim().toLowerCase()
        )
    });
  }

  sortResult(prop,asc){
    this.farmersList = this.farmerListWithoutFilter.sort(function(a,b){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}