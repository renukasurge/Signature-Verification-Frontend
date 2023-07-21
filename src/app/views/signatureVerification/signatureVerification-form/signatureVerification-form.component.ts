import { Component , OnInit , ViewChild} from '@angular/core'; 
import {signatureVerificationFormService} from './signatureVerification-form.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router,ActivatedRoute  } from '@angular/router';
//import {Echannel_Verification} from "" 
//import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signatureVerification-form',
  templateUrl: './signatureVerification-form.component.html',
  styleUrls: ['./signatureVerification-form.component.scss']
})
export class signatureVerificationFormComponent implements OnInit{
  constructor( public EchannelformService:signatureVerificationFormService, private snapshot: ActivatedRoute,public route:Router) { }
  public userData : any = FormGroup; 
  public id : string | null = this.snapshot.snapshot.paramMap.get('id');
  public assignedId : string | null = this.snapshot.snapshot.paramMap.get('assigned');
  public roles : any = ["SuperUser","Admin","CEO"]
  public submitted = false;
  
  public outcomeOptions:any;
  public UpdateData :any;
  public outComeId :any;
  src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     data: {name: "this.name", animal:" this.animal"},
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }




  ngOnInit(): void {
    console.log("assignedId",this.assignedId)
    this.EchannelformService.outcomeslist().then((response : any)=>{
      console.log("outcomeslist",response);
      let arr1:any = [];
      response.data.map((mapData:any)=>{
      arr1.push({id:mapData.id,name:mapData.name})
    })
    this.outcomeOptions = arr1;
    }).catch(err=>{
      console.log(err);
  })
    this.userData = new FormGroup({
      'reference': new FormControl(null, Validators.required),
        'currency'   : new FormControl(null, Validators.required),
       'amount'   : new FormControl(null, Validators.required),
       'accountNo' : new FormControl(null, Validators.required),
       'debitCurrency': new FormControl(null, Validators.required),
         'accountShortName': new FormControl(null, Validators.required),
         'amountInMur': new FormControl(null, Validators.required),
         'comments': new FormControl(null, Validators.required),
        'paymentDetails1': new FormControl(null, Validators.required),
        'paymentDetails2': new FormControl(null, Validators.required),
        'paymentDetails3': new FormControl(null, Validators.required), 
        'paymentDetails4': new FormControl(null, Validators.required),
         'signyesORno': new FormControl(null, Validators.required),
      //   'contactPerson': new FormControl(null, Validators.required),
      //   'customerCalledOn': new FormControl(null, Validators.required),
      //   'comment': new FormControl(null, Validators.required),
      //  'debitCurrency': new FormControl(null, Validators.required),


     })



      
    this.EchannelformService.eventSourcesGetById(this.id).then((res)=>{
     console.log('reee',res.data)
        this.userData.setValue ({
          'reference': res.data.sourceBu,
        'currency' :res.data.transactionCurrency,
        'amount':res.data.transactionAmount,
         'accountNo':res.data.debitAccountNumber,
         'debitCurrency':res.data.transactionCurrency,
          'accountShortName':res.data.accountShortName,
          'paymentDetails1':res.data.paymentDetails1,
           'comments':res.data.comments,
           'paymentDetails2':res.data.paymentDetails2,
           'paymentDetails3':res.data.paymentDetails3,
           'paymentDetails4':res.data.paymentDetails4,
      //     'outcomeSelect':{id:res.data.outCome.id,name:res.data.outCome.name},
           'amountInMur':res.data.amountInMur,
      //     'contactPerson':res.data.contactPerson,
      //     'customerCalledOn':res.data.customerCalledOn,
      //     'comment':res.data.comment,
       })
    //  this.outComeId=res.data.outCome.id
    //   this.UpdateData={
    //     "businessKey": res.data.businessKey,
    //     "priority": res.data.priority,
    //     "sourceBu": res.data.sourceBu,
    //     "dcpReference":res.data.dcpReference,
    //     "accountName": res.data.accountName,
    //     "transactionCurrency": res.data.transactionCurrency,
    //     "transactionAmount":res.data.transactionAmount,
    //     "lockedBy": res.data.lockedBy,
    //     "debitAccountNumber": res.data.debitAccountNumber,
    //     "accountCurrency": res.data.accountCurrency,
    //     "beneficiaryName": res.data.beneficiaryName,
    //     "custInfoMkr": res.data.custInfoMkr,
    //     "accountInfoMkr": res.data.accountInfoMkr,
    //     "extension":res.data.extension,
    //     "contactPerson": res.data.contactPerson,
    //     "customerCalledOn": res.data.customerCalledOn,
    //     "comment":res.data.comment,
    // }
    }).catch(err=>{
     console.log(err.response)
   })
   }
   onSubmit(){
    this.submitted = true;
    console.log("this.userData.value",this.userData.value)
   }
   proceedHandle=()=>{
    console.log("p",this.UpdateData);
    this.EchannelformService.proceedUpdate(this.outComeId,this.id,this.UpdateData).then((res)=>{
      console.log(res);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Proceed Success',
        showConfirmButton: false,
        timer: 1500
      });
       this.route.navigate(["echannelData"])
    }).catch(err=>{console.log(err)})

   }
   rejectHandle=()=>{
     
    this.EchannelformService.rejectUpdate(this.outComeId,this.id,this.UpdateData).then((res)=>{
      console.log(res);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Reject Success',
        showConfirmButton: false,
        timer: 1500
      });
       this.route.navigate(["echannelData"])
    }).catch(err=>{console.log(err)})
   }
}





// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
//   standalone: true,
//   imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
// })
// export class DialogOverviewExampleDialog {
//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
  
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }