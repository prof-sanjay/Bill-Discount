import React, { Component } from "react";
import './index.css';
class DisplayRupees extends Component {
  render() {
    const { amount } = this.props;
    const unitDigit = amount % 10;
    return (
      <p>
        Unit Digit: <strong>{unitDigit} Rupees</strong>
      </p>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billNumber: "",
      billName: "",
      date: "",
      quantity: "",
      totalCost: "",
      category: "",
      discountedCost: null,
      showDetails: false,
    };
  }

  getCategory(amount) {
    if (amount >= 1000 && amount <= 2000) return "A";
    else if (amount >= 2001 && amount <= 3000) return "B";
    else if (amount > 3000) return "C";
    else return "N/A";
  }

  getDiscountedAmount(amount) {
    return amount - amount * 0.1;
  }

  numberToWords(num) {
    const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen",];
    const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety",];

    if (num === 0 || num === "") return "Zero";

    const convert = (n) => {
      if (n < 20) return ones[n];
      if (n < 100)
        return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
      if (n < 1000)
        return (
          ones[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " and " + convert(n % 100) : "")
        );
      if (n < 1000000)
        return (
          convert(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 ? " " + convert(n % 1000) : "")
        );
      return "Number too large";
    };

    return convert(num);
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const { totalCost } = this.state;
    const cost = parseInt(totalCost);

    if (isNaN(cost) || cost <= 0) {
      alert("Please enter a valid total cost.");
      return;
    }

    const category = this.getCategory(cost);
    const discountedCost = this.getDiscountedAmount(cost);

    this.setState({ category, discountedCost, showDetails: true });
  };

  render() {
    const {
      billNumber,
      billName,
      date,
      quantity,
      totalCost,
      category,
      discountedCost,
      showDetails,
    } = this.state;

    return (
      <>
      <div className="box">
        <h2>Bill Information</h2>
        <input type="text" name="billNumber" placeholder="Bill Number" value={billNumber} onChange={this.handleChange}/>
        <input type="text" name="billName" placeholder="Vendor Name" value={billName} onChange={this.handleChange}/>
        <input type="date" name="date" value={date} onChange={this.handleChange}/>
        <input type="number" name="quantity" placeholder="Quantity" value={quantity} onChange={this.handleChange}/>
        <input type="number" name="totalCost" placeholder="Total Cost" value={totalCost} onChange={this.handleChange}/>
        <button
          onClick={this.handleSubmit}>Show Bill Info</button>

        {showDetails && (
          <div style={{ marginTop: "20px" }}>
            <h3>Bill Summary</h3>
            <p>
              <strong>Bill Number:</strong> {billNumber}
            </p>
            <p>
              <strong>Vendor Name:</strong> {billName}
            </p>
            <p>
              <strong>Date:</strong> {date}
            </p>
            <p>
              <strong>Quantity:</strong> {quantity} (
              {this.numberToWords(parseInt(quantity))})
            </p>
            <p>
              <strong>Total Cost:</strong> ₹{totalCost} (
              {this.numberToWords(parseInt(totalCost))})
            </p>
            <p>
              <strong>Category:</strong> {category}
            </p>
            <p>
              <strong>Discounted Cost (10% off):</strong> Rs.
              {discountedCost.toFixed(2)} (
              {this.numberToWords(Math.round(discountedCost))})
            </p>
            <DisplayRupees amount={parseInt(totalCost)} />
          </div>
        )}
      </div>
      </>
    );
  }
}

export default App;
