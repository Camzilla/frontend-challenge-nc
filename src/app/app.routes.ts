import { Routes } from '@angular/router'
import { NcxCountdownComponent } from './components/ncx-countdown/ncx-countdown.component'

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NcxCountdownComponent,
      },
    ],
  },
]
