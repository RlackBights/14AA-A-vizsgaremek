import { Capacitor } from '@capacitor/core';
import { CapacitorNodeJS } from './implementation';
class NodeJSPlugin {
    constructor() {
        this.listenerList = [];
    }
    start(args) {
        return CapacitorNodeJS.start(args);
    }
    send(args) {
        return CapacitorNodeJS.send(args);
    }
    whenReady() {
        return CapacitorNodeJS.whenReady();
    }
    addListener(eventName, listenerFunc) {
        const listenerHandle = CapacitorNodeJS.addListener(eventName, (data) => {
            listenerFunc(data);
        });
        this.listenerList.push({ eventName, listenerHandle });
        return listenerHandle;
    }
    async removeListener(listenerHandle) {
        if (Capacitor.getPlatform() === 'electron') {
            await CapacitorNodeJS.removeListener(listenerHandle);
        }
        else {
            await listenerHandle.remove();
        }
        for (let index = 0; index < this.listenerList.length; index++) {
            const listener = this.listenerList[index];
            if (listenerHandle === (await listener.listenerHandle)) {
                this.listenerList.splice(index, 1);
                break;
            }
        }
    }
    async removeAllListeners(eventName) {
        for (const listener of [...this.listenerList]) {
            if (!eventName || eventName === listener.eventName) {
                const listenerHandle = await listener.listenerHandle;
                await this.removeListener(listenerHandle);
            }
        }
    }
}
const NodeJS = new NodeJSPlugin();
export { NodeJS };
//# sourceMappingURL=NodeJS.js.map