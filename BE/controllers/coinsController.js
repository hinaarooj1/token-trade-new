let userCoins = require("../models/userCoins");
const errorHandler = require("../utils/errorHandler");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const jwtToken = require("../utils/jwtToken");
const userModel = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const defaultAdditionalCoins = [
  { coinName: "BNB", coinSymbol: "bnb", balance: 0, tokenAddress: "" },
  { coinName: "XRP", coinSymbol: "xrp", balance: 0, tokenAddress: "" },
  { coinName: "Dogecoin", coinSymbol: "doge", balance: 0, tokenAddress: "" },
  { coinName: "Toncoin", coinSymbol: "ton", balance: 0, tokenAddress: "" },
  { coinName: "Chainlink", coinSymbol: "link", balance: 0, tokenAddress: "" },
  { coinName: "Polkadot", coinSymbol: "dot", balance: 0, tokenAddress: "" },
  { coinName: "Near Protocol", coinSymbol: "near", balance: 0, tokenAddress: "" },
  { coinName: "USD Coin", coinSymbol: "usdc", balance: 0, tokenAddress: "" },
  { coinName: "Tron", coinSymbol: "trx", balance: 0, tokenAddress: "" },
  { coinName: "Solana", coinSymbol: "sol", balance: 0, tokenAddress: "" },
  { coinName: "Euro", coinSymbol: "eur", balance: 0, tokenAddress: "" },
];
exports.updateAdditionalCoinsForAllUsers = async () => {
  try {
    // Connect to the database


    // Fetch all user coins
    const users = await userCoins.find();

    for (const user of users) {
      // Get current additionalCoins
      const currentCoins = user.additionalCoins.map((coin) => coin.coinSymbol);

      // Find missing coins
      const missingCoins = defaultAdditionalCoins.filter(
        (defaultCoin) => !currentCoins.includes(defaultCoin.coinSymbol)
      );

      // Add missing coins
      if (missingCoins.length > 0) {
        user.additionalCoins.push(...missingCoins);
        await user.save(); // Save updated user coins
        console.log(`Updated additionalCoins for user ${user.user}`);
      }
    }

    console.log("All users updated successfully.");
  } catch (error) {
    console.error("Error updating users:", error);
  } finally {
  }
};
exports.addCoins = catchAsyncErrors(async (req, res, next) => {
  let { id } = req.params;
  let createCoin = await userCoins.findOneAndUpdate(
    { user: id },
    { user: id },
    {
      new: true,
      upsert: true,
    }
  );
  console.log('createCoin: ', createCoin);
  res.status(200).send({
    success: true,
    msg: "Done",
    createCoin,
  });
});
exports.getCoins = catchAsyncErrors(async (req, res, next) => {
  let { id } = req.params;
  let getCoin = await userCoins.findOne({ user: id });
  res.status(200).send({
    success: true,
    msg: "Done",
    getCoin,
  });
});
exports.getUserCoin = catchAsyncErrors(async (req, res, next) => {
  let { id } = req.params;
  let getCoin = await userCoins.findOne({ user: id });
  res.status(200).send({
    success: true,
    msg: "Done",
    getCoin,
  });
});
exports.getCoinsUser = catchAsyncErrors(async (req, res, next) => {
  let { id } = req.params;
  let getCoin = await userCoins.findOne({ user: id });
  res.status(200).send({
    success: true,
    msg: "Done",
    getCoin,
  });
});
exports.updateCoinAddress = catchAsyncErrors(async (req, res, next) => {
  let { id } = req.params;
  let { usdtTokenAddress, ethTokenAddress, btcTokenAddress } = req.body;

  let getCoin = await userCoins.findOneAndUpdate(
    { user: id },
    {
      usdtTokenAddress,
      ethTokenAddress,
      btcTokenAddress,
    },
    {
      new: true,
    }
  );
  res.status(200).send({
    success: true,
    msg: "Address Updated successfully",
    getCoin,
  });
});
exports.updateNewCoinAddress = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params; // User ID from params
  const { coinSymbol, address } = req.body.newCoinAddress; // Destructure from body

  console.log('User ID:', id);
  console.log('Coin Symbol:', coinSymbol);
  console.log('New Address:', address);

  // Validate input
  if (!coinSymbol || !address) {
    return next(new errorHandler("Please fill all the required fields", 400));
  }

  // Fetch user's coin data
  const userCoinsData = await userCoins.findOne({ user: id });
  console.log('userCoinsData: ', userCoinsData);
  if (!userCoinsData) {
    return next(new errorHandler("User not found", 404));
  }

  // Find the specific coin to update
  const coinToUpdate = userCoinsData.additionalCoins.find(coin => coin.coinSymbol.toLowerCase() === coinSymbol.toLowerCase());

  // If the coin is not found, create a new coin object
  if (!coinToUpdate) {
    const newCoin = {
      coinName: coinSymbol.charAt(0).toUpperCase() + coinSymbol.slice(1), // Capitalize the coin name
      coinSymbol: coinSymbol.toLowerCase(),
      balance: 0, // Default balance
      tokenAddress: address // Set the provided address
    };

    // Update userCoinsData to include the new coin
    userCoinsData.additionalCoins.push(newCoin); // Add the new coin to the array
  } else {
    // If the coin is found, update the token address
    coinToUpdate.tokenAddress = address;
  }

  // Save the updated document
  await userCoinsData.save({ validateBeforeSave: false }); // Bypass validation for transactions

  res.status(200).json({
    success: true,
    msg: "Address updated successfully",
    updatedCoin: coinToUpdate ? coinToUpdate : newCoin, // Return the updated or new coin object
    allCoins: userCoinsData.additionalCoins // Return all additionalCoins
  });
});



