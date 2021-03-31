import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from '../service/shared.service';
@Component({
  selector: 'app-project-activity',
  templateUrl: './project-activity.component.html',
  styleUrls: ['./project-activity.component.scss']
})
export class ProjectActivityComponent implements OnInit {

  modalRef: BsModalRef; 
  constructor(private service:SharedService,private modalService: BsModalService) { }

   //opening modal form 
   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.addClick();
  }

  //variables for the component

  projectActivityList:any=[];
  bigSize:boolean = false;

  modalTitle:string;
  activateAddEditProjectActivityComp:boolean=false;
  projectActivity:any;

  projectActivityIdFilter:string="";
  projectActivityNameFilter:string="";
  projectActivityListWithoutFilter:any=[];

  addClick(){
    this.projectActivity={
      id:0,
      activityName:"",
      activityDescription:"",
      activityStatus: "",
      duration: "",
      startDate: new Date(),
      endDate: new Date(),
      requirementId: 0,
      projectManagerId:"",
      projectId: 0

    }
    this.modalTitle="Add Project Activity";
    this.activateAddEditProjectActivityComp=true;
    console.log("clicked by user");
    this.bigSize=true;

  }

  ngOnInit(): void {
    this.refreshProjectActivityList();
  }

  editClick(editedProjectActivity){
    this.projectActivity=editedProjectActivity;
    this.modalTitle="Edit Project Activity";
    this.activateAddEditProjectActivityComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure you want to delete this activity??')){
      this.service.deleteProjectActivity(item.id).subscribe(data=>{
        this.refreshProjectActivityList();
      })
    }
  }

  closeClick(){
    this.activateAddEditProjectActivityComp=false;
    this.refreshProjectActivityList();
  }

  refreshProjectActivityList(){
    this.service.getProjectActivityList().subscribe(data=>{
      this.projectActivityList=data;
      this.projectActivityListWithoutFilter=data;
    });
  }

  filterFn(){
    var projectActivityIdFilter = this.projectActivityIdFilter;
    var projectActivityNameFilter = this.projectActivityNameFilter;

    this.projectActivityIdFilter = this.projectActivityListWithoutFilter.filter(function (foundProjectActivity){
        return foundProjectActivity.id.toString().toLowerCase().includes(
          projectActivityIdFilter.toString().trim().toLowerCase()
        )&&
        foundProjectActivity.projectActivityName.toString().toLowerCase().includes(
          projectActivityNameFilter.toString().trim().toLowerCase()
        )
    });
  }

  sortResult(prop,asc){
    this.projectActivityList = this.projectActivityListWithoutFilter.sort(function(a,b){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}
