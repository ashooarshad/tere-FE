import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
 import { TokenService } from 'src/app/shared/auth/token.service';
import { VehiculeService } from 'src/app/shared/vehicules/vehicule.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.scss']
})
export class MyCarsComponent implements OnInit {

  Car : any ;
  cars : any ;
  reult : any[] ;
  BMW : any ;
  gridListings: number = 1;
  id : any ;
  img : any = "http://localhost:8000/storage/image/" ;
  imgs : any = "http://localhost:8000/storage/image/vehicule/" ;
  breadcrumb = [
    {
        title: 'Mes Vehicule',
        subTitle: 'Dashboard'
    }
]
  constructor(private car : VehiculeService , private router : Router , public tokenStorage : TokenService) { }

  ngOnInit(): void {


      this.id = this.tokenStorage.getUser().user.id;


    this.car.getVehiculesByUser(this.id).subscribe(
      data=>
      {this.cars = data ;
        console.log(this.cars) ;
      }



      );


     /* this.car.getAllBMW().subscribe(cars=>
        {console.log(cars);
        this.BMW = cars ;
        }
        );*/
       // this.img = "http://localhost:8000/storage/image/"+this.cars.image ;
  }

  customOptions: OwlOptions = {
    loop: true,
    nav: true,
    dots: false,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplayHoverPause: true,
    autoplay: true,
    mouseDrag: false,
    items: 1,
        navText: [
            "<i class='flaticon-left-chevron'></i>",
            "<i class='flaticon-right-chevron'></i>"
        ]
    }

  navigate(): void
  {
    this.router.navigate(['/user/add-car']);
  }
}
