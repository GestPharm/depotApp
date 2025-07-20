import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-command-counter',
  templateUrl: './command-counter.component.html',
  styleUrls: ['./command-counter.component.scss']
})
export class CommandCounterComponent {
  @Input() count: number  | undefined= 0;
  @Input() title: string = 'Commandes';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'success' | 'danger' | 'warning' = 'primary';

  get circleClasses(): string {
    const sizeClasses = {
      sm: 'circle-sm',
      md: 'circle-md',
      lg: 'circle-lg'
    };
    return `circle ${sizeClasses[this.size]} bg-${this.color}`;
  }
}
