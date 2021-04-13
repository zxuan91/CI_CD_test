// (c) Anuflora Systems 
const balance = document.getElementById('balance');
const money_plus = document.getElementById('deposit');
const money_minus = document.getElementById('loan');
const list = document.getElementById('list');
const form = document.getElementById('form');
const custname = document.getElementById('custname');
const reco = document.getElementById('reco');

const TransactionDataAll = [
   { id: 1, customername: 'Flora', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 2, customername: 'Flora', bank: 'OCBC', deposit: 4000, loan: 2000 },
   { id: 3, customername: 'Mikhil', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 4, customername: 'Sashil', bank: 'UOB', deposit: 6000, loan: 1000 },
   { id: 5, customername: 'Jack', bank: 'UOB', deposit: 6000, loan: 8000 }

  ];

 var TransactionData = null;

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const deposit_item = document.createElement('li');

  deposit_item.classList.add('plus');
  deposit_item.innerHTML = `
  ${transaction.customername}-${transaction.bank}  <span> $ ${Math.abs(
    transaction.deposit  
  )}</span> 
  `;

  list.appendChild(deposit_item);

  const loan_item = document.createElement('li');

  loan_item.classList.add('minus');
  loan_item.innerHTML = `
  ${transaction.customername}-${transaction.bank} <span> -$ ${Math.abs(
    transaction.loan  
  )}</span> 
  `;

  list.appendChild(loan_item);
}

// Update the balance, deposit and loan
function updateValues() {
  const deposits = TransactionData.map(transaction => transaction.deposit);
  const loans = TransactionData.map(transaction => transaction.loan);
  const total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const bal = total_deposit - total_loan;
  balance.innerText = `$${bal}`;
  money_plus.innerText = `$${total_deposit}`;
  money_minus.innerText = `$${total_loan}`;
  reco.innerText = (bal >= 0)? "You Have Sound Financial Health": "Your Financial Health is Weak";
    

  localStorage.setItem("totaldeposit", total_deposit); 
  localStorage.setItem("totalloan", total_loan);  
  
  }
   

// Load google charts
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);   

// Draw the chart and set the chart values
function drawChart() {
 
  var total_deposit = localStorage.getItem("totaldeposit");  
  var bal_deposit = Number(total_deposit);
     
  var total_loan = localStorage.getItem("totalloan");
  var bal_loan = Number(total_loan);
         
  var data = google.visualization.arrayToDataTable([
  ['Deposit', 'Loan'],
  ['Deposit', bal_deposit],
  ['Loan', bal_loan],
  
   ]);

  // Optional; add a title and set the width and height of the chart
  var options = {'title':'Your Balance', is3D: true,'width':350, 'height':250};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
     
   }

function filterTransaction(e) {
 
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = TransactionDataAll.filter(tran => tran.customername == custname.value);  
  TransactionData.forEach(addTransactionDOM);
  updateValues(); 
  drawChart();
 
}

        
function init() {
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = [...TransactionDataAll];
  TransactionData.forEach(addTransactionDOM);
  updateValues();
  }

       
init();
form.addEventListener('submit', filterTransaction);

       