import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {MenuService} from '../../service/menu.service';
@Component({
    selector: 'nav-left-component',
    templateUrl: 'nav.left.component.html',
    styleUrls: ['nav.left.component.css']
})

export class NavLeftComponent implements OnInit {
    /**
     * 父节点菜单
     * @type {EventEmitter<string>}
     */
    @Output() parentMenu = new EventEmitter<string>();

    /**
     * 子节点菜单
     * @type {string}
     */
    @Output() childrenMenu: any = '';
    /**
     * 菜单集合
     * @type {Array}
     */
    menuList: Array<any> = [];

    /**
     * 当前选中菜单
     * @type {string}
     */
    currentMenuId: string = '';

    ngOnInit(): void {
        this.menuService.menuList().subscribe(res=> {
            this.menuList = res.json();
        });
    }

    constructor(private menuService: MenuService) {
    }

    openMenuChild(menu: any) {
        if (this.currentMenuId === menu.id) {
            this.currentMenuId = "";
        } else {
            this.currentMenuId = menu.id;
        }
        //向上溢出父级菜单
        this.parentMenu.emit(menu.name);
    }
}