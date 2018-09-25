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

    // Self-explanatory
    export type EventPlay             = Event<'play',             string>
    export type EventPause            = Event<'pause',            string>
    export type EventEnded            = Event<'ended',            string>
    export type EventVolumeChange     = Event<'volumechange',     string>
    export type EventResize           = Event<'resize',           string>
    export type EventError            = Event<'error',            string>
    export type EventResolutionChange = Event<'resolutionchange', undefined>

    /**
     * Event when time changes
     * 
     * Accepts a triple label: {
     *  q1: passed the first quarter mark (25%)
     *  q2: passed the second quarter mark (50%)
     *  q3: passed the third quarter mark (75%)
     * }
     * 
     * q0 (0%) and q4 (100%) are not implemented, but are the same as checking for EventPlay / EventEnded
     */
    export type EventTimeUpdate = Event<'timeupdate', { q1: string, q2: string, q3: string }>

    /**
     * Alerts when the user has entered or left full screen.
     * 
     * Accepts the labels: {
     *  open: Opened full screen
     *  exit: Left fullscreen
     * }
     */
    export type EventFullScreenChange = Event<'fullscreenchange', { open: string, exit: string}>

    export type Events = EventPlay | EventPause | EventEnded | EventVolumeChange | EventResize | EventError | EventResolutionChange | EventTimeUpdate | EventFullScreenChange
    export type Options = {
        mode: 'GA' | 'GTAG'
        events: Array<Events>
        defaultAudioCategory?: string
        defaultVideoCategory?: string
    }
}