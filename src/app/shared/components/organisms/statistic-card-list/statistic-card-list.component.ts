import { Component, input } from '@angular/core';
import { StatisticCardListComponentInterface } from './statistic-card-list.interface';
import { StatisticCardComponent } from '../../molecules/statistic-card/statistic-card.component';
import { TitleComponent } from '../../atoms/title/title.component';

@Component({
  selector: 'app-statistic-card-list',
  templateUrl: './statistic-card-list.component.html',
  imports: [StatisticCardComponent, TitleComponent],
})
export class StatisticCardListComponent {
  StatisticCardList = input<StatisticCardListComponentInterface>();
}
