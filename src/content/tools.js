import { tr } from '@/i18n/locales.js'

// The kit behind the content. `icon` picks one of: camera, light, audio, edit, plan.
// Product names stay as-is; notes and generic names live in translations.js under 'tools.*'.
export const tools = [
  {
    id: 'camera',
    title: tr('tools.camera.title'),
    icon: 'camera',
    items: [
      { name: 'iPhone 16 Pro', note: tr('tools.camera.iphone') },
      { name: 'Sony ZV-E10 II', note: tr('tools.camera.sony') },
      { name: 'Sigma 30mm f/1.4', note: tr('tools.camera.sigma') },
      { name: tr('tools.camera.rigName'), note: tr('tools.camera.rig') },
    ],
  },
  {
    id: 'light',
    title: tr('tools.light.title'),
    icon: 'light',
    items: [
      { name: tr('tools.light.windowName'), note: tr('tools.light.window') },
      { name: 'Godox SL60W', note: tr('tools.light.godox') },
      { name: tr('tools.light.diffusionName'), note: tr('tools.light.diffusion') },
    ],
  },
  {
    id: 'audio',
    title: tr('tools.audio.title'),
    icon: 'audio',
    items: [
      { name: 'Rode Wireless GO II', note: tr('tools.audio.wireless') },
      { name: 'Rode VideoMic NTG', note: tr('tools.audio.videomic') },
    ],
  },
  {
    id: 'edit',
    title: tr('tools.edit.title'),
    icon: 'edit',
    items: [
      { name: 'CapCut', note: tr('tools.edit.capcut') },
      { name: 'Premiere Pro', note: tr('tools.edit.premiere') },
      { name: 'Lightroom', note: tr('tools.edit.lightroom') },
    ],
  },
  {
    id: 'plan',
    title: tr('tools.plan.title'),
    icon: 'plan',
    items: [
      { name: 'Notion', note: tr('tools.plan.notion') },
      { name: 'Frame.io', note: tr('tools.plan.frameio') },
      { name: 'Google Drive', note: tr('tools.plan.drive') },
    ],
  },
]

export const studio = {
  title: tr('tools.studio.title'),
  body: tr('tools.studio.body'),
}
