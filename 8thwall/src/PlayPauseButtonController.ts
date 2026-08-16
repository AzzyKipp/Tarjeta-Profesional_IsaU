import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'PlayPauseButtonController',

  schema: {},

  add: (world, component) => {
    console.log('🎮 PlayPauseButton listo')

    world.events.addListener(
      component.eid,
      ecs.input.SCREEN_TOUCH_START,
      () => {
        console.log('🟢 BOTÓN PRESIONADO')
      }
    )
  },
})