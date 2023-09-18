import { WebPlugin } from '@capacitor/core';
import type { CapacitorException } from '@capacitor/core';
import type { CapacitorNodeJSPlugin } from './implementation';
export declare class CapacitorNodeJSWeb extends WebPlugin implements CapacitorNodeJSPlugin {
    protected unavailableNodeJS(): CapacitorException;
    start(): Promise<void>;
    send(): Promise<void>;
    whenReady(): Promise<void>;
}
