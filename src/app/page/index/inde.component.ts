import {Component, OnInit} from '@angular/core';
@Component({
    selector: 'index-component',
    templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
    /**
     * 父级菜单接收
     * @type {string}
     */
    recieveParentMenu: string = '';
    /**
     * 子级菜单接收
     * @type {string}
     */
    recieveChildrenMenu: string = '';

    ngOnInit(): void {
    }

}