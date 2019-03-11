import { createDecorator } from 'vs/platform/instantiation/common/instantiation';
import { ThemeColor } from 'vs/platform/theme/common/themeService';
import { StatusbarAlignment } from 'vs/platform/statusbar/common/statusbar';
import { ContextKeyExpr } from 'vs/platform/contextkey/common/contextkey';
import { IMyDisposable } from 'vs/kendryte/vs/base/common/lifecycle/disposableSet';

export enum StatusBarLeftLocation {
	CMAKE = 5,
	MESSAGE = 4,
	SERIAL = 3,
}

export interface IStatusButtonData {
	text: string;
	command: string;
	tooltip: string;
	color: string | ThemeColor;
	arguments: any[];
	showBeak: boolean;
	align: StatusbarAlignment;
	position: number;
	contextKey: ContextKeyExpr;
}

export interface IStatusButtonMethod extends IMyDisposable {
	reload(): void;
	show();
	hide();
	isVisible(): boolean;
	sleep(): IStatusButtonData;
	wakeup(data: IStatusButtonData);
}

export type IPublicStatusButton = IStatusButtonMethod & IStatusButtonData;

export type IPartMyStatusBarItem = Pick<IPublicStatusButton, 'text' | 'command' | 'tooltip' | 'color' | 'arguments' | 'showBeak' | keyof IMyDisposable> ;

export interface IKendryteStatusControllerService {
	_serviceBrand: any;

	createInstance(bigPosition: number): IPublicStatusButton;
	showMessage(buttonId: string): IPartMyStatusBarItem;
	resolveMessage(buttonId: string): void;
}

export const IKendryteStatusControllerService = createDecorator<IKendryteStatusControllerService>('kendryteStatusControllerService');