export interface IWallet {
  accountIMRate: string;
  accountMMRate: string;
  totalEquity: string;
  totalWalletBalance: string;
  totalMarginBalance: string;
  totalAvailableBalance: string;
  totalPerpUPL: string;
  totalInitialMargin: string;
  totalMaintenanceMargin: string;
  coin: Coin[];
  accountLTV: string;
  accountType: string;
}

export interface Coin {
  coin: string;
  equity: string;
  usdValue: string;
  walletBalance: string;
  availableToWithdraw: string;
  availableToBorrow: string;
  borrowAmount: string;
  accruedInterest: string;
  totalOrderIM: string;
  totalPositionIM: string;
  totalPositionMM: string;
  unrealisedPnl: string;
  cumRealisedPnl: string;
  bonus: string;
  collateralSwitch: boolean;
  marginCollateral: boolean;
  locked: string;
  spotHedgingQty: string;
}
