import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';


export const AuthRoutingAnimations = trigger('authAnimate', [
	transition('void => *', animate(0)),
	transition('* => *', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh'
			})
		], { optional: true }),
		query(':enter', [style({ top: '-100vh' })], { optional: true }),
		query(':leave', animateChild(), { optional: true }),
		group([
			query(':leave', [animate('0.3s ease-out', style({ top: '100vh', opacity: 0 }))], { optional: true }),
			query(':enter', [animate('0.3s ease-out', style({ top: '0%', opacity: 1 }))], { optional: true })
		]),
		query(':enter', animateChild(), { optional: true })
	])
]);
