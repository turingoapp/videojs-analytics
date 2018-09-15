# videojs-analytics

Track Google Analytics or Global site tag [gtag][gtag] events from video.js players.

## Fork Details

This is a fork from the original videojs-analytics by Adam Oliver, [in case you prefer using that one instead](https://github.com/TwigWorld/videojs-analytics). 

This forks exists because:
1. I wanted to remove most dependencies for a smaller install.
1. Updated video.js version to the 7.x.x series.
1. Added `.d.ts` typing information for **Typescript**.
1. Removed all `browserify` stuff, we webpack here bois.
1. Removed the .html and most of other settings since we're using **react**, the DOM is mostly dynamic.

If the reasons above interest you, then go ahead and use it, otherwise, I recommend going with the main branch.

## Installation

This fork is not hosted in npm, thus, installation requires using the url:

```sh
yarn add <this repo's url>
```

## Usage (React)

Make sure to import, and, at some point, register the plugin with videojs.

```typescript
import videojs from 'video.js'
import Analytics from 'videojs-analytics'

// Register the plugin, this can be done at any point, since this is a static declaration
// you don't need a running/instanced player.
if (videojs.getPlugin('analytics') === undefined) {
    videojs.registerPlugin('analytics', Analytics)
}
```

Then, for configuring, there's currently a bug in typescript that doesn't allow to extend declared modules with namespaces, so we will need to use casting inside the file to properly access the `videojs.player.analytics(options: Options)`. You can add this code at the top-level:

```typescript
declare interface PlayerWithAnalytics extends videojs.Player {
    analytics(options: Analytics.Options): void
}

function isPlayerWithAnalytics(player: videojs.Player): player is PlayerWithAnalytics {
    return (player as PlayerWithAnalytics).analytics !== undefined
}
```

With this, now typescript can provide you typing information. When instancing the player you can simply do

```typescript
if (isPlayerWithAnalytics(player)) {
    player.analytics(/* your options */)
}
```

## Available options

### Google Analytics

There are two options you can pass to the plugin. The first is to configure which events you would like to trigger from videojs.
This option is an array objects for each event.  Each event contains the name of the event triggered by Video.js and a label and action which will be sent to Google Analytics.  Choose from the list below:

```javascript
player.analytics({
  events: [
    {
      name: 'play',
      label: 'video play',
      action: 'play',
    },
    {
      name: 'pause',
      label: 'video pause',
      action: 'pause',
    },
    {
      name: 'ended',
      label: 'video ended',
      action: 'ended',
    },
    {
      name: 'fullscreenchange',
      label: {
        open: 'video fullscreen open',
        exit: 'video fullscreen exit'
      },
      action: 'fullscreen change',
    },
    {
      name: 'volumechange',
      label: 'volume changed',
      action: 'volume changed',
    },
    {
      name: 'resize',
      label: 'resize',
      action: 'resize',
    },
    {
      name: 'error',
      label: 'error',
      action: 'error',
    },
    {
      name: 'resize',
      label: 'resize',
      action: 'resize',
    },
    {
      name: 'resolutionchange',
      action: 'resolution change',
    },
    {
      name: 'timeupdate',
      action: 'time updated',
    }
  ]
})
```

You can also add your own custom events which are not included in the above list. If you include any custom events the event sent to Google Analytics will be the name of the event.

To configure the default category names for audio and video files use the `defaultAudioCategory` `defaultVideoCategory` properties when initialising the plugin.

```
player.analytics({
  defaultAudioCategory: 'Audio',
  defaultVideoCategory: 'Video'
})

```


## License

MIT. Copyright (c) Adam Oliver &lt;mail@adamoliver.net&gt;


[videojs]: http://videojs.com/
[gtag]: https://developers.google.com/analytics/devguides/collection/gtagjs/
