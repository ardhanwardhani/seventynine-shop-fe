import { Component } from '@angular/core';
import { DashboardService, DashboardResponse } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  dashboardData: DashboardResponse | null = null;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.dashboardData = data;
    });
  }
}
