import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  priceId: string;
  quantity = 1;
  stripePromise = loadStripe(environment.stripe_key);
  panelNum: number;
  constructor(public _router: Router) { }

  ngOnInit(): void {
    this.panelNum =1;
  }

  next(){
    this.panelNum++;
  }
  prev(){
    this.panelNum--;
  }
  selectPlan(event: any){
    const plan = event.target.value;
    this.priceId = environment[plan];
  }
  selectMethod(event: any){
    console.log(event.target.value)
  }

  async checkOut() {
    // Call your backend to create the Checkout session.

    // When the customer clicks on the button, redirect them to Checkout.
    const windowLocation = window.location.href.replace('canvas', "")
    const stripe = await this.stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price: this.priceId, quantity: this.quantity }],
      successUrl: `${windowLocation}/success`,
      cancelUrl: `${windowLocation}/failure`,
    });
    
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      console.log(error);
    }

  }

}
