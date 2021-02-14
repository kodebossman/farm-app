
import { Component, OnInit,TemplateRef } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private service:SharedService,private modalService: BsModalService) { }
  //opening modal form 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.addClick();
  }

  farmList:any=[];
  bigSize:boolean = false;

  modalTitle:string;
  activateAddEditFarmComp:boolean=false;
  farm:any;

  farmIdFilter:string="";
  farmNameFilter:string="";
  farmListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshFarmList();
  }

  addClick(){
    this.farm={
      id:0,
      name:"",
      description:"",
      plotNumber: "",
      ownerId: 1,
      size: 0,
    }
    this.modalTitle="Add Farm";
    this.activateAddEditFarmComp=true;
    console.log("clicked by user");
    this.bigSize=true;

  }


  editClick(editedFarm){
    this.farm=editedFarm;
    this.modalTitle="Edit Farm";
    this.activateAddEditFarmComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure you want to delete this farm??')){
      this.service.deleteFarm(item.id).subscribe(data=>{
        alert(data.toString());
        this.refreshFarmList();
      })
    }
  }

  closeClick(){
    this.activateAddEditFarmComp=false;
    this.refreshFarmList();
  }


  refreshFarmList(){
    this.service.getFarms().subscribe(data=>{
      this.farmList=data;
      this.farmListWithoutFilter=data;
    });
  }

  filterFn(){
    var farmerIdFilter = this.farmIdFilter;
    var farmerNameFilter = this.farmNameFilter;

    this.farmNameFilter = this.farmListWithoutFilter.filter(function (foundFarm){
        return foundFarm.id.toString().toLowerCase().includes(
          farmerIdFilter.toString().trim().toLowerCase()
        )&&
        foundFarm.name.toString().toLowerCase().includes(
          farmerNameFilter.toString().trim().toLowerCase()
        )
    });
  }

  sortResult(prop,asc){
    this.farmList = this.farmListWithoutFilter.sort(function(a,b){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}
