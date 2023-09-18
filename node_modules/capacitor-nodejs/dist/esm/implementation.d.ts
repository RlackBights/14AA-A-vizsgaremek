import type { PluginListenerHandle } from '@capacitor/core';
import type { ChannelPayloadData, ChannelListenerCallback, StartOptions } from './definitions';
export interface CapacitorNodeJSPlugin {
    start(args?: StartOptions): Promise<void>;
    send(args: ChannelPayloadData): Promise<void>;
    whenReady(): Promise<void>;
    addListener(eventName: string, listenerFunc: ChannelListenerCallback): Promise<PluginListenerHandle> & PluginListenerHandle;
}
declare const CapacitorNodeJS: CapacitorNodeJSPlugin;
export { CapacitorNodeJS };
