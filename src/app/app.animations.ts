import { bounce } from 'ng-animate';
import { trigger, transition, useAnimation } from '@angular/animations';

export const bounceAnim = trigger('bounce', [transition('void <=> *', useAnimation(bounce))])
