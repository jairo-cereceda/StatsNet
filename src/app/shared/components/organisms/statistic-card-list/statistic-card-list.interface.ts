import { TitleComponentInterface } from '../../atoms/title/title.interface';
import { StatisticCardComponentInterface } from '../../molecules/statistic-card/statistic-card.interface';

export interface StatisticCardListComponentInterface {
  title?: TitleComponentInterface;
  statistics: StatisticCardComponentInterface[];
}
