import { computed, effect, Injectable, signal } from '@angular/core';
import { FemalesComponent } from '../pages/dashboard/widgets/cards/females.component';
import { ViewsComponent } from '../pages/dashboard/widgets/cards/views.component';
import { WatchTimeComponent } from '../pages/dashboard/widgets/cards/watch-time.component';
import { MaleComponent } from '../pages/dashboard/widgets/cards/male.component';
import { ProductsComponent } from '../pages/dashboard/widgets/products/products.component';
import { TotalComponent } from '../pages/dashboard/widgets/cards/total.component';
import { Widget } from '../models/dashboard';
import { PersonsComponent } from '../pages/dashboard/widgets/persons/persons.component';
import { ByCountryComponent } from '../pages/dashboard/widgets/byCountry/by-country.component';
import { ByStateComponent } from '../pages/dashboard/widgets/by-state/by-state.component';
import { ByDepartmentComponent } from '../pages/dashboard/widgets/by-department/by-department.component';
import { ByZipCodeComponent } from '../pages/dashboard/widgets/by-zip-code/by-zip-code.component';
import { ByEmployeeTypeComponent } from '../pages/dashboard/widgets/by-employee-type/by-employee-type.component';
import { ByEmploymentStatusComponent } from '../pages/dashboard/widgets/by-employment-status/by-employment-status.component';
import { ByCitizenshipStatusComponent } from '../pages/dashboard/widgets/by-citizenship-status/by-citizenship-status.component';
import { BySalaryRangeComponent } from '../pages/dashboard/widgets/by-salary-range/by-salary-range.component';
import { ByPositionComponent } from '../pages/dashboard/widgets/by-position/by-position.component';
import { ByAgeGroupComponent } from '../pages/dashboard/widgets/by-age-group/by-age-group.component';
import { ByMaritalStatusComponent } from '../pages/dashboard/widgets/by-marital-status/by-marital-status.component';
import { ByRaceDescComponent } from '../pages/dashboard/widgets/by-race-desc/by-race-desc.component';
import { ByPerformanceScoreComponent } from '../pages/dashboard/widgets/by-performance-score/by-performance-score.component';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  widgets = signal<Widget[]>([
  {
    id: 1,
    label: 'Customers by Location',
    content: ProductsComponent,
    rows: 3,
    columns: 2
  },
  {
    id: 2,
    label: 'Views',
    content: ViewsComponent,
    rows: 1,
    columns: 1,
  },
  {
    id: 3,
    label: 'Watch Time',
    content: WatchTimeComponent,
    rows: 1,
    columns: 1,
  },
  {
    id: 4,
    label: 'Males',
    content: MaleComponent,
    rows: 1,
    columns: 1,
  },
  {
    id: 5,
    label: 'Females',
    content: FemalesComponent,
    rows: 1,
    columns: 1,
  },
  {
    id: 6,
    label: 'Total',
    content: TotalComponent,
    rows: 1,
    columns: 1,
  },
  {
    id: 7,
    label: 'By Department',
    content: PersonsComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 8,
    label: 'By Country',
    content: ByCountryComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 9,
    label: 'By State',
    content: ByStateComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 10,
    label: 'By Department',
    content: ByDepartmentComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 11,
    label: 'By Zip Code',
    content: ByZipCodeComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 12,
    label: 'By Employee Type',
    content: ByEmployeeTypeComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 13,
    label: 'By Employment Status',
    content: ByEmploymentStatusComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 14,
    label: 'By Citizenship Status',
    content: ByCitizenshipStatusComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 15,
    label: 'By Salary Range',
    content: BySalaryRangeComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 16,
    label: 'By Position',
    content: ByPositionComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 17,
    label: 'By Age Group',
    content: ByAgeGroupComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 18,
    label: 'By Marital Status',
    content: ByMaritalStatusComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 19,
    label: 'By Race Description',
    content: ByRaceDescComponent,
    rows: 2,
    columns: 2,
  },
  {
    id: 20,
    label: 'By Performance Score',
    content: ByPerformanceScoreComponent,
    rows: 2,
    columns: 2,
  }
  ]);

  addedWidgets = signal<Widget[]>([ ]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((w) => w.id);
    return this.widgets().filter((w) => !addedIds.includes(w.id));
  });

  addWidget(w: Widget){
    this.addedWidgets.set([...this.addedWidgets(), {...w}]);
  }

  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number){
    const sourceIndex = this.addedWidgets().findIndex(
      (w) => w.id === sourceWidgetId
    );

    if(sourceIndex === -1){
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    const sourceWidget = newWidgets.splice(sourceIndex, 1)[0];

    const targetIndex = newWidgets.findIndex((w) => w.id === targetWidgetId);
    if(targetIndex === -1){
      return;
    }

    const instertAt = targetIndex === sourceIndex ? targetIndex + 1 : targetIndex;

    newWidgets.splice(instertAt, 0, sourceWidget);
    this.addedWidgets.set(newWidgets);

  }

  updateWidget(id: number, widget: Partial<Widget>){
    const index = this.addedWidgets().findIndex(w => w.id == id);
    if(index !== -1){
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget}
      
      this.addedWidgets.set(newWidgets);
    }
  }

  moveWidgetToRight(id: number){
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if(index === this.addedWidgets().length-1){
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index + 1]] = [{...newWidgets[index+1]}, {...newWidgets[index]}];

    this.addedWidgets.set(newWidgets);
  }

  moveWidgetToLeft(id: number){
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if(index === 0){
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index - 1]] = [{...newWidgets[index-1]}, {...newWidgets[index]}];

    this.addedWidgets.set(newWidgets);
  }

  removeWidget(id: number){
    this.addedWidgets.set(this.addedWidgets().filter(w => w.id!==id));
  }

  fetchWidgets(){
    const widgetsAsString = localStorage.getItem('dashboardWidgets');
    if(widgetsAsString){
      const widgets = JSON.parse(widgetsAsString) as Widget[];
      widgets.forEach(widget => {
        const content = this.widgets().find(w => w.id ===widget.id)?.content;
        if(content){
          widget.content = content;
        }
      })
      this.addedWidgets.set(widgets);
    }
  }

  constructor() { 
    this.fetchWidgets();
    }

  //database e de kayıt edilebilir
  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(w => ({...w}));
    widgetsWithoutContent.forEach(w => {
      delete w.content;
    });
    localStorage.setItem('dashboardWidgets', JSON.stringify(widgetsWithoutContent));
  });

  editable = signal('false');
}
