import {Inject, Injectable, InjectionToken} from '@angular/core';
import {SettingsServiceClass} from "./settings-service.class";
import {SETTINGS_SERVICE} from "./settings.service";

export const ZITI_TAB_OVERRIDES = new InjectionToken<string>('ZITI_TAB_OVERRIDES');

export interface TabInterceptorService {
    override(key: string, tabs: any[]): any[];
}

export class NoopTabInterceptorService implements TabInterceptorService {
    override(key: string, tabs: any[]): any[] {
        return tabs;
    }
}

@Injectable({
    providedIn: 'root'
})
export class TabNameService {

    pageToTabsMap = new Map<string, any[]>(
        [
            ["identities", [
                {label: 'Identities', url: '/identities'},
                {label: 'Recipes', url: '/recipes', hidden: !this.settings.supportedFeatures?.recipies},
                {label: 'Terminators', url: '/terminators'},
                {label: 'Posture Checks', url: '/posture-checks'},
            ]
            ],
            ["services", [
                {label: 'Services', url: '/services'},
                {label: 'Configurations', url: '/configs'},
                {label: 'Config Types', url: '/config-types'},
            ]
            ],
            ["routers", [
                {label: 'Routers', url: '/routers'},
                {label: 'Transit Routers', url: '/transit-routers'},
            ],
            ],
            ["policies", [
                {label: 'Service Policies', url: '/service-policies'},
                {label: 'Router Policies', url: '/router-policies'},
                {label: 'Service Router Policies', url: '/service-router-policies'}
            ]
            ],
            ["authentication", [
                {label: 'Certificate Authorities', url: '/certificate-authorities'},
                {label: 'Auth Policies', url: '/auth-policies'},
                {label: 'JWT Signers', url: '/jwt-signers'},
            ]
            ],
            ["sessions", [
                {label: 'Sessions', url: '/sessions'},
                {label: 'API Sessions', url: '/api-sessions'},
            ]
            ]
        ]
    );

    constructor(
        @Inject(ZITI_TAB_OVERRIDES) private interceptor: TabInterceptorService,
        @Inject(SETTINGS_SERVICE) private settings: SettingsServiceClass
    ) {
    }

    getTabs(key: string) {
        const val =  this.pageToTabsMap.get(key);
        return this.interceptor.override(key, val)
    }
}
