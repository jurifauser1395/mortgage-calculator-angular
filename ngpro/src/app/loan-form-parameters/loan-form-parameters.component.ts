import { Component, inject } from '@angular/core';
import { MonthlyMortgageCalculationService } from '../services/monthly-mortgage-calculation.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-loan-form-parameters',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FlexLayoutModule],
  templateUrl: './loan-form-parameters.component.html',
  styleUrl: './loan-form-parameters.component.scss',
})
export class LoanFormParametersComponent {
  // Form controls for the loan parameters
  principalLoan = new FormControl('');
  yearlyInterestRate = new FormControl('');
  numberOfYearsPayments = new FormControl('Select a loan term');

  // Variable to store the calculated monthly costs
  monthlyCosts: number | string = '';

  // Injecting the mortgage calculation service
  constructor(
    private monthlyMortgageCalculationService: MonthlyMortgageCalculationService,
  ) {}

  // Method to handle form submission
  onSubmit() {
    // Parsing form control values to numbers
    let pLoan = Number(this.principalLoan.value);
    let yInterestRate = Number(this.yearlyInterestRate.value);
    let nOfYearsPayments = Number(this.numberOfYearsPayments.value);

    // Logging the parsed values
    console.log(
      `Principal loan: ${pLoan}\nYearly interest rate: ${yInterestRate}\nNumber of years: ${nOfYearsPayments}`,
    );

    // Calculating the monthly costs using the mortgage calculation service
    this.monthlyCosts =
      this.monthlyMortgageCalculationService.monthlyMortgagePayment(
        pLoan,
        yInterestRate,
        nOfYearsPayments,
      );

    // Logging the calculated monthly costs
    console.log(`Monthly costs: ${this.monthlyCosts}`);
  }
}
