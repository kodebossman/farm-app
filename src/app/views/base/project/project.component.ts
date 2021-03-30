import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from '../service/shared.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private service:SharedService,private modalService: BsModalService) { }

  //opening modal form 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.addClick();
  }

  projectsList:any=[];
  bigSize:boolean = false;

  modalTitle:string;
  activateAddEditProjectComp: boolean=false;
  project:any;

  projectIdFilter:string="";
  projectNameFilter:string="";
  projectListWithoutFilter:any=[];

  ngOnInit(): void {

    this.refreshProjectList();
  }

  addClick(){
    this.project={
      id:0,
      projectName:"",
      projectDescription:"",
      duration: "",
      startDate: "",
      endDate: "",
      projectContractorId:"",
      projectType: "",
      farmer:0,
      contractor:0

    }
    this.modalTitle="Add Project";
    this.activateAddEditProjectComp=true;
    console.log("clicked by user");
    this.bigSize=true;

  }

  editClick(editedProject){
    this.project=editedProject;
    this.modalTitle="Edit Project";
    this.activateAddEditProjectComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure you want to delete this project??')){
      this.service.deleteProject(item.id).subscribe(data=>{
        this.refreshProjectList();
      })
    }
  }

  closeClick(){
    this.activateAddEditProjectComp=false;
    this.refreshProjectList();
  }

  refreshProjectList(){
    this.service.getProjectList().subscribe(data=>{
      this.projectsList=data;
      this.projectListWithoutFilter=data;
    });
  }

  filterFn(){
    var projectIdFilter = this.projectIdFilter;
    var projectNameFilter = this.projectNameFilter;

    this.projectNameFilter = this.projectListWithoutFilter.filter(function (foundProject){
        return foundProject.id.toString().toLowerCase().includes(
          projectIdFilter.toString().trim().toLowerCase()
        )&&
        foundProject.projectName.toString().toLowerCase().includes(
          projectNameFilter.toString().trim().toLowerCase()
        )
    });
  }


  sortResult(prop,asc){
    this.projectsList = this.projectListWithoutFilter.sort(function(a,b){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }


}
