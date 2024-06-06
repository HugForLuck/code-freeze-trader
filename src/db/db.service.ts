import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ECopyPosition } from 'src/copy/copyPosition.entity';
import { EStrategy } from 'src/strategy/strategy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DBService {
  constructor(
    @InjectRepository(ECopyPosition)
    private readonly dbPosition: Repository<ECopyPosition>,
    @InjectRepository(EStrategy)
    private readonly dbStrategies: Repository<EStrategy>,
  ) {}

  // async getAllTraders(canBeCopied = true): Promise<Trader[]> {
  //   const options: FindManyOptions<Trader> = {
  //     where: {
  //       canBeCopied,
  //     },
  //     order: { priority: 'DESC' },
  //     select: ['traderId', 'name'],
  //   };
  //   return await this.dbTraders.find(options);
  // }

  /**
   *
   * Adds trader's strategy from table `strategy` to given position
   * @param position
   *
   */
  // async applyTraderStrategy(position: CopyPosition) {
  //   const strategy = await this.getDBStrategy(position);
  //   if (!strategy) throw new AppError('Could not load `strategy`', position);

  //   position.traderMaxOrders = strategy.traderMaxOrders;
  //   position.userMaxPriceChange = +strategy.maxPriceChange;
  // }

  /**
   *
   * to work it needs live position (symbol + dir) from
   * table `position` AND
   * `traderId` from table `trader` to find corresponding strategy
   * @param position
   * @returns strategy
   *
   */
  async getActiveStrategy() {
    // if (!position?.trader?.traderId || !position.symbol)
    //   throw new AppError('Trader is not defined', position);
    try {
      return await this.dbStrategies.findOne({
        where: {
          isActive: true,
        },
      });
    } catch (e: any) {
      console.log('getDBStrategy', e);
    }
  }

  /**
   *
   * Loads bybit live position
   *
   */
  // async applyDBPosition(position: CopyPosition) {
  //   try {
  //     const dbPosition = await this.dbPosition.findOne({
  //       where: {
  //         symbol: position.symbol,
  //         dir: position.dir,
  //       },
  //     });

  //     if (dbPosition) {
  //       position.trader = dbPosition.trader;
  //       position.userMaxAvailableBalance = dbPosition.userMaxAvailableBalance;
  //       position.initialPrice = dbPosition.initialPrice;
  //     }
  //   } catch (e: any) {
  //     throw new AppError(e.message, position);
  //   }
  // }

  /**
   *
   * Sync live position
   *
   */
  // async syncPosition(p: CopyPosition) {
  //   if (p.order.isClose) {
  //     // live posiiton successfully closed
  //     this.deleteDBPosition(p);
  //   } else {
  //     // live position successfully updates (increase/decrease)
  //     this.savePosition(p);
  //   }
  // }

  /**
   *
   * Deletes bybit live position in db.copy_positions
   *
   */
  // async deleteDBPosition(position: CopyPosition) {
  //   try {
  //     await this.dbPosition.delete({
  //       symbol: position.symbol,
  //       dir: position.dir,
  //     });

  //     // TODO check if affected == 1, handle error if !== 1;
  //   } catch (e: any) {
  //     throw new AppError(e.message, position);
  //   }
  // }

  /**
   *
   * Saves bybit live position
   *
   */
  // async savePosition(position: CopyPosition) {
  //   return await this.dbPosition.save(position);
  // }

  /**
   *
   * Saves bybit order request
   *
   */
  // async saveOrderRequest(p: CopyPosition) {
  //   const orderReqest = new OrderRequest(p);
  //   return await this.dbOrderRequest.save(orderReqest);
  // }
}
