import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'ExternalURLController',

  stateMachine: ({world, eid}) => {
    ecs.defineState('idle')
      .initial()
      .onEvent(ecs.input.SCREEN_TOUCH_START, 'touched', {
        target: eid,
      })

    ecs.defineState('touched')
      .onEnter(() => {
        console.log('🔥🔥🔥 EL AVATAR RECIBIÓ EL TOUCH')
      })
  },
})