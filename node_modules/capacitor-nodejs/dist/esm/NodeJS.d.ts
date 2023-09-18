import type { PluginListenerHandle } from '@capacitor/core';
import type { ChannelPayloadData, ChannelListenerCallback, StartOptions } from './definitions';
export interface NodeJSInterface {
    /**
     * Starts the Node.js engine with properties as set by the `options`.
     *
     * **Note:** This method is only available if the Node.js engine startup mode was set to `'manual'` via the plugin configuration.
     *
     * @since 1.0.0
     */
    start(options?: StartOptions): Promise<void>;
    /**
     * Sends a message to the Node.js process.
     *
     * @since 1.0.0
     */
    send(args: ChannelPayloadData): Promise<void>;
    /**
     * Resolves when the Node.js process is initialized.
     *
     * @since 1.0.0
     */
    whenReady(): Promise<void>;
    /**
     * Listens to `eventName` and calls `listenerFunc(data)` when a new message arrives from the Node.js process.
     *
     * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
     * Use [`removeListener(listenerFunc)`](#removelistener) instead.
     *
     * @since 1.0.0
     */
    addListener(eventName: string, listenerFunc: ChannelListenerCallback): Promise<PluginListenerHandle> & PluginListenerHandle;
    /**
     * Removes the specified `listenerHandle` from the listener array for the event it refers to.
     *
     * @since 1.0.0
     */
    removeListener(listenerHandle: PluginListenerHandle): Promise<void>;
    /**
     * Removes all listeners, or those of the specified `eventName`, for this plugin.
     *
     * @since 1.0.0
     */
    removeAllListeners(eventName?: string): Promise<void>;
}
declare class NodeJSPlugin implements NodeJSInterface {
    private readonly listenerList;
    start(args?: StartOptions): Promise<void>;
    send(args: ChannelPayloadData): Promise<void>;
    whenReady(): Promise<void>;
    addListener(eventName: string, listenerFunc: ChannelListenerCallback): Promise<PluginListenerHandle> & PluginListenerHandle;
    removeListener(listenerHandle: PluginListenerHandle): Promise<void>;
    removeAllListeners(eventName?: string): Promise<void>;
}
declare const NodeJS: NodeJSPlugin;
export { NodeJS };
