import { Component, input } from '@angular/core';
import { StatisticCardComponentInterface } from './statistic-card.interface';
import { TitleComponent } from '../../atoms/title/title.component';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  imports: [TitleComponent],
})
export class StatisticCardComponent {
  statisticCard = input<StatisticCardComponentInterface>();
}
