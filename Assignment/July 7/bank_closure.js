function bank() {
  let balance = 0;
  function deposit(amount) {
    balance += amount;
    console.log(`Deposited: ₹${amount}`);
    console.log(`Current Balance: ₹${balance}`);
    return balance;
  }
  function withdraw(amount) {
    if (amount <= balance) {
      balance -= amount;
      console.log(`Withdrawn: ₹${amount}`);
      console.log(`Current Balance: ₹${balance}`);
      return balance;
    } else {
      console.log("Insufficient funds");
      console.log(`Current Balance: ₹${balance}`);
      return "Insufficient funds";
    }
  }
  function getBalance() {
    return balance;
  }
  return {
    deposit,
    withdraw,
    getBalance,
  };
}
let acc1 = bank();
acc1.deposit(100);
acc1.deposit(50);
acc1.withdraw(70);

console.log("Final Balance:", acc1.getBalance());
