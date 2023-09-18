import { WebPlugin } from '@capacitor/core';
export class CapacitorNodeJSWeb extends WebPlugin {
    unavailableNodeJS() {
        return this.unavailable('The NodeJS engine is not available in the browser!');
    }
    start() {
        throw this.unavailableNodeJS();
    }
    send() {
        throw this.unavailableNodeJS();
    }
    whenReady() {
        throw this.unavailableNodeJS();
    }
}
//# sourceMappingURL=web.js.map