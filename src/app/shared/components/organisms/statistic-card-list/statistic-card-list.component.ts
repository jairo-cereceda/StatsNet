import { Component, input } from '@angular/core';
import { StatisticCardListComponentInterface } from './statistic-card-list.interface';
import { StatisticCardComponent } from '../../molecules/statistic-card/statistic-card.component';

@Component({
  selector: 'app-statistic-card-list',
  templateUrl: './statistic-card-list.component.html',
  imports: [StatisticCardComponent],
})
export class StatisticCardListComponent {
  StatisticCardList = input<StatisticCardListComponentInterface>();
}
