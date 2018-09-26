/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { SimpleFindWidget } from 'vs/editor/contrib/find/simpleFindWidget';
import { IContextViewService } from 'vs/platform/contextview/browser/contextView';
import { IContextKey, IContextKeyService } from 'vs/platform/contextkey/common/contextkey';
import { ISerialMonitorService, KEYBINDING_CONTEXT_TERMINAL_FIND_WIDGET_INPUT_FOCUSED } from 'vs/kendryte/vs/workbench/serialPort/terminal/common/terminal';

export class TerminalFindWidget extends SimpleFindWidget {
	protected _findInputFocused: IContextKey<boolean>;

	constructor(
		@IContextViewService _contextViewService: IContextViewService,
		@IContextKeyService private readonly _contextKeyService: IContextKeyService,
		@ISerialMonitorService private readonly _terminalService: ISerialMonitorService,
	) {
		super(_contextViewService, _contextKeyService);
		this._findInputFocused = KEYBINDING_CONTEXT_TERMINAL_FIND_WIDGET_INPUT_FOCUSED.bindTo(this._contextKeyService);
	}

	public find(previous: boolean) {
		const instance = this._terminalService.getActiveInstance();
		if (instance !== null) {
			if (previous) {
				instance.findPrevious(this.inputValue);
			} else {
				instance.findNext(this.inputValue);
			}
		}
	}

	public hide() {
		super.hide();
		this._terminalService.getActiveInstance().focus();
	}

	protected onInputChanged() {
		// Ignore input changes for now
	}

	protected onFocusTrackerFocus() {
		this._terminalService.getActiveInstance().notifyFindWidgetFocusChanged(true);
	}

	protected onFocusTrackerBlur() {
		this._terminalService.getActiveInstance().notifyFindWidgetFocusChanged(false);
	}

	protected onFindInputFocusTrackerFocus() {
		this._findInputFocused.set(true);
	}

	protected onFindInputFocusTrackerBlur() {
		this._findInputFocused.reset();
	}
}