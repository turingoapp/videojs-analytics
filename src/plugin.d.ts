// Type definitions for videojs-analytics 0.1.5
// Project: Turingo
// Definitions by: Jose Luis Canepa <https://github.com/CanTheAlmighty>

declare module 'videojs-analytics' {
    export default analytics
}

declare function analytics(options: analytics.Options)

declare namespace analytics {
    export interface Event<I, L> {
        name: I
        label?: L
        action: string
    }

    export type EventPlay             = Event<'play',             string>
    export type EventPause            = Event<'pause',            string>
    export type EventEnded            = Event<'ended',            string>
    export type EventVolumeChange     = Event<'volumechange',     string>
    export type EventResize           = Event<'resize',           string>
    export type EventError            = Event<'error',            string>
    export type EventResolutionChange = Event<'resolutionchange', undefined>
    export type EventTimeUpdate       = Event<'timeupdate',       undefined>
    export type EventFullScreenChange = Event<'fullscreenchange', { open: string, exit: string}>

    export type Events = EventPlay | EventPause | EventEnded | EventVolumeChange | EventResize | EventError | EventResolutionChange | EventTimeUpdate | EventFullScreenChange
    export type Options = {
        mode: 'GA' | 'GTAG'
        events: Array<Events>
        assetName?: string
        defaultAudioCategory?: string
        defaultVideoCategory?: string
    }
}