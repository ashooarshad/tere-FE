import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TokenService } from 'src/app/shared/auth/token.service';
import { ReservationService } from 'src/app/shared/vehicules/reservation.service';
import { VehiculeService } from 'src/app/shared/vehicules/vehicule.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [MessageService]

})
export class BookComponent implements OnInit {

  res: any = null;
  date: Date = new Date();
  data : any ;
  value4: any;
  errors:any;
  totalprice: number = 0;
  price: number;
  isChecked1: boolean = false;
  isChecked2: boolean = false;
  isChecked3: boolean = false;
  public totalDaysofReservation:any
  startdate: any;
  enddate: any;
  searchid: any;
  image: any;
  result: any;
  Extrass:any;
  constructor(
    private route: ActivatedRoute,
     public vs: VehiculeService,
      public reservation: ReservationService,
      public messageService: MessageService,
     private tokenStorage: TokenService,

      ) {


      }

  ngOnInit(): void {


    this.route.queryParams.subscribe(params => {
      this.startdate = params['st'];
      this.enddate = params['se'];
      this.searchid = params['searchid'];


      /*let x= formatDate(this.enddate, 'dd-MM-yyyy H:m', 'en-US')  ;
      console.log(x) ;*/
    });
    this.get(this.searchid);
    this.Totalprice(this.searchid, this.startdate, this.enddate);


  }

  get(id) {
    let x;
    var d = Date.parse("2011-01-26 13:51:50 GMT") / 1000;
    //  var Time = this.enddate.getTime() - this.startdate.getTime();
    // var Days = Time / (1000 * 3600 * 24); //Diference in Days


    var date1 = new Date(this.startdate);
    var date2 = new Date(this.enddate);

    var Time = date2.getTime() - date1.getTime();
    var Days = Time / (1000 * 3600 * 24);
  this.totalDaysofReservation = Days;
    this.vs.get(id).subscribe(

      (data) => {
        x = data;
        this.res = x;
        this.image = this.res.user_photo;
      }

    )
  }


  Totalprice(vehiculeid, start, end) {
    let result;
    this.reservation.totalprice(vehiculeid, start, end).subscribe(
        (data) => {
          this.result = data;
        })
  }


  checkValue(event: any) {
    this.price = event.target.value;
    if (event.target.id == 1) {
      this.isChecked1 = event.target.checked;
      console.log(this.isChecked1);

      if (this.isChecked1) {
        this.totalprice = Number(this.totalprice) + Number(this.price);

      } else {
        this.totalprice = Number(this.totalprice) - Number(this.price);
      }
    }
    if (event.target.id == 2) {
      this.isChecked2 = event.target.checked;
      if (this.isChecked2) {
        this.totalprice = Number(this.totalprice) + Number(this.price);
        console.log(this.totalprice);

      } else {
        this.totalprice = Number(this.totalprice) - Number(this.price);
      }
    }
    if (event.target.id == 3) {
      this.isChecked3 = event.target.checked;
      if (this.isChecked3) {
        this.totalprice = Number(this.totalprice) + Number(this.price);
      } else {
        this.totalprice = Number(this.totalprice) - Number(this.price);
      }
    }
    this.Extrass=this.totalprice;

  }


  Reservation() {
    console.log(this.Extrass);

    this.data=
    {
      "booking_cost":this.res.Price_H,
      "number_of_days":this.totalDaysofReservation,
      "car_model": this.res.model,
      "user_id": this.tokenStorage.getUser().user.id,
      "extra":this.Extrass
    }
        {this.reservation.bookingCreate(this.data).subscribe(
          (res:any)=>
          {
            this.showSuccess("Booking request send successfully");
          },
          (error) => {

          },
        );}

  }
      showSuccess(detail) {
        this.messageService.add({severity:'success', summary: 'Success', detail: detail});
    }

    showError(detail) {
      this.messageService.add({severity:'error', summary: 'Error', detail: detail});
    }
}
