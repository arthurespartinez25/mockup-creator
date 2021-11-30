import { Component } from '@angular/core';
import { CdkDragDrop, CdkDrag, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mockup-creator';

  pogi = 
  [
    'Jude',
    'Jupao',
    'Mark',
    'Mikmik',
    'Phil',
    'Raven',
  ];

  panget = 
  [
    'Huebert'
  ];

  /*drop(event: CdkDragDrop<string[]>)
  {
    console.log('from +' +event.previousContainer.id + ' to: ' + event.container.id);

    if(event.previousContainer === event.container)
    {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else
    {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  evenPredicate(item: CdkDrag<string>)
  {
    return item.data == "canbedone";
  }*/

  drop(event: CdkDragDrop<string[]>)
  {

    if(event.previousContainer === event.container)
    {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else
    {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
