import {InjectionToken} from "@angular/core";

export interface Environment {
	production: boolean;
	endpointUrl: string;
	serverOrigin: string;
}

export const ENVIRONMENT = new InjectionToken('ENVIRONMENT');