exports.createTransaction = catchAsyncErrors(async (req, res, next) => {
  let { id } = req.params;
  let {
    trxName,
    amount,
    txId,
    fromAddress,
    status,
    type,
    note, reference,
    ethBalance,
    btcBalance,
    usdtBalance,
    subjectLine
  } = req.body;
  console.log('req.body: ', req.body);
  if (!trxName || !amount || !status ||
    (trxName !== "Euro" && (!txId || !fromAddress))) {
    return next(new errorHandler("Please fill all the required fields", 500));
  }
  let Transaction = await userCoins.findOneAndUpdate(
    { user: id },
    {
      $push: {
        transactions: {
          trxName,
          amount,
          txId,
          type,
          fromAddress,
          status,
          note, reference
        },
        ethBalance,
        btcBalance,
        usdtBalance,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
  let user = await userModel.findById({ _id: id })
  res.status(200).send({
    success: true,
    msg: "Transaction created successfully",
    Transaction,
  });
  note = note ? note.trim() : "";
  if (note) {
    let subject = `${subjectLine}`;
    let text = `

${note}
  
Best Regards,
BLOCKGUARD TEAM`;
    // 
    let sendEmailError = await sendEmail(user.email, subject, text);

  }

});
exports.createNewTransaction = catchAsyncErrors(async (req, res, next) => {
  let { id } = req.params;
  let {
    trxName,
    amount,
    txId,
    fromAddress,
    status,
    type,
    note, reference,
    ethBalance,
    btcBalance,
    usdtBalance,
  } = req.body;
  if (!trxName || !amount || !txId || !status || !fromAddress) {
    return next(new errorHandler("Please fill all the required fields", 500));
  }
  let Transaction = await userCoins.findOneAndUpdate(
    { user: id },
    {
      $push: {
        transactions: {
          trxName,
          amount,
          txId,
          type,
          fromAddress,
          status,
          note, reference,
        },
        ethBalance,
        btcBalance,
        usdtBalance,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  res.status(200).send({
    success: true,
    msg: "Transaction created successfully",
    Transaction,
  });
});
exports.createUserStocks = catchAsyncErrors(async (req, res, next) => {
  let { id } = req.params;
  let {
    stockName,
    stockSymbol,
    stockAmount,
    stockValue,

  } = req.body;
  if (!stockName || !stockSymbol || !stockAmount || !stockValue) {
    return next(new errorHandler("Please fill all the required fields", 500));
  }
  let StocksUpdate = await userCoins.findOneAndUpdate(
    { user: id },
    {
      $push: {
        stocks: {
          stockName,
          stockSymbol,
          stockAmount,
          stockValue,
        },
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
  res.status(200).send({
    success: true,
    msg: "Stocks Updated successfully",
    StocksUpdate,
  });
});
exports.deleteUserStocksApi = catchAsyncErrors(async (req, res, next) => {
  const { id, coindId } = req.params; // User ID
  console.log('id: ', id);
  console.log('coindId: ', coindId); // The specific stock's ID or identifier

  // Check if stockId is provided
  if (!coindId) {
    return next(new errorHandler("Stock ID is required for deletion", 400));
  }

  // Find the user and pull (remove) the specific stock from the array
  let StocksUpdate = await userCoins.findOneAndUpdate(
    { user: id },
    {
      $pull: {
        stocks: { _id: coindId } // Assuming each stock has a unique _id
      }
    },
    {
      new: true
    }
  );

  // If no user is found or no stock removed
  if (!StocksUpdate) {
    return next(new errorHandler("No stock found with the provided ID", 404));
  }

  res.status(200).send({
    success: true,
    msg: "Stock deleted successfully",
    StocksUpdate
  });
});

exports.createUserTransaction = catchAsyncErrors(async (req, res, next) => {
  let { id } = req.params;
  let { trxName, amount, txId, selectedPayment, e, status } = req.body;
  console.log("req.body: ", req.body);

  // Default status to "pending" if not provided
  status = status || "pending";
  let type = "withdraw";
  let by = "user";
  if (!trxName || !amount) {
    return next(new errorHandler("Please fill all the required fields", 500));
  }
  let Transaction = await userCoins.findOneAndUpdate(
    { user: id },
    {
      $push: {
        transactions: {
          withdraw: e,
          selectedPayment: selectedPayment,
          trxName,
          amount,
          txId,
          type,
          status,
          by,
        },
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
  res.status(200).send({
    success: true,
    msg: "Transaction created successfully",
    Transaction,
  });
});
exports.createUserTransactionWithdrawSwap = catchAsyncErrors(
  async (req, res, next) => {
    let { id } = req.params;
    let { trxName, amount, txId, fromAddress, status, type, isHidden } =
      req.body;
    console.log("  req.body: ", req.body);

    try {
      let newTransactionWithdraw = await userCoins.findOneAndUpdate(
        { user: id },
        {
          $push: {
            transactions: {
              trxName,
              amount,
              txId,
              fromAddress,
              status,
              type,
              isHidden: true,
            },
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
      // Withdraw transaction

      res.status(200).send({
        success: true,
        newTransactionWithdraw,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  }
);
exports.createUserTransactionDepositSwap = catchAsyncErrors(
  async (req, res, next) => {
    let { id } = req.params;
    let { trxName, amount, txId, fromAddress, status, type, isHidden } =
      req.body;
    console.log("req.body: ", req.body);

    try {
      let newTransactionDeposit = await userCoins.findOneAndUpdate(
        { user: id },
        {
          $push: {
            transactions: {
              trxName,
              amount,
              txId,
              fromAddress,
              status,
              type,
              isHidden: true,
            },
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
      // Withdraw transaction

      res.status(200).send({
        success: true,
        msg: "Coins Convreted successfully",

        newTransactionDeposit,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  }
);

// exports.createUserTransactionSwap = catchAsyncErrors(async (req, res, next) => {
//   let { id } = req.params;
//   // let { trxName, amount, txId, selectedPayment, e } = req.body;
//   console.log("req.body: ", req.body);
//   // let status = "pending";
//   // let type = "withdraw";
//   // let by = "user";
//   // if (!trxName || !amount) {
//   //   return next(new errorHandler("Please fill all the required fields", 500));
//   // }
//   // let Transaction = await userCoins.findOneAndUpdate(
//   //   { user: id },
//   //   {
//   //     $push: {
//   //       transactions: {
//   //         withdraw: e,
//   //         selectedPayment: selectedPayment,
//   //         trxName,
//   //         amount,
//   //         txId,
//   //         type,
//   //         status,
//   //         by,
//   //       },
//   //     },
//   //   },
//   //   {
//   //     new: true,
//   //     upsert: true,
//   //   }
//   // );
//   // res.status(200).send({
//   //   success: true,
//   //   msg: "Transaction created successfully",
//   //   Transaction,
//   // });
// });
exports.getTransactions = catchAsyncErrors(async (req, res, next) => {
  let Transaction = await userCoins.find();

  res.status(200).send({
    success: true,
    msg: " ",
    Transaction,
  });
});
exports.getEachUser = catchAsyncErrors(async (req, res, next) => {
  let { id } = req.params;

  let getCoin = await userCoins.findOne({ "transactions._id": req.params.id });

  let signleUser = await userModel.findById({ _id: getCoin.user });
  if (signleUser) {
    res.status(200).send({
      success: true,
      signleUser,
    });
  }
});
exports.deleteEachUser = catchAsyncErrors(async (req, res, next) => {
  let { id } = req.params;
  let getCoin = await userCoins.findOneAndDelete({ user: id });
  let signleUser = await userModel.findByIdAndDelete({ _id: id });

  if (!signleUser) {
    res.status(200).send({
      success: false,
      msg: "User not found or already has been deleted",
    });
  }
  res.status(200).send({
    success: true,
    msg: "User has been deleted successfully",
    // getCoin,
  });
});

exports.updateTransaction = catchAsyncErrors(async (req, res, next) => {
  let { _id } = req.body;

  let getCoin = await userCoins.updateOne(
    { "transactions._id": _id },
    {
      $set: { "transactions.$": req.body },
    },
    {
      new: true,
    }
  );

  res.status(200).send({
    success: true,
    msg: "Transaction status updated successfully",
    // getCoin,
  });
});
exports.deleteTransaction = catchAsyncErrors(async (req, res, next) => {
  const { userId, transactionId } = req.params;

  // Assuming userCoins is your collection model
  const deletedTransaction = await userCoins.findOneAndUpdate(
    { user: userId },
    { $pull: { transactions: { _id: transactionId } } },
    { new: true }
  );

  if (!deletedTransaction) {
    return res.status(404).json({
      success: false,
      msg: "Transaction not found or already deleted",
    });
  }

  res.status(200).json({
    success: true,
    msg: "Transaction deleted successfully",
    deletedTransaction,
  });
});
