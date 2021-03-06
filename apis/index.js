const setPx = require('./setPx')
const screenshot = require('./screenshot')
const lockScreen = require('./lockScreen')
const setTime = require('./setTime')
const { generatePreview } = require('./initPreview')
const { generateOriginal } = require('./initOriginal')
const { createFrameAnimation } = require('./frameAnimation')
const { vivoPreview } = require('./initVivoPreview')

module.exports = [
    { path: '/set1920Px', ctx: setPx.set1920Px },
    { path: '/set2160Px', ctx: setPx.set2160Px },
    { path: '/set2256Px', ctx: setPx.set2256Px },
    { path: '/set2280Px', ctx: setPx.set2280Px },
    { path: '/set2316Px', ctx: setPx.set2316Px },
    { path: '/set2340Px', ctx: setPx.set2340Px },
    { path: '/set2376Px', ctx: setPx.set2376Px },
    { path: '/set2400Px', ctx: setPx.set2400Px },
    { path: '/set2408Px', ctx: setPx.set2408Px },
    { path: '/set2430Px', ctx: setPx.set2430Px },
    { path: '/set2460Px', ctx: setPx.set2460Px },
    { path: '/set2520Px', ctx: setPx.set2520Px },
    { path: '/set3216Px', ctx: setPx.set3216Px },
    { path: '/set2640Px', ctx: setPx.set2640Px },
    { path: '/set3168Px', ctx: setPx.set3168Px },
    { path: '/setDefault', ctx: setPx.setDefaultPx },

    { path: '/oneKeyScreenShot', ctx: screenshot.oneKeyScreenShot },
    { path: '/vivoScreenShot', ctx: screenshot.vivoScreenShot },
    { path: '/hw1920ScreenShot', ctx: screenshot.hw1920ScreenShot },
    { path: '/hw2160ScreenShot', ctx: screenshot.hw2160ScreenShot },
    { path: '/oppoAutoScreenShot', ctx: screenshot.oppoAutoScreenShot },
    { path: '/oppoHalfAutoScreenShot', ctx: screenshot.oppoHalfAutoScreenShot },
    { path: '/generateOppoImg', ctx: screenshot.generateOppoImg },
    { path: '/vivoAutoScreenshot', ctx: screenshot.vivoAutoScreenshot },

    { path: '/vivoLocks', ctx: lockScreen.vivoLocks },
    { path: '/vivoLocksEn', ctx: lockScreen.vivoLocksEn },
    { path: '/emuiLocks', ctx: lockScreen.emuiLocks },
    { path: '/emuiLocksEn', ctx: lockScreen.emuiLocksEn },
    { path: '/oppoLocks', ctx: lockScreen.oppoLocks },

    { path: '/set0706', ctx: setTime.set0706 },
    { path: '/set0808', ctx: setTime.set0808 },

    { path: '/generatePreview', ctx: generatePreview },

    { path: '/generateOriginal', ctx: generateOriginal },

    { path: '/createFrameAnimation', ctx: createFrameAnimation },

    { path: '/vivoPreview', ctx: vivoPreview }
]
