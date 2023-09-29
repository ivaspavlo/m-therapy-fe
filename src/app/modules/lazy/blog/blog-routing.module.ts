import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BlogPageComponent } from './blog-page.component';


const BLOG_ROUTE_NAMES = {
  BLANK: ''
};

const blogRoutes: Route[] = [{
  path: BLOG_ROUTE_NAMES.BLANK,
  component: BlogPageComponent
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(blogRoutes)
  ]
})
export class BlogRoutingModule { }
