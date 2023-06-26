import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';


export const AuthRoutingAnimations = trigger('authAnimate', [
	transition('login => register, login => remind', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				right: 0,
				width: '100%'
			})
		]),
		query(':enter', [style({ top: '-100%', opacity: 0 })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('0.3s ease-out', style({ top: '100%', opacity: 0 }))]),
			query(':enter', [animate('0.3s ease-out', style({ top: '0%', opacity: 1 }))])
		]),
		query(':enter', animateChild())
	]),
	transition('remind => login, register => login, update => login', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%'
			})
		]),
		query(':enter', [style({ bottom: '-100%', opacity: 0 })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('0.3s ease-out', style({ bottom: '100%', opacity: 0 }))]),
			query(':enter', [animate('0.3s ease-out', style({ bottom: '0%', opacity: 1 }))])
		]),
		query(':enter', animateChild())
	])
]);
